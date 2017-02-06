var dreamjournal;
(function (dreamjournal) {
    var Services;
    (function (Services) {
        var InterpretService = (function () {
            function InterpretService($resource) {
                this.$resource = $resource;
                this.InterpretResource = this.$resource('/api/services/Interpret');
            }
            InterpretService.prototype.getMeaning = function (symbol) {
                return this.InterpretResource.get({ symbol: symbol });
            };
            return InterpretService;
        }());
        Services.InterpretService = InterpretService;
        angular.module("dreamjournal").service("interpretService", InterpretService);
    })(Services = dreamjournal.Services || (dreamjournal.Services = {}));
})(dreamjournal || (dreamjournal = {}));
