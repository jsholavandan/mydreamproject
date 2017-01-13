namespace dreamjournal.Controllers {

  export class MainPageController{
    public selectedDiv;
    public imgClass;

    public setDiv(str){
      this.selectedDiv = str;
    }

    public addDream(){
      this.$state.go('addDream');
    }

    constructor(private $state:ng.ui.IStateService){

    }
  }

}
