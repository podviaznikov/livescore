var models={};
models.LatestEvent=Backbone.Model.extend({});
models.LatestEvents=Backbone.StreamingCollection.extend({
    url:'/events-latest',
    model:models.LatestEvent
});
models.UpcomingEvent=Backbone.Model.extend({});
models.UpcomingEvents=Backbone.StreamingCollection.extend({
    url:'/events-upcoming',
    model:models.UpcomingEvent
});
models.CurrentEvent=Backbone.Model.extend({});
models.CurrentEvents=Backbone.StreamingCollection.extend({
    url:'/events-current',
    model:models.CurrentEvent
});