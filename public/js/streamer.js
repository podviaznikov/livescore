Backbone.StreamingCollection=Backbone.Collection.extend({

    //initialize all updates from collection.
    initialize:function(){
        var self=this,
            channel=io.connect(this.url);
        channel.on('added',function(data){
            var modelInstance=new self.model(JSON.parse(data));
            self.add(modelInstance);
        });
        channel.on('removed',function(id){
            self.removeById(id);
        });
    },
    removeById:function(id){
        var modelToRemove=this.get(id);
        if(modelToRemove){
            this.remove([modelToRemove]);
        }
    }
});