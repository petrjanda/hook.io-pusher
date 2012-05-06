/*
 * Module dependencies.
 */
var util = require('util'),
    Hook = require('hook.io').Hook,
    PusherLib = require('node-pusher');

/*
 * Hook.io hook able to push events to Pusher (pusherapp.com).
 * In order to create successful connection to the server hook
 * has to get couple necessary configuration parameters:
 *
 * appId - Unique identifier of your application on Pusher servers
 * key - API key by Pusher
 * secret - Secret token by Pusher
 *
 * All the attributes should be coming as part of the options passed
 * to the hook constructor.
 *
 * @param {Object} Hook configuration object.
 * 
 */
var Pusher = exports.Pusher = function(options) {

  var self = this;
  
  Hook.call(this, options);

  /*
   * Initialize hook internals once its started.
   */
  this.on('hook::ready', function () {
    self._init();
  });

  /*
   * Trigger new push on pusher::trigger event by any hook. The passed data
   * should be an object, containing all the necessary attributes to call
   * .trigger function (see annotation bellow).
   */
  this.on("**::pusher::trigger", function(data, callback) {
    self.trigger(data.channel, data.event, data.payload, data.socketId, callback);
  })
}

util.inherits(Pusher, Hook);

/*
 * Initialize Pusher library.
 */
Pusher.prototype._init = function() {
  this.pusher = new PusherLib({
    appId: this['appId'],
    key: this['key'],
    secret: this['secret']
  });
}

/*
 * Trigger an event on a given Pusher channel. Optionally can specify
 * socketId to prevent getting message for itself.
 *
 * @param {String} Channel name to push event to.
 * @param {String} Event name.
 * @param {Object} Event payload to be parsed to JSON and sent to Pusher.
 * @param {socketId} Unique identifier of the socket to be excluded to receive
 *                   event. Its handy to be used in case the event was initialized
 *                   on behalf of client, which doesn't wanna get notifacation back
 *                   from pusher again.
 * @param {Function} Callback function(err, data) to be called after push is done.
 */
Pusher.prototype.trigger = function(channel, event, data, socketId, callback) {
  this.pusher.trigger(channel, event, data, socketId, function(err, req, res) {
    callback.call(null, err, res);
  });
}