var fanfeedrData=require('./fanfeedr.data'),
    fanfeedr=require('fanfeedr'),
    redis=require('redis'),
    client=redis.createClient(),
    scheduler=require('scheduler').create();

fanfeedr.init('9xcjyztzg8d9d24euvfz8fec','basic',true);
exports.getLastFootballEvents=function(callback){
    fanfeedr.lastSportEvents(fanfeedrData.sports.football,callback);
};

scheduler.addJobAndRun('job1','* */1 * * * *',function(){
    fanfeedr.lastSportEvents(fanfeedrData.sports.football,function(err,data){
        if(!err){
            for(var i=0;i<data.length;i++){
                var event=data[i],
                    eventId=event.id,
                    eventName=event.name,
                    eventParticipants=event.name.split('@'),
                    eventData={
                        date:event.date,
                        home:eventParticipants[0].trim(),
                        away:eventParticipants[1].trim(),
                    };

                client.sadd('lastevents',JSON.stringify(eventData),redis.print);
            }
        }
    });
});
