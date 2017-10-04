$(function () {
    var editingOn = false;
    var componentSelector = "[data-component]";
    var editableToolbar = $('.editable-toolbar');

    var builder;

    var builder = dragula({
        containers: [document.querySelector('.component-list')],
        copy: true,
        isContainer: function (el) {
            return el.classList.contains('addContent');
        }
    });

    builder.on('drop', function (el, target, source, sibling) {
        replaceComponentHandler();
    });

    // Event bindings
    $('[data-trigger="inline-editor"]').on('click', function () {
        editingOn = !editingOn;
        editingOn ? enableEditing('.selected-content') : disableEditing('.selected-content');
    });

    // Toolbar selection
    $("body").on('click', componentSelector, function () {
        if (editableToolbar.is(':visible') && editingOn == false) {
            componentDestroy(this);
        } else {
            componentInit(this);
        }
    });

    // Initialize the component
    function componentInit(e) {
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
            li.className = "glyph-icon editoricon-" + this;
            toolBar.append(li);
        });
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

    // Component duplication
    function copyComponent(selector) {

    }

    function pasteComponent() {

    }

    function loadComponent(url) {
        $.getJSON("/src/app/components/singles/component." + url + ".json", function (data) {
            $.each(data.Component.Scripts, function () {
                console.log('Loading script: ' + this);
            });
            determineTools(data.Component.Tools);
        });
    }

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

    function replaceComponentHandler() {
        $('.page-content [data-find-component]').each(function () {
            var type = $(this).data('find-component');

            var component = findComponent(type);

            $(this).replaceWith(component.Component.Content);
        });
    }



});