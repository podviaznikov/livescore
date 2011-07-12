var util=require('util'),
    fanfeedrData=require('./fanfeedr.data'),
    fanfeedr=require('fanfeedr'),
    redis=require('redis'),
    _=require('underscore'),
    store=redis.createClient(),
    pub=redis.createClient();

fanfeedr.init('favb9uncnwxcdw52ptsqvn82',fanfeedr.tiers.bronze,true);

exports.getLastFootballEvents=function(){
    fanfeedr.lastSportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err && data){
            var i=0;
            for(;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        id:eventId,
                        date:event.date
                    },
                    eventDataStr=JSON.stringify(eventData);
               store.sadd('events:last:new',eventDataStr,redis.print);
            }
            store.sinter('events:last:new','events:last:old',handleDifferenceNewLastEvents);
        }
    });
};

exports.getUpcomingFootballEvents=function(){
    fanfeedr.nextSportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err && data){
            var i=0,
                eventsArray=[];
            for(;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        id:eventId,
                        date:event.date,
                        home:eventParticipants[1].trim(),//indexes make for europeans. home-away
                        away:eventParticipants[0].trim()//indexes make for europeans. home-away
                    },
                    eventDataStr=JSON.stringify(eventData);
                    eventsArray[i]=eventDataStr;
                    store.zadd('events:upcoming',Date.parse(eventData.date),eventDataStr,function(er,reply){
                        util.log('Adding upcoming event with reply '+reply);
                        if(!er && reply===1){
                            pub.publish('events:upcoming:added',eventDataStr);
                        }
                    });
            }
            store.zrange('events:upcoming',0,-1,function(er,results){
                if(!er && results){
                    results.forEach(function(result,index){
                        if(_.indexOf(eventsArray,result)===-1){
                            store.zrem('events:upcoming',result,redis.print);
                            pub.publish('events:upcoming:removed',JSON.parse(result).id);
                        }
                    });
                }
            });

        }
    });
};


exports.getCurrentFootballEvents=function(){
    fanfeedr.todaySportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err && data){
            var i=0,
                eventsArray=[];
            for(;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        id:eventId,
                        date:event.date,
                        home:eventParticipants[1].trim(),//indexes make for europeans. home-away
                        away:eventParticipants[0].trim()//indexes make for europeans. home-away
                    },
                    eventDataStr=JSON.stringify(eventData);
                    eventsArray[i]=eventDataStr;
                    store.zadd('events:current',Date.parse(eventData.date),eventDataStr,function(er,reply){
                        util.log('Adding upcoming event with reply '+reply);
                        if(!er && reply===1){
                            pub.publish('events:current:added',eventDataStr);
                        }
                    });
            }
            store.zrange('events:current',0,-1,function(er,results){
                if(!er && results){
                    results.forEach(function(result,index){
                        if(_.indexOf(eventsArray,result)===-1){
                            store.zrem('events:current',result,redis.print);
                            pub.publish('events:current:removed',JSON.parse(result).id);
                        }
                    });
                }
            });
        }
    });
};


function handleDifferenceNewLastEvents(err,results){
    util.log('difference between new and old events:'+util.inspect(results));
    results.forEach(function(result,index){
        var event=JSON.parse(result);
        fanfeedr.getEvent(event.id,function(er,data){
            if(!er && data){
                event.status=data.status;
                event.home=data.home_team.name;
                event.away=data.away_team.name;
                event.score=data.home_team.score+':'+data.away_team.score;
                var eventSerialized=JSON.stringify(event);
                store.zadd('events:last:full',Date.parse(event.date),eventSerialized);
                pub.publish('events:last:added',eventSerialized);
            }
        });
    });
    store.rename('events:last:new','events:last:old',redis.print);
};
util.log('started score results scrapper');