(function() {
    "use strict";
    const http = require("http");
    const fs = require("fs");
    const path = require("path");
    var request = require("request");
  
    const urlList = [
    ];
  

    // var fs = require('fs');
    // var request = require("request");
    // var src = "https://www.google.com.hk/images/srpr/logo3w.png";
    // var writeStream = fs.createWriteStream('image.png');
    // var readStream = request(src)
    // readStream.pipe(writeStream);
    // readStream.on('end', function() {
    //     console.log('文件下载成功');
    // });
    // readStream.on('error', function() {
    //     console.log("错误信息:" + err)
    // })
    // writeStream.on("finish", function() {
    //     console.log("文件写入成功");
    //     writeStream.end();
    // });
    function getHttpReqCallback(imgSrc, dirName, index) {
      var fileName = index + "-" + path.basename(imgSrc);
      var callback = function(res) {
        console.log("request: " + imgSrc + " return status: " + res.statusCode);
        var contentLength = parseInt(res.headers['content-length']);
        var fileBuff = [];
        res.on('data', function (chunk) {
          var buffer = new Buffer(chunk);
          fileBuff.push(buffer);
        });
        res.on('end', function() {
          console.log("end downloading " + imgSrc);
          if (isNaN(contentLength)) {
            console.log(imgSrc + " content length error");
            return;
          }
          var totalBuff = Buffer.concat(fileBuff);
          console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
          if (totalBuff.length < contentLength) {
            console.log(imgSrc + " download error, try again");
            startDownloadTask(imgSrc, dirName, index);
            return;
          }
          fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
        });
      };
  
      return callback;
    }
  
    var startDownloadTask = function(imgSrc, dirName, index) {
      console.log("start downloading " + imgSrc);
    //   var req = http.request(imgSrc, {
    //   }, getHttpReqCallback(imgSrc, dirName, index));
    //   req.on('error', function(e){
    //     console.log("request " + imgSrc + " error, try again");
    //     startDownloadTask(imgSrc, dirName, index);
    //   });
    //   req.end();
    var writeStream = fs.createWriteStream(index + "-" + path.basename(imgSrc));
    var readStream = request(imgSrc,
    {
    })
    readStream.pipe(writeStream);
    readStream.on('end', function() {
        console.log('文件下载成功');
    });
    readStream.on('error', function() {
        console.log("错误信息:" + err)
    })
    writeStream.on("finish", function(d) {
        console.log("文件写入成功", d);
        writeStream.end();
    });
    }
  
    urlList.forEach(function(item, index, array) {
      startDownloadTask(item, './imges', index);
    })
  })();