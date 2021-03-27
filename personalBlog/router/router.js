// var formidable = require('formidable');
var db = require("../module/db.js");
// var md5 = require("../model/md5.js");
// var fs = require("fs");
// var moment = require('moment');
var mysql = require('mysql');
var ejs = require('ejs');
var markdown = require('markdown-js');
var fs = require('fs');
// 页面
exports.index = function (req, res){
    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;", (result)=>{
        let BlogMessage = result[0];
        let ColumnMessage = result[1];
        ejs.renderFile('./views/index.ejs', {blogmessage: BlogMessage,columnmessage:ColumnMessage}, (err, data) => {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        })
    });


};

exports.blog = function (req, res){
    // console.log(req.query)
    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;SELECT BlogPath FROM blog WHERE id="+req.query.id, (result)=>{
        let BlogMessage = result[0];
        let ColumnMessage = result[1];
        let path = './uploads/'+result[2][0].BlogPath;
        console.log(path);
        fs.readFile(path, 'utf8', function(err, str){
            if (err) return fn(err);
            // console.log(str);
            var html = markdown.makeHtml(str);
            // console.log(html);
            ejs.renderFile('./views/blogPage.ejs', {md: html,blogmessage: BlogMessage,columnmessage:ColumnMessage}, (err, data) => {
                if (err) {
                    console.log(err)
                }
                res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
                res.end(data);
            });
        });
    });

};

exports.column = function (req, res){
    console.log(req.query)
    db.query("SELECT id, title, CreateTime, Tags, ImgPath FROM blog; " +
        "SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn;" +
        "SELECT id, ColumnName, CreateTime, BlogNum FROM specialcolumn WHERE id="+req.query.id+";"+
        "SELECT id, title, CreateTime, Tags, ImgPath FROM blog WHERE ColumnId="+req.query.id, (result)=>{
        let BlogMessage = result[0];
        let ColumnMessage = result[1];
        let Column = result[2][0];
        let blogs = result[3];
        console.log(Column);
        ejs.renderFile('./views/columnPage.ejs', {blogmessage: BlogMessage,columnmessage:ColumnMessage,column:Column,blogs:blogs}, (err, data) => {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        });

    });

};

exports.uploadPage = (req, res)=>{
    db.query("SELECT id, ColumnName FROM specialcolumn;", (result)=> {
        let column = result;
        // console.log(column)
        ejs.renderFile('./views/upload.ejs', {column:column}, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {'Contend-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        });
    });
};

exports.uploadBlog = (req, res)=>{
    var form = req.body;
    var dt = require('moment')().format('YYYY-MM-DD HH:mm:ss');

    console.log(req.files)
    db.insert('INSERT INTO blog(title, Tags, Description, ColumnId, CreateTime, BlogPath)VALUES (?,?,?,?,?,?);UPDATE specialcolumn SET BlogNum=BlogNum+1 WHERE id='+form.columnId,[form.title, form.tag, form.desc, form.columnId,dt, form.mdfile], (err, result)=> {
        if(err){
            console.log(err);
        }
        console.log("result: "+result);
        res.end("提交成功！")
    });
};

exports.uploadmd = (req, res)=>{
    res.end("上传成功！")
};