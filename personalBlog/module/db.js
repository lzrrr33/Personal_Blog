// 数据库操作模块
const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'myblog',
    multipleStatements: true
}

exports.query = function (statement, callback) {
    connection = mysql.createConnection(config);
    connection.connect();
    connection.query(statement, function (error, results) {
        if (error) {
            console.log(error)
        }
        callback(results);
        connection.end();


    });
}

exports.insert = function (statement, param, callback) {
    connection = mysql.createConnection(config);
    connection.connect();
    connection.query(statement,param, function (error, results) {
        if (error) {
            console.log(error)
        }
        callback(results);
        connection.end();
    });
}