$(function () {
    
    $('div[id*="BlogContents"]').closest('.ContentUserControl').prepend('<div class="dropdown-group"><div class="HtmlContent"></div></div>');

    // handle the fact that tags now load asynchronously

    setTimeout(function () {
        $('.blogs-block').each(function () {
            // handle images
            var self = this,
                windowWidth = $(window).width();
            
            $(self).wrapInner('<div class="text-container" />');
            // if (windowWidth > 991) {
                // handleAjaxCall(this);
                // $(self).prepend('<div class="img-container" />');
            // }   
            // handle filtering
            var tags = $(self)
                    .find('a.label-search-tag')
                    .toArray();
    
            $(self).addClass("iso");
    
            if (tags.length) {
                for (var i = 0; i < tags.length; i++) {
                    var tag = $(tags[i])
                        .attr("data-tag")
                        .toLowerCase();
                    tag = tag.replace(/\\|\//, "");
                    tag = tag.replace(/\&/g, '');
                    tag = tag.replace(/\s+/g, "-");
                    $(self).addClass(tag);
    
                    // handle tag styling
                    
                    if ($(tags[i]).attr('aria-label').indexOf('Content Topics') > -1) {
                        $(tags[i]).addClass('content-topics');
                        $(tags[i]).prependTo($(self).find('.text-container'));
                    } else if ($(tags[i]).attr('aria-label').indexOf('Year') > -1) {
                        $(tags[i]).addClass('year');
                    } else {
                        $(tags[i]).addClass('hide-me');
                    }
                }
            }
    
            // handle comments/likes
    
            var comments = $(self).find('.content-row + .row .text-right .label.label-default'),
                likes = $(self).find('.ItemRatingCommentPanel');
    
            $(comments).wrap('<div class="comments-and-likes" />');
            $(self).find('.comments-and-likes').appendTo($(self).find('.text-container'));
            $(likes).appendTo($(self).find('.comments-and-likes'));
        });
    
        makinFilters();
    
        var clearAllButton = '<button type="button" onclick="clearFilters();" class="clear-all-button">Clear</button>';
        $(clearAllButton).appendTo('.dropdown-group .HtmlContent');
        $('.resource-search-bar input#customSearch').prependTo('.dropdown-group .HtmlContent');
    
        $(".filter-label").click(function () {
            $(this)
                .parent()
                .toggleClass("open");
        });
    
        $('div[id*="BlogContents"]').isotope({
            itemSelector: '.blogs-block',
            layout: 'masonry'
        });
    
        var groupFilterButtons = $('.filter-button-group')
    
        $(groupFilterButtons).each(function (i) {
    
            w = window;
    
            var filterButtonGroupEach = groupFilterButtons[i];
    
            firstFilterClass = filterButtonGroupEach.className.split(" ")[0];
    
    
            w['arr_' + firstFilterClass] = [];
    
        });
    
        // Update Filters When Drop down input clicked
        $(".checkbox-filter input").click(function () {
            var self = $(this),
                parent = $(self).parents(".filter-button-group"),
                selectors = $(parent)
                    .find(".checkbox-filter input")
                    .toArray(),
                parentGroup = $(parent)
                    .attr("class")
                    .split(/\s+/)[0],
                label = $(parent).find(".filter-label"),
                text = $(self)
                    .attr("id")
                    .toLowerCase(),
                labelText,
                defaultText = "Filter by";
    
            //toggle active class
            $(self).toggleClass("active");
    
            //check for show all
            var dataFilter = $(self).attr("data-filter");
            if (!dataFilter && $(self).hasClass("active")) {
                for (var i = 1; i < selectors.length; i++) {
                    var checkbox = selectors[i];
                    $(checkbox).removeClass("active");
                    checkbox.checked = false;
                }
            } else {
                $(selectors[0]).removeClass("active");
                selectors[0].checked = false;
            }
    
            // set dropdown label text
            text = text.replace("-", " ");
    
            filterButtonGroup = $('.filter-button-group');
    
            $(filterButtonGroup).each(function (i) {
    
                var filterButtonFirstElement = filterButtonGroup[i];
                var elementFirstClass = filterButtonFirstElement.className.split(" ")[0];
                var classConversion = elementFirstClass.replace(/-/g, ' ');
    
                switch (parentGroup) {
    
                    case elementFirstClass:
                        if (!dataFilter) {
                            w['arr_' + elementFirstClass] = [];
                        }
                        labelText = w['arr_' + elementFirstClass];
                        defaultText += " " + classConversion;
                        break;
                }
    
            });
    
            if ($(self).hasClass("active") && !!text && text !== "all") {
                labelText.push(text);
            } else {
                var index = labelText.indexOf(text);
                if (index !== -1) {
                    labelText.splice(index, 1);
                }
            }
    
            if (labelText.length) {
                labelText = labelText.join(", ");
                $(label).text(labelText);
                $(parent)
                    .find(".filter-content")
                    .addClass("has-selection");
            } else {
                $(label).text(defaultText);
                $(parent)
                    .find(".filter-content")
                    .removeClass("has-selection");
            }
    
            updateFilters();
    
        });
    }, 1500);



    $(document).click(function (e) {
        var target = e.target,
            selector;

        if ($(target).parents(".filter-content").length) {
            var parent = $(target).parents(".filter-content"),
                klass = $(parent)
                    .parent()
                    .attr("class")
                    .split(/\s+/)[0];
            selector = ".filter-button-group:not(." + klass + ") .filter-content";
        } else {
            selector = ".filter-content";
        }
        $(selector).removeClass("open");
    });

});

function updateSelection(val, klass, filters) {
    var checkboxes = $(val)
        .find(".active")
        .toArray(),
        localFilters = [];

    $(checkboxes).each(function () {
        var dataFilter = $(this).attr("data-filter");
        localFilters.push(dataFilter);
    });

    if (klass.indexOf("-") > -1) {
        klass = klass.substring(0, klass.indexOf("-"));
    }

    filters[klass] = localFilters;
}

function updateFilters() {
    var groups = $(".filter-button-group").toArray(),
        filters = {};

    $(groups).each(function () {
        var self = $(this),
            klass = $(self)
                .attr("class")
                .split(/\s+/)[0],
            selector = "." + klass;

        updateSelection(selector, klass, filters);
    });

    var filterVal = concatFilters(filters);

    $('div[id*="BlogContents"]').isotope({
        filter: filterVal
    });
}

function concatFilters(obj) {
    var allFilters = [];

    for (var prop in obj) {
        var group = obj[prop];
        if (!group.length) {
            continue;
        }

        if (!allFilters.length) {
            allFilters = group.slice(0);
            continue;
        }

        var nextFilterList = [];

        for (var i = 0; i < allFilters.length; i++) {
            for (var j = 0; j < group.length; j++) {
                var item = allFilters[i] + group[j];
                nextFilterList.push(item);
            }
        }

        allFilters = nextFilterList;
    }

    allFilters = allFilters.join(", ");

    return allFilters;
}

function makinFilters() {

    categoryList = [];

    $('.label-search-tag').each(function () {
        var self = $(this);
        categoriesMaster = {};
        var ariaLabels = $(self).attr('aria-label');
        var filterCategory = ariaLabels.indexOf(':');
        var categoryValue = ariaLabels.slice(6, filterCategory);
        var tagValueStart = ariaLabels.indexOf('tag=') + 4;
        var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
        categoriesMaster.categoryType = categoryValue;
        categoriesMaster.tag = tagValue;
        categoryList.push(categoriesMaster);

    });

    categoryList.forEach(function (category) {

        var categoryTypeClassConversion = category.categoryType;
        categoryTypeClassConversion = categoryTypeClassConversion.replace(/\s+/g, '-').toLowerCase();

        var categoryTagClassConversion = category.tag;
        categoryTagClassConversion = categoryTagClassConversion.replace(/\\|\//, "").replace(/\s+/g, '-').toLowerCase();

        if ($('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0 &&
        (categoryTypeClassConversion == "content-topics" ||
        categoryTypeClassConversion == "year")) {
            $('.dropdown-group .HtmlContent').append('<div class="' + categoryTypeClassConversion + ' filter-button-group "><div class="filter-content clearfix"><span class="filter-label">Filter by ' + category.categoryType.toLowerCase() + '</span><ul class="multiple-select"></ul></div></div>');
        }

        if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {
            if ($('ul.multiple-select > li.checkbox-filter label input[data-filter=".' + categoryTagClassConversion + '"]').length === 0) {
                $('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append('<li class="checkbox-filter"><label class="container"><input type="checkbox" id="' + category.tag + '" data-filter=".' + categoryTagClassConversion + '">' + category.tag + '<span class="checkmark"></span></label></li>');
            }
        }

    });

    $('.filter-button-group .filter-content .multiple-select').prepend('<li class="checkbox-filter"><label class="container"><input type="checkbox" id="all" data-filter="">Show All<span class="checkmark"></span></label></li>');

}

function clearFilters() {
    var selectors = $('.checkbox-filter input');

    // remove active/checked status from filter checkboxes
    $(selectors).each(function() {
        var selector = $(this);
        $(selector).removeClass('active');
        selector.checked = false;
        $(selector).parent().removeClass('is-active');
    });
    // show all items in the grid and reset filter dropdowns
    $('div[id*="BlogContent"]').isotope({ filter: '*' });
    $('.filter-label').text('Select filter options');
    $('.filter-content').removeClass('has-selection');

}