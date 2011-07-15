var util=require('util'),
    redis=require('redis'),
    store=redis.createClient(),
    sub=redis.createClient();

var Stream=Object.create({},{
    entriesStoreName:{
        get:function(){
            return this.name+':all';
        }
    },
    addingEntriesChannelName:{
        get:function(){
            return this.name+':added';
        }
    },
    updatingEntriesChannelName:{
        get:function(){
            return this.name+':updated';
        }
    },
    removingEntriesChannelName:{
        get:function(){
            return this.name+':removed';
        }
    },
    path:{
        get:function(){
            return '/'+this.name;
        }
    }
});
exports.defineStream=function(name){
    var stream=Object.create(Stream);
    stream.name=name;
    return stream;
};
exports.initStreams=function(io,streams){
    var i=0;
    for(;i<streams.length;i++){
        var stream=streams[i];

        sub.subscribe(stream.addingEntriesChannelName);
        sub.subscribe(stream.updatingEntriesChannelName);
        sub.subscribe(stream.removingEntriesChannelName);

        util.log('defining to '+stream.path);

        (function(stream){
            io.of(stream.path).on('connection',function(socket){
                util.log('connected to '+stream.path);

                store.zrange(stream.entriesStoreName,0,-1,function(err,events){
                    if(!err){
                        var models=[],
                            i=0;
                        for(;i<events.length;i++){
                            var event=events[i];
                            models[i]=JSON.parse(event);
                        }
                        util.log('getting '+models.length+' entries from: '+stream.entriesStoreName);
                        socket.emit('reset',models);
                    }
                });
                sub.on('message',function(pattern,key){
                    util.log(util.inspect(pattern));
                    util.log(util.inspect(key));
                    if(stream.addingEntriesChannelName===pattern){
                        socket.emit('added',JSON.parse(key));
                    }
                    if(stream.updatingEntriesChannelName===pattern){
                        socket.emit('updated',JSON.parse(key));
                    }
                    if(stream.removingEntriesChannelName===pattern){
                        socket.emit('removed',JSON.parse(key));
                    }
                });
            });
        })(stream);
    }
};

