// TODO:
// 1. Rememberance of loaded components
// 2. Rememberance of scripts loaded


$(function () {
    var editMode = true; //Set to false to disable component checks globally
    var editingOn = false;
    var previewMode = false;
    var componentSelector = "[data-component]";
    var editableToolbar = $('.editable-toolbar');
    var specialEditorHolder = $('.expanded-editor');
    var specialEditor = $('#special-editor');
    var selectedContent = $('.selected-content');

    var editors = [];
    var components = [];

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

    // var player = jwplayer('player').setup({
    //     file: "https://cdn.jwplayer.com/videos/xJ7Wcodt-Zq6530MP.mp4"
    // });

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EVENT BINDINGS ─────────────────────────────────────────────────────────────
    //

    builder.on('drop', function (el, target, source, sibling) {
        replaceComponentHandler();
    });

    $('body').on('click', '[data-tool="inline"]', function () {
        editingOn = !editingOn;
        editingOn ? enableEditing('.selected-content') : disableEditing('.selected-content');
    });

    $('body').on('click', '[data-tool="erase"]', function () {
        eraseComponent();
    });

    $('body').on('click', '[data-tool="settings"]', function () {
        loadSettingsEditor(getCurrentComponent());
    });

    // Toolbar selection
    $("body").on('click', componentSelector, function (event) {
        event.stopPropagation();
        if (editableToolbar.is(':visible') && editingOn == false) {
            componentDestroy(this);
        } else {
            componentInit(this);
        }
    });

    $('body').on("keyup", "#regular-editor input", function (e) {
        if (e.which == 13) {
            saveSettings();
            closeSettings();
        }
    });

    $('#close-settings').on('click', function () {
        closeSettings();
    });

    $('#save-settings').on('click', function () {
        saveSettings();
        closeSettings();
    });


    $('body').on('click', '[data-special-tool]', function () {
        var type = $(this).data('special-tool');
        loadSpecialEditor(type, function () {
            specialEditorHolder.show();
        });
    });

    $('#preview-mode').on('click', function () {
        togglePreview();
    })

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EDITING FUNCTIONALITIES ────────────────────────────────────────────────────
    //

    function togglePreview() {
        if (previewMode == true) {
            $('.col-title').show();
            previewMode = false;
        } else {
            $('.col-title').hide();
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
        var componentType = $(e).data('component');

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
                li.setAttribute("data-special-tool", this.tool);
            } else {
                li.setAttribute("data-tool", this.tool);
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
    function loadComponent(url) {
        $.getJSON("/src/app/components/singles/component." + url + ".json", function (data) {
            determineTools(data.tools);
        });
    }

    //Find component structure information
    function findComponent(component) {
        var data;

        $.ajax({
            url: "/src/app/components/singles/component." + component + ".json",
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
        $('.page-content [data-find-component]').each(function () {
            var type = $(this).data('find-component');

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
            $.getJSON("/src/app/editors/editor." + type + ".json", function (data) {
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
        var form = document.createElement('form');

        determineEditorView('#special-editor', '#regular-editor');

        settingsEditorService(type, data => {
            // Create a group for each set
            $.each(data.config, function () {
                var g = document.createElement("div");
                g.className = "form-group";
                g.append(generateLabel(this));
                g.append(generateField(this));
                form.append(g);
            });

            // WORK -- need to finish adding of labels and element
            // Generate editing field
            function generateField(obj) {
                var e = document.createElement(obj.type);
                e.setAttribute('data-set', obj.node);
                e.setAttribute('data-element-type', obj.elementType);

                // Craft element by type
                switch (obj.type) {
                    case 'Input':
                        e.type = "text";
                        e.className = "form-control";
                        e.value = generateValue(obj);
                        break;
                        // WORK -- need to finish setup for check boxes
                    case 'Checkbox':
                        var label = document.createElement('label');
                        var input = document.createElement('input');
                        var span = document.createElement('span');

                        label.className = 'form-check-label';
                        input.type = "checkbox";
                        input.className = 'form-check-input';
                        span.innerHTML = obj.name;

                        input.append(span);
                        label.append(input);

                        e = label;

                        break;
                    case 'Select':
                        e.className = "form-control";
                        $.each(obj.options, function () {
                            e.append(generateOption(this));
                        });
                        console.log(e);
                        break;
                }
                return e;
            }

            // Generate input labels
            function generateLabel(obj) {
                var l = document.createElement("label");
                l.innerHTML = obj.name;

                return l;
            }

            // Auto load the elements value into the editor
            function generateValue(obj) {
                var e = $('.selected-content [data-retrieve="' + obj.node + '"]');

                switch (obj.elementType) {
                    case 'image':
                        return e.attr('src');
                    case 'text':
                        return e.html();
                    case 'video':
                        e = $('.selected-content[data-retrieve="' + obj.node + '"]');
                        return e.data('jw-video');
                    default:
                        return '';
                }
            }

            function generateOption(obj) {
                var option = document.createElement("option");
                option.text = obj.label;
                option.value = obj.value;

                return option;
            }
        });
        $('#regular-editor .editor-body').html('');
        $('#regular-editor .editor-body').append(form);
        specialEditorHolder.show();
    }

    function saveSettings() {
        $('.editor-body [data-set]').each(function () {
            var set = $(this).data('set');
            var type = $(this).data('element-type');
            var value = $(this).val();

            switch (type) {
                case 'image':
                    $('.selected-content [data-retrieve="' + set + '"]').attr('src', value);
                    break;
                case 'text':
                    $('.selected-content [data-retrieve="' + set + '"]').html(value);
                    break;
                case 'video':
                    var component = $('.selected-content[data-retrieve="' + set + '"]');
                    var video = component.find('.jwplayer').attr('id');

                    component.data('jw-video', value);
                    jwplayer("jw-0").load([{
                        file: value
                    }]);
                    break;
            }
        });

    }

    function closeSettings() {
        specialEditorHolder.hide();
    }

    function determineEditorView(hide, show) {
        $(hide).hide();
        $(show).show()
    }

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
        return $('.selected-content').data('component');
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── SERVICE CALLS ──────────────────────────────────────────────────────────────
    //

    function settingsEditorService(type, callback) {
        $.ajax({
            url: "/src/app/components/singles/component." + type + ".json",
            type: "GET",
            dataType: "JSON",
            async: false,
            success: function (data) {
                callback(data);
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────────────


});