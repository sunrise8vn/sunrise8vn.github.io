function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let table01;
let bill_detail_id_max;
let groupItemCount = 0;
let groupItemArray = [];

// run
readTextFile("json/table.json", function (text) {
    let data = JSON.parse(text);
    let k = data.length;
    let str = '';
    let active = ' active';
    for(let i = 0; i < k; i++) {
    	str += '<div class="num-table col-md-2'+active+'">'+
	           '<a href="#main-order-'+data[i].id+'">'+
		       '<h6>Bàn '+data[i].id+'</h6>'+
		       '<h3>'+data[i].id+'</h3>'+
	           '</a>'+
	           '</div>';
       	active = '';
    }
    $(".list-table").html(str);
});

readTextFile("json/product.group.json", function (text) {
    let data = JSON.parse(text);
    groupItemCount = data.length;
    let str = '';
    let active = ' active';
    for(let i = 0; i < groupItemCount; i++) {
    	groupItemArray.push(data[i].id);
    	str += '<div class="group-item'+active+'">'+
    				'<a href="#group-item-'+data[i].id+'">'+data[i].name+'</a>'+
    			'</div>';
		active = '';
    }
    $(".group-items").html(str);
});


readTextFile("json/product.json", function (text) {
    let data = JSON.parse(text);
    let items;
    let active = ' active';
    for (var i = 0; i < groupItemCount; i++) {
    	items = data.filter(function(rs) {
			return rs.group_id == groupItemArray[i];
		});
		let j = items.length;
		
		if(j>0){
    		let str = '<div id="group-item-'+groupItemArray[i]+'" class="list-items'+active+'">';
    		for(let k = 0; k < j; k++) {
		    	str += '<div class="item">'+
		        			'<div class="item-img">'+
		        				'<img src="images/'+items[k].avatar+'">'+
		        			'</div>'+
		        			'<div class="item-btn">'+
		        				'<input type="button" class="btn btn-success" value="Thêm" data-id="'+items[k].id+'" data-name="'+items[k].name+'" data-price="'+data[k].price+'" />'+
		        			'</div>'+
		        			'<div class="item-info">'+
		        				'<p><b>'+items[k].name+'</b></p>'+
		        				'<p>'+addCommas(items[k].price)+' vnđ</p>'+
		        			'</div>'+
		        		'</div>';
		    }
		    str += '</div>';
		    active = '';
		    $(".group-list-items").append(str);
		}
		else {
			let str = '<div id="group-item-'+groupItemArray[i]+'" class="list-items"></div>';
			$(".group-list-items").append(str);
			$(".group-list-items-mobile").append(str);
		}
	};
});


readTextFile("json/bill.json", function (text) {
    let data = JSON.parse(text);
    data = data.filter(function(rs) {
		return rs.table_id == 1;
	});

	
    let str = '';
	    str += '<p><b>'+addCommas(data[0].sub_total)+' vnđ</b></p>' +
				'<p>'+addCommas(data[0].fee_service)+' vnđ</p>';
    $("#sub-total-money-1 .col-md-4").html(str);
});

readTextFile("json/bill.detail.json", function (text) {
    let data = JSON.parse(text);
    bill_detail_id_max = data.length;

    data = data.filter(function(rs) {
		return rs.table_id == 1;
	});
	table01 = data;
	
    let k = data.length;
    let str = '';
    for(let i = 0; i < k; i++) {
	    str += '<div class="bill-items">' +
			    '<div class="col-md-5">'+
				    '<p>'+data[i].item_name+'</p>'+
			    	'<p>Giá: '+addCommas(data[i].item_price)+' vnđ</p>'+
		    	'</div>'+
				'<div class="col-md-3" style="text-align: center;">'+
					'<button class="btn-minus"><i class="fa fa-minus"></i></button>'+
					'<span>'+
					data[i].item_quantity +
					'</span>'+
					'<button class="btn-plus"><i class="fa fa-plus"></i></button>'+
			    '</div>'+
			    '<div class="col-md-4" style="text-align: right;">'+
				    '<p>'+addCommas(data[i].item_price)+' vnđ</p>'+
			    '</div>'+
		    '</div>';
    }
    $("#table-bill-1").html(str);
});