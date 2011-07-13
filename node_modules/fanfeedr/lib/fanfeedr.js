var util=require('util'),
    rest=require('restler'),
    querystring=require('querystring'),
    fanfeedr=exports;
//init fanfeedr client with key and specified tier(basic by default)
fanfeedr.init=function(key,tier,debug){
    this.key=key;
    this.tier=tier||fanfeedr.tiers.basic;
    this.debug=debug||false;
};
//resource type
var Resource={
    //create new child resource path with specified child id
    child:function(id){
        return this.name+'/'+id;    
    },
    //path. E.x. /teams
    path:function(){
        return '/'+this.name;
    }
};
// builder for the Resource objects.
var ResourceBuilder={
    //creates new resource for the name
    newType:function(name){
        return Object.create(Resource,{
            name:{
                value:name
            }
        });
    }
};
//available resources in the API
fanfeedr.resources={
    sport:ResourceBuilder.newType('leagues'),
    league:ResourceBuilder.newType('conferences'),
    division:ResourceBuilder.newType('divisions'),
    team:ResourceBuilder.newType('teams'),
    event:ResourceBuilder.newType('events'),
    person:ResourceBuilder.newType('persons'),
    image:ResourceBuilder.newType('images'),
    source:ResourceBuilder.newType('sources'),
    trending:ResourceBuilder.newType('trending'),
    content:ResourceBuilder.newType('content'),
    geo:ResourceBuilder.newType('geo')
};

//tiers for the API. Ref: http://developer.fanfeedr.com/page/API_Plans_and_Pricing
fanfeedr.tiers={
    basic:'basic',
    bronze:'bronze',
    silver:'silver',
    gold:'gold',
    enterprise:'enterprise'
};

fanfeedr.contentFilters={
    //News returns non-blog mainstream news content.
    news:'News',
    blog:'Blog',
    columnists:'Columnists',
    video:'Video',
    //Fantasy returns fantasy sports content.
    fantasy:'Fantasy',
    //Recruiting returns player transaction content.
    recruiting:'Recruiting'
};

fanfeedr.seasonTypes={
    preseason:'Preseason',
    season:'Season',
    postseason:'Postseason'
};
// Sports
// -------------

//get all sports. http://developer.fanfeedr.com/docs/read/Leagues_Resources
fanfeedr.getSports=function(callback){
    jsonRequest(this.resources.sport.name,callback);
};
//get sport description. http://developer.fanfeedr.com/docs/read/GET_leagues_id
fanfeedr.getSport=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId),callback);
};
// Leagues
// -------------

// (Seria A,English Premier League etc). This resource represents conferences in term of NBA, NHL

//get leagues. http://developer.fanfeedr.com/docs/read/Conferences_Resources
fanfeedr.getLeagues=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.league.path(),callback);
};
//get league. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_conferences_id
fanfeedr.getLeague=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId),callback);
};
// Divisions
// -------------

// Works for NBA, NHL (American sports)

//get divisions. http://developer.fanfeedr.com/docs/read/Divisions_Resources
fanfeedr.getDivisions=function(conferenceId,callback){
    jsonRequest(this.resources.league.child(conferenceId)+this.resources.division.path(),callback);
};
//get division.http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_divisions_id
fanfeedr.getDivision=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId),callback);
};
// Teams
// -------------

