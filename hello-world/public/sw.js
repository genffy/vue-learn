(function (w) {
  // 使用indexDB维护数据
  // indexDb utils
  const IDBT_READ_ONLY = IDBTransaction.READ_ONLY || "readonly";
  const IDBT_READ_WRITE = IDBTransaction.READ_WRITE || "readwrite";

  const throwErrorCallback = function (error) {
    /// <summary>Default error handler.</summary>
    /// <param name="error" type="Object">Error to handle.</param>
    throw error;
  };

  /** Returns either a specific error handler or the default error handler
   * @param {Function} error - The specific error handler
   * @param {Function} defaultError - The default error handler
   * @returns {Function} The error callback
   */
  function getError(error, defaultError) {

    return function (e) {
      var errorFunc = error || defaultError;
      if (!errorFunc) {
        return;
      }

      // Old api quota exceeded error support.
      if (Object.prototype.toString.call(e) === "[object IDBDatabaseException]") {
        if (e.code === 11 /* IndexedDb disk quota exceeded */) {
          errorFunc({ name: "QuotaExceededError", error: e });
          return;
        }
        errorFunc(e);
        return;
      }

      var errName;
      try {
        var errObj = e.target.error || e;
        errName = errObj.name;
      } catch (ex) {
        errName = (e.type === "blocked") ? "IndexedDBBlocked" : "UnknownError";
      }
      errorFunc({ name: errName, error: e });
    };
  }

  /** Opens the store object's indexed db database.
   * @param {IndexedDBStore} store - The store object
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  function openStoreDb(store, success, error) {

    var storeName = store.name;
    var dbName = "_odatajs_" + storeName;

    var request = indexedDB.open(dbName);
    request.onblocked = error;
    request.onerror = error;

    request.onupgradeneeded = function () {
      var db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = function (event) {
      var db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // Should we use the old style api to define the database schema?
        if ("setVersion" in db) {
          var versionRequest = db.setVersion("1.0");
          versionRequest.onsuccess = function () {
            var transaction = versionRequest.transaction;
            transaction.oncomplete = function () {
              success(db);
            };
            db.createObjectStore(storeName, null, false);
          };
          versionRequest.onerror = error;
          versionRequest.onblocked = error;
          return;
        }

        // The database doesn't have the expected store.
        // Fabricate an error object for the event for the schema mismatch
        // and error out.
        event.target.error = { name: "DBSchemaMismatch" };
        error(event);
        return;
      }

      db.onversionchange = function (event) {
        event.target.close();
      };
      success(db);
    };
  }

  /** Opens a new transaction to the store
   * @param {IndexedDBStore} store - The store object
   * @param {Integer} mode - The read/write mode of the transaction (constants from IDBTransaction)
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  function openTransaction(store, mode, success, error) {

    var storeName = store.name;
    var storeDb = store.db;
    var errorCallback = getError(error, store.defaultError);

    if (storeDb) {
      success(storeDb.transaction(storeName, mode));
      return;
    }

    openStoreDb(store, function (db) {
      store.db = db;
      success(db.transaction(storeName, mode));
    }, errorCallback);
  }

  /** Creates a new IndexedDBStore.
   * @class IndexedDBStore
   * @constructor
   * @param {String} name - The name of the store.
   * @returns {Object} The new IndexedDBStore.
   */
  function IndexedDBStore(name) {
    this.name = name;
  }

  /** Creates a new IndexedDBStore.
   * @method module:store/indexeddb~IndexedDBStore.create
   * @param {String} name - The name of the store.
   * @returns {Object} The new IndexedDBStore.
   */
  IndexedDBStore.create = function (name) {
    if (IndexedDBStore.isSupported()) {
      return new IndexedDBStore(name);
    }

    throw { message: "IndexedDB is not supported on this browser" };
  };

  /** Returns whether IndexedDB is supported.
   * @method module:store/indexeddb~IndexedDBStore.isSupported
   * @returns {Boolean} True if IndexedDB is supported, false otherwise.
   */
  IndexedDBStore.isSupported = function () {
    return !!indexedDB;
  };

  /** Adds a key/value pair to the store
   * @method module:store/indexeddb~IndexedDBStore#add
   * @param {String} key - The key
   * @param {Object} value - The value
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
  */
  IndexedDBStore.prototype.add = function (key, value, success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    var keys = [];
    var values = [];

    if (key instanceof Array) {
      keys = key;
      values = value;
    } else {
      keys = [key];
      values = [value];
    }

    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      transaction.onabort = getError(error, defaultError, key, "add");
      transaction.oncomplete = function () {
        if (key instanceof Array) {
          success(keys, values);
        } else {
          success(key, value);
        }
      };

      for (var i = 0; i < keys.length && i < values.length; i++) {
        transaction.objectStore(name).add({ v: values[i] }, keys[i]);
      }
    }, error);
  };

  /** Adds or updates a key/value pair in the store
   * @method module:store/indexeddb~IndexedDBStore#addOrUpdate
   * @param {String} key - The key
   * @param {Object} value - The value
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.addOrUpdate = function (key, value, success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    var keys = [];
    var values = [];

    if (key instanceof Array) {
      keys = key;
      values = value;
    } else {
      keys = [key];
      values = [value];
    }

    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      transaction.onabort = getError(error, defaultError);
      transaction.oncomplete = function () {
        if (key instanceof Array) {
          success(keys, values);
        } else {
          success(key, value);
        }
      };

      for (var i = 0; i < keys.length && i < values.length; i++) {
        var record = { v: values[i] };
        transaction.objectStore(name).put(record, keys[i]);
      }
    }, error);
  };

  /** Clears the store
   * @method module:store/indexeddb~IndexedDBStore#clear
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.clear = function (success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      transaction.onerror = getError(error, defaultError);
      transaction.oncomplete = function () {
        success();
      };

      transaction.objectStore(name).clear();
    }, error);
  };

  /** Closes the connection to the database
   * @method module:store/indexeddb~IndexedDBStore#close
  */
  IndexedDBStore.prototype.close = function () {

    if (this.db) {
      this.db.close();
      this.db = null;
    }
  };

  /** Returns whether the store contains a key
   * @method module:store/indexeddb~IndexedDBStore#contains
   * @param {String} key - The key
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.contains = function (key, success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    openTransaction(this, IDBT_READ_ONLY, function (transaction) {
      var objectStore = transaction.objectStore(name);
      var request = objectStore.get(key);

      transaction.oncomplete = function () {
        success(!!request.result);
      };
      transaction.onerror = getError(error, defaultError);
    }, error);
  };

  IndexedDBStore.prototype.defaultError = throwErrorCallback;

  /** Gets all the keys from the store
   * @method module:store/indexeddb~IndexedDBStore#getAllKeys
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.getAllKeys = function (success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      var results = [];

      transaction.oncomplete = function () {
        success(results);
      };

      var request = transaction.objectStore(name).openCursor();

      request.onerror = getError(error, defaultError);
      request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          results.push(cursor.key);
          // Some tools have issues because continue is a javascript reserved word.
          cursor["continue"].call(cursor);
        }
      };
    }, error);
  };

  /** Identifies the underlying mechanism used by the store.
  */
  IndexedDBStore.prototype.mechanism = "indexeddb";

  /** Reads the value for the specified key
   * @method module:store/indexeddb~IndexedDBStore#read
   * @param {String} key - The key
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   * If the key does not exist, the success handler will be called with value = undefined
   */
  IndexedDBStore.prototype.read = function (key, success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    var keys = (key instanceof Array) ? key : [key];

    openTransaction(this, IDBT_READ_ONLY, function (transaction) {
      var values = [];

      transaction.onerror = getError(error, defaultError, key, "read");
      transaction.oncomplete = function () {
        if (key instanceof Array) {
          success(keys, values);
        } else {
          success(keys[0], values[0]);
        }
      };

      for (var i = 0; i < keys.length; i++) {
        // Some tools have issues because get is a javascript reserved word. 
        var objectStore = transaction.objectStore(name);
        var request = objectStore.get.call(objectStore, keys[i]);
        request.onsuccess = function (event) {
          var record = event.target.result;
          values.push(record ? record.v : undefined);
        };
      }
    }, error);
  };

  /** Removes the specified key from the store
   * @method module:store/indexeddb~IndexedDBStore#remove
   * @param {String} key - The key
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.remove = function (key, success, error) {

    var name = this.name;
    var defaultError = this.defaultError;
    var keys = (key instanceof Array) ? key : [key];

    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      transaction.onerror = getError(error, defaultError);
      transaction.oncomplete = function () {
        success();
      };

      for (var i = 0; i < keys.length; i++) {
        // Some tools have issues because continue is a javascript reserved word.
        var objectStore = transaction.objectStore(name);
        objectStore["delete"].call(objectStore, keys[i]);
      }
    }, error);
  };

  /** Updates a key/value pair in the store
   * @method module:store/indexeddb~IndexedDBStore#update
   * @param {String} key - The key
   * @param {Object} value - The value
   * @param {Function} success - The success callback
   * @param {Function} error - The error callback
   */
  IndexedDBStore.prototype.update = function (key, value, success, error) {
    var name = this.name;
    var defaultError = this.defaultError;
    var keys = [];
    var values = [];

    if (key instanceof Array) {
      keys = key;
      values = value;
    } else {
      keys = [key];
      values = [value];
    }

    openTransaction(this, IDBT_READ_WRITE, function (transaction) {
      transaction.onabort = getError(error, defaultError);
      transaction.oncomplete = function () {
        if (key instanceof Array) {
          success(keys, values);
        } else {
          success(key, value);
        }
      };

      for (var i = 0; i < keys.length && i < values.length; i++) {
        var request = transaction.objectStore(name).openCursor(IDBKeyRange.only(keys[i]));
        var record = { v: values[i] };
        request.pair = { key: keys[i], value: record };
        request.onsuccess = function (event) {
          var cursor = event.target.result;
          if (cursor) {
            cursor.update(event.target.pair.value);
          } else {
            transaction.abort();
          }
        }
      }
    }, error);
  };
  w.IndexedDBStore = IndexedDBStore;
})(this);
// sw.js
const CHECK_CRASH_INTERVAL = 10 * 1000; // 每 10s 检查一次
const CRASH_THRESHOLD = 300 * 1000; // 超时时间，默认 15s，还有一种可能是页面js执行时间过长
const pages = {}
const crashSwDb = IndexedDBStore.create('zm_crash_db_v2');
let timer = null;
let netStatus = 200;
let zmStatus = 200;




