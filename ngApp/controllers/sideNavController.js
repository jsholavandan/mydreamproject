var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var SideNavController = (function () {
            function SideNavController($state, $rootScope) {
                this.$state = $state;
                this.$rootScope = $rootScope;
            }
            SideNavController.prototype.myAccount = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.mainPage");
            };
            SideNavController.prototype.addDream = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.addDream");
            };
            SideNavController.prototype.dreamCalendar = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.dreamCalendar");
            };
            SideNavController.prototype.dreamJournal = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.dreamJournal");
            };
            SideNavController.prototype.dreamGraphs = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.dreamGraphs");
            };
            SideNavController.prototype.dreamMeaning = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.dreamMeanings");
            };
            SideNavController.prototype.settings = function () {
                this.$rootScope.fromHome = false;
                this.$state.go("optionsPage.dreamProfile");
            };
            return SideNavController;
        }());
        Controllers.SideNavController = SideNavController;
        angular.module("dreamjournal").controller("SideNavController", SideNavController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
