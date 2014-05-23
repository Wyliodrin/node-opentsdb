var express = require('express');
var router = express.Router();
var util = require('../Helpers/opentsdb/util');
var db = require('../Helpers/opentsdb/connection');



/* GET home page. */
router.get('/', function(req, res) {

    var tags = { "host": "*"};

    var  queries = [];

    var rateOptions =  db.Model.RateOptions(true,100,0);
    var q1 =  db.Model.MetricQuery("sum", "test.API", false, null, null, tags);
    queries.push(q1);

    var tsuids = ["000001000001000002","000001000001000002000002000003"];
    var q2 = db.Model.TSUIDQuery("sum", tsuids);
    queries.push(q2);


    //(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs)
    var obj = db.Model.Select("1w-ago", "1s-ago", queries, false,true,true, true);

    db.select(obj, function (err, data) {
        if(err) {
            res.render('error', {error: err});
        }
        else{
            res.send(200, data);
            res.end();
        }
    });
});
module.exports = router;