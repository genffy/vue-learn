(function() {
    "use strict";
    const http = require("http");
    const fs = require("fs");
    const path = require("path");
    var request = require("request");
  
    const urlList = [
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/78/78923_season_6_type_1_1553409212.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/52/52857_season_6_type_1_1553560485.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79186_season_6_type_1_1553415519.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79242_season_6_type_1_1553425311.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/26/26055_season_6_type_1_1553560006.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/53/53044_season_6_type_1_1553470482.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79149_season_6_type_1_1553431823.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/77/77954_season_6_type_1_1553556579.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79084_season_6_type_1_1553523843.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/52/52308_season_6_type_1_1553562340.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/12/12367_season_6_type_1_1553561844.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/24/24833_season_6_type_1_1553526498.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79173_season_6_type_1_1553444765.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/52/52151_season_6_type_1_1553562583.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79174_season_6_type_1_1553503509.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79246_season_6_type_1_1553416955.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/22/22778_season_6_type_1_1553561787.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/52/52082_season_6_type_1_1553530274.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/43/43829_season_6_type_1_1553411401.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/78/78133_season_6_type_1_1553436325.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/23/23401_season_6_type_1_1553498252.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/51/51003_season_6_type_1_1553529980.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/77/77980_season_6_type_1_1553549505.png",
      "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/68/68245_season_6_type_1_1553527074.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/57/57351_season_6_type_1_1553447441.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/56/56070_season_6_type_1_1553501108.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/79/79096_season_6_type_1_1553501932.png",
      // "http://run-likes.cdn.bcebos.com/Uploads/RunnerReport/merge/51/51108_season_6_type_1_1553432504.png",
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
    //         headers: {
    //             'Referer': 'http://run.likes.com.cn/index.php/Qwadmin/RunnerReport/commonajax_get_infos/source/likes.html?pageSize=50&offset=0&sort=id&sortOrder=desc&type=year&year=2019&monthly=1902&_=1553516156784'
    //         }
    //   }, getHttpReqCallback(imgSrc, dirName, index));
    //   req.on('error', function(e){
    //     console.log("request " + imgSrc + " error, try again");
    //     startDownloadTask(imgSrc, dirName, index);
    //   });
    //   req.end();
    var writeStream = fs.createWriteStream(index + "-" + path.basename(imgSrc));
    var readStream = request(imgSrc,
    {
      headers: {
        'Host': "run-likes.cdn.bcebos.com"
      },
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