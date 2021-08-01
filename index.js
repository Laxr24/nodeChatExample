var app = require('express')();
var express = require('express')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path')



app.use(express.static(path.join(__dirname, '/public')))


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req,res)=>{
    res.redirect('/')
})

io.on('connection', (socket)=>{
    console.log('A user is connected');
    io.emit('new user')
    
    socket.on('disconnect', ()=>{
        console.log('User disconnected');
        io.emit('user left')      
    });

    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
    })
});

http.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is connected on http://localhost:3000')
});