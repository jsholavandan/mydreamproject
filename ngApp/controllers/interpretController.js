var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var InterpretController = (function () {
            function InterpretController($state) {
                this.$state = $state;
            }
            InterpretController.prototype.interpretDream = function () {
                this.$state.go('optionsPage.interpret.meanings', { symbol: this.symbol });
            };
            return InterpretController;
        }());
        Controllers.InterpretController = InterpretController;
        angular.module("dreamjournal").controller("InterpretController", InterpretController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
