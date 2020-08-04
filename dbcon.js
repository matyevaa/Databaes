var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_matyevaa',
  password        : '1452',
  database        : 'cs340_matyevaa'
});

module.exports.pool = pool;
