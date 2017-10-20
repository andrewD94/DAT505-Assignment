var express = require ('express');
var socket = require ('socket.io');
var app = express();
var server = app.listen(5000);
app.use(express.static('public'));
console.log('node is running server now');

var io = socket(server);
io.sockets.on('connection', newConnection);

var five = require ("johnny-five");
var MotionSeen = false;
five.Board().on("ready", function(){
    sensor = new five.Motion(5);
    
    sensor.on("calibrated", function(){
        console.log("calibrated", Date.now());
    });
    
    sensor.on("motionstart", function(){
        console.log("motionstart", Date.now());
        console.log("data sent")
            io.sockets.emit('MotionSeen', MotionSeen);
    });
});

function newConnection(socket){
    console.log('New Connection: ' + socket.id);
    io.sockets.emit('MotionSeen', MotionSeen)
}
    