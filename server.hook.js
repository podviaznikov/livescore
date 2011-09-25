var Hook = require('hook.io').Hook;
var hook = new Hook({
  name: 'livescore-server-hook',
  debug: true
});

hook.on('hook::ready', function(){
  console.log(hook.name,' is ready');
});
hook.on('test::x', function(data, callback){
  console.log(data,'received');
});
hook.start();