
song="";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY=0;

function preload(){
   song= loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded );
    poseNet.on('pose' , gotPoses);
}
function draw(){
    image(video,0,0,600,500);
   
    fill('#FF0000');
    stroke('FF0000');
    if(scoreRightWrist>0.2){

    
    circle(rightWristX, rightWristY , 20 );

if(scoreRightWrist>0 && scoreRightWrist<=100){
    document.getElementById("speed").innerHTML="Speed = 0.5";
    song.rate(0.5);
}
else if(scoreRightWrist>100 && scoreRightWrist<=200){
    document.getElementById("speed").innerHTML="Speed = 1.0";
    song.rate(1.0);
}
else if(scoreRightWrist>200 && scoreRightWrist<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5";
    song.rate(1.5);
}
else if(scoreRightWrist>300 && scoreRightWrist<=400){
    document.getElementById("speed").innerHTML="Speed = 2.0";
    song.rate(2.0);
}
else if(scoreRightWrist>400 && scoreRightWrist<=500){
    document.getElementById("speed").innerHTML="Speed = 2.5";
    song.rate(2.5);
}}



    if(scoreLeftWrist > 0.2){
    circle(leftWristX , leftWristY , 20 );
    inInumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(inInumberLeftWristY);
    volume = remove_decimals/500 ; 
    document.getElementById('volume').innerHTML="volume = "+ volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("model loaded");
}


 function gotPoses(results){

    if(results.length > 0){
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      scoreLeftWrist = results[0].pose.keypoints[9].score ;
      scoreRightWrist=results[0].pose.keypoints[10].score;
      console.log("score of left wrist  ="+scoreLeftWrist);
      console.log("score of left wrist =" + scoreRightWrist);
    }
    
 }
