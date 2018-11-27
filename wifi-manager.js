var wifi = require('node-wifi');

wifi.init({
  iface : null //
});

// Scan networks


// Connect to a network
wifi.connect({ ssid : "ssid", password : "password"}, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Connected');
});

// Disconnect from a network
// not available on all os for now
wifi.disconnect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Disconnected');
});

// List the current wifi connections
wifi.getCurrentConnections(function(err, currentConnections) {
  if (err) {
    console.log(err);
  }
  console.log(currentConnections);

});
wifi.scan().then(function (networks) {
  // networks
}).catch(function (error) {
  // error
});
export wifi;
