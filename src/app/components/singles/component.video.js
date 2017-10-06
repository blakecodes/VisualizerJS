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
                this.src = $(this).data('jw-video');
                $(this).attr('id', generated);

                var player = jwplayer(generated).setup({
                    file: "https://cdn.jwplayer.com/videos/xJ7Wcodt-Zq6530MP.mp4"
                });

                videos.push(generated);
            }
        });
    }

    // NOPROD - These should be loaded only once
    setInterval(function () {
        loadVideos();
    }, 500);

    loadVideos();
});