
var itemId,
	itemName,
	itemPrice,
	itemCount,
	totalCount,
	totalMoney;

$("#group-item .item").draggable({
	axis: "x",
	revert: function(){
		itemId = $(this).data("item-id");
		$("#item-"+ itemId + " .item-delete").css("display", "block");
		if($(this).offset().left < -30) {
			$(this).css("left", "-80px");
			// $("#group-item .item-delete").css("animation-name", "slideWidthUpDelete");
		}
		else {
			$(this).css("left", "0px");		
			// $("#group-item .item-delete").css("animation-name", "slideWidthDownDelete");
			$("#group-item .item-delete").css("display", "none");
			// $("#item-"+ itemId + " .item-delete").css("display", "none");
		}
	}
});

$("#group-item .item").on("click", function() {
	itemId = $(this).data("item-id");
	if($(this).offset().left == 0) {
		$(".cart_nav_overlay_mobile").css("display", "flex");
		$("body").css("overflow-y", "hidden");
		$("#edit-item").css("animation-name", "slideUp");
		$("#edit-item").css("opacity", 1);
		$("#edit-item").css("display", "block");
		itemId = $(this).data("item-id");
		itemName = $(this).data("item-name");
		itemPrice = $(this).data("item-price");
		itemCount = $(this).data("item-count");
		$("#edit-item .item-name-selected span").html(itemName);
		$("#edit-item .item-count-selected input").val(itemCount);
		// $("#group-item .item-delete").css("display", "none");
		$("#group-item .item-delete").css("animation-name", "slideWidthDownDelete");
		$("#group-item .item-delete").css("display", "none");
	}
	else {
		$("#item-"+ itemId + " .item-delete").css("display", "none");
	}

	$("#group-item .item").each(function(index) {
		if($(this).offset().left < 0) {
			// $(this).css("animation-name", "revertItem");
			$(this).css("left", "0px");
			
			$("#group-item .item-delete").css("animation-name", "slideWidthDownDelete");
		}
		$(this).draggable();
	});
	$("body").css("overflow-x", "hidden");
});

$("#group-item .item-delete").on("click", function() {
	itemId = $(this).data("item-id");
	$("#item-"+ itemId).remove();
});

$(".cart_nav_overlay_mobile, .btn-close, .btn-check").on("click", function() {
	$(".cart_nav_overlay_mobile").css("display", "none");
	$("body").css("overflow-y", "visible");
	$("#edit-item").css("animation-name", "slideDown");
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