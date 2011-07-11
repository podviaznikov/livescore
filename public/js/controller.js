/*global Backbone: true, ui: true, _:true,localStorage : true */
"use strict";
var ui={},
    AppController={
    init:function(){
        this.appView=new ui.AppView();
        var lastEvents=io.connect('http://localhost/eventsLast'),
            currentEvents=io.connect('http://localhost/eventsNow'),
            upcomingEvents=io.connect('http://localhost/eventsUpcoming');
        lastEvents.on('added',function(data){
            console.log(data);
            var latestEvent=new models.LatestEvent(JSON.parse(data));
            AppController.appView.latestEvents.add(latestEvent);
        });

        upcomingEvents.on('added',function(data){
            console.log(data);
            var upcomingEvent=new models.UpcomingEvent(JSON.parse(data));
            AppController.appView.upcomingEvents.add(upcomingEvent);
        });

        upcomingEvents.on('removed',function(data){
            console.log(data);
           //var upcomingEvent=new models.UpcomingEvent(JSON.parse(data));
           //AppController.appView.upcomingEvents.add(upcomingEvent);
        });


        currentEvents.on('added',function(data){
            console.log(data);
            var currentEvent=new models.CurrentEvent(JSON.parse(data));
            AppController.appView.currentEvents.add(currentEvent);
        });

        currentEvents.on('removed',function(data){
            console.log(data);
           //var upcomingEvent=new models.UpcomingEvent(JSON.parse(data));
           //AppController.appView.upcomingEvents.add(upcomingEvent);
        });

    }
};
//extending libs
_.mixin({
    toLocalDate:function(dateStr){
        function normalize(timeUnit){
            return (timeUnit<10?'0'+timeUnit:timeUnit);
        }
        var date=new Date(Date.parse(dateStr)),
           day=date.getDate(),
           month=date.getMonth()+1,
           hours=date.getHours(),
           minutes=date.getMinutes();
        return normalize(day)+'.'+normalize(month)+' '+normalize(hours)+':'+normalize(minutes);
    }
});