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
            chunkSize: Math.pow(2, 20),
            withCredentials: false
        },
           
        init: function() {
            this.config = {
                metadata: {
                    filename: this.elem.files[0].name
                }
            };

            ['onSuccess', 'onError'].forEach(function(v) {
                this.config[v] = (function() {
                    this.$elem.trigger('nutus.' + v);
                }).bind(this);
            }, this);

            this.config.onProgress = (function(bytesSent, bytesTotal) {
                this.$elem.trigger('nutus.onProgress', [bytesSent, bytesTotal]);
            }).bind(this);

            this.config = $.extend(this.config, this.defaults, this.options);

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
