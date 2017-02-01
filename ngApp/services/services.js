var dreamjournal;
(function (dreamjournal) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
                this.UserResource = this.$resource('/userRoutes/api/:id');
            }
            AccountService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            AccountService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            AccountService.prototype.getUser = function (username) {
                return this.UserResource.query({ username: username });
            };
            AccountService.prototype.EditUser = function (user) {
                return this.UserResource.save({ id: user._id }, user).$promise;
            };
            return AccountService;
        }());
        Services.AccountService = AccountService;
        angular.module('dreamjournal').service("accountService", AccountService);
    })(Services = dreamjournal.Services || (dreamjournal.Services = {}));
})(dreamjournal || (dreamjournal = {}));
