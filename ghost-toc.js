(function ($) {
    "use strict";
    const h1 = "h1", h2 = "h2", h3 = "h3", h4 = "h4", h5 = "h5", h6 = "h6";
    const contentClass = "entry-content";
    let tocElArray = [];

    function tagReplace(tagSelector, tagName) {
        $(tagSelector).replaceWith(function () {
            return $(`<${tagName}/>`).append($(this).contents());
        });
    }

    function slugify(textContent) {
        return textContent.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    function removeTocText(thisEl, tag, tocTitle, indexValue) {
        let tocTitleR = tocTitle.replace(/ *\[[^\]]*]/, '');
        let id = "tocID_" + indexValue;
        $(thisEl).wrap(`<${tag} id="${id}" class="tocSection" data-anchor="${id}" ></${tag}>`);
        $(`#${id}`).text(tocTitleR);
    }

    function tocSmoothScroll() {
        $("#ghost-toc a").on('click', function (event) {
            if (this.hash !== "") {
                var hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 0, function () {
                    window.location.hash = hash;
                });
            }
        });
    }




    let x = 0;
    $(".entry-content h1,.entry-content h2,.entry-content h3,.entry-content h4, .entry-content h5,.entry-content h6,.entry-content p,.entry-content span,.entry-content a").each(function (el, index) {

        if ($(this).text().includes(`toc`)) {
            tocElArray.push($(this).text());
        }

        if ($(this).text().includes(`[toc ${h1}]`)) {
            removeTocText($(this), h1, $(this).text(), x);
            x++;
        }
        else if ($(this).text().includes(`[toc ${h2}]`)) {
            removeTocText($(this), h2, $(this).text(), x);
            x++;
        }
        else if ($(this).text().includes(`[toc ${h3}]`)) {
            removeTocText($(this), h3, $(this).text(), x);
            x++;
        }
        else if ($(this).text().includes(`[toc ${h4}]`)) {
            removeTocText($(this), h4, $(this).text(), x, "[toc h4]", "");
            x++;
        }
        else if ($(this).text().includes(`[toc ${h5}]`)) {
            removeTocText($(this), h5, $(this).text(), x);
            x++;
        }
        else if ($(this).text().includes(`[toc ${h6}]`)) {
            removeTocText($(this), h6, $(this).text(), x);
            x++;
        }
        else if ($(this).text().includes(`[toc]`)) {
            removeTocText($(this), h3, $(this).text(), x);
            x++;
        }
    });



    tocElArray.forEach(function (el, index) {
        let text = tocElArray[index].replace(/ *\[[^\]]*]/, '');
        $("#ghost-toc").append(`<a href="#tocID_${index}" class="ghost-toc-link">${text}</a>`);
    });

    $("#ghost-toc a").on('click', function (e) {
        e.preventDefault();
        console.log("clicked");
    });

    tocSmoothScroll();

    $(window).scroll(function () {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
            $('.tocSection').each(function (i) {
                if ($(this).position().top <= windscroll + 20) {
                    $('#ghost-toc a.active').removeClass('active');
                    $('#ghost-toc a').eq(i).addClass('active');
                }
            });

        } else {

            $('#ghost-toc a.active').removeClass('active');
        }

    }).scroll();


}(jQuery));