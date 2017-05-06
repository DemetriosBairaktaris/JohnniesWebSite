//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var fs = require("fs");
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var router = express();
var server = http.createServer(router);
router.use(express.static(path.resolve(__dirname, 'client')));



///***********GET Handlers**************//////

router.get("/",function(req,res){
  res.send("index.html");
});

////////POST handlers////////////////////////
router.post("/reg_menu",function(req,res){
  var contents = fs.readFileSync("./menu.json","utf-8");
  contents = JSON.parse(contents);
  res.json(contents);
});

router.post("/soups",function(req,res){
  var contents = fs.readFileSync("./soups.json","utf-8");
  contents = JSON.parse(contents);
  res.json(contents);
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server has started...");
});
