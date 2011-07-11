var util=require('util'),
    express=require('express'),
    socketIo=require('socket.io'),
    redis=require('redis'),
    store=redis.createClient(),
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

//last
sub.subscribe('events:last:added');
//upcoming
sub.subscribe('events:upcoming:added');
sub.subscribe('events:upcoming:removed');
//current
sub.subscribe('events:current:added');
sub.subscribe('events:current:removed');

util.log('Server started!');
app.listen(80);

io.of('/eventsLast').on('connection',function(socket){
    store.zrange('events:last:full',0,-1,function(err,events){
        events.forEach(function(event,index){
            socket.emit('added',event);
        });
    });
    sub.on('message',function(pattern,key){
        util.log(util.inspect(pattern));
        util.log(util.inspect(key));
        if('events:last:added'===pattern){
            console.log('SPORT EVENT SHOULD BE SEND');
            socket.emit('added',key);
        }
    });
});
io.of('/eventsNow').on('connection',function(socket){
    store.zrange('events:current',0,-1,function(err,events){
        events.forEach(function(event,index){
            socket.emit('added',event);
        });
    });

    sub.on('message',function(pattern,key){
        util.log(util.inspect(pattern));
        util.log(util.inspect(key));
        if('events:current:added'===pattern){
            console.log('SPORT EVENT SHOULD BE SEND');
            socket.emit('added',key);
        }
        if('events:current:removed'===pattern){
            console.log('SPORT EVENT SHOULD BE SEND');
            socket.emit('removed',key);
        }
    });

});
io.of('/eventsUpcoming').on('connection',function(socket){
    store.zrange('events:upcoming',0,-1,function(err,events){
        events.forEach(function(event,index){
            socket.emit('added',event);
        });
    });

    sub.on('message',function(pattern,key){
        util.log(util.inspect(pattern));
        util.log(util.inspect(key));
        if('events:upcoming:added'===pattern){
            console.log('SPORT EVENT SHOULD BE SEND');
            socket.emit('added',key);
        }
        if('events:upcoming:removed'===pattern){
            console.log('SPORT EVENT SHOULD BE SEND');
            socket.emit('removed',key);
        }
    });

});