$(function(){
    ui.AppView=Backbone.View.extend({
        el:$('#results'),
        initialize:function(){
            this.latestEvents=new models.LatestEvents();
            _.bindAll(this,'addLatestEvent');
            this.latestEvents.bind('add',this.addLatestEvent);
        },
        addLatestEvent:function(event){
            var view=new ui.LatestEventView({model:event});
            this.$(this.el).append(view.render().el);
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
                away:this.model.get('away')
            });
            $(this.el).append(html);
            return this;
        }
    });
});