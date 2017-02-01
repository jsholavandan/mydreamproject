var dreamjournal;
(function (dreamjournal) {
    var Services;
    (function (Services) {
        var DreamService = (function () {
            function DreamService($resource) {
                this.$resource = $resource;
                this.DreamResource = this.$resource('/api/dreams/:id');
                this.PublicDreamsResource = this.$resource('/api/dreams/publicDreams');
            }
            DreamService.prototype.listDreams = function (username) {
                return this.DreamResource.query({ username: username });
            };
            DreamService.prototype.getDream = function (id) {
                return this.DreamResource.get({ id: id });
            };
            DreamService.prototype.saveDream = function (dreamObj) {
                return this.DreamResource.save({ id: dreamObj._id }, dreamObj).$promise;
            };
            DreamService.prototype.listPublicDreams = function () {
                return this.PublicDreamsResource.query();
            };
            return DreamService;
        }());
        Services.DreamService = DreamService;
        angular.module("dreamjournal").service('dreamService', DreamService);
    })(Services = dreamjournal.Services || (dreamjournal.Services = {}));
})(dreamjournal || (dreamjournal = {}));
