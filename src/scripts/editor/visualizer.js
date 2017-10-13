$(function () {
    let currentHighlighted;

    //
    // ─── EVENT HANDLERS ─────────────────────────────────────────────────────────────
    //
    $('[ref-highlight]').on('mouseover', function () {
        let target = $(this).attr('ref-highlight');

        $(`[ref-highlight="${target}"]`).each(function (e) {
            currentHighlighted = target
            generateHighlight(this);
        });
    });

    $('body').on('mouseout', '.blue-highlight', function () {
        destroyHighlight();
    });


    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── REACTIVE ───────────────────────────────────────────────────────────────────
    //

    function loadEachHighlight() {

    }

    function generateHighlight(e) {
        let t = $(e).offset().top,
            w = $(e).outerWidth(),
            h = $(e).outerHeight(),
            l = $(e).offset().left,
            template = document.createElement('div');
        template.className = 'blue-highlight';
        template.style.top = t + "px";
        template.style.left = l + "px";
        template.style.height = h + "px";
        template.style.width = w + "px";

        $('.highlight-holder').append(template);

    }

    function destroyHighlight() {
        $('.blue-highlight').remove();
    }

    // ────────────────────────────────────────────────────────────────────────────────


});