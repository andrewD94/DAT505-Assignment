var socket;
var serial;
var MotionSeen;

function setup (){
    //creating the page
    createCanvas (400,800);
    background (100);
    //connecting to the localhost
    socket = io.connect ('http://localhost:5000');
    socket.on('MotionSeen', newDrawing);
}

function newDrawing(MotionSeen){
    console.log("motionDec");
    
    if(MotionSeen == true){
        
    }
}