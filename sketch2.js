var broadcast;
var r=false;
var pp=0;
var cell, cell2;
function setup()
{
	createCanvas(500,500);
	broadcast=new BROADCAST();
	cell=new CELL(3,3,3,0);
	cell2=new CELL(3,4,1,0);
}
function draw()
{
	broadcast.renew();
	if(broadcast.isMousePress)
	{
		if(cell.isMouseOn()) r=!r;
		if(cell2.isMouseOn()) pp++;
	}
	if(r) background(0);
	else background(128);
	cell.draw();
	cell2.draw();
	console.log(pp)
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
}
/**
 *
 * 지정된 위치에 셀을 화면에 그림
 *
 */
CELL.prototype.draw=function()
{
	var pos=createVector(this.x,this.y);
	var edge=createVector(this.r,0);
	var p=createVector();
	beginShape();
	for(var i=0;i<6;i++)
	{
		p=p5.Vector.add(edge,pos);
		vertex(p.x,p.y);
		edge.rotate(PI/3);
	}
	endShape(CLOSE);
}
/**
 *
 * 셀에 마우스가 닿았는지를 체크
 *
 * @return {boolean}	마우스가 닿았는지의 여부
 *
 */
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
