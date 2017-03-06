// var mosca = require('mosca')

// var ascoltatore = {
//   //using ascoltatore
//   type: 'mongo',        
//   url: 'mongodb://localhost:27017/mqtt',
//   pubsubCollection: 'ascoltatori',
//   mongo: {}
// };

// var moscaSettings = {
//   port: 1883,
//   backend: ascoltatore,
//   persistence: {
//     factory: mosca.persistence.Mongo,
//     url: 'mongodb://localhost:27017/mqtt'
//   }
// };

// var server = new mosca.Server(moscaSettings);
// server.on('ready', setup);

// server.on('clientConnected', function(client) {
//     console.log('client connected', client.id);  
//     // send message to all clients
//     var message = {
//       topic: 'presence',
//       payload: "New client connected: " + client.id, // or a Buffer
//       qos: 0, // 0, 1, or 2
//       retain: false // or true
//     };

//     server.publish(message, function() {
//       console.log('done!');
//     });   
// });

// // fired when a message is received
// // server.on('published', function(packet, client) {
// //   if (packet.topic == 'presence') {
// //     console.log('Published', packet);
// //     console.log(packet.payload.toString());
// //   }
// //   //send message to all clients
// //   // var message = {
// //   //   topic: '/hello/world',
// //   //   payload: packet.payload, // or a Buffer
// //   //   qos: 0, // 0, 1, or 2
// //   //   retain: false // or true
// //   // };

// //   // server.publish(message, function() {
// //   //   console.log('done!');
// //   // });
// // });

// // fired when a client disconnects
// server.on('clientDisconnected', function(client) {
//   console.log('Client Disconnected:', client.id);
// });

// // fired when the mqtt server is ready
// function setup() {
//   console.log('Mosca server is up and running')
// }





var http     = require('http')
  , httpServ = http.createServer()
  , mosca    = require('mosca')
  , mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

mqttServ.on('clientConnected', function(client) {
    console.log('client connected', client.id);  
    // send message to all clients
    var message = {
      topic: 'presence',
      payload: "New client connected: " + client.id, // or a Buffer
      qos: 0, // 0, 1, or 2
      retain: false // or true
    };

    mqttServ.publish(message, function() {
      console.log('done!');
    });   
});

mqttServ.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});


httpServ.listen(3001);