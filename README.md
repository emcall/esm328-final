
Description:
	This site would have been a complement to the game Flight Rising, where players can buy and sell virtual pet dragons with a variety of characteristics such as breed, colors, and genes. Players who are looking for a dragon with specific requirements would be able to post a wanted ad detailing what they are looking for. Players who have a rare dragon can post an ad detailing what they have for sale. Before posting either ad, the program will search the database to see if there is already a match.

While working on this project, Flight Rising introduced a more robust search system which allows users to save searches. As a result, I decided this project was no longer necessary.

Schemas:
	Wanted Dragons: Player refers to the name of the person requesting this dragon, and references the player schema. Breed, element, and genes have limited options. Sex is 0 for female and 1 for male. There are 67 colors, stored by number for convenience. All dragons have 3 colors and 3 genes, all separate from one another.

var WantedDragonSchema = new mongoose.Schema({ 
	player: String, 
	breed: {type:String, enum: ['guardian', 'tundra', ...etc]},
	sex: Boolean,
	element: {type:String, enum: ['fire', 'ice' ...etc]},
	primary: number,
	secondary: number,
	tertiary: number,
	pgene: type:String, enum: ['basic', 'speckle', ...etc]},
	sgene: type:String, enum: ['basic', 'stripes', ...etc]},
	tgene: type:String, enum: ['basic', 'underbelly', ...etc]}
	});
	
Dragons for Sale: This would extend the Wanted Dragon schema, with a few differences: it would also include the asking price, and the ID number (from Flight Rising, not me) of the dragon so that it can be linked to and the image displayed. 

Player Accounts: Contains the players username, ID number, a password for this site (not their Flight Rising password), and a list of references to their wanted and sale dragons.

var AccountSchema = new mongoose.Schema({
	username : String,
	password : String (hashed),
	userID: number,
	requests: [WantedDragon],
	sales:  [SaleDragon]
	)};
	

![Wireframe/Site Map](/documentation/wireframe.png?raw=true "Site Map and Wireframe")
	
	

User Stories

As a user looking to buy, I want to search the dragons for sale. If there are no dragons in the sales database, I want my request to be added to the wanted database.
As a user looking to sell, I want to search the wanted list. If no users have requested a dragon like mine, I want my dragon to be added to the sales database.



Research Topics:
	API - Nope, nevermind about that. I was hoping to include something where a player with a dragon for sale could enter just the ID number and I could pull the rest of the information from the site. Unfortunately not only do they not have any sort of API, but apparently any program that takes any sort of data from the site, even data that is openly available, is strictly forbidden under their "botting" rule. 
	
	Client-Side Form Validation - Registration tests to make sure all fields are properly filled out.
	
	CSS Preprocessor - trying out Sass.
	
