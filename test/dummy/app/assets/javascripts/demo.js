var demo = (function () {
    var $uploadTemplate = $('#upload-template');
    var uploadTemplate = Handlebars.compile($uploadTemplate.html());
    var resumeCheckbox = document.querySelector("#resume");
    var alertBox = document.querySelector("#support-alert");
    var chunkInput = document.querySelector("#chunksize");
    var endpointInput = document.querySelector("#endpoint");

    var DEFAULT_CHUNK_SIZE = Math.pow(2,20);
    chunkInput.value = DEFAULT_CHUNK_SIZE;

    if (!tus.isSupported) {
        alertBox.className = alertBox.className.replace("hidden", "");
    }

    addNewUploader();

    function addNewUploader() {
        $uploadTemplate.after(uploadTemplate());

        var fileInput = $('input[type=file]:enabled');

        fileInput.on("change", function (e) {
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

        var file = fileInput.files[0];
        addNewUploader();

        var endpoint = endpointInput.value;
        var chunkSize = parseInt(chunkInput.value, 10);
        if (isNaN(chunkSize)) {
            chunkSize = DEFAULT_CHUNK_SIZE;
        }

        var options = {
            endpoint: endpoint,
            resume: !resumeCheckbox.checked,
            chunkSize: chunkSize,
            metadata: {
                filename: file.name
            },
            onError: function (error) {
                $uploadContainer.find('.progress').removeClass("active");
                alert("Failed because: " + error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                if (shouldUpdateProgress) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                    $uploadContainer.find('.bar').css('width', percentage + '%');
                    shouldUpdateProgress = false;
                }
            },
            onSuccess: function () {
                $uploadContainer.find('.progress')
                    .removeClass('active');
                $uploadContainer.find('.btn')
                    .remove();
                isUploading = false;
                $uploadContainer.find('.bar').css('width', '100%');
            },
            onChunkComplete: function() {
            }
        };

        upload = new tus.Upload(file, options);
        upload.start();
        var isUploading = true;
        var shouldUpdateProgress = false;
        var uploadInterval = window.setInterval(function() {
            if (isUploading) {
                shouldUpdateProgress = true;
            }
        }, 500);
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
});

$(function() {
    demo = demo();
});
