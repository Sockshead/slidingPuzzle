// Variables definition
let ul = document.querySelectorAll("li");
// Solution Array
let sol = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
// Copy of Solution Array, which will be radomized later on
var cSol = [...sol];
// Position Array which will be assigned to the list item id's
let pos = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"];
var mon = [];
var mix = [];

function setUp() {
	console.log("Sliding Puzzle game made in pure JS, HTML & CSS by Juan Camilo Posada - https://github.com/Sockshead \n inspired by the Formula 1 racing team Mercedes AMG Petronas");
	// Assign id to the list items on HTML
	for (let i = 0; i < ul.length; i++) {
		ul[i].setAttribute("id", pos[i]);
	}

	for (let i = 0; i < pos.length; i++) {
		document.getElementById(pos[i]).style.pointerEvents = "auto";
	}

	randomize();

	// Check if puzzle is unsolvable, if this happens, remix the puzzle until it's solvable
	while (!checkSolvable(mix)) {
		mix = cSol.sort(function () {
			return Math.random() - 0.5;
		});
	}

	// Assign the randomized solution Array to the list items
	for (let i = 0; i < mix.length; i++) {
		document.getElementById(pos[i]).className = mix[i];
	}
}

// Randomize the copy of the solution Array
function randomize() {
	mix = cSol.sort(function () {
		return Math.random() - 0.5;
	});
}

function move(tPos) {
	// Runs the function after a .5s timeout so in case the puzzle is solved it alerts the user that he solved the puzzle and won the game
	setTimeout(checkStatus(), 500);

	// Variable def of the tile that was clicked
	var temp = document.getElementById(tPos).className;
	var aPos = document.querySelector("." + temp).id;
	var nPos = document.querySelector(".c9").id;

	// Convert position String into int
	var actualP = aPos.replace("p", " ");
	var nextP = nPos.replace("p", " ");

	// Check if the actual position of the piece has an adjacent empty tile
	var limit = actualP - nextP;

	// If the piece has an adjacent empty tile, it will move to it
	if (limit == 3 || limit == -3 || limit == 1 || limit == -1) {
		document.getElementsByClassName("c9")[0].className = temp;
		document.getElementById(tPos).className = "c9";
	}
}

function checkStatus() {
	// Checks the status of the game board
	//console.log("La solución debe ser: " + sol);
	for (let i = 0; i < pos.length; i++) {
		mon[i] = document.getElementById(pos[i]).className;
	}
	//console.log("Posiciones actuales: " + mon);

	/* 
        Checks if the Monitor Array is ordered in the same way as the Solution Array, 
        if so happens, the page shows an alert to the user and disables the onnclick function of the list items in HTML
    */
	if (arraysEqual(sol, mon)) {
		alert("Congratulations, you win!");
		for (let i = 0; i < pos.length; i++) {
			document.getElementById(pos[i]).style.pointerEvents = "none";
		}
	}
}

function arraysEqual(_arr1, _arr2) {
	if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) return false;

	for (var i = 0; i < _arr1.length; i++) {
		if (_arr1[i] !== _arr2[i]) return false;
	}

	return true;
}

function checkSolvable(mixedArr) {
	//console.log("Checking if puzzle is solvable...");
	var inversions = 0;

	for (var i = 0; i < mixedArr.length; i++) {
		for (var j = i + 1; j < mixedArr.length; j++) {
			if (mixedArr[j] > mixedArr[i]) {
				inversions++;
			}
		}
	}

	if (inversions % 2 == 1) {
		//console.log("It's Unsolvable");
		return false;
	} else {
		//console.log("It's Solvable");
		return true;
	}
}

// Re-run of setup function to reactive onClick function and remix the puzzle to keep playing!
function restart() {
	setUp();
}
