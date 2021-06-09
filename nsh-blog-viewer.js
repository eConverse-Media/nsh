$(function () {
    var blogPost = $('.blogs-block'),
        tags = $('.hltags');

    $(tags).prependTo(blogPost);

    $(tags).wrap('<div class="blog-tags" />');

    $(tags).find('li').each(function () {
        var self = $(this);

        console.log('>>>>>>>>>>>>>> ', $(self).attr('aria-label'));
    });

    var likes = $('.ItemRatingCommentPanel');

    $(likes).appendTo('.blog-tags');

});