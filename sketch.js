var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0, count = 0;
var scoreState = 'end';
var gameState = 'play';

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k += 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }
}

function draw() {
  background("black");

  textSize(30)
  text("Score : "+score,15,35);
  for(var i = 15; i < width; i+=80) {
    if(i < 260) {
    text("500",i,530);
    } else if(i >= 260 && i < 580) {
      text("100",i,530);
    } else {
      text("200",i,530);
    }
  }

  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
    if(particles[j].body.position.y>height-divisionHeight) {
      scoreState = 'start';
      scorePoints(particles[j]);
      particles.pop(particles[j]);
    }
  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(gameState === 'end') {
    textSize(100);
    text("GAME OVER",100,162);
  }
}

function mousePressed() {
  if(mouseY<375 && count <= 4) {
    particles.push(new Particle(mouseX, mouseY, 10,10));
  }
  else {
    gameState = 'end';
  }
  count++
}

function scorePoints(p) {
  if(scoreState = 'start') {
    if(p.body.position.x <= 240 && p.body.position.x >= 0) {
      score += 500;
    } else if(p.body.position.x > 240 && p.body.position.x < 560) {
      score += 100;
    } else if(p.body.position.x >= 560 && p.body.position.x < 800) {
      score += 200;
    }
  }
  scoreState = 'end';
}