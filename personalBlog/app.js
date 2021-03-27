var express      = require("express");
var app          = express();
var router       = require("./router/router.js");
var path         = require('path');
// var bodyParser   = require('body-parser');
var ejs          = require('ejs');
var markdown = require('markdown-js');
var fs = require('fs');
var bodyParser = require('body-parser')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.use(express.static("static"));
// 使用ejs模板引擎
app.set("view engine","ejs");
// 进入首页
app.get("/",router.index);
// // 进入专栏
app.get("/Column", router.column);
// // 进入博客
app.get("/Blog", router.blog);
// // 进入小游戏1
// app.get("/Game1", router.JustJump);
// // 进入小游戏2
// app.get("/Game2", router.JointPoker);
// 进入后台
app.get("/upload", router.uploadPage);
// 提交博客
app.post("/doupload",router.uploadBlog);
// 上传博客
app.post("/uploadmd",upload.single('file'),router.uploadmd);


console.log("Server running");
app.listen(3000);