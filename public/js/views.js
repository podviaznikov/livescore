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
            _.bindAll(this,'addLatestEvent','addUpcomingEvent','addCurrentEvent');
            this.latestEvents.bind('add',this.addLatestEvent);
            this.upcomingEvents.bind('add',this.addUpcomingEvent);
            this.currentEvents.bind('add',this.addCurrentEvent);
        },
        addLatestEvent:function(event){
            var view=new ui.LatestEventView({model:event});
            this.$(this.latest).append(view.render().el);
        },
        addUpcomingEvent:function(event){
            var view=new ui.UpcomingEventView({model:event});
            this.$(this.upcoming).append(view.render().el);
        },
        addCurrentEvent:function(event){
            var view=new ui.CurrentEventView({model:event});
            this.$(this.current).append(view.render().el);
        }
    });

    ui.LatestEventView=Backbone.View.extend({
        tagName:'section',
        className:'latest_result',
        tpl:$('#latest_result_tpl').html(),
        initialize:function(){
            _.bindAll(this,'render');
        },
        render:function(){
            var html=_.template(this.tpl,{
                score:this.model.get('score'),
                home:this.model.get('home'),
                away:this.model.get('away'),
                date:_(this.model.get('date')).toLocalDate()
            });
            $(this.el).attr('id',this.model.get('id'));
            $(this.el).append(html);
            return this;
        }
    });

    ui.UpcomingEventView=Backbone.View.extend({
        tagName:'section',
        className:'upcoming_result',
        tpl:$('#upcoming_result_tpl').html(),
        initialize:function(){
            _.bindAll(this,'render');
        },
        render:function(){
            var html=_.template(this.tpl,{
                date:_(this.model.get('date')).toLocalDate(),
                home:this.model.get('home'),
                away:this.model.get('away')
            });
            $(this.el).attr('id',this.model.get('id'));
            $(this.el).append(html);
            return this;
        }
    });

    ui.CurrentEventView=Backbone.View.extend({
        tagName:'section',
        className:'current_result',
        tpl:$('#upcoming_result_tpl').html(),
        initialize:function(){
            _.bindAll(this,'render');
        },
        render:function(){
            var html=_.template(this.tpl,{
                date:_(this.model.get('date')).toLocalDate(),
                home:this.model.get('home'),
                away:this.model.get('away')
            });
            $(this.el).attr('id',this.model.get('id'));
            $(this.el).append(html);
            return this;
        }
    });
});