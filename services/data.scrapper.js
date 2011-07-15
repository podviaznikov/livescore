var util=require('util'),
    sportsService=require('./sports.service');


//setInterval(sportsService.getLastFootballResults,10000);
//setInterval(sportsService.getUpcomingFootballResults,20000);
//setInterval(sportsService.getCurrentFootballResults,30000);
sportsService.getLatestFootballEvents();
sportsService.getUpcomingFootballEvents();
sportsService.getCurrentFootballEvents();

util.log('started score results scrapper');