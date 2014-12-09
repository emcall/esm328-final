

var fs = require('fs');
var colors;
fs.readFile('colors.json', {'encoding':'utf-8'}, function(err, data) {
	if (err) {
		console.log('failed lookup');
	} else {	
	colors = JSON.parse((data));
		}
});	
	
var selectColor = function(){	

	this.style.border = "2px solid #000000";
	//TODO REMOVE PREVIOUS BORDER
	if(this.slot == "primary"){
		primary = this.num;
		}
	else if(this.slot == "secondary"){
		secondary = this.num;
		}
	else{
		tertiary = this.num;
		}		
	}//end selectColor
	
//color list is our JSON of every available color. ColorSlot is primary, secondary, or tertiary.
function generateColorBox(colorList, colorSlot){		
//foreach in colorlist		

	colorList.forEach( function(element, index, array){
		var newBox = document.createElement('div');
		newBox.textContent = element.color;
		newBox.className = 'colorbox';
		newBox.num = element.num;
		newBox.slot = colorSlot;
		newBox.style.color = element.textcolor;
		newBox.style.background = element.hex;
		newBox.addEventListener('click', selectColor);
		document.getElementById(colorSlot).appendChild(newBox);
	}); //end forEach
	
}//end generateColorBox



//main

//TEMP
var myColors = [{ "color" : "Midnight", "textcolor" : "white", "hex" : "#292b38", "num" : 0 }, 
{ "color" : "Shadow", "textcolor" : "white", "hex" : "#3a2e44", "num" : 1 }];
var primary, secondary, tertiary;

generateColorBox(myColors, "primary");
generateColorBox(myColors, "secondary");
generateColorBox(myColors, "tertiary");