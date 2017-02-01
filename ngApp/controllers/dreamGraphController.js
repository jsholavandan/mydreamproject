var dreamjournal;
(function (dreamjournal) {
    var Controllers;
    (function (Controllers) {
        var DreamGraphController = (function () {
            function DreamGraphController(searchService, $rootScope, Flash, moment, $state) {
                var _this = this;
                this.searchService = searchService;
                this.$rootScope = $rootScope;
                this.Flash = Flash;
                this.moment = moment;
                this.$state = $state;
                this.angryDreams = 0;
                this.sadDreams = 0;
                this.joyDreams = 0;
                this.fearDreams = 0;
                this.acceptedDreams = 0;
                this.rejectedDreams = 0;
                this.awareDreams = 0;
                this.surprisedDreams = 0;
                this.columnChartObject = {
                    type: 'ColumnChart',
                    options: {
                        'title': 'Dreams recorded in the past 6 Months'
                    }
                };
                this.pieChartObject = {
                    type: 'PieChart',
                    options: {
                        'title': 'Types of Emotions during the Dreams'
                    }
                };
                this.typeChartObject = {
                    type: 'PieChart',
                    options: {
                        'title': 'Types of Dreams'
                    }
                };
                if (this.$rootScope.currentUser === false) {
                    this.$state.go('home');
                }
                this.searchService.listUserDreams(this.$rootScope.username).$promise.then(function (dreams) {
                    _this.dreams = dreams;
                    _this.makeEmotionsChart(dreams);
                    _this.makeColumnChart();
                    _this.makeTypeChart();
                }).catch(function (err) {
                    _this.Flash.create('danger', "Error occured. Please try again");
                });
            }
            DreamGraphController.prototype.makeEmotionsChart = function (dreams) {
                for (var i = 0; i < dreams.length; i++) {
                    var emotionsArr = dreams[i].emotions;
                    for (var j = 0; j < emotionsArr.length; j++) {
                        var emotion = emotionsArr[j];
                        switch (emotion) {
                            case 'Joy':
                                this.joyDreams += 1;
                                break;
                            case 'Sadness':
                                this.sadDreams += 1;
                                break;
                            case 'Angry':
                                this.angryDreams += 1;
                                break;
                            case 'Accepted':
                                this.acceptedDreams += 1;
                                break;
                            case 'Aware':
                                this.awareDreams += 1;
                                break;
                            case 'Rejected':
                                this.rejectedDreams += 1;
                                break;
                            case 'Surprised':
                                this.surprisedDreams += 1;
                                break;
                            case 'Fearful':
                                this.fearDreams += 1;
                                break;
                        }
                    }
                }
                this.pieChartObject.data = { "cols": [
                        { id: "s", label: "emotions", type: "string" },
                        { id: "t", label: "dreams", type: "number" }
                    ],
                    "rows": [
                        { c: [
                                { v: "Joy" },
                                { v: this.joyDreams },
                            ] },
                        { c: [
                                { v: "Sadness" },
                                { v: this.sadDreams }
                            ] },
                        { c: [
                                { v: "Angry" },
                                { v: this.angryDreams },
                            ] },
                        { c: [
                                { v: "Accepted" },
                                { v: this.acceptedDreams },
                            ] },
                        { c: [
                                { v: "Aware" },
                                { v: this.awareDreams },
                            ] },
                        { c: [
                                { v: "Rejected" },
                                { v: this.rejectedDreams },
                            ] },
                        { c: [
                                { v: "Surprised" },
                                { v: this.surprisedDreams },
                            ] },
                        { c: [
                                { v: "Fearful" },
                                { v: this.fearDreams },
                            ] }
                    ] };
            };
            DreamGraphController.prototype.fillRowsData = function (today) {
                var rowsArr = [];
                var date = today;
                for (var i = 0; i < 6; i++) {
                    var dataObj = {};
                    dataObj.c = [];
                    dataObj.c.push({ v: date.format("MMM") });
                    var month = date.month() + 1;
                    var year = date.year();
                    var totalDreams = 0;
                    for (var j = 0; j < this.dreams.length; j++) {
                        var dreamDate = this.moment(this.dreams[j].dreamDate);
                        if ((dreamDate.month() + 1) === month && (dreamDate.year() === year)) {
                            totalDreams += 1;
                        }
                    }
                    dataObj.c.push({ v: totalDreams });
                    rowsArr.unshift(dataObj);
                    date = date.subtract(1, 'Months');
                }
                return rowsArr;
            };
            DreamGraphController.prototype.makeColumnChart = function () {
                var today = this.moment();
                var rowsData = this.fillRowsData(today);
                this.columnChartObject.data = { "cols": [
                        { id: "s", label: "Months", type: "string" },
                        { id: "t", label: "Dreams", type: "number" }
                    ], "rows": rowsData };
            };
            DreamGraphController.prototype.makeTypeChart = function () {
                var recurDreams = 0;
                var lucidDreams = 0;
                var nightmares = 0;
                for (var i = 0; i < this.dreams.length; i++) {
                    var dream = this.dreams[i];
                    if (dream.nightmare) {
                        nightmares += 0;
                    }
                    if (dream.lucid) {
                        lucidDreams += 1;
                    }
                    if (dream.recurring) {
                        recurDreams += 1;
                    }
                }
                this.typeChartObject.data = { "cols": [
                        { id: "s", label: "Types", type: "string" },
                        { id: "t", label: "dreams", type: "number" }
                    ],
                    "rows": [
                        { c: [
                                { v: "Lucid" },
                                { v: lucidDreams },
                            ] },
                        { c: [
                                { v: "Recurring" },
                                { v: recurDreams }
                            ] },
                        { c: [
                                { v: "Nightmare" },
                                { v: nightmares },
                            ] }
                    ] };
            };
            return DreamGraphController;
        }());
        Controllers.DreamGraphController = DreamGraphController;
        angular.module("dreamjournal").controller("DreamGraphController", DreamGraphController);
    })(Controllers = dreamjournal.Controllers || (dreamjournal.Controllers = {}));
})(dreamjournal || (dreamjournal = {}));
