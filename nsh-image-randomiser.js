$(function () {	
    var hasPageTitle = !($('#PageTitleH1').css('display') == 'none');
    if (hasPageTitle) {
        $('#PageTitleH1').wrap('<div class="banner"></div>');
        setHeaderImages();
    }
});

function setHeaderImages () {
	var pageTitleBgImages = $('.title-bg');
	var whichBgImage = Math.floor(Math.random() * pageTitleBgImages.length);
	var	bgImage = $('img', pageTitleBgImages[whichBgImage]);
	var	bgImageCss = 'url("' + bgImage.attr('src') + '")';
	$('.interior .banner').css('background-image', bgImageCss);
}