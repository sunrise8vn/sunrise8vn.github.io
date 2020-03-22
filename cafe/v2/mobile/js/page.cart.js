
var itemId,
	itemName,
	itemPrice,
	itemCount,
	totalCount,
	totalMoney;

$("#group-item .item").draggable({
	axis: "x",
	drag: function () {
		itemId = $(this).data("item-id");
		$("#group-item .item").each(function(index) {
			if($(this).data("item-id") != itemId && $(this).offset().left == -80) {
				// $(this).css("animation-name", "revertItem");left: -80px;
				$(this).animate({ left: "+=80px"}, 'slow');
				$(this).css("left", "0px");		
				$(this).find(".item-delete").animate({ width: "-=80px", right: "+=80px" }, 'slow', function() {
					$(this).parent().css("animation-name", "");
				});
			}
		});

		var ol = $(this).offset().left;
        var w = -ol + "px";
        var r = ol + "px";
        $(this).find(".item-delete").css("width", w);
        $(this).find(".item-delete").css("right", r);
		
    },
	revert: function(){
		itemId = $(this).data("item-id");
		if($(this).offset().left < -30) {
			$(this).css("left", "-80px");
			$(this).find(".item-delete").css("width", "80px");
			$(this).find(".item-delete").css("right", "-80px");
		}
		else {
			$(this).css("left", "0px");		
			$(this).find(".item-delete").css("width", "0px");
			$(this).find(".item-delete").css("right", "0px");
		}
	}
});

$("#group-item .item").on("click", function() {
	itemId = $(this).data("item-id");
	if($(this).offset().left == 0) {
		$(".cart_nav_overlay_mobile").css("display", "flex");
		$("#edit-item").animate({ height: "+=350px", opacity: 1, display: "block" }, 400 );
		itemId = $(this).data("item-id");
		itemName = $(this).data("item-name");
		itemPrice = $(this).data("item-price");
		itemCount = $(this).data("item-count");
		$("#edit-item .item-name-selected span").html(itemName);
		$("#edit-item .item-count-selected input").val(itemCount);

		$("#group-item .item").each(function(index) {
			if($(this).offset().left < 0) {
				$(this).animate({ left: "+=80px" }, 400 );
				$(this).find(".item-delete").animate({ right: '+=80px', width: "-=80px"}, 400 );
			}
		});		
	}
	else {
		$(this).animate({ left: "+=80px" }, 400 );
		$(this).find(".item-delete").animate({ right: '+=80px', width: "-=80px"}, 400 );
	}
});

function itemDeleteNone() {
	$("#group-item .item-delete").css("display", "none");
}

$("#group-item .item-delete").on("click", function() {
	itemId = $(this).data("item-id");
	$("#item-"+ itemId).remove();
});

$(".cart_nav_overlay_mobile, .btn-close, .btn-check").on("click", function() {
	$(".cart_nav_overlay_mobile").css("display", "none");
	$("#edit-item").animate({ height: "-=350px", opacity: 0, display: "none" }, 400 );
});


$("#edit-item .btn-plus").on("click", function() {
	totalCount = $("#edit-item .item-count-selected input").val();
	totalCount *= 1;
	totalCount += 1;
	$("#edit-item .item-count-selected input").val(totalCount);
});

$("#edit-item .btn-minus").on("click", function() {
	totalCount = $("#edit-item .item-count-selected input").val();
	totalCount *= 1;
	
	if(totalCount > 1) {
		totalCount -= 1;
		$("#edit-item .item-count-selected input").val(totalCount);	
	}
	else {
		$("#item-"+ itemId).remove();
		$(".cart_nav_overlay_mobile").click();
	}
});


$("#edit-item .btn-check").on("click", function() {
	totalCount = $("#edit-item .item-count-selected input").val();
	totalMoney = totalCount * itemPrice;
	$("#item-"+ itemId).data("item-count", totalCount);
	$("#item-"+ itemId + " .item-count span").html(totalCount);
	$("#item-"+ itemId + " .item-money p span:eq(0)").html(addCommas(totalMoney));
});