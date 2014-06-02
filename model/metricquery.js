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

 metric 	        String 	        Required

 rate 	            Boolean 	    Optional

 rateOptions 	    Map 	        Optional

 downsample 	    String 	        Optional

 tags 	            Map 	        Optional

 */

var util = require("../lib/util");
var _ = require("underscore");


function MetricQuery(aggregator, metric, rate, rateOptions, downsample, tags){

    var errParam = {};

    //Check params to be valid
    if(!util.isString(aggregator)){
        errParam.aggregator = "is required and must be string";
    }
    else{
        //Check the value
        if(!_.contains(util.AGGREGATORS, aggregator)){
            errParam.aggregator = "please provide a valid value for aggregator (min or sum or max or avg or dev)";
        }
    }

    if(!util.isString(metric)){
        errParam.metric = "is required and must be string";
    }

    if(rate != null){
        if(!util.isBoolean(rate)) {
            errParam.rate = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        rate = true;
    }

    if(rateOptions != null && !util.isValidMap(rateOptions)){
            errParam.rateOptions = "is optional and can be null or no empty map";
    }

    if(downsample != null){
        if(!util.isString(downsample)) {
            errParam.downsample = "is optional and can be null or a string";
        }
    }

    if(tags != null && !util.isValidMap(tags)){
        errParam.tags = "is optionaland can be null and no empty map";
    }

    //Return a valid MetricQuery obj
    if(Object.keys(errParam).length == 0)
    {
        return {
            "aggregator": aggregator,
            "metric": metric,
            "rate": rate,
            "rateOptions": rateOptions,
            "downsample": downsample,
            "tags": tags
        };
    }

    //If we are here then some params are incorrect
    var error = new Error();
    error.message = "Incorrect parameters for a  MetricQuery obj. Please double check below items:";
    _.each(errParam, function( value, key)
    {
        error.message = error.message + "\n" +  key + " " + value;
    });

    throw error;
}

exports.MetricQuery = MetricQuery;