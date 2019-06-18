const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("outside io");

io.on('connection', function(socket){

  console.log('User Conncetion');

  socket.on('connect user', function(user){
    console.log("Connected user ");
    io.emit('connect user', user);
  });

  socket.on('on typing', function(typing){
    console.log("Typing.... ");
    io.emit('on typing', typing);
  });

  socket.on('chat message', function(msg){
    console.log("Message " + msg['message']);
    io.emit('chat message', msg);
  });
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*var app = require('express')();
var http = require('http').createServer(app);
var io=require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.emit('some event', { for: 'everyone' });

io.on('connection',function(socket){
  console.log('a user connected');
  socket.on('disconnected',function(){
    console.log('user disconnected');
      });
    socket.on('chat message',function(msg){
      console.log('message :'+msg);
      io.emit('chat message',msg);
    });
    socket.broadcast.emit('hi');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});*/