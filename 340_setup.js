var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_username',
  password       : 'your password',
  database       : 'cs340_username'
});

module.exports.pool = pool;

