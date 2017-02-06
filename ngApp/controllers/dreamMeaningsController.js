var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var DreamMeaningsController = (function () {
            function DreamMeaningsController($state, interpretService, $stateParams, Flash) {
                var _this = this;
                this.$state = $state;
                this.interpretService = interpretService;
                this.$stateParams = $stateParams;
                this.Flash = Flash;
                var symbol = this.$stateParams['symbol'];
                console.log(symbol);
                this.interpretService.getMeaning(symbol).$promise.then(function (meaning) {
                    _this.dreamMeaning = meaning;
                }).catch(function (err) {
                    _this.Flash.create('danger', 'Sorry, no results found.');
                });
            }
            return DreamMeaningsController;
        }());
        Controllers.DreamMeaningsController = DreamMeaningsController;
        angular.module('dreamjournal').controller("DreamMeaningsController", DreamMeaningsController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
