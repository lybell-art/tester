var table;

function setup() {
  table = new p5.Table();
	var i,j;
	for(i=0;i<10;i++) table.addRow();
	for(i=0;i<6;i++) table.addColumn();
  for(i=0;i<10;i++)
  {
    for(j=0;j<6;j++)
    {
      table.set(i,j,random(255));
    }
  }
	for(i=0;i<10;i++)
  {
		console.log("a");
    for(j=0;j<6;j++)
    {
			console.log(table.get(i,j));
    }
  }
}
