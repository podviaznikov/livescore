var Webserver = require('hook.io-webserver').Webserver;

var webserver = new Webserver({
    name: 'livescore-webserver',
    port: 9000,
    webroot: './public',
    debug: true
});

webserver.on('hook::ready', function(){
  //console.log('http web server started on port: ',webserver);
});

webserver.on('hello',function(){
console.log('browser said hello!!');
})

webserver.on('*::cakeRequest', function(options, callback){
  if(options === "Cake please?"){
    callback(null, 'nommnomnomnomn');
  } else {
    callback(null, 'NO CAKE FOR YOU');
  }
});
webserver.start();