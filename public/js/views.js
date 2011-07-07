$(function(){
    ui.AppView=Backbone.View.extend({
        el:$('body'),

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