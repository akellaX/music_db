var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use('/index.html', express.static(__dirname + '/index.html'));
app.use('/logIn.js', express.static(__dirname + '/logIn.js'));
app.use('/mainPage.html', express.static(__dirname + '/index.html'));


app.get('/', function(req, res){
    res.sendFile('index.html', { root: __dirname } );
});

app.get('/main', function(req, res){
    res.sendFile('mainPage.html', { root: __dirname } );
});

var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(bodyParser.json());
var mysql = require('mysql');

app.listen('3000',function(){
    console.log("Server started on port 3000");
});

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '537726',
    database: 'music_app'
});

db.connect(function(err){
    if(err)
        throw err;
    else console.log('Connected');
});

app.post('/main/giveRandomSong', function(req, res){
    var sql = 'select song.title, artist.name , album.year from song, artist,album where song.album_id=album.ID AND song.artist_id=artist.ID AND song.ID=3';
    var q= db.query(sql, function(err, rows){
        if(err)
            throw err
        else {console.log(rows[0]);
             res.send(rows[0]);
             }

    });
});

app.post('/checkLogIn',urlencodedParser, function(req ,res){
    console.log(req.body.login+" "+ req.body.password);
    var sql='SELECT password from user where login="player"';
    var q = db.query(sql, function(err, rows){
        if (err)
            throw err
        else {
            if(rows[0].password==req.body.password)
                {
                console.log("password is right");
                res.send({redirect: '/main'});


                            }

            else console.log("password is wrong");
        }
    })

});
