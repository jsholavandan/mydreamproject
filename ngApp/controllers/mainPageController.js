var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var MainPageController = (function () {
            function MainPageController($state, $rootScope) {
                this.$state = $state;
                this.$rootScope = $rootScope;
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
            }
            MainPageController.prototype.setDiv = function (str) {
                this.selectedDiv = str;
            };
            MainPageController.prototype.addDream = function () {
                this.$state.go('addDream');
            };
            MainPageController.prototype.dreamJournal = function () {
                this.$state.go('dreamJournal');
            };
            MainPageController.prototype.dreamGraphs = function () {
                this.$state.go('dreamGraphs');
            };
            MainPageController.prototype.dreamCalendar = function () {
                this.$state.go('dreamCalendar');
            };
            MainPageController.prototype.dreamProfile = function () {
                this.$state.go('dreamProfile');
            };
            return MainPageController;
        }());
        Controllers.MainPageController = MainPageController;
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
