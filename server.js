var util=require('util'),
    express=require('express'),
    socketIo=require('socket.io'),
    streamer=require('./streamer'),
    app=express.createServer(),
    io=socketIo.listen(app),
    //define streams
    latestEventsStream=streamer.defineStream('events-latest'),
    currentEventsStream=streamer.defineStream('events-current'),
    upcomingEventsStream=streamer.defineStream('events-upcoming');


app.configure(function(){
    app.use(express.logger());
    //component for decoding requests' params
    app.use(express.bodyParser());
    //session support
    app.use(express.cookieParser());
    //app.use(express.session({secret: 'super_hard_session_secret',cookie:{ path: '/', httpOnly: true, maxAge: 14400000000000000 }}));
    //public folder for static files
    app.use(express.static(__dirname+'/public'));
});

streamer.initStreams(io,[latestEventsStream,currentEventsStream,upcomingEventsStream]);

util.log('Server started!');
app.listen(80)
