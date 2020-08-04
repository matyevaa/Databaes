var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shelbyn',
  password       : 'Sp!tfire1',
  database       : 'cs340_shelbyn'
});

module.exports.pool = pool;

