var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var ShowDreamController = (function () {
            function ShowDreamController(dreamService, $stateParams, $state, Flash, $rootScope, $location) {
                var _this = this;
                this.dreamService = dreamService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.Flash = Flash;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.comment = {
                    commentTitle: '',
                    text: ''
                };
                var dreamId = this.$stateParams['id'];
                this.previousUrl = this.$stateParams['prev'];
                this.dreamService.getDream(dreamId).$promise.then(function (dream) {
                    _this.dream = dream;
                    _this.emoteString = dream.emotions.join(' , ');
                    _this.typeString = (dream.nightmare ? 'Nightmare , ' : '') + (dream.lucid ? 'Lucid , ' : '') + (dream.recurring ? 'Recurring , ' : '');
                }).catch(function (err) {
                    console.log(err);
                });
            }
            ShowDreamController.prototype.addComment = function () {
                var _this = this;
                if (this.$rootScope.currentUser === false) {
                    this.Flash.create('danger', "Please login to post comments.");
                    return false;
                }
                if (this.comment.commentTitle === '' || this.comment.text === '') {
                    this.Flash.create('danger', "Fill in all the fields before submitting.");
                    return false;
                }
                this.comment.username = this.$rootScope.username;
                this.dream.comments.push(this.comment);
                this.dreamService.saveDream(this.dream).then(function (res) {
                    _this.Flash.create('success', "Comment added successfully.");
                }).catch(function (err) {
                    _this.Flash.create('danger', "Error occured. Please try again.");
                });
            };
            ShowDreamController.prototype.close = function () {
                console.log(this.previousUrl);
                if (this.previousUrl === 'calendar') {
                    this.$state.go("optionsPage.dreamCalendar");
                }
                else if (this.previousUrl === 'journal') {
                    this.$state.go("optionsPage.dreamJournal");
                }
                else {
                    this.$state.go('home');
                }
            };
            return ShowDreamController;
        }());
        Controllers.ShowDreamController = ShowDreamController;
        angular.module('dreamjournal').controller('ShowDreamController', ShowDreamController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
