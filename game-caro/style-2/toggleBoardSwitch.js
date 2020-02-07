var leftBoard = false;
var rightBoard = true;

function toggleBoardLeft() {
	toggleCheckbox(document.getElementById('toggleBoardRight'));	
	leftBoard = !leftBoard;
	rightBoard = !rightBoard;
}

function toggleBoardRight() {
	toggleCheckbox(document.getElementById('toggleBoardLeft'));	
	leftBoard = !leftBoard;
	rightBoard = !rightBoard;
}

function toggleCheckbox(element)
 {
   element.checked = !element.checked;
 }

 function setBoardPosition() {
 	if (leftBoard == true) {
 		$(".mainInfo").css('float', 'left');
 	}
 	if (rightBoard == true) {
		$(".mainInfo").css('float', 'right');
 	}
 }