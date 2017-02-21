var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var MainPageController = (function () {
            function MainPageController($state, $rootScope) {
                this.$state = $state;
                this.$rootScope = $rootScope;
                if (this.$rootScope.currentUser === false) {
                    this.$rootScope.fromHome = true;
                    this.$state.go('home');
                }
            }
            MainPageController.prototype.setDiv = function (str) {
                this.selectedDiv = str;
            };
            MainPageController.prototype.addDream = function () {
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.addDream');
            };
            MainPageController.prototype.dreamJournal = function () {
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.dreamJournal');
            };
            MainPageController.prototype.dreamGraphs = function () {
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.dreamGraphs');
            };
            MainPageController.prototype.dreamCalendar = function () {
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.dreamCalendar');
            };
            MainPageController.prototype.dreamProfile = function () {
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.dreamProfile');
            };
            MainPageController.prototype.dreamInterpretation = function () {
                console.log("hello");
                this.$rootScope.fromHome = false;
                this.$state.go('optionsPage.interpret');
            };
            return MainPageController;
        }());
        Controllers.MainPageController = MainPageController;
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
