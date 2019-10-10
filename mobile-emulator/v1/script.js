class Mobile {
	constructor(name, battery, Mess, state, draftMessages) {
		this.name = name;
		this.battery = battery;	
		this.Mess = Mess;
		this.state = state;
		this.draftMessages = draftMessages;
	}

	setBattery(batt) {
		if(batt > 100)
			return 100;
		return batt;
	}

	getBattery() {
		return this.battery;
	}

	setChargeBattery() {
		if (this.battery >= 100){
			this.battery = 100;
		}
		else{
			this.battery += 1;
		}
	}

	setDraft(str) {
		this.draftMessages = str;
	}

	getDraft() {
		if (typeof this.draftMessages != 'undefined')
			return this.draftMessages;
		else
			return null;
	}

	resetDraft() {
		this.draftMessages = null;
	}

	setState(b) {
		this.state = b;
	}

	getState() {
		return this.state;
	}
}

var txtNO = document.getElementById('txtNO');
var txtIP = document.getElementById('txtIP');

var Mess = [];

var nokia = new Mobile();
var iphone = new Mobile();

nokia.name = "nokia";
nokia.battery = 60;
document.getElementById('batteryNO').innerHTML = " " + nokia.getBattery() + "%";
$("#NOKIA .charging").css("display", 'none');
setBatterColor(nokia, "#NOKIA");
nokia.setState(false);

iphone.name = "iphone";
iphone.battery = 25;
document.getElementById('batteryIP').innerHTML = " " + iphone.getBattery() + "%";
$("#IPHONE .charging").css("display", 'none');
setBatterColor(iphone, "#IPHONE");
iphone.setState(false);

var chargeNokia = false;
var chargeiPhone = false;

showHome('#NOKIA');
showHome('#IPHONE')
disableScreen("#NOKIA", true);
disableScreen("#IPHONE", true);

function chatNO() {
	var count = Mess.length + 1;
	if(nokia.getState() == true && txtNO.value.trim().length > 0){
		setSendMess(count, nokia.name, iphone.name, txtNO.value);	
		nokia.resetDraft();
		var text1 = "";
		text1 += "<li class='left clearfix'>";
		text1 += "<span class='chat-img pull-left'>";
		text1 += "<img src='http://placehold.it/50/55C1E7/fff&text=NO' alt='User Avatar' class='img-circle' />";
		text1 += "</span>";
		text1 += "<div class='chat-body clearfix'>";
		text1 += "<div class='header'>";
		text1 += "<strong class='primary-font'>" + iphone.name + "</strong>";
		text1 += "<small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + getToday() + "</small>"
		text1 += "</div>";
		text1 += "<p>" + txtNO.value + "</p>";
		$("#NOKIA .composeNO").append(text1);
	}
}

function chatIP() {
	var count = Mess.length + 1;
	if(iphone.getState() == true && txtIP.value.trim().length > 0){
		setSendMess(count, iphone.name, nokia.name, txtIP.value);
		iphone.resetDraft();
		var text1 = "";
		text1 += "<li class='left clearfix'>";
		text1 += "<span class='chat-img pull-left'>";
		text1 += "<img src='http://placehold.it/50/55C1E7/fff&text=NO' alt='User Avatar' class='img-circle' />";
		text1 += "</span>";
		text1 += "<div class='chat-body clearfix'>";
		text1 += "<div class='header'>";
		text1 += "<strong class='primary-font'>" + nokia.name + "</strong>";
		text1 += "<small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + getToday() + "</small>"
		text1 += "</div>";
		text1 += "<p>" + txtIP.value + "</p>";
		$("#IPHONE .composeIP").append(text1);
	}
}

function getToday() {
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	return date + ' ' + time;
}

function setSendMess(id, sender, receiver, content) {
	var mess = {
		id : id,
		sender : sender,
		receiver : receiver,
		content : content,
		date: getToday()
	};
	// mess.push({'send': sender, 'receiver': receiver, 'content': content});
	this.Mess.push(mess);
}


function inbox(idElement, deviceName, classElement, sender, receiver) {
	showInbox(idElement);

	var eName = $(idElement).find("." + classElement);
	eName.html("");
	this.ib = Mess.filter(x => x.sender === sender && x.receiver === receiver);
	ib.reverse();

	for(let i = 0; i < ib.length; i++){
		var text1 = "";
		text1 += "<li class='right clearfix  w3-animate-zoom mess'>";
		text1 += "<span class='chat-img pull-right'>";
		text1 += "<img src='http://placehold.it/50/FA6F57/fff&text=" + deviceName + "' alt='User Avatar' class='img-circle' />";
		text1 += "</span>";
		text1 += "<div class='chat-body clearfix'>";
		text1 += "<div class='header'>";
		text1 += "<small class='text-muted'><span class='glyphicon glyphicon-time'></span>" + this.ib[i].date + "</small>"
		text1 += "<strong class='primary-font pull-right'>" + this.ib[i].sender + "</strong>";
		text1 += "</div>";
		text1 += "<p>" + this.ib[i].content + "</p>";
		eName.append(text1);
	}
}

