
// 新建server服务器  
var http = require('http');  
var fs = require('fs');  
  
var hostname = '127.0.0.1';  
var port = 80;  
  
function onRequest(req, res) {
    function defaultF() {
        fs.readFile('./phoneIframe.html', (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            
            if (err) {
                res.end('500');
            } else {
                res.end(data);
            }
        });   
    }
    function ajaxquery() {
        http.get('http://www.xinhuanet.com/politics/xxjxs/mobile.htm', (res1) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
          let rawData = '';
          res1.on('data', (chunk) => rawData += chunk);
          res1.on('end', () => res.end(rawData));
        }).on('error', (e) => {
          console.log(`Got error: ${e.message}`);
        });
    }
    console.log(req.url, req.url === '/testjust')
    if (req.url === '/') {
        defaultF();
    } else if (req.url === '/testjust') {
        console.log(req.url)
        ajaxquery();
    } else {
        res.end('sdfsdf');
    }
}

var server = http.createServer(onRequest);
  
server.listen(port, hostname, function() {  
    // hostname是const类型时，可以用以下写法  
    //console.log('Server running at http://${hostname}:${port}/');  
  
    console.log('Server running at http://%s:%s', hostname, port);  
    // console.log('Server running at http://' + hostname + ':' + port + '/');  
});  