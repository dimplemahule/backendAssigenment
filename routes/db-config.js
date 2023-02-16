var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    database:'emplyee',
    user:'root',
    password:'1234'
});

module.exports = connection