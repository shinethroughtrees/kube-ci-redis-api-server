const express = require('express');
const redis = require('redis');
const app = express();
const sub = redis.createClient({
    host: 'redis',
    port: 6379
}), pub = redis.createClient({
    host: 'redis',
    port: 6379
});
var msg_count = 0;
app.get('/', (req, res) => {
    pub.publish("a nice channel", `I am sending ${msg_count}th message`);
    res.send("hello world");
} );
app.post('/api/pub', )

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
});

sub.subscribe("a nice channel");
app.listen(8080,() => {
    console.log('server started');
})