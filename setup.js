window.addEventListener('resize',changeSize);
function changeSize(){
		resizeCanvas(lightbox.offsetWidth, lightbox.offsetHeight, true);
}


function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.parent("loader"); 
		angleMode(DEGREES);
		lightbox = document.getElementById('loader');
		changeSize();
}

function draw(){
  background(255, 219, 112);
  cupLoader(width/2,height/2,50);
}

function cupLoader(x,y,s){
  fill(255, 160,0);
  var cy = constrain(10*sin(frameCount)+height/2,y-s+(s/5),y+s);
  var cx = (((y+s)-cy)/10)+(s/2);
  noStroke();
  quad(x-(s/2),y+s,x+(s/2),y+s,x+cx,cy,x-cx,cy);
  
  beginShape();
  curveVertex(x,y+s);
  curveVertex(x-cx,cy);
  for(var i = x-cx+(s/10); i < x+cx-(s/10); i++){
    curveVertex(i,cy-(noise(i/150+frameCount/100)*(s/5)));
  }
  curveVertex(x+cx,cy);
  curveVertex(x,y+s);
  endShape(CLOSE);

  stroke(255);
  noFill();
  strokeWeight(s/5);
  beginShape();
  vertex(x-(s/1.4),y-s);
  vertex(x-(s/2),y+s);
  vertex(x+(s/2),y+s);
  vertex(x+(s/1.4),y-s);
  endShape();
}