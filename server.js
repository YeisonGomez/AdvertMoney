var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio')


//http://localhost:3006/generate?session=vokmte85t63fdig11d2n2tmfd4
app.get('/generate', function(req, res) {
    request.post({
            url: 'http://coloadvert.info/?survey=job',
            headers: {
                'Cookie': 'PHPSESSID=' + req.query.session + ';'
            },
            form: { "q14": '1' }
        },
        function(err, httpResponse, body) {
        	var $ = cheerio.load(body);
        	//res.send(body);
            res.send($('span[class="fontawesome-angle-right px14"]').html());
        });
});

//http://localhost:3006/login?user=yeisom&password=persian13
app.get('/login', function(req, res) {
    request.post({
            url: 'http://coloadvert.info/?survey=red',
            form: { regtype: 'external', login: req.query.user, password: req.query.password }
        },
        function(err, httpResponse, body) {
            var parsecookie = httpResponse.headers["set-cookie"][0];
            var cookie = parsecookie.substring(10, parsecookie.indexOf(";"));
            if(body.indexOf(req.query.user) != -1){
            	res.send({ state: 'OK', cookie: cookie });
            } else {
            	res.send({ state: 'ERROR' });
            }
        });
});

app.listen(3006, function() {
    console.log('Example app listening on port 3006!')
})