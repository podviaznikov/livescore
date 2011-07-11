var models={};
models.LatestEvent=Backbone.Model.extend({});
models.LatestEvents=Backbone.Collection.extend({
    model:models.LatestEvent
});
models.UpcomingEvent=Backbone.Model.extend({});
models.UpcomingEvents=Backbone.Collection.extend({
    model:models.UpcomingEvent
});
models.CurrentEvent=Backbone.Model.extend({});
models.CurrentEvents=Backbone.Collection.extend({
    model:models.CurrentEvent
});