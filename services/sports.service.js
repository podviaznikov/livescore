var util=require('util'),
    fanfeedrData=require('./fanfeedr.data'),
    fanfeedr=require('fanfeedr'),
    redis=require('redis'),
    store=redis.createClient(),
    pub=redis.createClient(),
    scheduler=require('scheduler').create();

fanfeedr.init('9xcjyztzg8d9d24euvfz8fec','basic',true);

scheduler.addAndRunJob('job1','00 */2 * * * *',getLastSportResults);

function getLastSportResults(){
    fanfeedr.lastSportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err){
            var events=[],
                i=0;
            for(;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        id:eventId,
                        date:event.date,
                        home:eventParticipants[0].trim(),
                        away:eventParticipants[1].trim()
                    },
                    events[i]=eventData,
                    eventDataStr=JSON.stringify(eventData);
               store.sadd('lastevents_new',eventDataStr,redis.print);
            }
            store.sinter('lastevents_new','lastevents_old',handleDifferenceNewLastEvents);
            pub.publish('lastevents','Hi');
        }
    });
};

function handleDifferenceNewLastEvents(err,results){
    util.log('difference between new and old events');
    util.log(util.inspect(results));
    var i=0;
    for(;i<2;i++){
        var event=JSON.parse(results[i]);
        util.log('Parsed='+util.isnpect(event));
        fanfeedr.getEventDetails(event.id,function(er,data){
            event.status=data.status;
            event.score=data.home_team.score+':'data.away_team.score;
            store.sadd('lastevents_full',JSON.stringify(event));
        });
    }
    store.rename('lastevents_new','lastevents_old',redis.print);
};
util.log('started score results scrapper');