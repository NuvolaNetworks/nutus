(function(window, $, obj) {
    var NutusUploader = function(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
    };

    NutusUploader.prototype = {
        defaults: {
            endpoint: "/nutus/uploads",
            resume: true,
            headers: {},
            chunkSize: Math.pow(2, 20),
            withCredentials: false,

            onError: function (error) {
                this.$uploadContainer.find('.progress').removeClass("active");
                alert("Failed because: " + error)
            },

            onProgress: function (bytesUploaded, bytesTotal) {
                if (shouldUpdateProgress) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                    this.$uploadContainer.find('.bar').css('width', percentage + '%');
                    shouldUpdateProgress = false;
                }
            },

            onSuccess: function () {
                this.$uploadContainer.find('.progress')
                    .removeClass('active');
                this.$uploadContainer.find('.btn')
                    .remove();
                this.isUploading = false;
                this.$uploadContainer.find('.bar').css('width', '100%');
            },

            onChunkComplete: function() {
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

            this.$elem
                .prop('disabled', true)
                .parent()
                .siblings()
                .show();

            this.upload = new tus.Upload(this.elem.files[0], this.config);
            this.isUploading = true;
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