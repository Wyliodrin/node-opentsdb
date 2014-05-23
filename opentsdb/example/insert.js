/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/12/2014
 * To change this template use File | Settings | File Templates.
 */


var express = require('express');
var router = express.Router();


var util = require("../Helpers/OpenTSDB/util");
var db = require('../Helpers/OpenTSDB/connection');

/* GET home page. */
router.get('/', function(req, res) {

    var tags = {"host": "172.16.130.71"};
    var obj = db.Model.DataPoint("test.API", util.getCurrentTimestamp(), 4, tags);

    db.insert(obj, function (err, data) {
        if(err) {
            res.render('error', {error: err});
        }
        else{
            res.render('index', { title: 'Express' });
        }

    });
});