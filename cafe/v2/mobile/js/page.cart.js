
$("#group-item .item").on("click", function() {
	$(".cart_nav_overlay_mobile").css("display", "flex");
	$("body").css("overflow", "hidden");
	$(".edit-item").css("animation-name", "slideUp");
	// $(".edit-item").slideUp(2000, function() {
		
		$(".edit-item").css("opacity", 1);
	// 	$(".edit-item").css("transform", "translateY(0%)");
		$(".edit-item").css("display", "block");
	// });
	
});

$(".cart_nav_overlay_mobile, .btn-close, .btn-check").on("click", function() {
	$(".cart_nav_overlay_mobile").css("display", "none");
	$("body").css("overflow", "visible");
	$(".edit-item").css("animation-name", "slideDown");
	// $(".edit-item").slideDown(2000, function() {

		// $(".edit-item").css("opacity", 0);
		// $(".edit-item").css("transform", "translateY(100%)");
		// $(".edit-item").css("display", "none");
	// });
	

});
