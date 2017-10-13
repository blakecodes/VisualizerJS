$(function () {
    let currentHighlighted,
        currentView;

    let editors = [];


    //
    // ─── EVENT HANDLERS ─────────────────────────────────────────────────────────────
    //
    $(document).ready(function () {
        loadEditorConfigs();
    });
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

    // Navigation trigger
    $('body').on('click', "[ref-trigger-section=\"navigation\"]", function () {
        turnOffHighlight();
        $('#contentBody, #footerBody').addClass('animated fadeOutUp');

        setTimeout(function () {
            $('#contentBody, #footerBody').hide();
        }, 500);
        setTimeout(function () {
            loadNavEditor();
        }, 500);
    });

    // Content trigger
    $('body').on('click', "[ref-trigger-section=\"content\"]", function () {
        turnOffHighlight();
        $('#navBody, #footerBody').addClass('animated fadeOutUp');

        setTimeout(function () {
            $('#navBody, #footerBody').hide();
        }, 500);
        setTimeout(function () {
            loadContentEditor();
        }, 500);
        setTimeout(function () {
            $('#component-sidebar').addClass('animated slideInLeft').show();
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

    function loadEditorConfigs() {
        let find = ['content', 'navigation'];

        $.each(find, function () {
            $.ajax({
                url: `/src/app/editors/${this}/editor.json`,
                type: 'GET',
                dataType: 'JSON',
                success: function (res) {
                    editors.push(res);
                }
            });
        });
    }

    function loadComponentBar() {
        let current = editors[0].components;
        current.map((component) => {
            let li = document.createElement('li');
            li.innerHTML = component.name;
            li.setAttribute('ref-find-component', component.id);

            $('#component-sidebar .component-list').append(li);
        });
    }

    function loadNavEditor(type) {
        $.getJSON(`/src/app/editors/navigation/editor.json`, function (editor) {
            $('#editorBody').html(editor.content);
            $('#editorBody').addClass('animated fadeInLeft');
            $('#editorBody').show();

            loadScripts(editor.scripts);
        });
    }

    function loadContentEditor() {
        $.getJSON('/src/app/editors/content/editor.json', function (editor) {
            loadScripts(editor.scripts);
        });
        $('.addContent').css('border', '1px solid #a2a2a2');
        loadComponentBar();
        swapSideBar();
    }

    function loadScripts(scripts) {
        scripts.map((script) => {
            var s = document.createElement('script');
            s.type = "text/javascript";
            s.src = script;
            $('body').append(s);
        });
    }

    function swapSideBar(type) {
        $('#sidebar').addClass('animated slideOutLeft');
        setTimeout(function () {
            $('#sidebar').hide();
        }, 1000);
    }



    // ────────────────────────────────────────────────────────────────────────────────


});