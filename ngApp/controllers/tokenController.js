var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var TokenController = (function () {
            function TokenController($rootScope, $state, $stateParams, $window) {
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                var token = this.$stateParams['token'];
                console.log(token);
                this.setToken(token);
                var decodedStr = this.decodeToken(token);
                var username = decodedStr.email.split('@')[0];
                console.log(username);
                this.$rootScope.currentUser = this.isLoggedIn();
                this.$rootScope.username = username;
                this.$rootScope.$broadcast("userLoggedIn");
                this.$state.go('mainPage');
            }
            TokenController.prototype.setToken = function (token) {
                this.$window.localStorage.setItem("token", JSON.stringify(token));
            };
            TokenController.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            TokenController.prototype.isLoggedIn = function () {
                var token = this.getToken();
                if (token) {
                    var payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
                    return payLoad;
                }
                else {
                    return false;
                }
            };
            TokenController.prototype.urlBase64Decode = function (str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: {
                        break;
                    }
                    case 2: {
                        output += '==';
                        break;
                    }
                    case 3: {
                        output += '=';
                        break;
                    }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return decodeURIComponent(this.$window.atob(output));
            };
            TokenController.prototype.decodeToken = function (token) {
                var parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('JWT must have 3 parts');
                }
                var decoded = this.urlBase64Decode(parts[1]);
                if (!decoded) {
                    throw new Error('Cannot decode the token');
                }
                return JSON.parse(decoded);
            };
            return TokenController;
        }());
        Controllers.TokenController = TokenController;
        angular.module("dreamjournal").controller("TokenController", TokenController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