//get all teams for sport. http://developer.fanfeedr.com/docs/read/Teams_Resources
fanfeedr.getTeams=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.team.path(),callback);
};
//get all teams from league/conference
fanfeedr.getLeagueTeams=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.team.path(),callback);
};
//get all teams from division
fanfeedr.getDivisionTeams=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.team.path(),callback);
};
//get team information. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id
fanfeedr.getTeam=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId),callback);
};
//get team roster. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id_roster
fanfeedr.getTeamRoster=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+'/roster',callback);
};
//get team standings. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_teams_id_standings
fanfeedr.getTeamStandings=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+'/standings',callback);
};
// Events
// -------------
//sport events
fanfeedr.getSportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.event.path(),callback);
};
//league events
fanfeedr.getLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.event.path(),callback);
};
//conference events
fanfeedr.getConferenceEvents=function(conferenceId,callback){
    jsonRequest(this.resources.conference.child(conferenceId)+this.resources.event.path(),callback);
};
//team events
fanfeedr.getTeamEvents=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.event.path(),callback);
};
//geo events
fanfeedr.getGeoEvents=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.event.path(),callback);
};
//filtered sport events
fanfeedr.getSportEvents=function(sportId,seasonType,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.event.path()+'/'+seasonType,callback);
};
//filtered league events
fanfeedr.getLeagueEvents=function(leagueId,seasonType,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.event.path()+'/'+seasonType,callback);
};
//filtered conference events
fanfeedr.getConferenceEvents=function(conferenceId,seasonType,callback){
    jsonRequest(this.resources.conference.child(conferenceId)+this.resources.event.path()+'/'+seasonType,callback);
};
//filtered team events
fanfeedr.getTeamEvents=function(teamId,seasonType,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.event.path()+'/'+seasonType,callback);
};
//filtered geo events
fanfeedr.getGeoEvents=function(geoId,seasonType,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.event.path()+'/'+seasonType,callback);
};
//last events for sport
fanfeedr.lastSportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.event.path()+'/last',callback);
};
//today events for sport
fanfeedr.todaySportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.event.path()+'/today',callback);
};
//next events for sport
fanfeedr.nextSportEvents=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.event.path()+'/next',callback);
};
//last events for league
fanfeedr.lastLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.event.path()+'/last',callback);
};
//today events for league
fanfeedr.todayLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.event.path()+'/today',callback);
};
//next events for league
fanfeedr.nextLeagueEvents=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.event.path()+'/next',callback);
};
//last events for division
fanfeedr.lastDivisionEvents=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.event.path()+'/last',callback);
};
//today events for division
fanfeedr.todayDivisionEvents=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.event.path()+'/today',callback);
};
//next events for division
fanfeedr.nextDivisionEvents=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.event.path()+'/next',callback);
};
//last events for team
fanfeedr.lastTeamEvents=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.event.path()+'/last',callback);
};
//today events for team
fanfeedr.todayTeamEvents=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.event.path()+'/today',callback);
};
//next events for team
fanfeedr.nextTeamEvents=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.event.path()+'/next',callback);
};
//last events for geo object
fanfeedr.lastGeoEvents=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.event.path()+'/last',callback);
};
//today events for geo object
fanfeedr.todayGeoEvents=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.event.path()+'/today',callback);
};
//next events for geo object
fanfeedr.nextGeoEvents=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.event.path()+'/next',callback);
};
//full event info. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id
fanfeedr.getEvent=function(eventId,callback){
    jsonRequest(this.resources.event.child(eventId),callback);
};
//full event boxscore. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id_boxscore
fanfeedr.getEventBoxscore=function(eventId,callback){
    jsonRequest(this.resources.event.child(eventId)+'/boxscore',callback);
};
//full event recap. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_events_id_recap
fanfeedr.getEventRecap=function(eventId,callback){
    jsonRequest(this.resources.event.child(eventId)+'/recap',callback);
};
// Persons
// -------------

//get all persons for sport. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getSportPersons=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getLeaguePersons=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getDivisionsPersons=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.person.path(),callback);
};
//get all persons for league. http://developer.fanfeedr.com/docs/read/Persons_Resources
fanfeedr.getTeamPersons=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.person.path(),callback);
};
//get person details. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_persons_id
fanfeedr.getPerson=function(personId,callback){
    jsonRequest(this.resources.person.child(personId),callback);
};
// Images
// -------------

//get all sport images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getSportImages=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.image.path(),callback);
};
//get all team images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getTeamImages=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.image.path(),callback);
};
//get all person images. http://developer.fanfeedr.com/docs/read/Images_Resources
fanfeedr.getPersonImages=function(personId,callback){
    jsonRequest(this.resources.person.child(personId)+this.resources.image.path(),callback);
};
fanfeedr.getImage=function(imageId,callback){
    jsonRequest(this.resources.image.child(imageId),callback);
};
// Sources
// -------------

//get all sport sources. http://developer.fanfeedr.com/docs/read/Sources_Resources
fanfeedr.getSportSources=function(sportId,callback){
     jsonRequest(this.resources.sport.child(sportId)+this.resources.source.path(),callback);
};
//get all league sources. http://developer.fanfeedr.com/docs/read/Sources_Resources
fanfeedr.getLeagueSources=function(leagueId,callback){
     jsonRequest(this.resources.league.child(leagueId)+this.resources.source.path(),callback);
};
//get all conference sources. http://developer.fanfeedr.com/docs/read/Sources_Resources
fanfeedr.getLeagueSources=function(conferenceId,callback){
     jsonRequest(this.resources.conference.child(conferenceId)+this.resources.source.path(),callback);
};
//get all team sources. http://developer.fanfeedr.com/docs/read/Sources_Resources
fanfeedr.getLeagueSources=function(teamId,callback){
     jsonRequest(this.resources.team.child(teamId)+this.resources.source.path(),callback);
};
//get all person sources. http://developer.fanfeedr.com/docs/read/Sources_Resources
fanfeedr.getLeagueSources=function(personId,callback){
     jsonRequest(this.resources.person.child(personId)+this.resources.source.path(),callback);
};
//get source details. http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_sources_id
fanfeedr.getSource=function(sourceId,callback){
     jsonRequest(this.resources.source.child(sourceId),callback);
};
// Trending
// -------------

