//TODO: Add on and off switches for major event handlers
//This includes everything for video edits, content, etc.

$(function () {
    let currentHighlighted,
        currentView;

    let editors = [];
    let contentEditor = false;
    let navEditor = false;
    let insideEditor = false;


    //
    // ─── EVENT HANDLERS ─────────────────────────────────────────────────────────────
    //
    $(document).ready(function () {
        loadEditorConfigs();
        turnOnHighlight();
        editorOnly();
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
        insideEditor = true;
        editorOnly();

        $('#contentBody, #footerBody').addClass('animated fadeOutUp');

        setTimeout(function () {
            $('#contentBody, #footerBody').hide();
        }, 500);
        setTimeout(function () {
            loadNavEditor();
            cleanClasses('#contentBody, #footerBody', 'animated fadeOutUp');
        }, 500);
    });

    // Content trigger
    $('body').on('click', "[ref-trigger-section=\"content\"]", function () {
        turnOffHighlight();
        insideEditor = true;
        editorOnly();

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

        cleanClasses('#navBody, #footerBody', 'animated fadeOutUp');
        cleanClasses('#component-sidebar', 'animated slideInLeft');
    });

    // Asset manager
    $('#asset-view').on('click', function () {

        $('#navBody, #footerBody, #contentBody').addClass('animated fadeOutUp');

        setTimeout(function () {
            $('#navBody, #footerBody, #contentBody').hide();
        }, 500);

        setTimeout(function () {
            $('#asset-manager').addClass('animated slideInLeft').show();
        }, 500);

        setTimeout(function () {
            cleanClasses('#navBody, #footerBody, #contentBody', 'animated fadeOutUp');
            cleanClasses('#asset-manager', 'animated slideInLeft');
        }, 500);


    });

    // Reset 
    $('.back-arrow').on('click', function () {
        reinstateView();
        insideEditor = false;
        editorOnly();
    });

    // Add tooltips
    $('.sp-tooltip').tooltipster();


    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── REACTIVE ───────────────────────────────────────────────────────────────────
    //

    function turnOnHighlight() {
        $('body').on('mouseover', '[ref-highlight]', function () {
            let target = $(this).attr('ref-highlight');

            $(`[ref-highlight="${target}"]`).each(function (e) {
                currentHighlighted = target
                generateHighlight(this, target);
            });
        });
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
        $('#component-sidebar .component-list').html(' ');

        let current = editors[0].components;
        current.map((component) => {
            let li = document.createElement('li');
            li.innerHTML = component.name;
            li.setAttribute('ref-find-component', component.id);

            $('#component-sidebar .component-list').append(li);
        });
    }

    function loadNavEditor(type) {
        $()
        if (!navEditor) {
            $.getJSON(`/src/app/editors/navigation/editor.json`, function (editor) {
                $('#editorBody').html(editor.content)
                    .addClass('animated fadeInLeft')
                    .show();

                loadScripts(editor.scripts);
            });
            navEditor = true;
        } else {
            $('#editorBody')
                .addClass('animated fadeInLeft')
                .show();
        }
    }

    function loadContentEditor() {
        if (!contentEditor) {
            $.getJSON('/src/app/editors/content/editor.json', function (editor) {
                loadScripts(editor.scripts);
            });
            contentEditor = true;
        }
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
            cleanClasses('#sidebar', 'animated slideOutLeft');
        }, 1000);
    }


    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── REINSTATE VIEWER ───────────────────────────────────────────────────────────
    //

    function reinstateView() {
        // Turn off any event handlers that aren't going to be used


        //Remove outlines
        $('.addContent').css('border', 'none');

        //Hide the navigation editor
        $('#editorBody').addClass('animated fadeOutDown');

        // Determine which views to re-add
        setTimeout(function () {
            $('#navBody, #contentBody, #footerBody').each(function () {
                if (!$(this).is(':visible')) {
                    $(this).addClass('animated fadeInDown').show();
                }
            });

            cleanClasses('#editorBody', 'animated fadeOutDown');
            $('#editorBody').hide();
        }, 500);

        // Change the component bar
        let currentSidebar = $('.sidebar-left:visible').attr('id');
        $(`#${currentSidebar}`).addClass('animated slideOutLeft');

        setTimeout(function () {
            // Clean classes
            cleanClasses(`#${currentSidebar}`, 'animated slideOutLeft');
        }, 500);

        setTimeout(function () {
            $('#sidebar').addClass('animated slideInLeft');
            $('#sidebar').show();
        }, 500);

        //Re-enable highlighting
        turnOnHighlight();
    }

    function editorOnly() {
        if (insideEditor) {
            setTimeout(function () {
                $('.editor-only').fadeIn();
            }, 700);
        } else {
            $('.editor-only').fadeOut();
        }
    }

    function cleanClasses(e, classes) {
        setTimeout(function () {
            $(e).removeClass(classes);
        }, 500);
    }

    // ────────────────────────────────────────────────────────────────────────────────


});


test


var FormBuilding = new FormBuild();

FormBuilding.setup();