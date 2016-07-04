var HTTPParser = require('../').HTTPParser;
process.binding('http_parser').HTTPParser = HTTPParser;
HTTPParser.encoding = "binary";

var assert = require("assert");

var http = require('http');
var net = require('net');

var  server = net.createServer(function(conn){
    var buff = new Buffer(0);
    conn.on('data',function(b){
        buff = Buffer.concat([buff,b]);
        var text = buff+'';
        if(/\r\n\r\n/.test(text)){
            conn.end(
                "HTTP/1.1 200 OK\r\n" +
                "Content-disposition: attachment; filename=\"אברהם_דהאן_–_ברכת_הכהנים_.mp3\"\r\n" +
                "Server: Apache/2\r\n" +
                "\r\n"
            );
        }
    });
    
});
server.listen(8877,function(){
   
    http.get("http://127.0.0.1:8877/" , function(res) {
        
        var headUtf8 = new Buffer(res.headers['content-disposition'],HTTPParser.encoding).toString('utf8');
        assert.equal(headUtf8,"attachment; filename=\"אברהם_דהאן_–_ברכת_הכהנים_.mp3\"");
        
        server.close();
    });
});

