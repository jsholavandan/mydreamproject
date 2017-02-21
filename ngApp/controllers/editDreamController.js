var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var EditDreamController = (function () {
            function EditDreamController(dreamService, $stateParams, $state, Flash, $rootScope) {
                var _this = this;
                this.dreamService = dreamService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.Flash = Flash;
                this.$rootScope = $rootScope;
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
                    "strokeWidth": 1,
                    "shadow": true,
                    "shadowColor": "#000000",
                    "shadowOpacity": 0.8,
                    "shadowRadius": 10
                };
                if (this.$rootScope.currentUser === false) {
                    this.$rootScope.fromHome = true;
                    this.$state.go('home');
                }
                var dreamId = this.$stateParams['id'];
                this.dreamService.getDream(dreamId).$promise.then(function (dream) {
                    _this.dream = dream;
                    _this.emoteString = dream.emotions.join(' , ');
                    var dateObj = new Date(dream.dreamDate);
                    _this.dream.dreamDate = dateObj;
                });
            }
            EditDreamController.prototype.open = function () {
                this.popup.opened = true;
            };
            EditDreamController.prototype.addEmotion = function (str) {
                var index = this.dream.emotions.indexOf(str);
                console.log(index);
                if (index === -1) {
                    this.dream.emotions.push(str);
                }
                else {
                    this.dream.emotions.splice(index, 1);
                }
                this.emoteString = this.dream.emotions.join(' , ');
            };
            EditDreamController.prototype.editDream = function () {
                var _this = this;
                console.log("here");
                this.dreamService.saveDream(this.dream).then(function (editDream) {
                    _this.Flash.create("success", "Dream edited successfully.");
                }).catch(function (err) {
                    console.log("error occured");
                    _this.Flash.create('danger', 'Error occured. Please try again.');
                });
            };
            EditDreamController.prototype.closeDialog = function (flash) {
                if (flash.type === 'success') {
                    this.$state.go("optionsPage.dreamJournal");
                }
            };
            return EditDreamController;
        }());
        Controllers.EditDreamController = EditDreamController;
        angular.module('dreamjournal').controller("EditDreamController", EditDreamController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
