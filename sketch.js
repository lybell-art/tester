function setup() {
	createCanvas(400, 400);
	grid();
	background(0);
	console.log(screenControl.set, screenControl.move);
	screenControl.set(400,400);
	background(60);
	console.log(1);
} 

function draw() { 
	background(255);
	console.log(screenControl.w);
	screenControl.setScreen();
	grid();
}
function mouseWheel(event)
{
	var newZoom=screenControl.zoom+0.001*event.delta;
	screenControl.zoom(newZoom,mouseX,mouseY);
}

function grid()
{
	for(var i=0;i<40;i++)
	{
		for(var j=0;j<40;j++)
		{
			rect(i*10,j*10,10,10);
		}
	}
}

var screenControl=(function()
{
	this.w=0;
	this.h=0;
	this.ox=0;
	this.oy=0;
	this.zoom=1;
	this.set=function(w,h)
	{
		this.w=w;
		this.h=h;
		this.ox=(width-w)/2;
		this.oy=(height-h)/2;
	}
	this.move=function(dx,dy)
	{
		this.ox+=dx;
		this.oy+=dy;
	}
	this.zoom=function(newZoom,pinX,pinY)
	{
		var ratio=newZoom/this.zoom;
		this.ox=pinX-(pinX-this.ox)*ratio;
		this.oy=pinY-(pinY-this.oy)*ratio;
		this.zoom=newZoom;
	}
	this.setScreen=function()
	{
		translate(this.ox,this.oy);
		translate(this.zoom);
	}
	this.relativeMouse=function()
	{
		var res=createVector((mouseX-this.ox)/this.zoom,(mouseY-this.oy)/this.zoom);
		return res;
	}
})();
