var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : '[cs340_yourengrusername]',
  password        : '[password]',
  database        : '[cs340_yourengrusername]'
});

module.exports.pool = pool;
