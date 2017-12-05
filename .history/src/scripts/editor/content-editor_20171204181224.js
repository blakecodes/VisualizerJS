import FormBuilder from '../FormBuilder/FormBuild';

$(function () {

    var editMode = true; //Set to false to disable component checks globally
    var editingOn = false;
    var previewMode = false;
    var componentSelector = "[ref-component]";
    var editableToolbar = $('.editable-toolbar');
    var specialEditorHolder = $('.expanded-editor');
    var specialEditor = $('#special-editor');
    var selectedContent = $('.selected-content');

    const selectedText = '.selected-content';

    var editors = [];
    var components = [];

    let fBuilder = new FormBuilder();

    //
    // ─── PLUGIN MANAGEMENT ──────────────────────────────────────────────────────────
    //

    var builder = dragula({
        containers: [document.querySelector('.component-list')],
        copy: true,
        isContainer: function (el) {
            return el.classList.contains('addContent');
        }
    });

    jwplayer.key = "X5QKI+p+VegDxS5LBErjiUUECLkNzvJO0rwdfBCMPpE=";

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EVENT BINDINGS ─────────────────────────────────────────────────────────────
    //

    builder.on('drop', function (el, target, source, sibling) {
        replaceComponentHandler();
    });

    $('body').on('click', '[ref-tool="inline"]', function () {
        editingOn = !editingOn;
        editingOn ? enableEditing('.selected-content') : disableEditing('.selected-content');
    });

    $('body').on('click', '[ref-tool="erase"]', function () {
        eraseComponent();
    });

    $('body').on('click', '[ref-tool="settings"]', function () {
        loadSettingsEditor(getCurrentComponent());
    });

    // Toolbar selection
    $("body").on('click', componentSelector, function (event) {
        event.stopPropagation();

        if (!previewMode) {
            if (!$(this).hasClass('selected-content')) {
                componentInit(this);
            } else {
                if (editableToolbar.is(':visible') && editingOn == false) {
                    componentDestroy(this);
                } else {
                    componentInit(this);
                }
            }
        }
    });

    // On enter of editor modal, close and save
    $('body').on("keyup", "#regular-editor input", function (e) {
        if (e.which == 13) {
            fBuilder.save(this);
            //closeSettings();
        }
    });

    $('#close-settings').on('click', function () {
        closeSettings();
    });

    $('#save-settings').on('click', function () {
        fBuilder.save(this);
        closeSettings();
    });


    $('body').on('click', '[ref-special-tool]', function () {
        var type = $(this).attr('ref-special-tool');
        loadSpecialEditor(type, function () {
            specialEditorHolder.show();
        });
    });

    $('#preview-mode').on('click', function (e) {
        e.preventDefault();
        togglePreview();
    });

    // Preview handlers
    $('#toggleIpad').on('click', function () {
        previewIpad();
    });
    // Preview handlers
    $('#toggleIphone').on('click', function () {
        previewIphone();
    });
    // Preview handlers
    $('#toggleDesktop').on('click', function () {
        previewDesktop();
    });
    $('.nav-icons i').on('click', function () {
        $('.selected-icon').removeClass('selected-icon');
        $(this).addClass('selected-icon');
    });

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EDITING FUNCTIONALITIES ────────────────────────────────────────────────────
    //

    function togglePreview() {
        if (previewMode == true) {
            $('.col-title').show();
            $('.addContent').css('border', '1px solid #a2a2a2');
            previewMode = false;
        } else {
            $('.col-title').hide();
            $('.addContent').css('border', 'none');
            previewMode = true;
        }
    }

    // Initialize the component
    function componentInit(e) {
        $('.selected-content').removeClass('selected-content');
        $(e).addClass('selected-content');
        editableToolbar.show();

        var top = $(e).offset().top;
        var left = $(e).offset().left;
        var componentType = $(e).attr('ref-component');

        top = top - editableToolbar.outerHeight();

        editableToolbar.offset({
            top: top,
            left: left
        });

        loadComponent(componentType);
    }

    // Destroy the component
    function componentDestroy(e) {
        $(e).removeClass('selected-content');
        editableToolbar.hide();
    }

    // Determine which editing options need to be enabled
    function determineTools(tools) {
        var toolBar = $('.editable-toolbar');
        toolBar.html(' ');

        $.each(tools, function () {
            var li = document.createElement("i");
            li.className = "glyph-icon editoricon-" + this.name;

            if (this.special) {
                li.setAttribute("ref-special-tool", this.tool);
            } else {
                li.setAttribute("ref-tool", this.tool);
            }

            toolBar.append(li);
        });
    }

    function eraseComponent() {
        $('.selected-content').remove();
        editableToolbar.hide();
    }

    // Inline editing methods
    function enableEditing(selector) {
        $(selector).attr('contenteditable', true)
            .addClass('editing-content');
    }

    //Disable editing and hide toolbar
    function disableEditing(selector) {
        $(selector)
            .attr('contenteditable', false)
            .removeClass('editing-content');
        editableToolbar.hide();
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── COMPONENT MANAGEMENT ───────────────────────────────────────────────────────
    //

    //Initial load of coponent
    function loadComponent(type) {
        $.getJSON(`/src/app/components/singles/${type}/component.json`, function (data) {
            determineTools(data.tools);
        });
    }

    //Find component structure information
    function findComponent(type) {
        var data;

        $.ajax({
            url: `/src/app/components/singles/${type}/component.json`,
            async: false,
            type: 'GET',
            dataType: "JSON",
            success: function (res) {
                data = res;
            }
        });

        return data;
    }

    //Find component bindings and replace them with the content
    function replaceComponentHandler() {
        $('.page-content [ref-find-component]').each(function () {
            var type = $(this).attr('ref-find-component');

            var component = findComponent(type);

            $(this).replaceWith(component.content);

            if (!checkComponentRecord(type)) {
                $.each(component.scripts, function () {
                    var s = document.createElement('script');
                    s.type = "text/javascript";
                    s.src = this;
                    $('body').append(s);
                });
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EDITOR MANAGEMENT ──────────────────────────────────────────────────────────
    //

    function loadSpecialEditor(type, callback) {
        checkEditorRecord(type);

        determineEditorView('#regular-editor', '#special-editor');

        if (!checkEditorRecord()) {
            $.getJSON(`/src/app/editors/${type}/editor.json`, function (data) {
                specialEditor.html(data.content);

                $.each(data.scripts, function () {
                    var s = document.createElement('script');
                    s.type = "text/javascript";
                    s.src = this;
                    $('body').append(s);
                });

                callback();
            });
        } else {
            callback();
        }
    }

    // Basic level editor
    // Dynamically generate fields based on config settings
    function loadSettingsEditor(type) {
        let current = getCurrentComponent();

        determineEditorView('#special-editor', '#regular-editor');
        specialEditorHolder.show();

        fBuilder.setup(current);
    }

    function saveSettings() {
        $('.editor-body [ref-set]').each(function () {
            var target = $(this).attr('ref-set');
            var type = $(this).attr('ref-element-type');
            var value = $(this).val();

            switch (type) {
                case 'image':
                    findTarget(target).attr('src', value);
                    break;
                case 'text':
                    findTarget(target).html(value);
                    break;
                case 'video':
                    updateVideoContent(target, value);
                    break;
                case 'style':
                    console.log(updateClassContent(target, value, true));
                    break;
            }
        });
    }

    function closeSettings() {
        specialEditorHolder.hide();
    }

    function determineEditorView(hide, show) {
        $(hide).hide();
        $(show).show();
    }

    //
    // ─── CONTENT HANDLERS ───────────────────────────────────────────────────────────
    //

    function findTarget(target, joined = false) {
        return !joined ? $(`.selected-content [ref-retrieve="${ target }"]`) : $(`.selected-content[ref-retrieve="${ target }"]`);
    }

    function updateVideoContent(target, value) {
        var component = $(`.selected-content[ref-retrieve="${ target }"]`);
        var video = component.find('.jwplayer').attr('id');

        component.attr('ref-jw-video', value);
        jwplayer(video).load([{
            file: value
        }]);

    }

    // Checks for an exisiting class 
    function updateClassContent(target, value, bootstrap = false) {
        let e = findTarget(target, true);
        let classes = e.attr('class');

        //If targeting column widths
        //Pass through full class, replace with new size
        classes = bootstrap ? classes.replace(/(\bcol-\w*-(\w{1,2}))/, value) : classes.concat(` ${value}`);

        e.attr('class', classes);
    }


    // ────────────────────────────────────────────────────────────────────────────────

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── RECORD MANAGEMENT ────────────────────────────────────────────────────
    //

    function checkEditorRecord(type) {
        if ($.inArray(type, editors) !== -1) {
            return true;
        } else {
            addEditorRecord(type);
            return false;
        }
    }

    function addEditorRecord(type) {
        editors.push(type);
    }

    function checkComponentRecord(type) {
        if ($.inArray(type, components) !== -1) {
            return true;
        } else {
            addComponentRecord(type);
            return false;
        }
    }

    function addComponentRecord(type) {
        components.push(type);
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── GLOBAL COMMANDS ────────────────────────────────────────────────────────────
    //

    function getCurrentComponent() {
        return $('.selected-content').attr('ref-component');
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── SERVICE CALLS ──────────────────────────────────────────────────────────────
    //

    function settingsEditorService(type, callback) {
        $.ajax({
            url: `/src/app/components/singles/${type}/component.json`,
            type: "GET",
            dataType: "JSON",
            async: false,
            success: function (data) {
                callback(data);
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── PREVIEW MODES ──────────────────────────────────────────────────────────────
    //

    function getTheme() {
        let data = '';

        $.ajax({
            url: '/src/app/themes/simple/theme.html',
            type: 'GET',
            async: false,
            success: function (res) {
                data = res;
            }
        });

        return data;
    }

    function hideAll() {
        $('#iPadViewPort, #iPhoneViewPort, .desktopViewPort').hide();
    }

    function previewDesktop() {
        hideAll();
        $('.desktopViewPort').fadeIn();
    }

    function previewIpad() {
        hideAll();
        $('#iPadViewPort').fadeIn();
    }

    function previewIphone() {
        hideAll();
        $('#iPhoneViewPort').fadeIn();
    }

    // ────────────────────────────────────────────────────────────────────────────────
})