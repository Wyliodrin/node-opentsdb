var db = require('node-opentsdb');


var tags = {"host": "127.0.0.1"};
var value = "70";
var metric = "sys.cpu";
var timestamp = db.util.getCurrentTimestamp();

//metric, timestamp, value, tags 
var dataPoint = db.Model.DataPoint(metric, timestamp, value, tags);



db.insert(dataPoint, function (err, data){
    if(err) {
       console.error(err);
    }
    else{
        console.log(data);
    }
});