function sent(idElement, deviceName, classElement, sender, receiver) {
	showSent(idElement);

	var eName = $(idElement).find("." + classElement);
	eName.html("");
	this.ib = Mess.filter(x => x.sender === sender && x.receiver === receiver);
	ib.reverse();

	for(let i = 0; i < ib.length; i++){
		var text1 = "";
		text1 += "<li class='left clearfix'>";
		text1 += "<span class='chat-img pull-left'>";
		text1 += "<img src='http://placehold.it/50/55C1E7/fff&text=" + deviceName + "' alt='User Avatar' class='img-circle' />";
		text1 += "</span>";
		text1 += "<div class='chat-body clearfix'>";
		text1 += "<div class='header'>";
		text1 += "<strong class='primary-font'>" + this.ib[i].receiver + "</strong>";
		text1 += "<small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + this.ib[i].date + "</small>"
		text1 += "</div>";
		text1 += "<p>" + this.ib[i].content + "</p>";
		eName.append(text1);
	}
}

function allMessage(idElement, deviceName, classElement, sender) {
	showAll(idElement);

	var eName = $(idElement).find("." + classElement);
	eName.html("");
	this.ib = Mess.filter(x => x.sender === sender || x.receiver === sender);
	ib.reverse();

	for(let i = 0; i < ib.length; i++){
		var text1 = "";
		if(this.ib[i].sender == sender) {
			text1 += "<li class='left clearfix'>";
			text1 += "<span class='chat-img pull-left'>";
			text1 += "<img src='http://placehold.it/50/55C1E7/fff&text=" + deviceName + "' alt='User Avatar' class='img-circle' />";
			text1 += "</span>";
			text1 += "<div class='chat-body clearfix'>";
			text1 += "<div class='header'>";
			text1 += "<strong class='primary-font'>" + this.ib[i].receiver + "</strong>";
			text1 += "<small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + this.ib[i].date + "</small>"
			text1 += "</div>";
			text1 += "<p>" + this.ib[i].content + "</p>";
		}
		else {
			text1 += "<li class='right clearfix'>";
			text1 += "<span class='chat-img pull-right'>";
			text1 += "<img src='http://placehold.it/50/FA6F57/fff&text=" + deviceName + "' alt='User Avatar' class='img-circle' />";
			text1 += "</span>";
			text1 += "<div class='chat-body clearfix'>";
			text1 += "<div class='header'>";
			text1 += "<small class='text-muted'><span class='glyphicon glyphicon-time'></span>" + this.ib[i].date + "</small>"
			text1 += "<strong class='primary-font pull-right'>" + this.ib[i].sender + "</strong>";
			text1 += "</div>";
			text1 += "<p>" + this.ib[i].content + "</p>";
		}
		eName.append(text1);
	}
}

function setDraftNokia() {
	nokia.setDraft(txtNO.value);
}

function setDraftiPhone() {
	iphone.setDraft(txtIP.value);
}

function turnPowerNO(){
	this.onPowerNO = setInterval(function(){
		if (nokia.battery <= 0){
			nokia.battery = 0;
			document.getElementById('togglePowerNO').checked = false;
			nokia.state = false;
			showHome('#NOKIA');
			disableScreen("#NOKIA", true);
			clearInterval(onPowerNO);
		}
		else {
			nokia.state = true;
			nokia.battery -= 1;
		}
		setBatterColor(nokia, "#NOKIA");
		document.getElementById('batteryNO').innerHTML = " " + nokia.getBattery() + "%";
	}, 1500);
}

function turnPowerIP(){
	this.onPowerIP = setInterval(function(){
		if (iphone.battery <= 0){
			iphone.battery = 0;
			document.getElementById('togglePowerIP').checked = false;
			iphone.state = false;
			showHome('#IPHONE');
			disableScreen("#IPHONE", true);
			clearInterval(onPowerIP);
		}
		else {
			iphone.state = true;
			iphone.battery -= 1;
		}
		setBatterColor(iphone, "#IPHONE");
		document.getElementById('batteryIP').innerHTML = " " + iphone.getBattery() + "%";
	}, 1500);
}

function turnChargeNO(){
	this.onChargeNO = setInterval(function(){
		nokia.setChargeBattery();
		document.getElementById('batteryNO').innerHTML = " " + nokia.getBattery() + "%";
	}, 1000);
}

function turnChargeIP(){
	this.onChargeIP = setInterval(function(){
		iphone.setChargeBattery();
		document.getElementById('batteryIP').innerHTML = " " + iphone.getBattery() + "%";
	}, 1000);
}

