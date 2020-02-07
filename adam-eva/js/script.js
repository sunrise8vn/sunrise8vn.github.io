class Human {
	constructor(name, gender, weight) {
		this.name = name;
		this.gender = gender;
		this.weight = weight;
	}	

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	setGender(gen) {
		this.gender = gen;
	}

	setWeight(weight) {
		this.weight = weight;
	}

	getWeight() {
		return this.weight;
	}

	getSay(name, content) {
		document.getElementById("say" + name).innerHTML = name + " say: " + content;
	}

	getInfo(name) {
		document.getElementById("name" + name).innerHTML = "My name's " + this.name;
		document.getElementById("gender" + name).innerHTML = "I'm " + this.gender;
		document.getElementById("weight" + name).innerHTML = "I weight " + this.weight + "kg";
	}

	eat() {
		this.weight += 1;
	}
}

class Apple {
	constructor(weight) {
		this.weight = weight;
	}

	setWeight(weight) {
		if (weight > 30)
			weight = 30;
		this.weight = weight;
	}

	getWeight() {
		return this.weight;
	}

	decreaseWeight() {
		this.weight--;
	}
}

var apple = new Apple();
apple.setWeight(30);

var adam = new Human("Adam", "male", 70);
adam.getInfo(adam.name);

var eva = new Human("Eva", "female", 50);
eva.getInfo(eva.name);


function drawApple() {
	let x1 = 100;
	let x2 = 180
	for (let i = 1; i <= apple.getWeight(); i++) {
		let xPos = Math.round(Math.random() * x2);
		let yPos = Math.round(Math.random() * 100 + 20);
		while(xPos <= x1) {
			xPos = Math.round(Math.random() * x2);
		}
		x1 += 35;
		x2 += 35;
		createBox('apple', 'apple' + i, xPos, yPos);
	}
}

function createBox(c, i, left, top) {
	var node = document.createElement("div");
	node.classList.add(c);
	node.style.cssText = 'position: absolute; left:' + left + 'px; top:' + top + 'px;';
	node.id = i;
	// node.innerHTML = num;
	document.getElementById("apple").appendChild(node);
}

$(function () {
    $(".apple").draggable({
        revert: "invalid",
        refreshPositions: true,
        drag: function (event, ui) {
            ui.helper.addClass("draggable");
        },
    });
    let xAdam = -10;
    let xEva = -10;
    let updown = 10;
    let heightAdam = $("#adam img").height();
    let heightEva = $("#eva img").height();
    $("#adam img").droppable({
        drop: function (event, ui) {
        	apple.decreaseWeight();
        	adam.eat();
        	adam.getInfo(adam.name);
        	ui.helper.addClass("show");
        	let w = $("#adam img").width();
        	heightAdam = $("#adam img").height();
        	$("#adam img").css("width", w + updown);
        	$("#adam img").css("height", heightAdam + updown);
        	$("#adam img").css("margin-top", xAdam);
        	xAdam -= updown;
            ui.draggable.addClass("dropped");
            $("#adam").append(ui.draggable);
            if(heightAdam > heightEva) {
            	$("#adam img").attr("src","adam.png");
            }
        }
    });
    $("#eva img").droppable({
        drop: function (event, ui) {
        	apple.decreaseWeight();
        	eva.eat();
        	eva.getInfo(eva.name);
        	ui.helper.addClass("show");
            let w = $("#eva img").width();
        	heightEva = $("#eva img").height();
        	$("#eva img").css("width", w + updown);
        	$("#eva img").css("height", heightEva + updown);
        	$("#eva img").css("margin-top", xEva);
        	xEva -= updown;
            ui.draggable.addClass("dropped");
            $("#eva").append(ui.draggable);
            if(heightEva >= heightAdam) {
            	$("#adam img").attr("src","adamRed.png");
            }
        }
    });
});

document.body.addEventListener('keydown', function(e) {
	var msg;
	if(e.keyCode == 65) {
		msg = prompt('Enter message');
		adam.getSay(adam.name, msg);
	}	
	if(e.keyCode == 69) {
		msg = prompt('Enter message');
		eva.getSay(eva.name, msg);
	}
});

drawApple();