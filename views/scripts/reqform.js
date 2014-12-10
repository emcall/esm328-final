

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
var myColors = [
{ "color" : "white", "textcolor" : "black", "hex" : "#FFFFFF" },
{ "color" : "Silver", "textcolor" : "black", "hex" : "#bbbabf" },
{ "color" : "Grey", "textcolor" : "white", "hex" : "#7e7e7e" },
{ "color" : "Stone", "textcolor" : "black", "hex" : "#969182" }, 
{ "color" : "Slate", "textcolor" : "white", "hex" : "#564d48" }, 
{ "color" : "Black", "textcolor" : "white", "hex" : "#333333" },
{ "color" : "Obsidian", "textcolor" : "white", "hex" : "#000" }, 
{ "color" : "Midnight", "textcolor" : "white", "hex" : "#292b38" }, 
{ "color" : "Shadow", "textcolor" : "white", "hex" : "#3a2e44" }, 
{ "color" : "Mulberry", "textcolor" : "white", "hex" : "#6e235d" }, 
{ "color" : "Violet", "textcolor" : "white", "hex" : "#643f9c" }, 
{ "color" : "Thistle", "textcolor" : "white", "hex" : "#8f7c8b" }, 
{ "color" : "Storm", "textcolor" : "white", "hex" : "#757adb" }, 
{ "color" : "Navy", "textcolor" : "white", "hex" : "#212b5f" }, 
{ "color" : "Blue", "textcolor" : "white", "hex" : "#324ba9" },
{ "color" : "Ice", "textcolor" : "black", "hex" : "#dae0f3" }, 
{ "color" : "Steel", "textcolor" : "white", "hex" : "#556979" }, 
{ "color" : "Sky", "textcolor" : "black", "hex" : "#aec8ff" }, 
{ "color" : "Aqua", "textcolor" : "black", "hex" : "#72c4c4" },
{ "color" : "Azure", "textcolor" : "white", "hex" : "#052343" },
{ "color" : "Caribbean", "textcolor" : "black", "hex" : "#0086ce" },
{ "color" : "Teal", "textcolor" : "black", "hex" : "#2b768f" }, 
{ "color" : "Emerald", "textcolor" : "white", "hex" : "#20603f" }, 
{ "color" : "Forest", "textcolor" : "white", "hex" : "#425035" }, 
{ "color" : "Swamp", "textcolor" : "white", "hex" : "#687f67" },
{ "color" : "Seafoam", "textcolor" : "black", "hex" : "#aaf1b1" }, 
{ "color" : "Green", "textcolor" : "white", "hex" : "#629c3f" },
{ "color" : "Jungle", "textcolor" : "white", "hex" : "#1e361a" }, 
{ "color" : "Spring", "textcolor" : "black", "hex" : "#a9a032" },
{ "color" : "Goldenrod", "textcolor" : "black", "hex" : "#948647" },
{ "color" : "Banana", "textcolor" : "black", "hex" : "#fdff72" }, 
{ "color" : "Gold", "textcolor" : "black", "hex" : "#e8af49" }, 
{ "color" : "Sunshine", "textcolor" : "black", "hex" : "#fa912b" }, 
{ "color" : "Fire", "textcolor" : "black", "hex" : "#ef5c23" }, 
{ "color" : "Orange", "textcolor" : "black", "hex" : "#d5602b" }, 
{ "color" : "Sand", "textcolor" : "black", "hex" : "#b27749" }, 
{ "color" : "Brown", "textcolor" : "white", "hex" : "#755136" }, 
{ "color" : "Chocolate", "textcolor" : "white", "hex" : "#48260e" },
{ "color" : "Tomato", "textcolor" : "white", "hex" : "#ba311c" },
{ "color" : "Crimson", "textcolor" : "white", "hex" : "#850012" },
{ "color" : "Blood", "textcolor" : "white", "hex" : "#450f0f" },
{ "color" : "Rust", "textcolor" : "white", "hex" : "#8b3220" }, 
{ "color" : "Maroon", "textcolor" : "white", "hex" : "#652127" }, 
{ "color" : "Red", "textcolor" : "white", "hex" : "#c1272d" }, 
{ "color" : "Coral", "textcolor" : "black", "hex" : "#cc6f6f" }, 
{ "color" : "Pink", "textcolor" : "black", "hex" : "#e77fbf" }, 
{ "color" : "Ivory", "textcolor" : "black", "hex" : "#ffd297" },
{ "color" : "Maize", "textcolor" : "black", "hex" : "#fffdea" },
{ "color" : "Platinum", "textcolor" : "black", "hex" : "#c8bece" },
{ "color" : "Charcoal", "textcolor" : "white", "hex" : "#545454" },
{ "color" : "Coal", "textcolor" : "white", "hex" : "#4b4946" },
{ "color" : "Lavender", "textcolor" : "white", "hex" : "#cca4e0" },
{ "color" : "Purple", "textcolor" : "white", "hex" : "#a261cf" },
{ "color" : "Royal", "textcolor" : "white", "hex" : "#4d2c89" },
{ "color" : "Splash", "textcolor" : "white", "hex" : "#6394dd" },
{ "color" : "Stonewash", "textcolor" : "white", "hex" : "#7996c2" },
{ "color" : "Denim", "textcolor" : "white", "hex" : "#2f4557" },
{ "color" : "Jade", "textcolor" : "white", "hex" : "#61ab89" },
{ "color" : "Avocado", "textcolor" : "white", "hex" : "#567c34" },
{ "color" : "Leaf", "textcolor" : "black", "hex" : "#a5e32d" },
{ "color" : "Lemon", "textcolor" : "black", "hex" : "#ffe63b" },
{ "color" : "Tangerine", "textcolor" : "black", "hex" : "#ff7360" },
{ "color" : "Beige", "textcolor" : "black", "hex" : "#cabba2" },
{ "color" : "Soil", "textcolor" : "white", "hex" : "#5a4534" },
{ "color" : "Carmine", "textcolor" : "white", "hex" : "#b13a3a" },
{ "color" : "Magenta", "textcolor" : "white", "hex" : "#e934aa" },
{ "color" : "Rose", "textcolor" : "black", "hex" : "#ffd6f6" }
]
;

generateColorBox(myColors, "primary");
generateColorBox(myColors, "secondary");
generateColorBox(myColors, "tertiary");