var util=require('util'),
    rest=require('restler'),
    BASE_URL='http://ffapi.fanfeedr.com/',
    fanfeedr=exports;
//init fanfeedr client with key and specified tier(basic by default)
fanfeedr.init=function(key,tier,debug){
    this.key=key;
    this.tier=tier||fanfeedr.tiers.basic;
    this.debug=debug||false;
};
var Resource={
    newChildResource:function(id){
        return this.name+'/'+id;    
    },
    path:function(){
        return '/'+this.name;
    }
};
var ResourceBuilder={
    newType:function(name){
        return Object.create(Resource,{
            name:{
                value:name
            }
        });
    }
};
fanfeedr.resources={
    sport:ResourceBuilder.newType('leagues'),
    league:ResourceBuilder.newType('conferences'),
    division:ResourceBuilder.newType('divisions'),
    team:ResourceBuilder.newType('teams'),
    event:ResourceBuilder.newType('events'),
    person:ResourceBuilder.newType('persons'),
    image:ResourceBuilder.newType('images')
};

//tier for the API. Ref: http://developer.fanfeedr.com/page/API_Plans_and_Pricing
fanfeedr.tiers={
    basic:'basic',
    bronze:'bronze',
    silver:'silver',
    gold:'gold',
    enterprise:'enterprise'
};
//LOW_LEVEL API
//SPORTS
//get all sports. http://developer.fanfeedr.com/docs/read/Leagues_Resources
fanfeedr.getSports=function(callback){
    jsonRequest(this.resources.sport.name,callback);
};
//get sport description. http://developer.fanfeedr.com/docs/read/GET_leagues_id
fanfeedr.getSport=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId),callback);
};
//LEAGUES (Seria A,English Premier League etc). This resource represents conferences in term of NBA, NHL
//get leagues. http://developer.fanfeedr.com/docs/read/Conferences_Resources
fanfeedr.getLeagues=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.league.path(),callback);
};
//get league. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_conferences_id
fanfeedr.getLeague=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId),callback);
};
//DIVISIONS. Works for NBA, NHL (American sports)
//get divisions. http://developer.fanfeedr.com/docs/read/Divisions_Resources
fanfeedr.getDivisions=function(conferenceId,callback){
    jsonRequest(this.resources.league.newChildResource(conferenceId)+this.resources.division.path(),callback);
};
//get division.http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_divisions_id
fanfeedr.getDivision=function(divisionId,callback){
    jsonRequest(this.resources.division.newChildResource(divisionId),callback);
};
//TEAMS
//get all teams for sport. http://developer.fanfeedr.com/docs/read/Teams_Resources
fanfeedr.getTeams=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.team.path(),callback);
};
//get all teams from league/conference
fanfeedr.getLeagueTeams=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId)+this.resources.team.path(),callback);
};
//get all teams from division
fanfeedr.getDivisionTeams=function(divisionId,callback){
    jsonRequest(this.resources.division.newChildResource(divisionId)+this.resources.team.path(),callback);
};
//get team information. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id
fanfeedr.getTeam=function(teamId,callback){
    jsonRequest(this.resources.team.newChildResource(teamId),callback);
};
//get team roster. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id_roster
fanfeedr.getTeamRoster=function(teamId,callback){
    jsonRequest(this.resources.team.newChildResource(teamId)+'/roster',callback);
};
//get team standings. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id_standings
fanfeedr.getTeamStandings=function(teamId,callback){
    jsonRequest(this.resources.team.newChildResource(teamId)+'/standings',callback);
};
//EVENTS
//last events for sport
fanfeedr.lastSportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.event.path()+'/last',callback);
};
//today events for sport
fanfeedr.todaySportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.event.path()+'/today',callback);
};
//next events for sport
fanfeedr.nextSportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.event.path()+'/next',callback);
};
//last events for league
fanfeedr.lastLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId)+this.resources.event.path()+'/last',callback);
};
//today events for league
fanfeedr.todayLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId)+this.resources.event.path()+'/today',callback);
};
//next events for league
fanfeedr.nextLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId)+this.resources.event.path()+'/next',callback);
};
//full event info. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id
fanfeedr.getEventDetails=function(eventId,callback){
    jsonRequest(this.resources.event.newChildResource(eventId),callback);
};
//full event boxscore. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id_boxscore
fanfeedr.getEventBoxscore=function(eventId,callback){
    jsonRequest(this.resources.event.newChildResource(eventId)+'/boxscore',callback);
};
//full event recap. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id_recap
fanfeedr.getEventRecap=function(eventId,callback){
    jsonRequest(this.resources.event.newChildResource(eventId)+'/recap',callback);
};
//PERSONS
//get all persons for sport. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getSportPersons=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getLeaguePersons=function(leagueId,callback){
    jsonRequest(this.resources.league.newChildResource(leagueId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getDivisionsPersons=function(divisionId,callback){
    jsonRequest(this.resources.division.newChildResource(divisionId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getTeamPersons=function(teamId,callback){
    jsonRequest(this.resources.team.newChildResource(teamId)+this.resources.person.path(),callback);
};
//get person details. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_persons_id
fanfeedr.getPerson=function(personId,callback){
    jsonRequest(this.resources.person.newChildResource(personId),callback);
};
//IMAGES
//get all sport images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getSportImages=function(sportId,callback){
    jsonRequest(this.resources.sport.newChildResource(sportId)+this.resources.image.path(),callback);
};
//get all team images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getTeamImages=function(teamId,callback){
    jsonRequest(this.resources.team.newChildResource(teamId)+this.resources.image.path(),callback);
};
//get all person images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getPersonImages=function(personId,callback){
    jsonRequest(this.resources.person.newChildResource(personId)+this.resources.image.path(),callback);
};
fanfeedr.getImage=function(imageId,callback){
    jsonRequest(this.resources.image.newChildResource(imageId),callback);
};
var jsonRequest=function(resource,callback){
    var url=BASE_URL+fanfeedr.tier+'/api/'+ resource+'?api_key='+fanfeedr.key;
    rest.get(url)
        .on('complete',function(data){
            if(fanfeedr.debug){
                util.log('Successful request to '+url);
                util.log('Data received:'+util.inspect(data));
            }
            callback(undefined,data);
        })
        .on('error',function(err){
            if(fanfeedr.debug){
                util.log('Failed request to '+url);
                util.log('Error:'+util.inspect(err));
            }
            callback(err);
        });
};
