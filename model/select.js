/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/13/2014
 * To change this template use File | Settings | File Templates.
 */

/*
 Name 	                Data Type 	    Required
 ------------------------------------------------
 start 	                String,  	    Required
                        Integer

 end 	                String,         Optional
                        Integer

 queries 	            Array 	        Required

 noAnnotations 	        Boolean 	    Optional

 globalAnnotations 	    Boolean 	    Optional

 msResolution 	        Boolean 	    Optional

 showTSUIDs 	        Boolean 	    Optional

 */

var util = require("../lib/util");
var metricquery = require("./metricquery");
var _ = require("underscore");

function Select(start, end, queries, noAnnotations, globalAnnotations, msResolution, showTSUIDs) {

    var errParam = {};

    //Check params to be valid
    if(!(util.isString(start) || util.isInt(start)))
    {
        errParam.start = "is required and must be string or a valid timestamp";
    }

    if(end  == null){
        //"1s-ago" is default unit of time for an empty value
        end = "1" + util.TIME_UNIT.seconds + "-ago";
    }
    else {
        if( !(util.isString(end) || util.isInt(end))){
            errParam.end = "is optional and can be null, string or a valid timestamp";
        }
    }

    if(!util.isArray(queries)){
        errParam.queries = "is required and must be an array with at least one element";
    }

    if(noAnnotations != null){
        if(!util.isBoolean(noAnnotations)) {
            errParam.noAnnotations = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        noAnnotations = false;
    }

    if(globalAnnotations != null){
        if(!util.isBoolean(globalAnnotations)) {
            errParam.globalAnnotations = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        globalAnnotations = true;
    }

    if(msResolution != null){
        if(!util.isBoolean(msResolution)) {
            errParam.msResolution = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        msResolution = true;
    }

    if(showTSUIDs != null){
        if(!util.isBoolean(showTSUIDs)) {
            errParam.showTSUIDs = "is optional and can be null or a boolean";
        }
    }
    else{
        //default value
        showTSUIDs = true;
    }

    //Return a valid Select obj
    if(Object.keys(errParam).length == 0)
    {
        return {
            "start": start,
            "end": end,
            "queries": queries,
            "noAnnotations": noAnnotations,
            "globalAnnotations": globalAnnotations,
            "msResolution": msResolution,
            "showTSUIDs": showTSUIDs
        };
    }

    //If we are here then some params are incorrect
    var error = new Error();
    error.message = "Incorrect parameters for a select. Please double check below items:";
    _.each(errParam, function( value, key)
    {
        error.message = error.message + "\n" +  key + " " + value;
    });

    throw error;
}

exports.Select = Select;
