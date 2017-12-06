var screen="intro";
var x=0;
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
	console.log(screen,"b");
  switch(screen)
	{
		case "intro":intro(); break;
		case "select":selection(); break;
		case "ingame":ingame(); break;
	}
	console.log(screen,"d");
}

function intro()
{
	background(255);
	console.log(key);
  if(keyIsPressed)
  {
    if(key=="x")
    {
      screen="select";
      return;
    }
    if(key=="c")
    {
      screen="ingame";
      return;
    }
  }
}
function selection()
{
	background(128);
	if(mouseIsPressed)
	{
		if(mouseX<width/2)
		{
			screen="intro";
			return;
		}
		else
		{
			screen="ingame";
			return;
		}
	}
}
function ingame()
{
	background(0);
	if(mouseIsPressed)
	{
		screen="intro";
		return;
	}
}
