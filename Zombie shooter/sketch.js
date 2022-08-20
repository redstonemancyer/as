var citybackground
var background
var shooter
var shooting
var zombie
var heart1
var heart2
var heart3
var heart 
var life = 3
var bullet
var gameState = "Fight"
var bullets = 50
var score = 0

function preload(){
citybackground = loadImage("CityBackground.jpeg")
zombieImg = loadImage("Zombie.png")
shooterImg = loadImage("shooter_1.png")
shootingImg = loadImage("shooter_2.png")
heart1Img = loadImage("heart1.png")
heart2Img = loadImage("heart2.png")
heart3Img = loadImage("heart3.png")
bulletImg = loadImage("bullet.png")
explosion = loadSound("assets_explosion.mp3")
}


function setup() {
  createCanvas(windowWidth,windowHeight);

 bg = createSprite(windowWidth/2,windowHeight/2)
 bg.addImage(citybackground)
 bg.scale = 1.4

 shooter = createSprite(250,800)
 shooter.addImage(shooterImg)
 shooter.scale = .7
 shooter.setCollider("rectangle",0,0,200,500)

 heart = createSprite(1600,100)
 heart.addImage(heart3Img)
 heart.scale = .2

 heart1 = createSprite(1600,100)
 heart1.addImage(heart1Img)
 heart1.scale = .2
 heart1.visible = false

 heart2 = createSprite(1600,100)
 heart2.addImage(heart2Img)
 heart2.scale = .2
 heart2.visible = false





zombieGroup = new Group()
bulletGroup = new Group()

}

function draw() {
  background("black")
  drawSprites();

  

if(gameState == "Fight"){
  if(life == 3){
    heart.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life == 2){
    heart.visible = false 
    heart1.visible = false
    heart2.visible = true
  }
  if(life == 1){
    heart.visible = false
    heart1.visible = true
    heart2.visible = false
  }
  if(life == 0){
    gameState = "End"
  }
  if(score == 100){
    gamestate = "Won"
  }
  if(bullets == 0){
    gameState = "Bullet"
  }
  if(keyWentDown("space")){
    shooter.addImage(shootingImg)
    bullet = createSprite(shooter.x+100,745)
    bullet.addImage(bulletImg)
    bullet.scale = .1
    bullet.velocityX = 20
    bullets = bullets-1
    bulletGroup.add(bullet)
    explosion.play()
  }
  else if(keyWentUp("space")){
    shooter.addImage(shooterImg)
  }                           

  if(keyDown("left_arrow")){
    shooter.x = shooter.x-2
  }

  if(keyDown("right_arrow")){
    shooter.x = shooter.x+2
  }


  if(zombieGroup.isTouching(shooter)){
    for(var i=0;i<zombieGroup.length;i=i+1){
      zombieGroup[i].destroy()
      life = life-1
    }
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i=i+1){
      if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+2
    }
  }
}
  spawnZombies()

  


}

textSize(50)
fill("red")
text("Score = "+score,200,100)


text("Bullets = "+bullets,700,100)

text("life = "+life,1200,100)

  if(gameState == "End"){
    textSize(50)
    fill("red")
    text("You Lose")
    zombieGroup.destroyEach()
    shooter.destroy()
    bulletGroup.destroyEach()
  }
  else if(gameState == "Won"){
    textSize(50)
    fill("blue")
    text("You Won!!!")
    zombieGroup.destroyEach()
    shooter.destroy()
    bulletGroup.destroyEach()
  }
  else if(gameState == "Bullet"){
    textSize(50)
    fill("red")
    text("You ran out of bullets")
    zombieGroup.destroyEach()
    shooter.destroy()
    bulletGroup.destroyEach()
  }
  
  
  
}

function spawnZombies(){
  if(frameCount%60 == 0){
  zombie = createSprite(random(1000,1700),random(650,800))
  zombie.addImage(zombieImg)
  zombie.scale = 1.6
  zombie.velocityX = -3
  zombie.lifetime = 500
  zombieGroup.add(zombie)
  zombie.setCollider("rectangle",-30,0,100,200)
  }
  
}