var database;
var balloon,balloon_Animation;
var bg_Image;
var position;

function preload(){

  balloon_Animation = loadAnimation("balloon.png");

  bg_Image = loadImage("background.png");

}
function setup() {
  createCanvas(1700,850);

  database = firebase.database();
  console.log(database);

  balloon=createSprite(250,500);
  balloon.addAnimation("hotAirBalloon",balloon_Animation);
  balloon.scale=0.6;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);
  
}

function draw() {
  background(bg_Image);

  textSize(35);
  fill("#00fff6");
  strokeWeight(3);
  stroke("#ffc551");
  text("Use arrow keys to move Hot Air Balloon",100,40);


  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloon_Animation);
    balloon.scale = balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
    balloon.addAnimation("hotAirBalloon",balloon_Animation);
    balloon.scale = balloon.scale+0.01;
  }

  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}