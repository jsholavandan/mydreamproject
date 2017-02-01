var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var DreamCalendarController = (function () {
            function DreamCalendarController(searchService, $rootScope, moment, $scope, $state) {
                var _this = this;
                this.searchService = searchService;
                this.$rootScope = $rootScope;
                this.moment = moment;
                this.$scope = $scope;
                this.$state = $state;
                this.options = {
                    customClass: this.getDayClass.bind(this)
                };
                this.dt = null;
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
                this.searchService.listUserDreams(this.$rootScope.username).$promise.then(function (dreams) {
                    _this.dreams = dreams;
                    _this.dt = _this.moment().add(1, 'days');
                    _this.$scope.$watch(function () { return _this.dt; }, function (newVal, oldVal) {
                        _this.showTheDream();
                    });
                }).catch(function (err) {
                });
            }
            DreamCalendarController.prototype.getDayClass = function (data) {
                var mode = data.mode;
                var date = data.date;
                if (mode === 'day') {
                    if (this.dreams !== undefined) {
                        var dayToCheck = this.moment(date).format('LL');
                        for (var i = 0; i < this.dreams.length; i++) {
                            var newDate = this.moment(this.dreams[i].dreamDate).format('LL');
                            if (dayToCheck === newDate) {
                                return 'range';
                            }
                        }
                    }
                }
                return '';
            };
            DreamCalendarController.prototype.showTheDream = function () {
                if (this.dreams !== undefined) {
                    var id = 0;
                    var dateToCheck = this.moment(this.dt).format('LL');
                    for (var i = 0; i < this.dreams.length; i++) {
                        var date = this.moment(this.dreams[i].dreamDate).format('LL');
                        if (date === dateToCheck) {
                            id = this.dreams[i]._id;
                            console.log(id);
                            break;
                        }
                    }
                    if (id !== 0) {
                        this.$state.go('showDream', { id: id });
                    }
                }
            };
            return DreamCalendarController;
        }());
        Controllers.DreamCalendarController = DreamCalendarController;
        angular.module('dreamjournal').controller("DreamCalendarController", DreamCalendarController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