function checkCrash() {
  //  判断是否网络错误
  
  // if( navigator.onLine && fetch){
  //   // 监控网络
  //   fetch('/内网地址/', {
  //     method: 'get'
  //   }).then(res => {
  //     netStatus = res.status;
  //     fetch(`${location.origin}`, {
  //       method: 'get'
  //     }).then(res => {
  //       zmStatus = res.status === 200 ? 200 : (
  //           res.status === 301 ? 200 : (
  //             res.status === 302 ? 200 : (
  //               res.status === 401 ? 200 : res.status
  //             )
  //           )
  //         );
  //     }).catch(() => {
  //       zmStatus = 500;
  //     })
  //   }).catch(() => {
  //     netStatus = 500;
  //     zmStatus = 500;
  //   })

  //   if(netStatus !== 200 || zmStatus !== 200){
  //     crashSwDb.add(`sale_page_net_event_${new Date().getTime()}`, {
  //         netStatus,
  //         zmStatus
  //     }, function (res) {
  //         console.log('记录crash成功', res);
  //         clearInterval(timer)
  //         timer = null
  //     }, function (err) {
  //         console.log('记录crash失败', err);
  //     });
  //   }
  // }

  // 判断是否crash了
  const now = Date.now()
  for (var id in pages) {
    let page = pages[id]
    if ((now - page.t) > CRASH_THRESHOLD) {
      // 发送事件给页面，进行数据上报
      infoMatch(page);
    }
  }
  if (Object.keys(pages).length == 0) {
    clearInterval(timer)
    timer = null
  }
}

// 监听消息
this.addEventListener('message', (e) => {
  const data = e.data;
  if (data.type === 'heartbeat') {
    pages[data.id] = Object.assign(data, {
      t: Date.now(),
    });
    if (!timer) {
      timer = setInterval(function () {
        checkCrash()
      }, CHECK_CRASH_INTERVAL)
    }
  } else if (data.type === 'unload') {
    delete pages[data.id]
  }
});

// 初始化
this.addEventListener('install', function (event) {
  console.log('install', pages, event); // this message is from page, to sw
});

// 激活
this.addEventListener('activate', function (event) {
  console.log('activate', event); // this message is from page, to sw
});

// 通知这个sw所控制的所有页面
function infoMatch(data) {
  crashSwDb.add(`sale_page_crash_event_${data.id}`, data, function (res) {
    console.log('记录crash成功', res);
    delete pages[data.id];
  }, function (err) {
    console.log('记录crash失败', err);
  });
}