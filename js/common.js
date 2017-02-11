$(document).ready(function() {

	$(".portfolio_grid").mixItUp();

	$(".s_portfolio li").click(function(){
		$(".s_portfolio li").removeClass("active");
		$(this).addClass("active");
	});

	$(".popup").magnificPopup({type:'image'});
	$(".popup_content").magnificPopup({tyle:"inline", midClick: true});

	$(".animation_1").animated("flipInY", "flipInY");
	$(".animation_2").animated("fadeInLeft", "fadeInLeft");
	$(".animation_3").animated("fadeInRight", "fadeInRight");

	$(".left .resume_item").animated("fadeInLeft", "fadeInLeft");
	$(".right .resume_item").animated("fadeInRight", "fadeInRight");



	$(".top_text h1").animated("fadeInDown", "fadeOutUp");
	$(".top_text p").animated("fadeInUp", "fadeOutDown");
	$(".section_header").animated("fadeInUp", "fadeOutDown");
	

	function heightDetect(){
		$(".main_head").css("height", $(window).height());
		$(".top_wrapper").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
	});

	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".sandwich").toggleClass("active");
	}).append("<span>");

	$(".toggle_mnu").click(function(){
		if ($(".top_mnu").is(":visible")){
			$(".top_text").removeClass("h_opacify");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").addClass("h_opacify");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});

	$(".portfolio_item").each(function(i){
		$(this).find("a").attr("href", "#work_" + i);
		$(this).find(".port_descr").attr("id", "work_" + i);
	});
	//выдаются айдишники элементу на портфолио

	$("input,select,textarea").jqBootstrapValidation();

	$("top_mnu ul a").mPageScroll2id(); //выбрав пункт меню, сколит до секции

});
$(window).load(function() { 
	$(".loader_inner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow"); 
});