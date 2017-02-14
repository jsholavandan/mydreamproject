var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var AddDreamController = (function () {
            function AddDreamController(dreamService, $rootScope, Flash, $state) {
                this.dreamService = dreamService;
                this.$rootScope = $rootScope;
                this.Flash = Flash;
                this.$state = $state;
                this.newDream = {
                    emotions: [],
                    comments: [],
                    username: '',
                    dreamDate: new Date()
                };
                this.popup = {
                    opened: false
                };
                this.configObj = {
                    "fade": true,
                    "alwaysOn": false,
                    "neverOn": false,
                    "fill": true,
                    "fillColor": "#ffffff",
                    "fillOpacity": 0.4,
                    "stroke": true,
                    "strokeColor": "#4d0ec0",
                    "strokeOpacity": 1,
                    "strokeWidth": 4,
                    "shadow": true,
                    "shadowColor": "#000000",
                    "shadowOpacity": 0.8,
                    "shadowRadius": 10
                };
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
            }
            AddDreamController.prototype.open = function () {
                this.popup.opened = true;
            };
            AddDreamController.prototype.addEmotion = function (str) {
                var index = this.newDream.emotions.indexOf(str);
                if (index === -1) {
                    this.newDream.emotions.push(str);
                }
                else {
                    this.newDream.emotions.splice(index, 1);
                }
                this.emoteString = this.newDream.emotions.join(' , ');
            };
            AddDreamController.prototype.addDream = function () {
                var _this = this;
                this.newDream.username = this.$rootScope.username;
                console.log(this.newDream);
                this.dreamService.saveDream(this.newDream).then(function (res) {
                    _this.Flash.create('success', 'Dream added successfully.');
                }).catch(function (err) {
                    _this.Flash.create('danger', 'Error occured. Please try again.');
                });
            };
            AddDreamController.prototype.closeDialog = function (flash) {
                if (flash.type === 'success') {
                    this.$state.go("optionsPage.mainPage");
                }
            };
            return AddDreamController;
        }());
        Controllers.AddDreamController = AddDreamController;
        angular.module('dreamjournal').controller('AddDreamController', AddDreamController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
