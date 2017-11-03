$(function () {
    var siteUrl = location.protocol + '//' + location.hostname + '/';

    //
    // ─── PAGE LEVEL FUNCTIONS ───────────────────────────────────────────────────────
    //
    $('.tab').on('click', function () {
        switchTab(this);
    });


    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── ATTRIBUTE EDITOR ───────────────────────────────────────────────────────────
    //

    $('.site-url').html(siteUrl);


    // Hide all but selected tab
    function switchTab(target) {
        let show = $(target).data('view-tab');

        $('.tab-content').each(function () {
            $(this).hide();
        });

        cleanTabStyle(target);

        $('[data-show-tab="' + show + '"]').show();
    }

    // Clean styling of all tabs and add selected
    function cleanTabStyle(target) {
        $('.tabs .selected').removeClass('selected');

        $(target).addClass('selected');
    }

    // ────────────────────────────────────────────────────────────────────────────────

});