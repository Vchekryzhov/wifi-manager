var express = require('express');
var app = express();
app.set('view engine', 'pug');

var wifi = require('node-wifi');
wifi.init({
  iface : null //
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }) );

app.get('/', function (req, res) {
  var render_networks = [];
  wifi.scan().then( (networks)=>{
    render_networks = networks;
    return wifi.getCurrentConnections();
  }).
    then( (currentConnections)=>{
      console.log(currentConnections);
      var currentSsid = "";
      if (currentConnections[0]){
        currentSsid = currentConnections[0].ssid;
      }
      res.render('index', {  networks: render_networks,
                             currentConnections: currentConnections,
                             currentSsid: currentSsid,
                             errors:[]
      }
      );
    }).
    catch( (err)=>{
      res.render('index', {  networks: render_networks,
                             currentConnections: [],
                             errors:err
      }
      );
    });
});
app.post('/connect', function (req, res) {
  console.log(req.body);
  var render_networks = [];
  wifi.connect({ ssid : req.body.ssid, password : req.body.password}).
    then( ()=> {return wifi.scan();}).
    then( (networks)=>{
      render_networks = networks;
      return wifi.getCurrentConnections();
    }).
    then( (currentConnections)=>{
      console.log(currentConnections);
      res.render('index', {  networks: render_networks,
                             currentConnections: currentConnections,
                             errors:[]
      }
      );
    }).catch( (err)=>{
      console.log("Ошибки", err);
      res.render('index', {  networks: render_networks,
                             currentConnections: [],
                             errors:err
      }
      );
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
