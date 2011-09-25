var Hook = require('hook.io').Hook,
    sportsService = require('../services/sports.service');

var hook = new Hook({
  name: 'upcoming-events-hook',
  debug: true
});

hook.on('hook::ready', function(){
  console.log(hook.name,' is ready');
  sportsService.getUpcomingFootballEvents();
  hook.emit('test::xx1');
  hook.emit('test::xx2');
});

hook.start();