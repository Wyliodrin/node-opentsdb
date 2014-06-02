node-opentsdb - a node.js OpenTSDB client
===========================

This is a OpenTSDB HTTP API client for node.js which supports  two API endpoints */api/put* and */api/query*. Input and returned data must be in JSON format. Please visit below link for more information about OpenTSDB HTTP API endpoints:

[http://opentsdb.net/docs/build/html/api_http/ ](http://opentsdb.net/docs/build/html/api_http/ "http://opentsdb.net/docs/build/html/api_http/")


Install with:

    npm install node-opentsdb

## Usage

Examples of usage can be found in **example** folder:


- **insert.js** contains a sample call for **/api/put** endpoint  
- **select.js** contains a sample call for **/api/query** endpoint 


***/api/put*** endpoint can be reached through **insert** method:


`
var db = require('node-opentsdb');

var tags = {"host": "127.0.0.1"};
var value = "70";
var metric = "sys.cpu";
var timestamp = util.getCurrentTimestamp();
var dataPoint = db.Model.DataPoint(metric, timestamp, value, tags);

db.insert(dataPoint, function (err, data){
	if(err) {
       console.error(err);
    }
    else{
        console.log(data);
    }
}); `


where callback function is optional. Returned result will contain detailed information of API response:

    {"errors":[],"failed":0,"success":1}

Previous example is equivalent to an HTTP API request sent to */api/put?details* endpoint with parameters:


```js
{
    "metric": "sys.cpu",
    "timestamp": 1346946400,
    "value": 70,
    "tags": {
       "host": "127.0.0.1"
    }
}```

A data point can be created using **Model.DataPoint** helper method or directly from javascript (as a JSON object). First approach adds an overhead but validates data that must be sent to OpenTSDB.  

 
**select** method correspons to  ***/api/query*** endpoint: 

```js
var  queries = [];

var metric = "sys.cpu";
var rate = false;
var rateOptions = null;
var tags = {"host": "127.0.0.1"};
var downsample = null;

//aggregator, metric, rate, rateOptions, downsample, tags
var q1 = db.Model.MetricQuery(util.AGGREGATOR.sum, metric, rate, rateOptions, downsample, tags);

queries.push(q1);

var tsuids = ["000001000001000002","000001000001000002000002000003"];
var q2 = db.Model.TSUIDQuery(util.AGGREGATOR.sum, tsuids);
queries.push(q2);

var start = "1w-ago";
var end = "1s-ago";
var noAnnotations = false;
var globalAnnotations = true;
var msResolution = true;
var showTSUIDs = true;

//(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs)
var query = db.Model.Select(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs);
db.select(query, function (err, data){
	if(err) {
       console.error(err);
    }
    else{
        console.log(data);
    }
});

```


As for */api/put*, JSON query object can be built using Model helper methods (**Model.MetricQuery**/**Model.TSUIDQuery**/**Model.Select**/**Model.RateOptions**) or straight from javascript. 

Preceding example sends a JSON object to */api/query* endpoint:

```js
{ start: '1w-ago',
  end: '1s-ago',
  queries:
   [ { aggregator: 'sum',
       metric: 'sys.cpu',
       rate: false,
       rateOptions: null,
       downsample: null,
       tags: {"host": "127.0.0.1"} },
     { aggregator: 'sum', tsuids:["000001000001000002","000001000001000002000002000003"] } ],
  noAnnotations: false,
  globalAnnotations: true,
  msResolution: true,
  showTSUIDs: true }```


where first query is a **Metric Query**:

```js
{ aggregator: 'sum',
       metric: 'sys.cpu',
       rate: false,
       rateOptions: null,
       downsample: null,
       tags: {"host": "127.0.0.1"} }
```

 and the second one is a **TSUID Query**: 

```js
 { aggregator: 'sum', tsuids:["000001000001000002","000001000001000002000002000003"] }
```

For a **Metric Query** with **rate** set to **true**, a **rateOptions** object must be provided (**Model.RateOptions** can be used for a rateOptions object):

```js
var counter = true;
var counterMax = 100;
var resetValue = 0;

//counter,counterMax,resetValue  
var rateOptions =  db.Model.RateOptions(counter, counterMax, resetValue);

var metric = "sys.cpu";
var rate = true;
var tags = {"host": "127.0.0.1"};
var downsample = null;

//aggregator, metric, rate, rateOptions, downsample, tags
var query = db.Model.MetricQuery(util.AGGREGATOR.sum, metric, rate, rateOptions, downsample, tags);
```

Resulted query JSON object is:

```js
{ aggregator: 'sum',
  metric: 'sys.cpu',
  rate: true,
  rateOptions: { counter: true, counterMax: 100, resetValue: 0 },
  downsample: null,
  tags: { host: '127.0.0.1' } 
}
```

## Settings

**Host** and **port** of OpenTSDB must be set in **config.js**.

**Important**: OpenTSDB must be started using **auto-metric** set to true.

 





 





