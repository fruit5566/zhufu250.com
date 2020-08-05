var request = require('request');
var got = require('got');
var fs = require('fs'),
var  gm = require('gm');

gm('3.png')
  .resize('50', '20')
  .stream(function (err, stdout, stderr) {
    var writeStream = fs.createWriteStream('./file/2.jpg');
    stdout.pipe(writeStream);
  });

gm(request('https://s1.hdslb.com/bfs/static/jinkela/international-home/asserts/body2.png'))
  .resize(16, 16)
  .write('./file/3.png', function (err) {
    // if (!err) console.log('done');
  });

gm(request('https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg'))
  .resize(16, 16)
  .write('./file/4.png', function (err) {
    // if (!err) console.log('done');
  });


// https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg
// https://s1.hdslb.com/bfs/static/jinkela/international-home/asserts/body2.png
// https://www.bilibili.com/favicon.ico
request.get({
  uri: 'https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg',
  encoding: 'binary'
}, function (err, res, body) {

  fs.writeFile('./file/12.ico', body, 'binary', function (err) {
    gm('./file/12.ico').resize(16, 16).quality(100).toBuffer('WEBP', function (err, buffer) {
      console.log('-----webp------')

      const base64String = buffer.toString('base64')

      const imgBase64String = `data:image/png;base64,` + base64String

      fs.writeFile('./file/webp.txt', imgBase64String, function (err) {})
    })
  })
 
  fs.writeFile('./file/14.ico', body, 'binary', function (err) {
    gm('./file/14.ico').resize(16, 16).toBuffer('png', function (err, buffer) {
      console.log('-----png------')

      const base64String = buffer.toString('base64')

      const imgBase64String = `data:image/png;base64,` + base64String

      fs.writeFile('./file/png.txt', imgBase64String, function (err) {})
    })
  })

})