$(function () {
    setTimeout(function () {
        tinymce.baseURL = "/node_modules/tinymce";

        tinymce.init({
            selector: '#tinymce',
            height: "450px",
            menubar: false,
            theme: "modern",
            theme_url: "/node_modules/tinymce/themes/modern/theme.js",
            init_instance_callback: function (editor) {
                setContent();
            },
            plugins: [
                'advlist autolink lists link image charmap print preview anchor textcolor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code help'
            ],
            toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });
    }, 500);

    $('#save-tiny').on('click', function () {
        saveContent();
    });

    $('#cancel-tiny').on('click', function () {
        hideModal();
    });

    $(document).on('click', '[data-special-tool]', function () {
        setContent();
    });

    function setContent() {
        var selected = $('.selected-content').html();
        setTimeout(function () {
            tinymce.activeEditor.setContent(selected);
        }, 300);
    }

    function saveContent() {
        var tiny = tinymce.activeEditor.getContent();
        $('.selected-content').html(tiny);
        hideModal();
    }


    function hideModal() {
        $('.expanded-editor').hide();
    }

});