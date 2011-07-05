var util=require('util'),
    express=require('express'),
    socketIo=require('socket.io'),
    sportsService=require('./services/sports.service'),
    app=express.createServer(),
    io=socketIo.listen(app);

app.configure(function(){
    app.use(express.logger());
    //component for decoding requests' params
    app.use(express.bodyParser());
    //session support
    app.use(express.cookieParser());
    app.use(express.session({secret: 'super_hard_session_secret',cookie:{ path: '/', httpOnly: true, maxAge: 14400000000000000 }}));
    //public folder for static files
    app.use(express.static(__dirname+'/public'));
});

util.log('Server started!');
app.listen(80);

io.sockets.of('/events:last'),on('connection',function(socket){
    socket.emit('news',{ hello: 'world' });
    socket.on('my other event',function (data) {
        console.log(data);
    });
});
io.sockets.of('/events:now'),on('connection',function(socket){
    sportsService.getLastFootballEvents(function(er,data){
        socket.emit('news',data);
    }));

    socket.on('my other event',function (data) {
        console.log(data);
    });
});
io.sockets.of('/events:next'),on('connection',function(socket){
    socket.emit('news',{ hello: 'world' });
    socket.on('my other event',function (data) {
        console.log(data);
    });
});