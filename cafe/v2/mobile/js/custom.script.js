$( document ).ready(function() {
	var alterClass = function() {
	    var ww = document.body.clientWidth;
	    if (ww > 1023) {
            window.location.replace("..");
	    }
	    else {
            // var name = localStorage.getItem('user');
            // let user = JSON.parse(localStorage.getItem('user'));
            // console.log(user);
            // if(user == null) {
            //     window.location.replace("../login.html");       
            // }
	    }

        // Hide Header on on scroll down
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('#nav-top').outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();
            
            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;
            
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                $('#nav-top').addClass('nav-up');
                
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    $('#nav-top').removeClass('nav-up');
                }
            }
            
            lastScrollTop = st;
        }
        // End Hide Header
	};

	$(window).resize(function(){
	    alterClass();
	});
	//Fire it when the page first loads:
	alterClass();

    $(".nav-logout").on("click", function() {
        // alert("message?: DOMString");
        localStorage.removeItem('user');
        window.location.replace("../login.html");
    });

    // // Click table on Mobile
    // $(".num-table a").click(function() {
    // 	$(".list-table-mobile .num-table").removeClass("active");
    // 	$(this).parent().addClass("active");
    	
    // 	$(".main-order").css("display", "none");
    // 	$($(this).attr("href")).css("display", "block");

    // 	$(".list-table-extend-mobile button").eq(0).css("display", "inline-block");
    // 	$(".list-table-extend-mobile button").eq(1).css("display", "none");
    // 	$(".list-table-mobile").height(70);
    // 	$(".container .main-order-left").css("display", "block");
    // 	$(".container .main-order-right").eq(0).css("display", "block");
    // 	$(".nav_overlay_mobile").css("display", "none");
    // 	return false;
    // });
    // // End

    // Click extend table on mobile
    $(".list-table-extend-mobile button").eq(0).on("click", function() {
    	$(".list-table-mobile").fadeIn(3400, function() {
    		$(".list-table-mobile").height("auto");	
    	});
    	
    	$(this).css("display", "none");
    	$(".container .main-order-left").css("display", "none");
    	$(".container .main-order-right").eq(0).css("display", "none");
    	$(".list-table-extend-mobile button").eq(1).css("display", "inline-block");
    	$(".nav_overlay_mobile").css("display", "block");
    })

    $(".list-table-extend-mobile button").eq(1).on("click", function() {
    	$(".list-table-mobile").height(70);
    	$(".list-table-mobile").fadeIn(3000);
    	$(this).css("display", "none");
    	$(".container .main-order-left").css("display", "block");
    	$(".container .main-order-right").eq(0).css("display", "block");
    	$(".list-table-extend-mobile button").eq(0).css("display", "inline-block");
    	$(".nav_overlay_mobile").css("display", "none");
    })
    // End

    $(".nav_overlay_mobile").on("click", function() {
    	$(".list-table-mobile").height(70);
    	$(".list-table-extend-mobile button").eq(0).css("display", "inline-block");
    	$(".list-table-extend-mobile button").eq(1).css("display", "none");
    	$(".container .main-order-left").css("display", "block");
    	$(".container .main-order-right").eq(0).css("display", "block");
    	// $(".list-table-extend button").eq(0).css("display", "inline-block");
    	$(this).css("display", "none");
    })

    // $(".item-group a").on("click", function() {
    // 	$(".item-group").removeClass("active");
    // 	$(this).parent().addClass("active");
    // 	$(".group-list-items-mobile .list-items").removeClass("active");
    // 	$($(this).attr("href")).addClass("active");
    // 	return false;
    // });


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
