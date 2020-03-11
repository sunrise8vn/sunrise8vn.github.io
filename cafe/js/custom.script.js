$( document ).ready(function() {
    $(".num-table a").on("click", function() {
    	$(".num-table").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".main-order").css("display", "none");
    	$($(this).attr("href")).css("display", "block");
    	return false;
    });

    $(".group-item a").on("click", function() {
    	$(".group-item").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".list-items").css("display", "none");
    	$($(this).attr("href")).css("display", "block");
    	return false;
    });


    // $(".bill-items").draggable();

    $(".bill-items .col-md-3").click(function() {
    	$(".bill-items .col-md-3 span").css("font-size", "13px");
    	$(".bill-items .col-md-3 button").css("display", "none");
    	$(".bill-items").css("background-color", "#fff");
    	$(".bill-items").css("color", "#000");
    	$(this).find("span").css("font-size", "16px");
    	$(this).parent().css("background-color", "#70cc69");
    	$(this).parent().css("color", "#fff");
    	$('> button', this).css("display", "inline-block");


    });



    // $(".bill-items .col-md-3").hover(function() {
    // 	$(this).parent().css("background-color", "#70cc69");
    // 	$(this).parent().css("color", "#fff");
    // })

    // $(".order-item a").mouseover(function() {
    // 	// $(".order-item a .item-img").css("display", "none");
    // 	$(this).children().css("display", "none");
    // 	// $(this).parent().(".item-btn").css("display", "block");
    // 	$($(this).attr("href")).css("display", "block");
    	
    // });

    // $(".order-item a").mouseout(function() {
    // 	$(".order-item a .item-img").css("display", "block");
    // 	// $(this).parent().(".item-btn").css("display", "block");
    // 	$($(this).attr("href")).css("display", "none");
    // });

    // $(".order-item").mouseover(function() {
    // 	$(this).css("display", "none");
    // 	$(".item-btn").css("display", "block");
    // 	$("p").css("color", "#fff");
    // 	$(this).css("background-color", "#fba154;");
    // });

    // $(".order-item").mouseout(function() {
    // 	$(".item-img").css("display", "block");
    // 	$(".item-btn").css("display", "none");
    // 	// $(this).css("display", "none");
    // 	// $("p").css("color", "#000");
    // 	// $(this).css("background-color", "#fff;");
    // });

    $(".item .item-btn .btn").on("click", function() {
    	let itemId = $(this).data("id");
    	let name = $(this).data("name");
    	let price = $(this).data("price");

		let k = false;
		$.each(table01, function() {
		    if (this.item_id == itemId) {
		    	let q = this.item_quantity + 1;
		        this.item_quantity = q;
		        this.money = q * price;
		        k = true;
		    }
		});

		if(!k) {
			table01.push({
              	"id": bill_detail_id_max + 1,
				"bill_id": 1,
				"table_id": 1,
				"item_id": itemId,
				"item_name": name,
				"item_price": price,
				"item_quantity": 1,
				"money": price
            });
            
	    	let str = '' +
		    	'<div class="bill-items">' +
			    '<div class="col-md-5">'+
			    '<p>'+name+'</p>'+
			    '<p>Giá: '+addCommas(price)+' vnđ</p>'+
			    '</div>'+
			    '<div class="col-md-3" style="text-align: center;">'+
			    	'<button class="btn-minus"><i class="fa fa-minus"></i></button>'+
					'<span>'+
					'1' +
					'</span>'+
					'<button class="btn-plus"><i class="fa fa-plus"></i></button>'+
			    '</div>'+
			    '<div class="col-md-4" style="text-align: right;">'+
			    '<p>'+addCommas(price)+' vnđ</p>'+
			    '</div>'+
			    '</div>';
	    	$("#table-bill-1").append(str);
		}
		else {
			let str = '';
			for (var i = 0; i < table01.length; i++) {
			    str += '<div class="bill-items">' +
				    '<div class="col-md-5">'+
				    '<p>'+table01[i].item_name+'</p>'+
				    '<p>Giá: '+addCommas(table01[i].item_price)+' vnđ</p>'+
				    '</div>'+
				    '<div class="col-md-3" style="text-align: center;">'+
				    '<button class="btn-minus"><i class="fa fa-minus"></i></button>'+
					'<span>'+
					table01[i].item_quantity +
					'</span>'+
					'<button class="btn-plus"><i class="fa fa-plus"></i></button>'+
				    '</div>'+
				    '<div class="col-md-4" style="text-align: right;">'+
				    '<p>'+addCommas(table01[i].money)+' vnđ</p>'+
				    '</div>'+
				    '</div>';
			}
			$("#table-bill-1").html(str);
		}

    });
});
