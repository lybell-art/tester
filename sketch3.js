function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  f();
	background(255);
	console.log("ddd");
}

function f()
{
	background(128);
	while(true)
	{
		if(mouseIsPressed) return;
		console.log("ccc");
	}
}
