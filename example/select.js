var db = require('node-opentsdb');

var  queries = [];

var counter = true;
var counterMax = 100;
var resetValue = 0;

//counter,counterMax,resetValue  
var rateOptions = db.Model.RateOptions(counter, counterMax, resetValue);

var metric = "sys.cpu";
var rate = true;
var tags = { "host": "127.0.0.1" };
var downsample = null;

//aggregator, metric, rate, rateOptions, downsample, tags
var q1 = db.Model.MetricQuery(db.util.AGGREGATOR.sum, metric, rate, rateOptions, downsample, tags);
queries.push(q1);

var tsuids = ["000001000001000002","000001000001000002000002000003"];
var q2 = db.Model.TSUIDQuery(db.util.AGGREGATOR.sum, tsuids);
queries.push(q2);

var start = "1w-ago";
var end = "1s-ago";
var noAnnotations = false;
var globalAnnotations = true;
var msResolution = true;
var showTSUIDs = true;

//(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs)
var query = db.Model.Select(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs);

db.select(query, , function (err, data){
    if(err) {
       console.error(err);
    }
    else{
        console.log(data);
    }
});