function switchPowerNO() {
	if(nokia.getState() == false) {
		document.getElementById('togglePowerNO').checked;
		nokia.setState(true);
		turnPowerNO();
		disableScreen("#NOKIA", false);
	}
	else {
		nokia.setState(false);
		showHome('#NOKIA');
		disableScreen("#NOKIA", true);
		clearInterval(onPowerNO);
	}
}

function switchPowerIP() {
	if(iphone.getState() == false) {
		document.getElementById('togglePowerIP').checked;
		iphone.setState(true);
		turnPowerIP();
		disableScreen("#IPHONE", false);
	}
	else {
		iphone.setState(false);
		showHome('#IPHONE');
		disableScreen("#IPHONE", true);
		clearInterval(onPowerIP);
	}
}

function switchChargeNO() {
	if(chargeNokia == false) {
		document.getElementById('toggleChargeNO').checked;
		chargeNokia = true;
		turnChargeNO();
		$("#NOKIA .charged").css("display", 'none');
		$("#NOKIA .charging").css("display", 'block');
	}
	else {
		chargeNokia = false;
		clearInterval(onChargeNO);
		$("#NOKIA .charged").css("display", 'block');
		$("#NOKIA .charging").css("display", 'none');
		setBatterColor(nokia, "#NOKIA");
	}
}

function switchChargeIP() {
	if(chargeiPhone == false) {
		document.getElementById('toggleChargeIP').checked;
		chargeiPhone = true;
		turnChargeIP();
		$("#IPHONE .charged").css("display", 'none');
		$("#IPHONE .charging").css("display", 'block');
	}
	else {
		chargeiPhone = false;
		clearInterval(onChargeIP);
		$("#IPHONE .charged").css("display", 'block');
		$("#IPHONE .charging").css("display", 'none');
		setBatterColor(iphone, "#IPHONE");
	}
}

function showHome(id){
	$(id + " .home-menu").css("display", 'block');
	$(id + " .div-compose").css("display", 'none');
	$(id + " .div-inbox").css("display", 'none');
	$(id + " .div-sent").css("display", 'none');
	$(id + " .div-all").css("display", 'none');
	$(id + " .card").css("visibility", 'hidden');
}

function showComposeNO() {
	$("#NOKIA .div-compose").css("display", 'block');
	$("#NOKIA .composeNO").html("");
	txtNO.value = nokia.getDraft();
	$("#NOKIA .home-menu").css("display", 'none');
	$("#NOKIA .card").css("visibility", 'hidden');
}

function showComposeIP() {
	$("#IPHONE .div-compose").css("display", 'block');
	$("#IPHONE .composeIP").html("");
	// txtIP.value = iphone.getDraft();
	$("#IPHONE .home-menu").css("display", 'none');
	$("#IPHONE .card").css("visibility", 'hidden');
}

function showInbox(id) {
	$(id + " .div-inbox").css("display", 'block');
	$(id + " .home-menu").css("display", 'none');
	$(id + " .card").css("visibility", 'visible');
}

function showSent(id) {
	$(id + " .div-sent").css("display", 'block');
	$(id + " .home-menu").css("display", 'none');
}

function showAll(id) {
	$(id + " .div-all").css("display", 'block');
	$(id + " .home-menu").css("display", 'none');
}

function disableScreen(id, b) {
	$(id + " .btn-compose").attr("disabled", b);
	$(id + " .btn-inbox").attr("disabled", b);
	$(id + " .btn-sent").attr("disabled", b);
	$(id + " .btn-all").attr("disabled", b);
}

function setBatterColor(deviceName, id) {
	if (deviceName.getBattery() <= 20) {
		$(id + " .charged").css("background-color", "red");
	}
	else {
		$(id + " .charged").css("background-color", "#43c743");	
	}
	let perc = deviceName.getBattery() * 27 / 100;
	$(id + " .charged").css("width", perc);
}

$(function() {
	$("#iphone-draggable").draggable({ axis: "y" });
	$("#iphone-draggable").draggable({ revert: true });
	$("#iphone-draggable").draggable({
		drag: function(){
        },
        stop: function() {
        	// coordinates('#draggable-iphone');
        	let top = $("#iphone-draggable").position().top;
        	if (top >= 50) {
        		inbox('#IPHONE', 'IP', 'inboxIP', 'nokia', 'iphone');
        	}
		}
	});

	$("#nokia-draggable").draggable({ axis: "y" });
	$("#nokia-draggable").draggable({ revert: true });
	$("#nokia-draggable").draggable({
		drag: function(){
        },
        stop: function() {
			let top = $("#nokia-draggable").position().top;
        	if (top >= 50) {
        		inbox('#NOKIA', 'NO', 'inboxNO', 'iphone', 'nokia');
        	}
		}
	});
} );

// var coordinates = function(element) {
//     element = $(element);
//     let top = element.position().top;
//     if (top >= 50) {
//     	inbox('#IPHONE', 'IP', 'inboxIP', 'nokia', 'iphone');
//     }
// }
