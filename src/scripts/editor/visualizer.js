$(function () {
    let currentHighlighted,
        currentView;

    //
    // ─── EVENT HANDLERS ─────────────────────────────────────────────────────────────
    //
    $('body').on('mouseover', '[ref-highlight]', function () {
        let target = $(this).attr('ref-highlight');

        $(`[ref-highlight="${target}"]`).each(function (e) {
            currentHighlighted = target
            generateHighlight(this, target);
        });
    });

    $('body').on('mouseout', '.blue-highlight', function () {
        destroyHighlight();
    });

    $('#import').on('click', function (e) {
        e.preventDefault();
        var importData = window.prompt('Import data');

        $('#contentBody').html(importData);
    });

    $('body').on('click', "[ref-trigger-section=\"navigation\"]", function () {
        turnOffHighlight();
        $('#contentBody, #footerBody').addClass('animated fadeOutUp');

        setTimeout(function () {
            $('#contentBody, #footerBody').hide();
        }, 500);
        setTimeout(function () {
            loadEditor('navigation');
        }, 500);
    });


    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── REACTIVE ───────────────────────────────────────────────────────────────────
    //

    function turnOnHighlight() {

    }

    function turnOffHighlight() {
        $('body').off('mouseover', '[ref-highlight]');
        destroyHighlight();
    }

    function generateHighlight(e, target) {
        let t = $(e).offset().top,
            w = $(e).outerWidth(),
            h = $(e).outerHeight(),
            l = $(e).offset().left,
            template = document.createElement('div');
        template.className = 'blue-highlight';
        template.setAttribute('ref-trigger-section', target);
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

    //
    // ─── PAGE LEVEL EDITORS ─────────────────────────────────────────────────────────
    //

    function loadEditor(type) {
        $.getJSON(`/src/app/editors/${type}/editor.json`, function (editor) {
            $('#editorBody').html(editor.content);
            $('#editorBody').addClass('animated fadeInLeft');
            $('#editorBody').show();
        });
    }



    // ────────────────────────────────────────────────────────────────────────────────


});