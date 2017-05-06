//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var fs = require("fs");
var body_parser = require('body-parser');
var http = require('http');
var path = require('path');
var express = require('express');
var router = express();
	  router.use(body_parser.urlencoded({"extended": true}));
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

router.post("/change_soups",function(req,res){
  console.log("got it");
   contents = fs.readFileSync("./sign.json");
  contents = JSON.parse(contents);
  if(req.body.pass === contents.pass){
    var new_soups = {"soups":[]};
    
    new_soups.soups.push(req.body.soup1);
    new_soups.soups.push(req.body.soup2);
    
    fs.writeFile("./soups.json",JSON.stringify(new_soups),function(){
      res.json({msg:"success"});
    });
  }
  else{
    res.json({msg:"failure"});
  }
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server has started...");
});
