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
	else text(convertToText(touches),50,50);
}
function touchEnded()
{
	background(255);
}

//This is not my code.
//I referred to this->https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
function convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];
	var prop;
    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        }
        string.push("}");

    //is array
    } else if (typeof(obj) == "object" && (obj.join != undefined)) {
        string.push("[")
        for(prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        string.push("]")

    //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

    //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}
