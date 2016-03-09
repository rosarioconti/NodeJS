//
var enumerateArray = function (array) {
  for(var s in array) {
    console.log(s.toString() + " : " + JSON.stringify(array[s]));
  }
}

var sendPushNotification = function(Title, Message, Devices, Segments, Extra) {

  if (Devices == null) {
    console.log("Please set Devices to [] or add an array of devices.");
    return;
  }

  if (Segments == null) {
    console.log("Please set Segments to \"\" or add one.");
    return;
  }

  var App_id = "your-app-id";
  var Rest_key = "Basic your-rest-key";

  var headers = {
    "Content-Type": "application/json",
    "Authorization": Rest_key
  };
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };


  var message = {
      app_id: App_id,
      headings: {"en": Title},
      contents: {"en": Message},
    };

  //Switch between Segment and Devices
  if (Devices.length > 0) {
    message['include_player_ids'] = Array.isArray(Devices) ? Devices : [Devices];
  } else {
    message['included_segments'] = Array.isArray(Segments) ? Segments : [Segments];
  }

  if (Extra != null) {
    message['data'] = {"extra": Extra}
  }

  //Debug
  enumerateArray(message);

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(message));
  req.end();
};

var extra_data = {
    param1: "test1",
    param2: 2,
  };

//var ids = [];
var ids = ["00000000-f600-4386-9114-id1", "00000000-f600-4386-9114-id2"];
//sendPushNotification("Titolo1","Messaggio1", ids, "All", null);
//sendPushNotification("Titolo1","Messaggio1", ids, "All", "ExtraData");
sendPushNotification("Titolo1","Messaggio1", ids, "", extra_data);
