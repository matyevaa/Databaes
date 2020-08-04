/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 31312);
app.set('mysql', mysql);

app.use('/', express.static('public'));
app.use('/senders', require('./senders.js'));
app.use('/recipients', require('./recipients.js'));
app.use('/giftCards', require('./giftCards.js'));
app.use('/orderHistory', require('./orderHistory.js'));
app.use('/orders', require('./orders.js'));

app.use('/senders.html', require('./senders.js'));
app.use('/recipients.html', require('./recipients.js'));
app.use('/giftCards.html', require('./giftCards.js'));
app.use('/orderHistory.html', require('./orderHistory.js'));
app.use('/orders.html', require('./orders.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
