$(function () {

    var blogPost = $('.blogs-block');
    // handle page title
    
    if (!$('.blogTitle').html()) {
        var interiorHeadingText = $('h1#PageTitleH1').text();
    
        $('h1#PageTitleH1').text('Fixation on Histology Blog');
    

        $(blogPost).prepend('<h3 class="blogTitle" >' + interiorHeadingText + '</h3>');
    }

    // $($('div[id*="Permission_ByLinePanel"]')).insertAfter($('.blog-title-text'));

    // handle likes and tags
    var likes = $('.ItemRatingCommentPanel');

    $(likes).prependTo(blogPost);

    $(likes).wrap('<div class="blog-tags" />');

    $('.user-content-hashtag').each(function () {
        var self = $(this),
            text = $(self).text();

        text = $.trim(text);
        text = text.substring(1, text.length);

        $(self).text(text);
    });

    $('.user-content-hashtag').wrapAll('<div class="tags-list" />');
    $('.tags-list').prependTo('.blog-tags');

    // handle byline

    var byline = $(blogPost).find('div[id*="ByLinePanel"]');

    $(byline).wrapInner('<div class="byline-date" />');

    $(byline).find('a').prependTo(byline);
    $(byline).find('span.TitleHeading:first-of-type').prependTo(byline);

    $(byline).find('> .TitleHeading').wrap('<div class="byline-name" />');
    $(byline).find('a').appendTo($(byline).find('.byline-name'));
    
    $(byline).find('.byline-date').find('.TitleHeading').remove();
    
    var bylineDate = $(byline).find('.byline-date').text();

    bylineDate = $.trim(bylineDate);
    if (bylineDate.indexOf(':') > -1) {
        bylineDate = bylineDate.substring(0, (bylineDate.indexOf(':') - 2));
    }

    $(byline).find('.byline-date').text(bylineDate);

    // remove nbsp

    var nbspContainer = $(byline).closest('.form-inline').html();

    nbspContainer = $.trim(nbspContainer);

   nbspContainer =  nbspContainer.replace(/&nbsp;/g, '');

   $(byline).closest('.form-inline').html(nbspContainer);
});