var demo = function () {
    var $uploadTemplate = $('#upload-template');
    var uploadTemplate = Handlebars.compile($uploadTemplate.html());
    var resumeCheckbox = document.querySelector("#resume");
    var alertBox = document.querySelector("#support-alert");
    var chunkInput = document.querySelector("#chunksize");
    var endpointInput = document.querySelector("#endpoint");

    chunkInput.value = Math.pow(2,20);

    if (!tus.isSupported) {
        alertBox.className = alertBox.className.replace("hidden", "");
    }

    addNewUploader();

    function addNewUploader() {
        $uploadTemplate.after(uploadTemplate());

        var fileInput = $('input[type=file]:enabled');

        fileInput.on('change', function (e) {
            startNewUpload(e.target);
        });
    }

    function startNewUpload(fileInput) {
        var upload = null;

        var $uploadContainer = $(fileInput).parent().parent();
        $(fileInput)
            .prop('disabled', true)
            .parent()
            .siblings()
            .show();

        addNewUploader();

        var endpoint = endpointInput.value;
        var chunkSize = parseInt(chunkInput.value, 10);
        if (isNaN(chunkSize)) {
            chunkSize = DEFAULT_CHUNK_SIZE;
        }

        var options = {
            endpoint: endpoint,
            headers: {userid: 1},
            resume: !resumeCheckbox.checked,
            chunkSize: chunkSize
        };


        $(fileInput)
            .on('nutus.onError', function () {
                $uploadContainer.find('.progress').removeClass('active');
                alert('problem!');
            })
            .on('nutus.onProgress', function (e, bytesSent, bytesTotal) {
                var percentage = (bytesSent / bytesTotal * 100).toFixed(2);
                console.log(percentage);
                $uploadContainer.find('.bar').css('width', percentage + '%');
            })
            .on('nutus.onSuccess', function () {
                $uploadContainer.find('.progress')
                    .removeClass('active');
                $uploadContainer.find('.btn')
                    .remove();
                isUploading = false;
                $uploadContainer.find('.bar').css('width', '100%');
            });

        $(fileInput).nutusUploader(options);

        var isUploading = true;

        $uploadContainer.find('.btn').on("click", function (e) {
            e.preventDefault();
            $(e.target)
                .text($(e.target).text() === 'Resume' ? 'Pause' : 'Resume')
                .toggleClass('btn-danger')
                .toggleClass('btn-success');
            if (isUploading) {
                isUploading = false;
                upload.abort();
            } else {
                isUploading = true;
                upload.start();
            }
        });
    }
};

$(function() {
    demo = demo();
});
