$(function () {
	moveNav();
	$(window).resize(function () {
		moveNav();
	});
	$('.footer-logo, .footer-contact, .footer-social').wrapAll('<div class="col-md-4" />');
	$('.copyright').insertAfter('#FOOTER');
	$('.HLEventList div[id*="BottomLink"]').insertAfter('.HLEventList .Content');
	$('.HLRecentBlogs div[id*="BottomLink"]').insertAfter('.HLRecentBlogs .Content');
	
	//empower section
	$('.ft-education').parent().addClass('empower-education');
	$('.ft-collaborate').parent().addClass('empower-collaborate');
	$('.ft-innovation').parent().addClass('empower-innovation');
	$('.empower-blurb p').addClass('col-md-4');
	
	//learn with us section
	$('.learn-with-us-text p a').addClass('col-xs-4');
});

function moveNav() {
	if ($(window).width() > 870) {
		$('#NAV').appendTo('#MPheader');
	} else {
		$('#NAV').insertAfter('#HEADER');
	}
}