/*
 * Module dependencies.
 */
var util = require('util'),
    Hook = require('hook.io').Hook,
    PusherLib = require('node-pusher');

var Pusher = exports.Pusher = function(options) {

  var self = this;
  
  Hook.call(this, options);

  this.on('hook::ready', function () {
    self._init();
  });

  this.on("**::pusher::trigger", function(data, callback) {
    self.trigger(data.channel, data.event, data.payload, data.socketId, callback);
  })
}

util.inherits(Pusher, Hook);

/*
 * Initialize connection to Pusher servers.
 */
Pusher.prototype._init = function() {
  console.log(this['appId']);

  this.pusher = new PusherLib({
    appId: this['appId'],
    key: this['key'],
    secret: this['secret']
  });

  console.log(this.pusher);
}

/*
 * Trigger an event on a given Pusher channel. Optionally can specify
 * socketId to prevent getting message for itself.
 */
Pusher.prototype.trigger = function(channel, event, data, socketId, callback) {
  this.pusher.trigger(channel, event, data, socketId, function(err, req, res) {
    callback.call(null, err, res);
  });
}