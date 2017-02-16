var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var OptionsController = (function () {
            function OptionsController() {
                console.log("hello");
            }
            return OptionsController;
        }());
        Controllers.OptionsController = OptionsController;
        angular.module("dreamjournal").controller("OptionsController", OptionsController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
