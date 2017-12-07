var screenControl;
function setup() {
	createCanvas(600, 600);
	screenControl=new SCREEN_CONTROL(400,400);
}

function draw() { 
	background(255);
	screenControl.setScreen();
	console.log(screenControl.ox, screenControl.oy);
	grid();
}
function mouseWheel(event)
{
	var newZoom=screenControl.zoom+0.001*event.delta;
	screenControl.scale(newZoom,mouseX,mouseY);
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

function SCREEN_CONTROL(w,h)
{
	this.w=w;
	this.h=h;
	this.ox=(width-w)/2;
	this.oy=(height-h)/2;
	this.zoom=1;
}
SCREEN_CONTROL.prototype.move=function(dx,dy)
{
	this.ox+=dx;
	this.oy+=dy;
	this.limit();
}
SCREEN_CONTROL.prototype.scale=function(newZoom,pinX,pinY)
{
	var ratio=newZoom/this.zoom;
	this.ox=pinX-(pinX-this.ox)*ratio;
	this.oy=pinY-(pinY-this.oy)*ratio;
	this.zoom=newZoom;
	this.limit();
}
SCREEN_CONTROL.prototype.limit=function()
{
	var wLimit=width-this.w*this.zoom;
	var hLimit=height-this.h*this.zoom;
	if(wLimit<0) this.ox=constrain(this.ox,wLimit,0);
	else this.ox=wLimit/2;
	if(hLimit<0) this.ox=constrain(this.ox,hLimit,0);
	else this.ox=hLimit/2;
	var zoomMin=min(width/this.w,height/this.h,1);
	this.zoom=constrain(this.zoom,zoomMin,4);
}
SCREEN_CONTROL.prototype.setScreen=function()
{
	translate(this.ox,this.oy);
	scale(this.zoom);
}
SCREEN_CONTROL.prototype.relativeMouse=function()
{
	var res=createVector((mouseX-this.ox)/this.zoom,(mouseY-this.oy)/this.zoom);
	return res;
}