//This collection method returns a list of the 5 most trending team ids and names for the specified sport
//http://developer.fanfeedr.com/docs/read/Trending_Resources
fanfeedr.getSportTrendingTeams=function(sportId,callback){
     jsonRequest(this.resources.sport.child(sportId)+this.resources.trending.path(),callback);
};
//This collection method returns a list of the 5 most trending team ids and names for the specified league
//http://developer.fanfeedr.com/docs/read/Trending_Resources
fanfeedr.getLeagueTrendingTeams=function(leagueId,callback){
     jsonRequest(this.resources.league.child(leagueId)+this.resources.trending.path(),callback);
};
//This collection method returns a list of the 5 most trending team ids and names for the specified division
//http://developer.fanfeedr.com/docs/read/Trending_Resources
fanfeedr.getDivisionTrendingTeams=function(divisionId,callback){
     jsonRequest(this.resources.division.child(divisionId)+this.resources.trending.path(),callback);
};
//This collection method returns a list of the 5 most trending persons ids and names for the specified sport
//http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_trending_persons
fanfeedr.getSportTrendingPersons=function(sportId,callback){
     jsonRequest(this.resources.sport.child(sportId)+this.resources.trending.path()+this.resources.person.path(),callback);
};
//This collection method returns a list of the 5 most trending persons ids and names for the specified league
//http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_trending_persons
fanfeedr.getLeagueTrendingPersons=function(leagueId,callback){
     jsonRequest(this.resources.league.child(leagueId)+this.resources.trending.path()+this.resources.person.path(),callback);
};
//This collection method returns a list of the 5 most trending persons ids and names for the specified division
//http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_trending_persons
fanfeedr.getDivisionTrendingPersons=function(divisionId,callback){
     jsonRequest(this.resources.division.child(divisionId)+this.resources.trending.path()+this.resources.person.path(),callback);
};
//This collection method returns a list of the 5 most trending persons ids and names for the specified team
//http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_trending_persons
fanfeedr.getTeamTrendingPersons=function(teamId,callback){
     jsonRequest(this.resources.team.child(teamId)+this.resources.trending.path()+this.resources.person.path(),callback);
};
// Content
// -------------

// Get content for some sport. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getSportContent=function(sportId,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.content.path(),callback);
};
// Get content for some league. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getLeagueContent=function(leagueId,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.content.path(),callback);
};
// Get content for some division. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getDivisionContent=function(divisionId,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.content.path(),callback);
};
// Get content for some division. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getTeamContent=function(teamId,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.content.path(),callback);
};
// Get content for some person. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getPersonContent=function(personId,callback){
    jsonRequest(this.resources.person.child(personId)+this.resources.content.path(),callback);
};
// Get content for some source. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getSourceContent=function(sourceId,callback){
    jsonRequest(this.resources.source.child(sourceId)+this.resources.content.path(),callback);
};
// Get content for some geo. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getGeoContent=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.content.path(),callback);
};
//Get detailed  information about single content.http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_content_id
fanfeedr.getContent=function(contentId,callback){
    jsonRequest(this.resources.content.child(contentId),callback);
};
//Get related content to teh specified content.http://developer.fanfeedr.com/docs/read/GET_parent_resource_resource_id_content_id_related
fanfeedr.getRelatedContent=function(contentId,callback){
    jsonRequest(this.resources.content.child(contentId)+'/related',callback);
};

// Get filtered content for some sport. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredSportContent=function(sportId,filter,callback){
    jsonRequest(this.resources.sport.child(sportId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some league. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredLeagueContent=function(leagueId,filter,callback){
    jsonRequest(this.resources.league.child(leagueId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some division. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredDivisionContent=function(divisionId,filter,callback){
    jsonRequest(this.resources.division.child(divisionId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some division. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredTeamContent=function(teamId,filter,callback){
    jsonRequest(this.resources.team.child(teamId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some person. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredPersonContent=function(personId,filter,callback){
    jsonRequest(this.resources.person.child(personId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some source. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredSourceContent=function(sourceId,filter,callback){
    jsonRequest(this.resources.source.child(sourceId)+this.resources.content.path()+'/'+filter,callback);
};
// Get filtered content for some geo. http://developer.fanfeedr.com/docs/read/Content_Resources
fanfeedr.getFilteredGeoContent=function(geoId,filter,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.content.path()+'/'+filter,callback);
};
// Geo
// -------------
//Get geo object by query. http://developer.fanfeedr.com/docs/read/Geo_Resources
fanfeedr.getGeoObjects=function(query,callback){
    jsonRequest(this.resources.geo.name,callback,{q:query});
};
//Get geo object by latitude and longitude. http://developer.fanfeedr.com/docs/read/Geo_Resources
fanfeedr.getGeoObjectsByCoordinates=function(lat,long,callback){
    jsonRequest(this.resources.geo.name,callback,{lat:lat,long:long});
};
//Get details about geo object. http://developer.fanfeedr.com/docs/read/GET_geo_id
fanfeedr.getGeoObject=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId),callback);
};
//Get teams for geo object. http://developer.fanfeedr.com/docs/read/GET_geo_id_teams
fanfeedr.getGeoTeams=function(geoId,callback){
    jsonRequest(this.resources.geo.child(geoId)+this.resources.team.path(),callback);
};
var jsonRequest=function(resource,callback,params){
    params=params||{};
    params.api_key=fanfeedr.key;
    var url='http://ffapi.fanfeedr.com/'+fanfeedr.tier+'/api/'+ resource+'?'+querystring.stringify(params);
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