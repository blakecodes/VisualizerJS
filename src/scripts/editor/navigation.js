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



    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── ATTRIBUTE EDITOR ───────────────────────────────────────────────────────────
    //

    function generateURL() {
        return window.location.hostname;
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── OBJECT BUILDER ─────────────────────────────────────────────────────────────
    //

    //Navigation building component
    class NavBuilder {
        constructor() {
            var app = this;
            app.navigation = [];
        }

        //Set a unique identifier to each label
        assing() {
            $('.nav-label').each(function () {
                $(this).data('nav-index', navIndex);
                $(this).attr('data-nav-index', navIndex);
                navIndex++;
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
            var navBar = $('#link-holder');
            navBar.html(' ');
            app.navigation.map(nav => {
                // Create dropdown
                if (nav.nested.length > 0) {
                    navBar.append(this.generateDropdown(nav.text, nav.nested));
                } else { // Create single level
                    navBar.append(this.generateBootstrapLink(nav.text));
                }
            });
        }


        // Develop the full structure of the navigation into an object
        build() {
            app.navigation = [];

            this.assing();

            // Add the item to the main object
            $('#link-list > li > .nav-label').each(function () {
                let html = $(this).html();
                let index = $(this).data('nav-index');

                app.navigation.push({
                    text: html,
                    index: index,
                    nested: app.checkDouble(this)
                });
            });
        }

    }

    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ─── PAGE LEVEL FUNCTIONALITY ───────────────────────────────────────────────────
    //

    // Run
    var app = new NavBuilder();
    app.build();
    app.design();

    builder.on('drop', function (el, target, source, sibling) {
        app.build();
        app.design();

        // Add content editables for new items
        $('#link-list .nav-label').each(function () {
            $(this).attr('contenteditable', true);
        })
    });

    $('body').on('click', '.delete-nav', function () {
        app.build();
        app.design();
    });

    $('body').on('keyup', '.nav-label', function () {
        app.build();
        app.design();
    });

    // ────────────────────────────────────────────────────────────────────────────────


});