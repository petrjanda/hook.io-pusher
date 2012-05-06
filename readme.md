# Hook.io hook pushing events to Pusher (pusherapp.com)

## Starting Pusher hook

Hook is available as npm package, so can be installed with ```npm``` command.

  npm install hook.io-pusher

Create instance of the hook while bypassing the necessary configuration for
pusher client.

javascript```
var Pusher = require('hook.io-pusher').Pusher;

var pusher = new Pusher({
  name: 'pusher-hook',
  'pusher-appId': 'your app id',
  'pusher-key': 'pusher API key',
  'pusher-secret': 'pusher secret'
});

pusher.start();
```

## Pushing event

As soon as the Pusher hook is started you are able to push events. Spawn new vanilla hook with ```--repl``` option and try it.

    ./node_modules/hookio/bin/hook --repl

    > hook.emit('pusher::trigger', {channel: 'foo', event: 'say', payload: 'hello!'})




  