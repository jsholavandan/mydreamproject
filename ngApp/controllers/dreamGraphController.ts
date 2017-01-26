namespace dreamjournal.Controllers {
    export class DreamGraphController{
      public dreams;
      public angryDreams = 0;
      public sadDreams = 0;
      public joyDreams = 0;
      public fearDreams = 0;
      public acceptedDreams = 0;
      public rejectedDreams = 0;
      public awareDreams = 0;
      public surprisedDreams = 0;

      public columnChartObject:any = {
        type:'ColumnChart',
        options:{
          'title':'Dreams recorded in the past 6 Months'
        }
      }

      public pieChartObject:any = {
        type:'PieChart',
        options : {
          'title': 'Types of Emotions during the Dreams'
        }
      };

      public typeChartObject:any = {
        type:'PieChart',
        options : {
          'title': 'Types of Dreams'
        }
      }

      public makeEmotionsChart(dreams){
        for(let i=0;i<dreams.length;i++){
          let emotionsArr = dreams[i].emotions;
          for(let j=0;j<emotionsArr.length;j++){
            let emotion = emotionsArr[j];
            switch(emotion){
              case 'Joy': this.joyDreams += 1;
                          break;
              case 'Sadness': this.sadDreams += 1;
                              break;
              case 'Angry' : this.angryDreams += 1;
                             break;
              case 'Accepted': this.acceptedDreams += 1;
                              break;
              case 'Aware': this.awareDreams += 1;
                            break;
              case 'Rejected': this.rejectedDreams += 1;
                                break;
              case 'Surprised': this.surprisedDreams += 1;
                                break;
              case 'Fearful': this.fearDreams += 1;
                              break;
            }
          }
        }

        this.pieChartObject.data = {"cols": [
          {id: "s", label: "emotions", type: "string"},
          {id: "t", label: "dreams", type: "number"}
        ],
        "rows": [
          {c: [
              {v: "Joy"},
              {v: this.joyDreams},
          ]},
          {c: [
              {v: "Sadness"},
              {v: this.sadDreams}
          ]},
          {c: [
              {v: "Angry"},
              {v: this.angryDreams},
          ]},
          {c: [
              {v: "Accepted"},
              {v: this.acceptedDreams},
          ]},
          {c: [
              {v: "Aware"},
              {v: this.awareDreams},
          ]},
          {c: [
              {v: "Rejected"},
              {v: this.rejectedDreams},
          ]},
          {c: [
              {v: "Surprised"},
              {v: this.surprisedDreams},
          ]},
          {c: [
              {v: "Fearful"},
              {v: this.fearDreams},
          ]}
        ]};
      }

      public fillRowsData(today){
        let rowsArr = [];
        let date = today;
        for(let i=0;i<6;i++){
          let dataObj:any = {};
          dataObj.c = [];
          dataObj.c.push({v: date.format("MMM")});
          let month = date.month() + 1;
          let year = date.year();
          let totalDreams = 0;
          for(let j=0;j<this.dreams.length;j++){
            var dreamDate = this.moment(this.dreams[j].dreamDate);
            if((dreamDate.month() + 1) === month && (dreamDate.year() === year)){
              totalDreams += 1;
            }
          }
          dataObj.c.push({v:totalDreams});
          rowsArr.unshift(dataObj);
          date = date.subtract(1, 'Months');
        }


        return rowsArr;
      }

      public makeColumnChart(){
        let today = this.moment();
        let rowsData = this.fillRowsData(today);

        this.columnChartObject.data = {"cols": [
          {id: "s", label: "Months", type: "string"},
          {id: "t", label: "Dreams", type: "number"}
        ], "rows": rowsData};
      }

      public makeTypeChart(){
        let recurDreams = 0;
        let lucidDreams = 0;
        let nightmares = 0;
        for(let i=0;i<this.dreams.length;i++){
            let dream = this.dreams[i];
            if(dream.nightmare){
              nightmares += 0;
            }
            if(dream.lucid){
              lucidDreams += 1;
            }

            if(dream.recurring){
              recurDreams += 1;
            }
        }

        this.typeChartObject.data = {"cols": [
          {id: "s", label: "Types", type: "string"},
          {id: "t", label: "dreams", type: "number"}
        ],
        "rows": [
          {c: [
              {v: "Lucid"},
              {v: lucidDreams},
          ]},
          {c: [
              {v: "Recurring"},
              {v: recurDreams}
          ]},
          {c: [
              {v: "Nightmare"},
              {v: nightmares},
          ]}
        ]};
      }


      constructor(private searchService: dreamjournal.Services.SearchService,
                  private $rootScope:ng.IRootScopeService,
                  private Flash,
                  private moment){

        this.searchService.listUserDreams(this.$rootScope.username).$promise.then((dreams) => {
          this.dreams = dreams;
          this.makeEmotionsChart(dreams);
          this.makeColumnChart();
          this.makeTypeChart();

        }).catch((err) => {
            this.Flash.create('danger', "Error occured. Please try again");
        });
      }
    }
    angular.module("dreamjournal").controller("DreamGraphController", DreamGraphController);
}
