$(function () {


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


});