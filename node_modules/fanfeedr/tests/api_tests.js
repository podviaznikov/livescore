var util=require('util'),
    assert=require('assert'),
    fanfeedr=require('../lib/fanfeedr.js');
util.log('Started testing');
fanfeedr.init('9xcjyztzg8d9d24euvfz8fec','basic');

//find available sports
fanfeedr.getSports(function(er,data){
    if(er){
        assert.fail(er,undefined,"List of sports was not found");
    }
    else{
        assert.equal(data.length,14,'Expected 14 sports');
    }
});

//find all football leagues
fanfeedr.getLeagues('0a3c27d2-a655-58e4-a49c-9f3c7411c710',function(er,data){
    if(er){
        assert.fail(er,undefined,"Football leagues not found");
    }
    else{
        assert.equal(data.length,13,'Expected 13 leagues');
    }
});
//find all teams in Premier League
fanfeedr.getLeagueTeams('s9xcjyztzg8d9d24euvfz8fec',function(er,data){
    if(er){
        assert.fail(er,undefined,"Premiere leagues teams not found");
    }
    else{
        assert.equal(data.length,29,'Expected 20 teams in EPL');
        assert.equal('Arsenal',data[0].name,'Arsenal should be the first team');
    }
});
//get Arsenal FC info
fanfeedr.getTeam('ba214a05-0d53-59fd-b0ec-e016f112fba8',function(er,data){
    if(er){
        assert.fail(er,undefined,"Team not found");
    }
    else{
         assert.equal('Arsenal',data.short_name,'Arsenal expected for provided id');
    }
});
//get Arsenal FC roster
fanfeedr.getTeamRoster('ba214a05-0d53-59fd-b0ec-e016f112fba8',function(er,data){
    if(er){
        assert.fail(er,undefined,"Team roster not found");
    }
    else{
         assert.equal([],data,'Arsenal has no roster now');
    }
});
//get Arsenal FC standings
fanfeedr.getTeamStandings('ba214a05-0d53-59fd-b0ec-e016f112fba8',function(er,data){
    if(er){
        assert.fail(er,undefined,"Team standings not found");
    }
    else{
         assert.equal(19,data[0].wins,'Arsenal has 19 wins');
    }
});
//last football events
fanfeedr.lastSportEvents('0a3c27d2-a655-58e4-a49c-9f3c7411c710',function(er,data){
    if(er){
        assert.fail(er,undefined,"Last football event not found");
    }
    else{
         assert.ok(data.length>0,'Events should be empty');
    }
});
//today football events
fanfeedr.todaySportEvents('0a3c27d2-a655-58e4-a49c-9f3c7411c710',function(er,data){
    if(er){
        assert.fail(er,undefined,"Today football events not found");
    }
    else{
         assert.ok(data.length>0,'Events should be empty');
    }
});
//next football events
fanfeedr.nextSportEvents('0a3c27d2-a655-58e4-a49c-9f3c7411c710',function(er,data){
    if(er){
        assert.fail(er,undefined,"Next football events not found");
    }
    else{
         assert.ok(data.length>0,'Events should be empty');
    }
});
util.log('Finished testing');
