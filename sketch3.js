function setup() { 
  createCanvas(400, 400);
	fill(0);
} 

function draw() {
}
function touchStarted()
{
	background(255);
	console.log(touches);
	if(touches.length==0) text("no recognization",50,50);
	else text(touches,50,50);
}
function touchEnded()
{
	background(255);
}
