var express = require('express');
var socket = require ('socket.io');
var app = express();
//var board = new five.Board();
//var mongoose = require('mongoose');
//var db = mongoose.connection;
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017');
var server = app.listen(5000);
app.use(express.static('public'));
console.log("node is running on port 5000");
var io = socket(server);
io.sockets.on('connection', newConnection);

var five = require ("johnny-five");
var MotionSeen = false;
/*
db.once('open', function(){
    var TempSchema = mongoose.Schema({
    temperature: String,
        date: {type: Date, default: Date.now}
    });
var motionDec = mongoose.model('MovementInRoom', TempSchema);
*/
console.log('server test?')
five.Board().on ("ready", function(){
    motion = new five.Motion(5);
    
    motion.on("calibrated", function(){
        console.log("calibrated", Date.now());
    });
    
    motion.on("motionstart", function(){
        console.log("motionstart", Date.now());
 //       var Temp_rec = motionDec ({temperature: this.motion + "movement"});
//        Temp_rec.save(function (err, Temp_rec){
//            if(err) return console.error(err);
            
            io.sockets.emit('MotionSeen', MotionSeen);
            console.log("data sent")
//        }); 
//       Temp_rec.save(function (err, Temp_rec ) 
//        if (err) return console.error(err);
//        });

    });
    
//    motion.on("motionSeen", function(){
//        });
    });
function newConnection(socket){
    console.log('New Connection: ' + socket.id);
    io.sockets.emit('MotionSeen', MotionSeen);
}    
