
var boardPosition = $('.flipswitch-inner').is(":checked");

function flipswitch() {
	boardPosition = !boardPosition;
	setBoardPosition();
}

function setBoardPosition() {
	if(boardPosition) {
		$(".mainInfo").css('float', 'left');
	}
	else {
		$(".mainInfo").css('float', 'right');
	}
}