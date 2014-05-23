/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/13/2014
 * To change this template use File | Settings | File Templates.
 */

/*
 Name               Data Type 	    Required
 ------------------------------------------------
 aggregator 	    String 	        Required

 tsuids             Array           Required

*/

var util = require("../util");
var _ = require("underscore");


function TSUIDQuery(aggregator, tsuids) {

    var errParam = {};

    //Check params to be valid
    if (!util.isString(aggregator)) {
        errParam.aggregator = "is required and must be string";
    }
    else {
        //Check the value
        if (!_.contains(util.AGGREGATORS, aggregator)) {
            errParam.aggregator = "please provide a valid value for aggregator (min or sum or max or avg or dev)";
        }
    }

    if(!util.isArray(tsuids)){
        errParam.tsuids = "is required and must be an array with at least one element";
    }

    //Return a valid MetricQuery obj
    if(Object.keys(errParam).length == 0)
    {
        return {
            "aggregator": aggregator,
            "tsuids": tsuids
        };
    }

    //If we are here then some params are incorrect
    var error = new Error();
    error.message = "Incorrect parameters for a  TSUIDQuery obj. Please double check below items:";
    _.each(errParam, function( value, key)
    {
        error.message = error.message + "\n" +  key + " " + value;
    });

    throw error;
}

exports.TSUIDQuery = TSUIDQuery;