var sportsDataRepo=require('./sports.data.repo'),
    fanfeedr=require('fanfeedr');
fanfeedr.init('9xcjyztzg8d9d24euvfz8fec','basic',true);
exports.getLastFootballEvents=function(callback){
    fanfeedr.lastSportEvents(sportsDataRepo.football,callback);
}
