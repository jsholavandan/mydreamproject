var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var SearchTextController = (function () {
            function SearchTextController($stateParams, searchService, $rootScope, Flash, $state) {
                var _this = this;
                this.$stateParams = $stateParams;
                this.searchService = searchService;
                this.$rootScope = $rootScope;
                this.Flash = Flash;
                this.$state = $state;
                this.itemsPerPage = 10;
                var srchTxt = this.$stateParams['txt'];
                console.log(srchTxt);
                if (this.$rootScope.currentUser) {
                    this.searchService.searchDreams(this.$rootScope.username, srchTxt).$promise.then(function (dreams) {
                        _this.dreams = dreams;
                        _this.totalItems = dreams.length;
                        _this.currentPage = 1;
                        if (dreams.length === 0) {
                            _this.Flash.create('info', "Sorry, no results found.");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        _this.Flash.create('danger', 'Error occured. Please try again');
                    });
                }
                else {
                    this.searchService.searchPublicDreams(srchTxt).$promise.then(function (dreams) {
                        _this.dreams = dreams;
                        _this.totalItems = dreams.length;
                        _this.currentPage = 1;
                        if (dreams.length === 0) {
                            _this.Flash.create('info', "Sorry, no results found.");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        _this.Flash.create('danger', 'Error occured. Please try again');
                    });
                }
            }
            SearchTextController.prototype.closeDialog = function (flash) {
                if (flash.type === 'info' || flash.type === 'danger') {
                    this.$state.go('optionsPage.mainPage');
                }
            };
            SearchTextController.prototype.editDream = function (id) {
                this.$state.go('editDream', { id: id });
            };
            SearchTextController.prototype.showDream = function (id) {
                this.$state.go('showDream', { id: id });
            };
            return SearchTextController;
        }());
        Controllers.SearchTextController = SearchTextController;
        angular.module("dreamjournal").controller("SearchTextController", SearchTextController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
