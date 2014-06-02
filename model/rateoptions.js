/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/13/2014
 * To change this template use File | Settings | File Templates.
 */


/*
 Name               Data Type 	    Required
 ------------------------------------------------
 counter            Boolean         Optional

 counterMax 	    Integer 	    Optional

 resetValue 	    Integer 	    Optional

 */

var util = require("../lib/util");
var _ = require("underscore");

function  RateOptions(counter, counterMax, resetValue)
{
    var errParam = {};

    //Check params to be valid
    if(counter != null){
        if(!util.isBoolean(counter)) {
            errParam.counter = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        counter = false;
    }

    if(counterMax != null){
        if(!util.isPositiveInt(counterMax)) {
            errParam.counterMax = "is optional and can be null or a positive integer";
        }
    }
    else{
        //default value
        counterMax = 65535;
    }

    if(resetValue != null){
        if(!util.isPositiveInt(resetValue)) {
            errParam.resetValue = "is optional and can be null or a positive integer";
        }
    }
    else{
        //default value
        resetValue = 0;
    }

    //Return a valid MetricQuery obj
    if(Object.keys(errParam).length == 0)
    {
        return {
            "counter": counter,
            "counterMax": counterMax,
            "resetValue": resetValue
        };
    }

    //If we are here then some params are incorrect
    var error = new Error();
    error.message = "Incorrect parameters for a  RateOptions obj. Please double check below items:";
    _.each(errParam, function( value, key)
    {
        error.message = error.message + "\n" +  key + " " + value;
    });

    throw error;

}

exports.RateOptions = RateOptions;