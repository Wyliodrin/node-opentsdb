/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/12/2014
 * To change this template use File | Settings | File Templates.
 */
/*
Name 	    Data Type 	    Required
-------------------------------------
metric 	    String 	        Required

timestamp 	Integer 	    Required

value 	    Integer,        Required
            Float,
            String

tags 	    Map 	        Required
*/


var util = require("../util");
var _ = require("underscore");

function DataPoint(metric, timestamp, value, tags)
{
    var errParam = {};

    //Check params to be valid
    if(!util.isString(metric))
    {
        errParam.metric = "string";
    }
    if(!util.isInt(timestamp))
    {
        errParam.timestamp = "a valid timestamp";
    }
    if(!(util.isFloat(value) || util.isString(value)))
    {
        errParam.value  = "string, float or integer";
    }
    if(!util.isValidMap(tags))
    {
        errParam.tags = "a valid and not empty map";
    }

    //Return a valid DataPoint
    if(Object.keys(errParam).length == 0)
    {
        return {
            "metric": metric,
            "timestamp": timestamp,
            "value": value,
            "tags": tags
        }
    }

    //If we are here then some params are incorrect
    var error = new Error();
    error.message = "Incorrect parameters for a data point. Please double check below items:";
    _.each(errParam, function( value, key)
    {
        error.message = error.message + "\n" +  key + " must be " + value;
    });

    throw error;
}

exports.DataPoint = DataPoint;