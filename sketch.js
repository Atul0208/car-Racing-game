var canvas, backgroundImage;
var score = 0;
var coinGroup;
var gameState = "start";
var gameOver,gameOverImg;
var restart,restartImg;
var car1;
var obs,obsGroup;
var track, car1_img;

function preload(){
trackImg    =   loadImage("../images/track.jpg");
car1_img    =   loadImage("../images/car1.png");
ground      =   loadImage("../images/ground.png");
obImg       =   loadImage("../images/obs.png")
coinImg     =   loadImage("images/coins.jpg")
gameOverImg =   loadImage("images/gameOver.png")
restartImg  =   loadImage("images/restart.png")
}

function setup(){
canvas     = createCanvas(displayWidth - 20, displayHeight-30);
obsGroup   =new Group();
coinGroup  =new Group();
car1       =createSprite(displayWidth/2,displayHeight/2+200,1,1);
car1.addImage(car1_img);  
restart    =createSprite(displayWidth/2-30,100,20,20)

restart.addImage(restartImg)
restart.scale=0.6
gameOver   =createSprite(displayWidth/2-30,car1.y-200,20,20)
gameOver.addImage(gameOverImg)
gameOver.scale=0.8
           
}


function draw(){ 

background("brown")
image(trackImg, 0,-displayHeight*9,displayWidth, displayHeight*10); 
restart.y=car1.y-200
gameOver.y=car1.y-200 
textSize(30)
fill("white")
text("score: " + score,displayWidth-200,car1.y-450)  
      if(gameState==="start"){
          gameOver.visible=false;
          restart.visible=false;
          textSize(30)
          text("Press up arrow to start",displayWidth/2-100,displayHeight/2-200)
          if(keyDown("up")){
          car1.velocityY=-10
          gameState="play"
          }
        }


        if(gameState==="play"){ 
        gameOver.visible=false;
        restart.visible=false;
        spawnObs();
        spawnCoin();
        if(keyDown("left") || touches.length>0){
        car1.x=car1.x-15
        touches=[]
            }
        if(keyDown("right") || touches.length>0){
        car1.x=car1.x+15
        touches=[]
            }
        if(car1.isTouching(obsGroup) || car1.y<-6500){
        gameState="end";
          }
        }else if(gameState==="end"){
               car1.velocityY=0
        obsGroup.setVelocityYEach(0)
        obsGroup.setLifetimeEach(-1)
        coinGroup.setVelocityYEach(0)
        coinGroup.setLifetimeEach(-1)
              gameOver.visible = true;
        restart.visible = true;
        
        if(mousePressedOver(restart)){
        gameState="start"
        score=0;
        car1.y=displayHeight/2+200
        obsGroup.destroyEach()
        coinGroup.destroyEach()
          }
          }
camera.y = car1.y-200;
 
        for (var i = 0;i<coinGroup.length; i++){
          if(coinGroup.get(i).isTouching(car1)){
          coinGroup.get(i).destroy();
          score=score+50
          }
          } 
drawSprites();

}

function spawnObs(){
      if(frameCount%40===0){
      obs=createSprite(100,0,200,200)
      obs.x=Math.round(random(248,1075))
      obs.y=car1.y-random(400,450)
      obs.velocityY=random(7,12)
      obs.addImage(obImg)
      obs.scale=0.5
      obs.lifetime=270
      obsGroup.add(obs);
        }
  
}
function spawnCoin(){
      if(frameCount%80===0){
      coin=createSprite(100,0,200,200)
      coin.x=Math.round(random(248,1075))
      coin.y=car1.y-random(400,450)
      coin.velocityY=2
      coin.addImage(coinImg)
      coin.scale=0.1
      coin.lifetime=270
      coinGroup.add(coin);
      }
}