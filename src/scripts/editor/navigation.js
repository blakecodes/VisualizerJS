// TODO
// Setup clicking on nav items to show config for that item
// Setup content editable trigger to change names
// Verify exportd ata is correct



$(function () {
    var navIndex = 0;


    //
    // ─── EVENT HANDLERS ──────────────────────────────────────────────────────────────────────
    //
    var builder = dragula({
        containers: [document.querySelector('.nav-draggable')],
        copy: true,
        copySortSource: true,
        isContainer: function (el) {
            return el.classList.contains('addNav');
        }
    });

    $('body').on('click', '.delete-nav', function () {
        $(this).parent('li').remove();
    });


    //
    // ─── OBJECT BUILDER ─────────────────────────────────────────────────────────────
    //

    class LinkEditor {
        constructor() {
            var app = this;
            app.globalIndex = 0;
            app.editor = $('#link-list');
        }

        // Get the websites navigation content on initial page load
        get(callback) {
            $.ajax({
                url: '/api/navigation/main.json',
                type: 'GET'
            }).done(res => {
                app.navigation = res;

                if (typeof callback === 'function') {
                    callback();
                }
            });
        }

        buildItem(item) {
            let li = document.createElement('li');
            let img = document.createElement('img');
            let span = document.createElement('span');
            let ul = document.createElement('ul'); // optional
            let icon = document.createElement('i');


            img.src = '/src/assets/icons/path-finder/' + item.type + '.png';

            span.innerHTML = item.pageTitle;
            span.className = 'nav-label';
            span.setAttribute('data-nav-index', item.index);

            icon.className = 'fa fa-times-circle delete-nav';

            li.append(img);
            li.append(span);
            li.append(icon);

            // Add additional section to add files if it's a folder
            if (item.type === 'folder') {
                ul.className = 'link-list-sub addNav';
                li.append(ul);
            }

            return li;
        }

        buildLinkEditor(clear = false, callback) {
            //Clear a section out to reinstate
            if (clear) {
                $(clear).html('');
            }

            setTimeout(function () {
                app.navigation.map(item => {
                    let e = app.buildItem(item);

                    // Add first level items to the object
                    if (item.nested.length > 0) {
                        let one = item.nested;

                        one.map(item => {
                            $(e).find('ul').append(app.buildItem(item));
                        });
                    }
                    app.editor.append(e);
                });


                if (typeof callback === 'function') {
                    callback();
                }
            }, 10);
        }
    }

    //
    // ─── DROP FUNCTIONALITY ─────────────────────────────────────────────────────────
    //
    class Page {
        constructor(index) {
            this.index = index; // generate dynamic index for item
            this.nested = []; //default
            this.pageDescription = 'Page description can go here';
            this.pageName = 'Page';
            this.pageTitle = 'Page';
            this.type = 'page';
        }
    }

    class Folder {
        constructor(index) {
            this.index = index; // generate dynamic index for item
            this.nested = []; //default
            this.pageDescription = 'Page description can go here';
            this.pageName = 'Folder';
            this.pageTitle = 'Folder';
            this.type = 'folder';
        }
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //Navigation building component
    class NavBuilder extends LinkEditor {
        constructor() {
            super();
            let app = this;

            this.get(this.buildLinkEditor(false, function () {
                app.init();
            }));
        }

        init() {
            this.design();
        }

        //
        // ─── CONTENT MANAGEMENT ─────────────────────────────────────────────────────────
        //

        //Set a unique identifier to each label
        assing() {
            navIndex = 0;
            $('.nav-label').each(function () {
                let current = $(this).data('nav-index');

                if (!current) {
                    $(this).data('nav-index', navIndex);
                    $(this).attr('data-nav-index', navIndex);
                    navIndex++;
                }
            });
        }

        // Finds the second layer down of navigation
        checkDouble(e) {
            var elements = [];

            $(e).parent('li').find('ul .nav-label').each(function () {
                let html = $(this).html();
                let index = $(this).data('nav-index');
                elements.push({
                    text: html,
                    index: index
                });
            });

            return elements.length > 0 ? elements : false;
        }

        // Finds the third layer down of elements
        checkTripple(e) {
            var elements = [];

            $(e).parent('li').find('ul .nav-label').each(function () {
                let html = $(this).html();
                let index = $(this).data('nav-index');
                elements.push({
                    text: html,
                    index: index
                });
            });

            console.log('triple', elements);

            return elements.length > 0 ? elements : false;
        }

        // Generate a bootstrap dropdown
        generateDropdown(title, nested) {

            // Generate the list items
            function generateList(group) {
                var main = document.createElement('div');
                main.className = 'dropdown-menu';
                main.setAttribute('aria-labelledby', 'navbarDropwdownMenuLink');

                group.map(item => {
                    var el = document.createElement('a');
                    el.className = 'dropdown-item';
                    el.href = 'href';
                    el.innerHTML = item.pageTitle;

                    main.append(el);
                });

                return main;
            }

            // Generate the holder
            function generateHolder() {
                var main = document.createElement('li');
                main.className = 'nav-item dropdown';

                var a = document.createElement('a');
                a.className = 'nav-link dropdown-toggle';
                a.setAttribute('data-toggle', 'dropdown');
                a.setAttribute('aria-haspopup', 'true');
                a.setAttribute('aria-expanded', 'false');
                a.href = void(0);
                a.innerHTML = title;

                main.append(a);
                main.append(generateList(nested));

                return main;
            }


            return generateHolder();
        }

        // Basic bootstrap navigation item
        generateBootstrapLink(title) {
            var main = document.createElement('li');
            main.className = 'nav-item';

            var a = document.createElement('a');
            a.className = 'nav-link';
            a.innerHTML = title;
            a.href = void(0);

            main.append(a);

            return main;
        }

        // Build the html content layout for the navigation
        design() {
            var navBar = $('#link-holder');
            navBar.html(' ');
            app.navigation.map(nav => {
                // Create dropdown
                if (nav.nested.length > 0) {
                    navBar.append(app.generateDropdown(nav.pageTitle, nav.nested));
                } else { // Create single level
                    navBar.append(app.generateBootstrapLink(nav.pageTitle));
                }
            });
        }

        // ────────────────────────────────────────────────────────────────────────────────


        //
        // ─── DROP MANAGEMENT ─────────────────────────────────────────────
        //

        // Determine type of element that is being added
        typeDetection(source) {
            return $(source).data('type');
        }

        generateIndex() {
            let total = 0;

            $('[data-nav-index]').each(function () {
                total++;
            });

            return total;
        }

        // Check to find what index to nest into
        // This checks the closest parent element with an nav-index assigned.
        checkNested(target) {
            return $(target).prev().prev('[data-nav-index]').data('nav-index');
        }

        // Creates a new object to add to the global scope
        add(target, source) {
            let type = this.typeDetection(source);
            let obj = type === 'folder' ? new Folder(this.generateIndex()) : new Page(this.generateIndex());
            let location = this.checkNested(target);

            var update = $.grep(app.navigation, function (model) {
                if (model.index === location) {
                    model.nested.push(obj);
                }
            });

            this.design();
        }

        // Removes an object from the global scope
        // Cleans the UI as well.
        remove() {

        }
        // ─────────────────────────────────────────────────────────────────
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── CONTENT EDITOR ─────────────────────────────────────────────────────────────
    //


    function formControl(name) {
        return $('.form-control[name="' + name + '"]');
    }

    // Load model into the form
    function loadModel(model) {
        formControl('pageTitle').val(model.pageTitle);
        formControl('pageName').val(model.pageName);
        formControl('pageDescription').val(model.pageDescription);
        formControl('pageIndex').val(model.index);

        formControl('pageUrl').val(model.pageUrl);
    }

    function saveModel() {
        let model = new Page();

        model.index = formControl('pageIndex').val();
        model.pageTitle = formControl('pageTitle').val();
        model.pageName = formControl('pageName').val();
        model.pageDescription = formControl('pageDescription').val();

        return model;
    }

    // Find the object required inside of the object
    function getObject(theObject, index) {
        var result = null;
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                result = getObject(theObject[i], index);
                if (result) {
                    break;
                }
            }
        } else {
            for (var prop in theObject) {
                if (prop == 'index') {
                    if (theObject[prop] == index) {
                        return theObject;
                    }
                }
                if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                    result = getObject(theObject[prop], index);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    }

    // Set the newly edited object
    function setObject(theObject, index, model) {
        var result = null;
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                result = setObject(theObject[i], index, model);
                if (result) {
                    break;
                }
            }
        } else {
            for (var prop in theObject) {
                if (prop == 'index') {
                    if (theObject[prop] == index) {
                        theObject.pageTitle = model.pageTitle;
                        theObject.pageName = model.pageName;
                        theObject.pageDescription = model.pageDescription;

                        console.log('Object Here', theObject);

                        return theObject;
                    }
                }
                if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                    result = setObject(theObject[prop], index, model);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    }

    //Remove the object
    function removeObject(theObject, index, model) {
        var result = null;
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                result = setObject(theObject[i], index, model);
                if (result) {
                    break;
                }
            }
        } else {
            for (var prop in theObject) {
                if (prop == 'index') {
                    if (theObject[prop] == index) {
                        theObject.pageTitle = model.pageTitle;
                        theObject.pageName = model.pageName;
                        theObject.pageDescription = model.pageDescription;

                        console.log('Object Here', theObject);

                        return theObject;
                    }
                }
                if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                    result = setObject(theObject[prop], index, model);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── PAGE LEVEL FUNCTIONALITY ───────────────────────────────────────────────────
    //

    // Run
    var app = new NavBuilder();



    builder.on('drop', function (el, target, source, sibling) {
        app.design();
        app.add(target, el);
        app.buildLinkEditor('#link-list', app.design);
    });

    $('body').on('click', '.delete-nav', function () {
        app.init();
    });

    // Navigation labels
    $('body').on({
        'keyup': function () {
            app.init();
        },
        'click': function () {
            let index = $(this).attr('data-nav-index');

            let result = getObject(app.navigation, index);
            loadModel(result);
        }
    }, '.nav-label');


    //Save attributes
    $('#attrForm').on({
        'submit': function (e) {
            e.preventDefault();

            let index = formControl('pageIndex').val();

            setObject(app.navigation, index, saveModel());
            app.buildLinkEditor('#link-list', app.design);
        }
    });




    // ────────────────────────────────────────────────────────────────────────────────


});