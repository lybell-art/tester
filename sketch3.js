function setup() { 
  createCanvas(400, 400);
	textSize(32);
} 

function draw() { 
	
}

function touchStart()
{
	background(255);
	for(var i=0;i<touches.length;i++)
		text(touches[i],0,i*36);
}
