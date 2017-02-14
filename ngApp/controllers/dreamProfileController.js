var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var DreamProfileController = (function () {
            function DreamProfileController($rootScope, accountService, Flash, $state) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.accountService = accountService;
                this.Flash = Flash;
                this.$state = $state;
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
                this.accountService.getUser(this.$rootScope.username).$promise.then(function (users) {
                    for (var i = 0; i < users.length; i++) {
                        _this.user = users[i];
                    }
                });
            }
            DreamProfileController.prototype.updateProfile = function () {
                var _this = this;
                this.accountService.EditUser(this.user).then(function (user) {
                    _this.Flash.create('success', "Changes saved successfully.");
                }).catch(function (err) {
                    _this.Flash.create('danger', 'Error occured. Please try again later.');
                });
            };
            DreamProfileController.prototype.closeDialog = function (flash) {
                if (flash.type === 'success') {
                    this.$state.go("optionsPage.mainPage");
                }
            };
            return DreamProfileController;
        }());
        Controllers.DreamProfileController = DreamProfileController;
        angular.module('dreamjournal').controller('DreamProfileController', DreamProfileController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
