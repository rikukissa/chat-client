# Chat client
![screenshot](http://i.imgur.com/FcvpG9f.png)
Minimalistic chat (IRC) client featuring markdown support, some embeds and other features to make the IRC experience more like Flowdock or Slack.

I started this as a tech prototyping thingy and there's also some prototyping to see how an architecture where UI is considered just another IO would turn out.

Currently the stack is ES2015, React and Bacon running on Electron.

## Getting things up and running
- Install [Node.js](http://nodejs.org) (>4.0)

```
 git clone git@github.com:rikukissa/chat-client.git
 cd <your project name>
 npm install
```

First `npm run watch` to start Webpack and then `npm start` to open up the Electron app.
