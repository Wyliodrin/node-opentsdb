/**
 * Created with WebStorm.
 * User: Dina
 * Date: 5/9/2014
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var KeepAliveAgent = require('keep-alive-agent');
var Model =  require('./model/model');
var request =  require('superagent');


var HOST = "172.16.130.71";
var PORT = "4242";

var URL = {INSERT: '/api/put?details'
            ,SELECT : '/api/query'};


function insert(obj,callback) {

    var callbackIsAvailable = (callback && typeof callback === 'function');

    request
        .post(HOST + ":" + PORT + URL.INSERT)
        .send(obj)
        .set('Accept', 'application/json')
        .end(function(err, res) {

            if(err)
            {
                if(callbackIsAvailable){
                    return callback(err, null);
                }

                throw err;
            }

            if(res.error)
            {
               return callback(res.error, null);
            }

            var jsonData = null;
            try{
                jsonData = JSON.parse(res.text);
            }
            catch(err){
                if(callbackIsAvailable){
                    return callback(err,null);
                }

                throw err;
            }

            return callback(null, jsonData);
        });
}



function select(obj, callback)
{
    var callbackIsAvailable = (callback && typeof callback === 'function');

    request
        .post(HOST + ":" + PORT + URL.SELECT)
        .send(obj)
        .set('Accept', 'application/json')
        .end(function(err, res) {

            if(err)
            {
                if(callbackIsAvailable){
                    return callback(err, null);
                }

                throw err;
            }

            if(res.error)
            {
                return callback(res.error, null);
            }

            var jsonData = null;
            try{
                jsonData = JSON.parse(res.text);
            }
            catch(err){
                if(callbackIsAvailable){
                    return callback(err,null);
                }

                throw err;
            }

            return callback(null, jsonData);
        });
}

exports.insert = insert;
exports.select = select;
exports.Model = Model;



