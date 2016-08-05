(function () {
    'use strict';

    define(['jquery', 'noty'], function ($, noty) {
        let $body = $('body');

        $($body).on('click', '#upload-file-button', function () {
            $('#picture').click();
        });

        $($body).on('change', '#picture', function () {
            let file = this.files[0];

            if (file.type.match(/image\/.*/)) {
                let reader = new FileReader();

                reader.onload = function () {
                    $('.picture-name').text(file.name);
                    $('.picture-preview').attr('src', reader.result);
                    $('#picture').attr('data-picture-data', reader.result);
                };

                reader.readAsDataURL(file);
            } else {
                noty.error('Invalid file!');
            }
        });
    });
}());