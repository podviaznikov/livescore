/*global Backbone: true, ui: true, _:true,localStorage : true */
"use strict";
var models={},ui={},
    AppController={
    init:function(){
        this.appView=new ui.AppView();
        var lastEvents=io.connect('http://localhost/eventsLast'),
           currentEvents=io.connect('http://localhost/eventsNow'),
           nextEvents=io.connect('http://localhost/eventsNext');
        lastEvents.on('result',function(data){
           console.log(data);
           var latestEvent=new models.LatestEvent(data);
           appView.latestEvents.add(latestEvent);
        });

    }
};