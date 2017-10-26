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


            img.src = '/src/assets/icons/path-finder/' + item.type + '.png';

            span.innerHTML = item.pageTitle;
            span.className = 'nav-label';
            span.setAttribute('data-nav-index', item.index);

            li.append(img);
            li.append(span);

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
                    app.editor.append(app.buildItem(item));
                });

                if (typeof callback === 'function') {
                    callback();
                }
            }, 10);
        }
    }

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
                    el.innerHTML = item.text;

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
            console.log(app.navigation)
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
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── DROP FUNCTIONALITY ─────────────────────────────────────────────────────────
    //
    class Page {
        constructor(index) {
            this.index = index; // generate dynamic index for item
            this.nested = false; //default
            this.pageDescription = 'Page description can go here';
            this.pageName = 'New Page';
            this.pageTitle = 'New Page';
            this.type = 'page';
        }
    }

    class Folder {
        constructor(index) {
            this.index = index; // generate dynamic index for item
            this.nested = false; //default
            this.pageDescription = 'Page description can go here';
            this.pageName = 'New Page';
            this.pageTitle = 'New Page';
            this.type = 'folder';
        }
    }

    class DropDetection {
        constructor() {}

        // Determine type of element that is being added
        typeDetection(source) {
            return $(source).data('type');
        }

        generateIndex() {
            return 0;
        }

        // Check to find what index to nest into
        // This checks the closest parent element with an nav-index assigned.
        checkNested(target) {
            return $(target).prev('[data-nav-index]').data('nav-index');
        }

        // Creates a new object to add to the global scope
        add(target, source) {
            let type = this.typeDetection(source);

            var obj = type === 'folder' ? new Folder(this.generateIndex()) : new Page(this.generateIndex());

            var location = this.checkNested(target);

            console.log(location);
        }
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
        let index = formControl('pageIndex').val();

        var update = $.grep(app.navigation, function (model) {
            if (model.index == index) {
                model.pageTitle = formControl('pageTitle').val();
                model.pageName = formControl('pageName').val();
                model.pageDescription = formControl('pageDescription').val();
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── PAGE LEVEL FUNCTIONALITY ───────────────────────────────────────────────────
    //

    // Run
    var app = new NavBuilder();
    var dropDetection = new DropDetection();



    builder.on('drop', function (el, target, source, sibling) {
        app.design();

        dropDetection.add(target, el);
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
            let index = $(this).data('nav-index');

            var result = $.grep(app.navigation, function (e) {
                return e.index == index;
            });

            console.log(result[0]);
            loadModel(result[0]);
        }
    }, '.nav-label');


    //Save attributes
    $('#attrForm').on({
        'submit': function (e) {
            e.preventDefault();

            saveModel();
            app.buildLinkEditor('#link-list', app.design);
        }
    });




    // ────────────────────────────────────────────────────────────────────────────────


});