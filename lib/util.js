/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/12/2014
 * To change this template use File | Settings | File Templates.
 */

//Check if param is int
function isInt(i) {
    return typeof i === 'number' && i % 1 == 0;
}

//Check if param is int
function isPositiveInt(i) {
    return isInt(i)&& (i >= 0);
}

//Check is param is string
function isString(s) {
    return typeof s === 'string';
}

//Check if param is a number
function isFloat(n) {
    return typeof n === 'number';
}

//UNIX timestamp in seconds
function getCurrentTimestamp()
{
    return Math.round(+new Date()/1000);
}

//Check is param is a map with at least one pair
function isValidMap(m)
{
    //Check if param is a map & it's not an empty map
    return (Object.prototype.toString.call(m) == "[object Object]")  &&  (Object.keys(m).length > 0);
}

//Check is param is an array with at least one element
function isArray(a)
{
    //Check if param is a map & it's not an empty map
    return (a instanceof Array )  &&  (a.length > 0);
}

//Check is param is an array with at least one element
function isBoolean(b)
{
    //Check if param is a map & it's not an empty map
    return typeof b === 'boolean';
}

/*
 ms - Milliseconds
 s - Seconds
 m - Minutes
 h - Hours
 d - Days (24 hours)
 w - Weeks (14 days)
 n - Months (30 days)
 y - Years ( 365 days)

 */
var TIME_UNIT = {
    milliseconds: "ms",
    seconds: "s",
    minutes: "m",
    hour: "h",
    day: "d",
    week: "w",
    month: "n",
    year: "y"
}


var  AGGREGATOR = {
    min: "min",
    sum: "sum",
    max: "max",
    avg: "avg",
    dev: "dev" 
}


var  AGGREGATORS = [
    "min",
    "sum",
    "max",
    "avg",
    "dev"
]

exports.isInt = isInt;
exports.isPositiveInt = isPositiveInt;
exports.isString = isString;
exports.isFloat = isFloat;
exports.isValidMap = isValidMap;
exports.isArray = isArray;
exports.isBoolean =isBoolean;
exports.getCurrentTimestamp = getCurrentTimestamp;
exports.TIME_UNIT = TIME_UNIT;
exports.AGGREGATORS = AGGREGATORS;
exports.AGGREGATOR = AGGREGATOR;

