class Mobile {
	constructor(name, battery, state, draft) {
		this.name = name;
		this.battery = battery;	
		this.archiveMess = [];
		this.newMess = [];
		this.state = state;
		this.draft = draft;
		this.deleteMess = 0;
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

	setDeleteMess(d) {
		this.deleteMess = d;
	}

	getDeleteMess() {
		return this.deleteMess;
	}

	setMess(id, sender, receiver, content, date) {
		const found = this.archiveMess.some(el => el.id === id);
		if (!found) {
			this.archiveMess.push({
				id : id,
				sender : sender,
				receiver : receiver,
				content : content,
				date: date, 
				status: 0
			});
			this.newMess.push({
				id : id,
				sender : sender,
				receiver : receiver,
				content : content,
				date: date, 
				status: 0
			});
		}
	}


	getArchiveMess() {
		let items =  this.archiveMess.filter(function(item) {
			return item.status === 0;
		});
		return items;
	}

	getNewMess(receiver) {
		let items =  this.newMess.filter(function(item) {
			return item.status === 0 && item.receiver === receiver;
		});
		return items;
	}

	getInboxMess(receiver) {
		let items =  this.archiveMess.filter(function(item) {
			return item.status === 0 && item.receiver === receiver;
		});
		return items;
	}

	clearNewMess() {
		this.newMess = [];
	}

	setDraft(str) {
		this.draft = str;
	}

	getDraft() {
		if (typeof this.draft != 'undefined')
			return this.draft;
		else
			return null;
	}

	resetDraft() {
		this.draft = null;
	}

	setState(b) {
		this.state = b;
	}

	getState() {
		return this.state;
	}
}