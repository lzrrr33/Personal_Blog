# 个人博客搭建

## 简介

自己在学习nodejs时做的一个个人网站，会持续迭代所有功能，项目github：https://github.com/lzrrr33/Personal_Blog

采用框架：nodejs+express+element-ui+mysql

3.27更新：第二个版本已经部署到了我的阿里云：http://47.113.217.74:3000/，目前只有阅读功能。

## 快速开发（第一周）

此版本为初学版本，目的是快速开发简单的上传和阅读博客功能

### 1. 包含页面：

> 1. index.ejs 个人主页
> 2. blogPage.ejs 博客阅读页面
> 3. columnPage  专栏页面
> 4. upload 后台上传博客页面



###  2.请求处理：

app.js

> ```js
> var express      = require("express");  //引入express框架处理请求
> var app          = express();
> var router       = require("./router/router.js"); // 导入路由
> var bodyParser = require('body-parser')  //导入body-parser用于处理表单数据
> var multer = require('multer')  // 导入multer模块用于文件上传
> 
> var storage = multer.diskStorage({  
>     destination: function (req, file, cb) {
>         cb(null, './uploads');  // 设置上传路径
>     },
>     filename: function (req, file, cb) {
>         cb(null, file.originalname);  // 设置上传文件名
>     }
> })
> 
> var upload = multer({ storage: storage })  
> 
> app.use(bodyParser.urlencoded({ extended: false }));
> 
> // parse application/json
> app.use(bodyParser.json()) // 将表单数据转为json格式
> 
> app.use(express.static("static"));  //  设置静态请求文件目录
> // 使用ejs模板引擎
> app.set("view engine","ejs");  // 设置模板引擎为ejs
> // 进入首页
> app.get("/",router.index);   // 首页路由
> // // 进入专栏
> app.get("/Column", router.column);  // 专栏页路由
> // // 进入博客
> app.get("/Blog", router.blog);  // 博客路由
> // 进入后台
> app.get("/upload", router.uploadPage);  //  后台上传页面路由
> // 提交博客
> app.post("/doupload",router.uploadBlog);  // 提交表单路由
> // 上传文件
> app.post("/uploadmd",upload.single('file'),router.uploadmd);  // 上传文件路由
> 
> 
> console.log("Server running");
> app.listen(3000);  //监听3000端口
> ```

### 3.路由设计

router.js

>```js
>var db = require("../module/db.js"); // 引入数据库处理模块
>var ejs = require('ejs');  //引入ejs模板引擎
>var markdown = require('markdown-js');  //引入markdown-js模块用于将markdown转换为html进行渲染
>var fs = require('fs');  // 文件读取模块
>// 主页路由
>exports.index = function (req, res){
>    // 读取所有的博客和专栏作为链接
>    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;", (result)=>{ 
>        let BlogMessage = result[0];
>        let ColumnMessage = result[1];
>        ejs.renderFile('./views/index.ejs', {blogmessage: BlogMessage,columnmessage:ColumnMessage}, (err, data) => {
>            if (err) {
>                console.log(err)
>            }
>            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
>            res.end(data);
>        })
>    });
>};
>
>// 博客路由
>exports.blog = function (req, res){
>    // console.log(req.query)
>    // 读取请求的博客
>    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;SELECT BlogPath FROM blog WHERE id="+req.query.id, (result)=>{
>        let BlogMessage = result[0];
>        let ColumnMessage = result[1];
>        let path = './uploads/'+result[2][0].BlogPath;
>        console.log(path);
>        // 读取markdown文件
>        fs.readFile(path, 'utf8', function(err, str){
>            if (err) return fn(err);
>            // 转换为html格式
>            var html = markdown.makeHtml(str);
>            // 传入博客页面进行渲染
>            ejs.renderFile('./views/blogPage.ejs', {md: html,blogmessage: BlogMessage,columnmessage:ColumnMessage}, (err, data) => {
>                if (err) {
>                    console.log(err)
>                }
>                res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
>                res.end(data);
>            });
>        });
>    });
>
>};
>// 专栏路由
>exports.column = function (req, res){
>    console.log(req.query)
>    // 读取该专栏所有的博客
>    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; " +
>        "SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;" +
>        "SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn WHERE id="+req.query.id+";"+
>        "SELECT id, title, CreateTime, Tags, ImgPath FROM blog WHERE ColumnId="+req.query.id, (result)=>{
>        let BlogMessage = result[0];
>        let ColumnMessage = result[1];
>        let Column = result[2][0];
>        let blogs = result[3];
>        console.log(Column);
>        // 渲染
>        ejs.renderFile('./views/columnPage.ejs', {blogmessage: BlogMessage,columnmessage:ColumnMessage,column:Column,blogs:blogs}, (err, data) => {
>            if (err) {
>                console.log(err)
>            }
>            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
>            res.end(data);
>        });
>
>    });
>
>};
>// 后台上传页面路由
>exports.uploadPage = (req, res)=>{
>    db.query("SELECT id, ColumnName FROM specialcolumn;", (result)=> {
>        let column = result;
>        // console.log(column)
>        ejs.renderFile('./views/upload.ejs', {column:column}, (err, data) => {
>            if (err) {
>                console.log(err);
>            }
>            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
>            res.end(data);
>        });
>    });
>};
>// 提交博客路由
>exports.uploadBlog = (req, res)=>{
>    // 表单数据
>    var form = req.body;
>    // 获取当前时间
>    var dt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
>    // 插入博客数据
>    db.insert('INSERT INTO blog(title, Tags, Description, ColumnId, CreateTime, BlogPath)VALUES (?,?,?,?,?,?);UPDATE specialcolumn SET BlogNum=BlogNum+1 WHERE id='+form.columnId,[form.title, form.tag, form.desc, form.columnId,dt, form.mdfile], (err, result)=> {
>        if(err){
>            console.log(err);
>        }
>        console.log("result: "+result);
>        res.end("提交成功！")
>    });
>};
>// markdown文件上传路由
>exports.uploadmd = (req, res)=>{
>    res.end("上传成功！")
>};
>```

### 4. 数据操作设计

db.js

> ```js
> // 数据库操作模块
> const mysql = require('mysql');
> // 连接信息
> const config = {
>     host: 'localhost',
>     user: 'root',
>     password: '123',
>     database: 'myblog',
>     multipleStatements: true
> }
> // 查询语句
> exports.query = function (statement, callback) {
>     connection = mysql.createConnection(config);
>     connection.connect();
>     connection.query(statement, function (error, results) {
>         if (error) {
>             console.log(error)
>         }
>         // 回调返回结果
>         callback(results);
>         connection.end();
> 
> 
>     });
> }
> // 插入语句，带参数
> exports.insert = function (statement, param, callback) {
>     connection = mysql.createConnection(config);
>     connection.connect();
>     connection.query(statement,param, function (error, results) {
>         if (error) {
>             console.log(error)
>         }
>         callback(results);
>         connection.end();
>     });
> }
> ```

## 第二次迭代

### 1.预期

1. 简化请求，将大量的请求改为ajax请求，减少页面加载时时间

2. 首页界面优化， 增加侧边栏信息设计
3. 增加功能， 增加访问量统计功能、匿名点赞评论功能

待更新。。。# Personal_Blog
