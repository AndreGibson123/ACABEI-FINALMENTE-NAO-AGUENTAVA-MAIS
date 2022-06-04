var Trex, TrexRunning, TrexCollided;
var edges;
var ground, groundImage;
var invisibleGround;
var cloud,cloudImage
var cacto, cactoImage1, cactoImage2, cactoImage3, cactoImage4, cactoImage5, cactoImage6
var score=0
var play=1
var end=0
var gameState=play
var cactoGp, cloudGp
var gameover,gameOverimg
var restart,restartimg
var die
var jump
var checkpoint
var record=0


//preload carrega as midías do jogo 
function preload(){
  groundImage=loadImage("ground2.png");
  TrexRunning=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  cloudImage=loadImage("cloud.png");
  cactoImage1=loadImage("obstacle1.png");
  cactoImage2=loadImage("obstacle2.png");
  cactoImage3=loadImage("obstacle3.png");
  cactoImage4=loadImage("obstacle4.png");
  cactoImage5=loadImage("obstacle5.png");
  cactoImage6=loadImage("obstacle6.png");
  TrexCollided=loadAnimation("trex_collided.png");
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkpoint.mp3")





}
//setup faz a configuração
function setup(){
  createCanvas(windowWidth,windowHeight);
  edges=createEdgeSprites();
  

  // criando as bordas
  Trex=createSprite(50, height-40, 20, 50);
  Trex.addAnimation("Running", TrexRunning);
  Trex.scale=0.5;
  Trex.addAnimation("Collided", TrexCollided);
  Trex.debug=false
  
  //Trex.setCollider("circle",0,0,30)
  ground=createSprite(width/2, height-40,width, 2);
  ground.addImage("ground", groundImage);

  invisibleGround=createSprite(width/2, height-20,width, 2)
  invisibleGround.visible=false

  gameover=createSprite(width/2,height-120,100,10)
  gameover.addImage(gameOverimg)
  gameover.scale=0.5
  gameover.visible=false

  restart=createSprite(width/2,height-80,100,1)
  restart.addImage(restartimg)
  restart.scale=0.5 
  restart.visible=false

  cactoGp=new Group ()
  cloudGp=new Group ()
  


}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");

  if (Trex.isTouching(cactoGp)) {
    gameState=end
    //die.play();
  }


  if (gameState==play) {
    score+=Math.round(getFrameRate()/60)
    
    if (score%100==0&&score>0) {
      checkpoint.play();
    }




    if (touches.length>0|| keyDown("space")&&Trex.y>height-45) {
      Trex.velocityY=-12
      jump.play();   
      touches=[]  
    }
    


    ground.velocityX=-(10+score/100);

    if (ground.x<1000){
      ground.x=ground.width/2;
      
    } 

    clouds();
    cactos();
  }

  


  if (gameState==end) {
    Trex.changeAnimation("Collided", TrexCollided);
    ground.velocityX=0
    cactoGp.setVelocityXEach(0)
    cloudGp.setVelocityXEach(0)
    cactoGp.setLifetimeEach(-1)
    cloudGp.setLifetimeEach(-1)
  
    gameover.visible=true

    restart.visible=true

    if (record<score){
      record=score

    }
    if (mousePressedOver(restart)) {
      gameState=play
      restart.visible=false
      gameover.visible=false
      cactoGp.destroyEach();
      cloudGp.destroyEach();
      Trex.changeAnimation("Running",TrexRunning)
      score=0



    }
  }


  

  stroke ("blue")
  fill ("black")
  textAlign (CENTER, TOP)
  textSize (25)
  text("Pontos: "+score,width-524,height-177)
  text("Record: "+record,width-350,height-177)


  Trex.collide(invisibleGround);
  gravity();
   //coordenadas do mouse na tela
  //text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}
function gravity(){
  Trex.velocityY+=0.5;
}

function clouds() {
  if (frameCount%60==0){
    cloud=createSprite(width, random(height-185,height-100), 40, 10)
    cloud.velocityX=-(4+score/100)
    cloud.addImage(cloudImage)
    cloud.scale=random(0.5,1.4)
    cloud.depth=Trex.depth-1
    cloud.lifetime=width/cloud.velocityX
    cloudGp.add(cloud)
  }
}


function cactos() {
  if (frameCount%100==0){
  
    cacto=createSprite(width, height-40, 40, 10)
    cacto.velocityX=-(4+score/100)
    cacto.scale = 0.7
    cacto.lifetime=width/cacto.velocityX
    cactoGp.add(cacto)


    var SorteioC=Math.round(random(1,6));
    switch (SorteioC) {
      case 1: cacto.addImage(cactoImage1)
        break;
        
        case 2: cacto.addImage(cactoImage2)
        break;
        
        case 3: cacto.addImage(cactoImage3)
        break;
        
        case 4: cacto.addImage(cactoImage4)
        break;
        
        case 5: cacto.addImage(cactoImage5)
        break;
        
        case 6: cacto.addImage(cactoImage6)
        break;
    }

  }
}











