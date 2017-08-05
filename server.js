var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//http://localhost:3006/generate?session=vokmte85t63fdig11d2n2tmfd4
app.post('/generate', function(req, res) {
    request.post({
            url: 'http://coloadvert.info/?survey=job',
            headers: {
                'Cookie': 'PHPSESSID=' + req.body.session + ';'
            },
            form: { "q14": '1' }
        },
        function(err, httpResponse, body) {
        	var $ = cheerio.load(body);
        	//res.send(body);
            var num_verify = parseInt($('span[class="fontawesome-angle-right px14"]').html());
            if(num_verify >= 0){
                res.send( { state: "OK", money: num_verify } );
            } else {
                res.send( { state: "ERROR" } );
            }
        });
});

//http://localhost:3006/login?user=yeisom&password=123
app.post('/login', function(req, res) {
    request.post({
            url: 'http://coloadvert.info/?survey=red',
            form: { regtype: 'external', login: req.body.user, password: req.body.password }
        },
        function(err, httpResponse, body) {
            var parsecookie = httpResponse.headers["set-cookie"][0];
            var cookie = parsecookie.substring(10, parsecookie.indexOf(";"));
            if(body.indexOf(req.body.user) != -1){
            	res.send({ state: 'OK', cookie: cookie });
            } else {
            	res.send({ state: 'ERROR' });
            }
        });
});

app.listen(3006, function() {
    console.log('Example app listening on port 3006!')
})