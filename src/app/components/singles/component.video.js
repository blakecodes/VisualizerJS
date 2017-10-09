$(function () {
    var videos = [];
    var videoCount = 0;

    // Check if the video already exists
    function checkInit(instance) {
        return $.inArray(instance, videos) !== -1 ? true : false;
    }

    // Generate unique ID for videos
    function genId(prefix) {
        return prefix + videoCount++;
    }

    function loadVideos() {
        $('[data-jw-player]').each(function () {
            var current = $(this).attr('id');

            // Check if the video already exists before initializing
            if (!checkInit(current)) {
                var generated = genId("jw-");
                this.src = $(this).parent('div').data('jw-video');
                $(this).attr('id', generated);

                var player = jwplayer(generated).setup({
                    file: this.src
                });

                videos.push(generated);
            }
        });
    }

    // Garauntee all videos are displayed in 16:9 format
    function set169Size() {
        $('.jwplayer').each(function () {
            var width = $(this).width();
            var height = (9 / 16) * width;

            $(this).height(height);
        });
    }

    // NOPROD - These should be loaded only once
    setInterval(function () {
        loadVideos();
        set169Size();
    }, 500);

    loadVideos();
});