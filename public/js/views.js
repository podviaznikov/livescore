var ui={};
$(function(){
    ui.AppView=Backbone.View.extend({
        el:$('body'),
        initialize:function(){
            this.latestEvents=new models.LatestEvents();
            this.latestEvents.bind('add',this.addLatestEvent);
        },
        addLatestEvent:function(event){
            var view=new ui.LatestEventView({model:event});
            $(this.el).append(view.render().el);
        }
    });

    ui.LatestEventView=Backbone.View.extends({
        tagName:'section'
        className:'latest_result',
        tpl:$('#latest_result_tpl').html(),
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