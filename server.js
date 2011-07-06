var util=require('util'),
    express=require('express'),
    socketIo=require('socket.io'),
    redis=require('redis'),
    sub=redis.createClient(),
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

sub.subscribe('lastevents')
util.log('Server started!');
app.listen(80);

io.of('/eventsLast').on('connection',function(socket){
    sub.on('message',function(pattern,key){
        util.log(util.inspect(pattern));
        util.log(util.inspect(key));
        console.log('SPORT EVENTS SHOULD BE SEND');
        socket.emit('news',key);
    });
});
io.of('/eventsNow').on('connection',function(socket){
});
io.of('/eventsNext').on('connection',function(socket){
});