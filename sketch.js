var play = 1;
var end = 0;
var gameState = play; 
var tower, towerimg;
var ghost, ghostimg;
var door, doorimg, doorgroup;
var climber, climberimg, climbergroup;
var invisibleBlockGroup, invisibleBlock;

function preload(){
  
  towerimg = loadImage("tower.png");
  ghostimg = loadImage("ghost-standing.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300, 300,300);
  tower.addImage(towerimg);
  tower.velocityY = 1;
  ghost = createSprite(300,400,20,10);
  ghost.addImage(ghostimg);
  ghost.scale = 0.4;
  doorgroup = new Group();
  climbergroup = new Group();
  invisibleBlockGroup = new Group();


}

function draw(){
  background ("white");

  if (tower.y>400){
    tower.y = 300;
  }
  
  if (keyDown("SPACE")){
    
    ghost.velocityY = -5;
    
  }
 ghost.velocityY = ghost.velocityY + 0.8 
  
  if (keyDown("RIGHT")){
    ghost.x = ghost.x + 2;
    
  }
  
  if (keyDown("LEFT")){
    
    ghost.x = ghost.x - 2; 
  }
  
  if (climbergroup.isTouching(ghost)){
    ghost.velocityY = 0;
    ghost.velocityX = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = end
    }
  
   if (gameState === end){
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    tower.velocityY = 0;
    doorgroup.setVelocityYEach(0);
   invisibleBlockGroup.setVelocityYEach(0);
    climbergroup.setVelocityYEach(0);
  }
  doors();
  drawSprites();
  
}

function doors(){
  
  if (frameCount%200===0){
    
    door = createSprite(250,-10, 10 ,20);
    door.addImage(doorimg);
    door.velocityY = 1;
    door.x = Math.round(random(100,400));
    door.lifetime = 600;
    doorgroup.add(door);
    climber = createSprite(250,50,10,20);
    climber.addImage(climberimg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.liftime = 600;
    climbergroup.add(climber);
    ghost.depth = door.depth + 1; 
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
  
  
  
  
  
  
}