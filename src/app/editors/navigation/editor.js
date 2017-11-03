$(function () {
    var siteUrl = location.protocol + '//' + location.hostname + '/';

    //
    // ─── PAGE LEVEL FUNCTIONS ───────────────────────────────────────────────────────
    //
    $('.tab').on('click', function () {
        switchTab(this);
    });

    $('.sp-tooltip').tooltipster();

    $('.new-meta').on('click', function () {
        addMeta();
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

    function addMeta() {
        let template = `<div class="row form-group">
                            <div class="col-md-6">
                                <label for="">Meta Key</label>
                                <input type="text" class="form-control" name="pageAuthor">
                            </div>
                            <div class="col-md-6">
                                <label for="">Meta Value</label>
                                <input type="text" class="form-control" name="pageAuthor">
                            </div>
                        </div>`;

        $('.added-meta').append(template);
    }

    // ────────────────────────────────────────────────────────────────────────────────

});