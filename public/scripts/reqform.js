/*var fs = require('fs');
var colors;
fs.readFile('colors.json', {'encoding':'utf-8'}, function(err, data) {
	if (err) {
		console.log('failed lookup');
	} else {	
	colors = JSON.parse((data));
		}
});	
*/

	
var selectColor = function(){	

	this.style.border = "2px solid #000000";
	//TODO REMOVE PREVIOUS BORDER
	if(this.slot == "primary"){
		document.getElementById('p').value = this.num;
		}
	else if(this.slot == "secondary"){

		document.getElementById('s').value = this.num;
		}
	else{
		document.getElementById('t').value = this.num;
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
var myColors =
[
{ "num" : 1, "color" : "Maize", "textcolor" : "black", "hex" : "#fffdea" },
{ "num" : 2, "color" : "White",  "textcolor" : "black", "hex" : "#FFFFFF" },
{ "num" : 3, "color" : "Ice",  "textcolor" : "black", "hex" : "#dae0f3" }, 
{ "num" : 4, "color" : "Platinum", "textcolor" : "black", "hex" : "#c8bece" },
{ "num" : 5, "color" : "Silver", "textcolor" : "black", "hex" : "#bbbabf" },
{ "num" : 6, "color" : "Grey",  "textcolor" : "white", "hex" : "#7e7e7e" },
{ "num" : 7, "color" : "Charcoal",  "textcolor" : "white", "hex" : "#545454" },
{ "num" : 8, "color" : "Coal", "textcolor" : "white", "hex" : "#4b4946" },
{ "num" : 9, "color" : "Black",  "textcolor" : "white", "hex" : "#333333" },
{ "num" : 10, "color" : "Obsidian", "textcolor" : "white", "hex" : "#000" }, 
{ "num" : 11, "color" : "Midnight", "textcolor" : "white", "hex" : "#292b38" }, 
{ "num" : 12, "color" : "Shadow", "textcolor" : "white", "hex" : "#3a2e44" }, 
{ "num" : 13, "color" : "Mulberry", "textcolor" : "white", "hex" : "#6e235d" }, 
{ "num" : 14, "color" : "Thistle",  "textcolor" : "white", "hex" : "#8f7c8b" }, 
{ "num" : 15, "color" : "Lavender", "textcolor" : "white", "hex" : "#cca4e0" },
{ "num" : 16, "color" : "Purple",  "textcolor" : "white", "hex" : "#a261cf" },
{ "num" : 17, "color" : "Violet",  "textcolor" : "white", "hex" : "#643f9c" }, 
{ "num" : 18, "color" : "Royal",  "textcolor" : "white", "hex" : "#4d2c89" },
{ "num" : 19, "color" : "Storm", "textcolor" : "white", "hex" : "#757adb" }, 
{ "num" : 20, "color" : "Navy", "textcolor" : "white", "hex" : "#212b5f" }, 
{ "num" : 21, "color" : "Blue",  "textcolor" : "white", "hex" : "#324ba9" },
{ "num" : 22, "color" : "Splash", "textcolor" : "white", "hex" : "#6394dd" },
{ "num" : 23, "color" : "Sky",    "textcolor" : "black", "hex" : "#aec8ff" }, 
{ "num" : 24, "color" : "Stonewash", "textcolor" : "white", "hex" : "#7996c2" },
{ "num" : 25, "color" : "Steel",   "textcolor" : "white", "hex" : "#556979" }, 
{ "num" : 26, "color" : "Denim", "textcolor" : "white", "hex" : "#2f4557" },
{ "num" : 27, "color" : "Azure",  "textcolor" : "white", "hex" : "#052343" },
{ "num" : 28, "color" : "Caribbean", "textcolor" : "black", "hex" : "#0086ce" },
{ "num" : 29, "color" : "Teal", "textcolor" : "black", "hex" : "#2b768f" }, 
{ "num" : 30, "color" : "Aqua",  "textcolor" : "black", "hex" : "#72c4c4" },
{ "num" : 31, "color" : "Seafoam", "textcolor" : "black", "hex" : "#aaf1b1" }, 
{ "num" : 32, "color" : "Jade", "textcolor" : "white", "hex" : "#61ab89" },
{ "num" : 33, "color" : "Emerald", "textcolor" : "white", "hex" : "#20603f" }, 
{ "num" : 34, "color" : "Jungle",  "textcolor" : "white", "hex" : "#1e361a" }, 
{ "num" : 35, "color" : "Forest",  "textcolor" : "white", "hex" : "#425035" }, 
{ "num" : 36, "color" : "Swamp", "textcolor" : "white", "hex" : "#687f67" },
{ "num" : 37, "color" : "Avocado", "textcolor" : "white", "hex" : "#567c34" },
{ "num" : 38, "color" : "Green", "textcolor" : "white", "hex" : "#629c3f" },
{ "num" : 39, "color" : "Leaf", "textcolor" : "black", "hex" : "#a5e32d" },
{ "num" : 40, "color" : "Spring", "textcolor" : "black", "hex" : "#a9a032" },
{ "num" : 41, "color" : "Goldenrod",  "textcolor" : "black", "hex" : "#948647" },
{ "num" : 42, "color" : "Lemon", "textcolor" : "black", "hex" : "#ffe63b" },
{ "num" : 43, "color" : "Banana", "textcolor" : "black", "hex" : "#fdff72" }, 
{ "num" : 44, "color" : "Ivory", "textcolor" : "black", "hex" : "#ffd297" },
{ "num" : 45, "color" : "Gold", "textcolor" : "black", "hex" : "#e8af49" }, 
{ "num" : 46, "color" : "Sunshine", "textcolor" : "black", "hex" : "#fa912b" }, 
{ "num" : 47, "color" : "Orange",  "textcolor" : "black", "hex" : "#d5602b" }, 
{ "num" : 48, "color" : "Fire", "textcolor" : "black", "hex" : "#ef5c23" }, 
{ "num" : 49, "color" : "Tangerine", "textcolor" : "black", "hex" : "#ff7360" },
{ "num" : 50, "color" : "Sand",  "textcolor" : "black", "hex" : "#b27749" }, 
{ "num" : 51, "color" : "Beige",  "textcolor" : "black", "hex" : "#cabba2" },
{ "num" : 52, "color" : "Stone", "textcolor" : "black", "hex" : "#969182" }, 
{ "num" : 53, "color" : "Slate",  "textcolor" : "white", "hex" : "#564d48" }, 
{ "num" : 54, "color" : "Soil", "textcolor" : "white", "hex" : "#5a4534" },
{ "num" : 55, "color" : "Brown", "textcolor" : "white", "hex" : "#755136" }, 
{ "num" : 56, "color" : "Chocolate", "textcolor" : "white", "hex" : "#48260e" },
{ "num" : 57, "color" : "Rust", "textcolor" : "white", "hex" : "#8b3220" }, 
{ "num" : 58, "color" : "Tomato",  "textcolor" : "white", "hex" : "#ba311c" },
{ "num" : 59, "color" : "Crimson",  "textcolor" : "white", "hex" : "#850012" },
{ "num" : 60, "color" : "Blood", "textcolor" : "white", "hex" : "#450f0f" },
{ "num" : 61, "color" : "Maroon", "textcolor" : "white", "hex" : "#652127" }, 
{ "num" : 62, "color" : "Red", "textcolor" : "white", "hex" : "#c1272d" }, 
{ "num" : 63, "color" : "Carmine",  "textcolor" : "white", "hex" : "#b13a3a" },
{ "num" : 64, "color" : "Coral",  "textcolor" : "black", "hex" : "#cc6f6f" }, 
{ "num" : 65, "color" : "Magenta", "textcolor" : "white", "hex" : "#e934aa" },
{ "num" : 66, "color" : "Pink", "textcolor" : "black", "hex" : "#e77fbf" }, 
{ "num" : 67, "color" : "Rose", "textcolor" : "black", "hex" : "#ffd6f6" }

]
;
generateColorBox(myColors, "primary");
generateColorBox(myColors, "secondary");
generateColorBox(myColors, "tertiary");