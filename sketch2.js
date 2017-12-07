var broadcast;
var cell=[];
function setup()
{
	createCanvas(windowWidth,windowHeight);
	broadcast=new BROADCAST();
	for(var i=0;i<30;i++)
	{
		cell[i]=[];
		for(var j=0;j<30;j++)
		{
			cell[i][j]=new CELL(i,j,1,0);
		}
	}
}
function draw()
{
	var i,j;
	background(255);
	broadcast.renew();
	if(broadcast.isMousePress)
	{
		for(i=0;i<30;i++)
		{
			for(j=0;j<30;j++)
			{
				if(cell[i][j].isMouseOn()) cell[i][j].switch=!(cell[i][j].switch);
			}
		}
	}
	for(i=0;i<30;i++)
	{
		for(j=0;j<30;j++)
		{
			cell[i][j].draw();
		}
	}
}
function mousePressed()
{
	broadcast.isMousePress=true;
}

function CELL(i,j,kind,who)
{
	/**
	 *
	 * @var {object} index	각 셀의 인덱스 no.
 	 * @var {float} x	셀 중심의 x좌표
	 * @var {float} y	셀 중심의 y좌표
	 * @var {float} r	셀의 반지름
	 * @var {int} kind	셀의 타입
				0:빈 공간
				1:이동 가능 셀
				2:이동 불가 셀
				3:베이스
				4:서브베이스
				5:벽
	 * @var {int} who	셀의 진영
				1:플레이어/1P
				2:상대/2P
				0:중립
				-1:칠할 수 없음
	 *
	 */
	this.index={i:i,j:j};
	this.x=45*(1.5*this.index.j+1);
	this.y=45*cos(PI/6)*(2*this.index.i+2-this.index.j%2);
	this.kind=kind;
	this.who=who;
	this.r=30;
	if(this.kind==3) this.r=40;
	this.switch=false;
}
CELL.prototype.draw=function()
{
	var pos=createVector(this.x,this.y);
	var edge=createVector(this.r,0);
	var p=createVector();
	if(this.switch) fill("#ffff00");
	else fill("#555555");
	beginShape();
	for(var i=0;i<6;i++)
	{
		p=p5.Vector.add(edge,pos);
		vertex(p.x,p.y);
		edge.rotate(PI/3);
	}
	endShape(CLOSE);
}
CELL.prototype.isMouseOn=function()
{
	var mousePos=createVector(mouseX-this.x,mouseY-this.y);
	var edge=createVector(this.r,0);
	var theta=0;
	for(var i=0;i<6;i++)
	{
		var v1=p5.Vector.sub(edge,mousePos);
		edge.rotate(PI/3);
		var v2=p5.Vector.sub(edge,mousePos);
		theta+=v1.angleBetween(v2);
	}
	return abs(theta-TWO_PI)<0.00001;
}

function BROADCAST()
{
	this.isMousePress=false;
	this.wasMousePress=false;
}
BROADCAST.prototype.renew=function()
{
	if(this.wasMousePress)
	{
		this.isMousePress=false;
		this.wasMousePress=false;
	}
	else if(this.isMousePress) this.wasMousePress=true;
}
