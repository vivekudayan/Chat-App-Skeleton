var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var backData= [];
app.get('/', function(req, res){
  res.sendFile(__dirname+'/views/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	
  console.log('user connected'+socket.id);  
  
  socket.emit('init', backData);
  
  socket.on('message', function(msg){
	backData.push(msg);
    console.log('message: ' + msg);
	io.emit('message', msg);
  });
  
  socket.on('draw',function(msg){
	  socket.broadcast.emit('draw', msg); 
  });
  
});
