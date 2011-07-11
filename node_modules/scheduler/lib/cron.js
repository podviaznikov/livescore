var CronTime = require('./cron.time').CronTime;

function CronJob(id,cronTime,event,conf){
	if (!(this instanceof CronJob)){
	   return new CronJob(id,cronTime, event);
	}
	Object.defineProperty(this,'id',{value:id});//not writable
	Object.defineProperty(this,'conf',{value:conf});//not writable
	if(this.conf){
	    this.minInterval=this.conf.minInterval;
	}
	else{
	    this.minInterval=1000;
	}
	this.events=[event];
	this.cronTime=new CronTime(cronTime);
	this.now={};
	this.initiated=false;
    this.paused=false;
	this.timer=undefined;
};

CronJob.prototype.addEvent=function(event){
    this.events.push(event);
};

CronJob.prototype.start=function(){
    this.clock(); 
};

CronJob.prototype.stop=function(){
    clearInterval(this.timer);
    this.paused=true;
};

CronJob.prototype.runEvents=function(){
	for(var i=-1,l=this.events.length;++i<l;){
	   if(typeof this.events[i]==='function'){
	       this.events[i]();
	   }
	}
};

CronJob.prototype.clock=function(){
    var date=new Date(),
        now=this.now,
        self=this,
        cronTime=this.cronTime,
        i;
	
	if(!this.initiated){
		// Make sure we start the clock precisely ON the 0th millisecond
		setTimeout(function(){
		           self.initiated=true;
		           self.clock();
		         }, Math.ceil(+date / 1000) * 1000 - +date);
		return;
	}
    if(this.paused){
		return;
	}
	this.timer=this.timer||setInterval(function(){self.clock();}, this.minInterval);
	//TODO (podviaznikov) is this locale dependent
	now.second=date.getSeconds();
	now.minute=date.getMinutes();
	now.hour=date.getHours();
	now.dayOfMonth=date.getDate();
	now.month=date.getMonth();
	now.dayOfWeek=date.getDay()+1;
	for (i in now){
	   if (!(now[i] in cronTime[i])){
	       return;
	   }
	}
	
	this.runEvents();
};
exports.CronJob = CronJob;