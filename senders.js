module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getSenders(res, mysql, context, complete){
        mysql.pool.query("SELECT ????", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.senders = results;
            complete();
        });
    }
    
  return router;
}();

