var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var MainController = (function () {
            function MainController($state, $window, $rootScope, dreamService, Flash) {
                var _this = this;
                this.$state = $state;
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.dreamService = dreamService;
                this.Flash = Flash;
                this.itemsPerPage = 5;
                this.$rootScope.currentUser = false;
                this.dreamService.listPublicDreams().$promise.then(function (dreams) {
                    _this.dreams = dreams;
                    _this.totalItems = dreams.length;
                    _this.currentPage = 1;
                    if (dreams.length === 0) {
                        _this.Flash.create('info', "No public dreams available.");
                    }
                });
            }
            MainController.prototype.home = function () {
                this.$state.go('home');
            };
            MainController.prototype.login = function () {
                this.$state.go('login');
            };
            MainController.prototype.register = function () {
                this.$state.go('register');
            };
            MainController.prototype.mainPage = function () {
                this.$state.go('optionsPage.mainPage');
            };
            MainController.prototype.logout = function () {
                this.$rootScope.currentUser = false;
                this.$rootScope.username = null;
                this.$window.localStorage.removeItem('token');
                this.$state.go('home');
            };
            MainController.prototype.search = function () {
                if (this.$rootScope.currentUser) {
                    this.$state.go('optionsPage.searchTxtDreams', { txt: this.searchTxt });
                }
                else {
                    console.log(this.searchTxt);
                    this.$state.go('searchPublic', { txt: this.searchTxt });
                }
            };
            MainController.prototype.showDream = function (id) {
                this.$state.go('showDream', { id: id, prev: 'home' });
            };
            return MainController;
        }());
        Controllers.MainController = MainController;
        angular.module('dreamjournal').controller('MainController', MainController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
