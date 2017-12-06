function setup()
{
  createCanvas(500,500);
}
function draw()
{
  f();
}
function f()
{
  background(0);
  var x=0;
  var y=250;
  ellipse(x,y,30,30);
}
function touchStarted()
{
  background(128);
}
