var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $state, Flash, $window, $rootScope) {
                this.accountService = accountService;
                this.$state = $state;
                this.Flash = Flash;
                this.$window = $window;
                this.$rootScope = $rootScope;
                this.userInfo = {};
            }
            AccountController.prototype.setToken = function (data) {
                this.$window.localStorage.setItem("token", JSON.stringify(data.token));
            };
            AccountController.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            AccountController.prototype.isLoggedIn = function () {
                var token = this.getToken();
                if (token) {
                    var payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
                    return payLoad;
                }
                else {
                    return false;
                }
            };
            AccountController.prototype.login = function () {
                var _this = this;
                this.accountService.loginUser(this.userInfo).then(function (data) {
                    _this.setToken(data);
                    _this.$rootScope.currentUser = _this.isLoggedIn();
                    _this.$rootScope.username = _this.userInfo.username;
                    _this.$rootScope.$broadcast("userLoggedIn");
                    _this.$state.go('optionsPage.mainPage');
                }).catch(function (err) {
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            AccountController.prototype.signUp = function () {
                var _this = this;
                this.accountService.registerUser(this.user).then(function (data) {
                    _this.Flash.create("success", "Registered. Please login.");
                }).catch(function (err) {
                    _this.Flash.create('danger', "Error occured. Please try again");
                });
            };
            AccountController.prototype.closeDialog = function () {
                this.$state.go('login');
            };
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
