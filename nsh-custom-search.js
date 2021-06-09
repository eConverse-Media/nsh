$(function () {

    $("input#customSearch").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            
            handleSearch();

        }
    });

});

function handleSearch() {
    var searchInputContent = $('input#customSearch').val();
    var libraryKey = '&rf=%5ECommunityKey%3A9c4467fa-cc5a-473c-84e3-66c73535c39d^';
    var path = window.location.pathname;
    if (~path.indexOf('devsite-econverse2021')) {
        var searchBeginning = 'devsite-econverse2021/search?executeSearch=true&SearchTerm='
    }
    else {
        var searchBeginning = 'search?executeSearch=true&SearchTerm='
    }

    var searchURL = searchBeginning + searchInputContent + libraryKey;
    var siteBaseURL = window.location.protocol + '//' + window.location.host + '/';

    var searchFullurl = siteBaseURL + searchURL;

    $(location).prop('href', searchFullurl);
}