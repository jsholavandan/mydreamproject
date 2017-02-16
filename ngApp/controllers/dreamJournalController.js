var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var DreamJournalController = (function () {
            function DreamJournalController(dreamService, $rootScope, $state) {
                var _this = this;
                this.dreamService = dreamService;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.itemsPerPage = 10;
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
                this.dreamService.listDreams(this.$rootScope.username).$promise.then(function (dreams) {
                    _this.dreams = dreams;
                    _this.totalItems = dreams.length;
                    _this.currentPage = 1;
                });
            }
            DreamJournalController.prototype.editDream = function (id) {
                this.$state.go('optionsPage.editDream', { id: id });
            };
            DreamJournalController.prototype.showDream = function (id) {
                this.$state.go('optionsPage.showDream', { id: id, prev: 'journal' });
            };
            DreamJournalController.prototype.closeDialog = function (flash) {
            };
            return DreamJournalController;
        }());
        Controllers.DreamJournalController = DreamJournalController;
        angular.module("dreamjournal").controller("DreamJournalController", DreamJournalController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
