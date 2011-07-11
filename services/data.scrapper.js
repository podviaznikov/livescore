var util=require('util'),
    sportsService=require('./sports.service');


//setInterval(sportsService.getLastFootballResults,60000);
//setInterval(sportsService.getUpcomingFootballResults,70000);
//setInterval(sportsService.getCurrentFootballResults,20000);
sportsService.getCurrentFootballEvents();

sportsService.getUpcomingFootballEvents();
//sportsService.getUpcomingFootballEvents();
//scheduler.addAndRunJob('last_football_results_job','00 */1 * * * *',);
//scheduler.addAndRunJob('upcoming_football_results_job','00 */1 * * * *',sportsService.getUpcomingFootballResults);

util.log('started score results scrapper');