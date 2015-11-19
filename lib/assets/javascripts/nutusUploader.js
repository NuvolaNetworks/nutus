(function(window, $) {
    var NutusUploader = function(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
    };

    NutusUploader.prototype = {
        defaults: {
            endpoint: '/nutus/uploads',
            resume: true,
            headers: {},
            chunkSize: Math.pow(2, 20),
            withCredentials: false,

            onError: function (error) {
                this.$uploadContainer
                    .find('.progress')
                    .removeClass('progress-striped');
                alert('Failed because: ' + error)
            },

            onProgress: function (bytesUploaded, bytesTotal) {
                if (this.shouldUpdateProgress) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                    this.$progressBar.css('width', percentage + '%');
                    this.shouldUpdateProgress = false;
                }
            },

            onSuccess: function () {
                window.clearInterval(this.progressIntervalID);
                this.$progressBar.css('width', '100%');
                window.setTimeout((function() {
                    this.$uploadContainer
                        .prev()
                        .css('text-decoration', 'line-through');
                    this.$uploadContainer
                        .find('.progress')
                        .removeClass('progress-striped');
                    this.$uploadContainer
                        .prepend('<div>' + this.upload.file.name + '</div>')
                        .prepend('<input name="nutus_upload_url" type="hidden" value="' + this.upload.url + '">');
                    this.$elem
                        .remove();
                }).bind(this), 500);
            }
        },
           
        init: function() {
            this.config = $.extend({}, this.defaults, this.options);

            this.config = _.mapValues(this.config, function(v) {
                if (typeof v === 'function') {
                    return v.bind(this);
                } else {
                    return v;
                }
            }, this);

            this.$uploadContainer = $(this.elem).parent().parent();
            this.$progressBar = this.$uploadContainer.find('.progress-bar');
            this.$elem
                .prop('disabled', true)
                .parent()
                .siblings()
                .show();

            this.progressIntervalID = window.setInterval(function() {
                this.shouldUpdateProgress = true;
            }, 500);

            this.upload = new tus.Upload(this.elem.files[0], this.config);
            this.upload.start();

            return this;
        }
    };

    $.fn.nutusUploader = function(options) {
        return this.each(function() {
            new NutusUploader(this, options).init();
        });
    };

    window.NutusUploader = NutusUploader;
})(window, jQuery);
