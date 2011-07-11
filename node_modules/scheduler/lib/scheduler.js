/**
* License
*
*(The MIT License)
*
* Copyright (c) 2011 Anton Podviaznikov <podviaznikov@gmail.com>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var CronJob = require('./cron').CronJob;
function Scheduler(){
    this.jobs={};
    //default interval is one second
    this.conf={minInterval:1000};
}
Scheduler.prototype.addJob=function(id,cronMask,task){
    var job=new CronJob(id,cronMask,task);
    this.jobs[id]=job;
    return job;
};
Scheduler.prototype.addAndRunJob=function(id,cronMask,task){
    var job=this.addJob(id,cronMask,task);
    job.start();
    return job;
};
Scheduler.prototype.startAll=function(){
    this.jobs.forEach(job.start,job);
};
Scheduler.prototype.stopAll=function(){
    var ids=Object.keys(this.jobs);
    for(var i=0;i<ids.length;i++){
        var jobId=ids[i];
        this.stop(jobId);
    }
};
Scheduler.prototype.stop=function(id){
    var job=this.jobs[id];
    if(job){
        job.stop();
    }
};
Scheduler.prototype.releaseAll=function(){
    var ids=Object.keys(this.jobs);
    for(var i=0;i<ids.length;i++)
    {
        var jobId=ids[i];
        this.release(jobId);
    }
};
Scheduler.prototype.release=function(id){
    var job=this.jobs[id];
    if(job){
        job.stop();
        delete this.jobs[id];
    }
};
Scheduler.prototype.count=function(){
    return Object.keys(this.jobs).length;
};
exports.create=function(){
    return new Scheduler();
};
