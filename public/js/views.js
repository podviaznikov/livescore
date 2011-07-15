$(function(){
    ui.AppView=Backbone.View.extend({
        el:$('#results'),
        upcoming:$('#upcoming'),
        latest:$('#latest'),
        current:$('#current'),
        initialize:function(){
            this.latestEvents=new models.LatestEvents();
            this.upcomingEvents=new models.UpcomingEvents();
            this.currentEvents=new models.CurrentEvents();
            _.bindAll(this,'addLatestEvent','addUpcomingEvent','addCurrentEvent',
                'addLatestEvents','addUpcomingEvents','addCurrentEvents');
            //add events
            this.latestEvents.bind('add',this.addLatestEvent);
            this.upcomingEvents.bind('add',this.addUpcomingEvent);
            this.currentEvents.bind('add',this.addCurrentEvent);
            //reset events
            this.latestEvents.bind('reset',this.addLatestEvents);
            this.upcomingEvents.bind('reset',this.addUpcomingEvents);
            this.currentEvents.bind('reset',this.addCurrentEvents);
        },
        addLatestEvent:function(event){
            var view=new ui.LatestEventView({model:event});
            this.$(this.latest).append(view.render().el);
        },
        addLatestEvents:function(){
            this.latestEvents.each(this.addLatestEvent);
        },
        addUpcomingEvent:function(event){
            var view=new ui.UpcomingEventView({model:event});
            this.$(this.upcoming).append(view.render().el);
        },
        addUpcomingEvents:function(){
            this.upcomingEvents.each(this.addUpcomingEvent);
        },
        addCurrentEvent:function(event){
            var view=new ui.CurrentEventView({model:event});
            this.$(this.current).append(view.render().el);
        },
        addCurrentEvents:function(event){
            this.currentEvents.each(this.addCurrentEvent);
        }
    });

    ui.LatestEventView=Backbone.View.extend({
        tagName:'section',
        className:'latest_result',
        tplId:'latest_result_tpl',
        render:function(){
            this.renderTpl({
                score:this.model.get('score'),
                home:this.model.get('home'),
                away:this.model.get('away'),
                date:_(this.model.get('date')).toLocalDate()
            });
            return this;
        }
    });

    ui.UpcomingEventView=Backbone.View.extend({
        tagName:'section',
        className:'upcoming_result',
        tplId:'upcoming_result_tpl',
        render:function(){
            this.renderTpl({
                date:_(this.model.get('date')).toLocalDate(),
                home:this.model.get('home'),
                away:this.model.get('away')
            });
            return this;
        }
    });

    ui.CurrentEventView=Backbone.ModelView.extend({
        tagName:'section',
        className:'current_result',
        tplId:'upcoming_result_tpl',
        render:function(){
            this.renderTpl({
                date:_(this.model.get('date')).toLocalDate(),
                home:this.model.get('home'),
                away:this.model.get('away')
            });
            return this;
        }
    });
});