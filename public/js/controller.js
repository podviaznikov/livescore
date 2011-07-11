/*global Backbone: true, ui: true, _:true,localStorage : true */
"use strict";
var ui={},
    AppController={
    init:function(){
        this.appView=new ui.AppView();
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