var fanfeedrData=require('./fanfeedr.data'),
    fanfeedr=require('fanfeedr'),
    redis=require('redis'),
    store=redis.createClient(),
    pub=redis.createClient(),
    scheduler=require('scheduler').create();

fanfeedr.init('9xcjyztzg8d9d24euvfz8fec','basic',true);

scheduler.addAndRunJob('job1','00 */2 * * * *',function(){
    fanfeedr.lastSportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err){
            for(var i=0;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        id:eventId,
                        date:event.date,
                        home:eventParticipants[0].trim(),
                        away:eventParticipants[1].trim(),
                    },
                    eventDataStr=JSON.stringify(eventData);
               store.sadd('lastevents',eventDataStr,redis.print);
            }
            pub.publish('lastevents',eventDataStr);
        }
    });
});
