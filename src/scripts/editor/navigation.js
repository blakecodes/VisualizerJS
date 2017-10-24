$(function () {
    var navigation = [];
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
        }


        delete() {

        }

        add() {

        }

        assing() {
            //Set a unique identifier to each label
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


        // Develop the full structure of the navigation into an object
        build() {
            this.assing();

            // Add the item to the main object
            $('#link-list > li > .nav-label').each(function () {
                let html = $(this).html();
                let index = $(this).data('nav-index');

                navigation.push({
                    text: html,
                    index: index,
                    nested: app.checkDouble(this)
                });
            });

            console.log(navigation);
        }

    }


    // Run
    var app = new NavBuilder();
    app.build();


    // ────────────────────────────────────────────────────────────────────────────────


});