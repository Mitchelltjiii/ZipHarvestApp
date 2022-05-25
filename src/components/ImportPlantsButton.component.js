import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ImportPlantsButton extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    
    async addPlant(plantItem,tagExists){        
        let parent = this;
        fetch('/pl', {
          method: (tagExists) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(plantItem),
        }).then(function(response) {
          return response.json();
        }).then(function(data) { 
          for( var i = 0; i < parent.state.busyAddingPlants.length; i++){ 
            if ( parent.state.busyAddingPlants[i] === plantItem.tag) { 
                parent.state.busyAddingPlants.splice(i, 1); 
            }
          }
        });
    }

    async handleSubmit(event) {

        function Plant(tag,strain,userID,active){
            this.tag = tag;
            this.strain = strain;
            this.userID = userID;
            this.active = active;
        }

        function getPlantItem(plant){
            let plantItem = {
              tag: '',
              strain: '',
              userID: '',
              active: ''
             };
    
             plantItem.tag = plant.tag;
             plantItem.strain = plant.strain;
             plantItem.userID = plant.userID;
             plantItem.active = plant.active;
    
              if(plant.itemID!==""){
                  plantItem.id = plant.itemID;
              }
              return plantItem;
          }
        
        event.preventDefault();

    let timeLimit = 3000;
            let addPlant = new Plant("","","","");
            let pList = JSON.parse(this.props.getPlants());
            let plantList = this.props.getPlantList();
            for(const val of plantList){
			    let splitList = val.split(",");

			    for(let i = 0; i < splitList.length; i++){
                    addPlant = new Plant(splitList[i],splitList[i+1],this.props.userID,0);

                    const plantItem = getPlantItem(addPlant);
                    this.state.busyAddingPlants.push(addPlant.tag);
                let tagExists = false;

                for(const val2 of pList){
                  if(val2.tag === plantItem.tag){
                    tagExists = true;
                  }
                }
                this.addPlant(plantItem,tagExists);
                
                i++;
            }
          }

        let x = 0;

        while(this.state.busyAddingPlants !== [] && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }
        if(this.props.userID.includes("Mitchell")){
          this.grantFreeMonth();
        }else{
          this.props.reloadPlants([]);
          this.props.setPlantList([]);
          this.props.setImporting(false);
          this.props.setSelectedFile("");
          this.props.setGrantFreeMonthCode("");
          this.props.refreshOuter(); 
        }
    }
    
    async grantFreeMonth(){
      console.log("GFN");
      try{
        const getGrantFreeMonthCodeResponse = await fetch(`/api/user-get-grantFreeMonthCode/${this.props.userID}`);
        const grantFreeMonthCodeText = await getGrantFreeMonthCodeResponse.text();

        console.log("get user grant first month free response: " + grantFreeMonthCodeText);
        let grantFreeMonthCode = grantFreeMonthCodeText.substring(1,grantFreeMonthCodeText.length-1);
        if(grantFreeMonthCode===""){
          this.props.reloadPlants([]);
          this.props.setPlantList([]);
          this.props.setImporting(false);
          this.props.setSelectedFile("");
          this.props.setGrantFreeMonthCode("");
          this.props.refreshOuter(); 
          return;
        }
        console.log("grantfreemonthcode: " + grantFreeMonthCode);

        const response = await fetch(`api/refcode-get-userid/${grantFreeMonthCode}`);
        const userId = await response.text();
        let uid = userId.substring(1,userId.length-1);
        console.log("uid: " + uid);
        const response2 = await fetch(`api/user-get-subid/${uid}`);
        const subid = await response2.text();
        console.log("Grant Free month to  " + userId);
        console.log("subid: " + subid);
        
        let sid = subid.substring(1,subid.length-1);
        console.log("sid: " + sid);
        
        const response3 = await fetch(`/get-subscription/${sid}`);
        const sub = await response3.json();

        console.log("sub: " + JSON.stringify(sub));


        this.pauseSubscription(sub);

        }catch(err){
        }
      
    }

    async pauseSubscription(sub){
      let resumeAt = (new Date()).getTime()+2678400000;
      console.log("Pause sub: " + sub.id);
      console.log("Resume at: " + resumeAt);
      if(sub.pause_collection !== null){
        console.log("Sub.pauseCollection: " + JSON.stringify(sub.pause_collection));
        resumeAt = parseInt(sub.pause_collection.resumes_at) + 2678400000;
        console.log("Resume at updated: " + resumeAt);
      }
      const response = await fetch(`/pause-subscription/${sub.id}/${resumeAt}`);
      const json = await response.json();

      console.log("Pause response: " + JSON.stringify(json));

      console.log("set grant free month code blank userID: " + this.props.userID);
      console.log("/user-set-grantFreeMonthCode/" + this.props.userID)
      const response2 = await fetch(`/user-set-grantFreeMonthCode/${this.props.userID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    const text = await response2.text();

      
        this.props.reloadPlants([]);
        this.props.setPlantList([]);
        this.props.setImporting(false);
        this.props.setSelectedFile("");
        this.props.setGrantFreeMonthCode("");
        this.props.setFreeMonthGrantedVisible(true);
        this.props.refreshOuter();   
    }

    async executeAddPlant(event,plantItem){
      event.preventDefault();
      fetch('/pl', {
            method: (plantItem.tag) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(plantItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
          });
    }
    
    constructor(props) {
        super(props);
        this.state = {
            busyAddingPlants: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.executeAddPlant = this.executeAddPlant.bind(this);
    }

    render() {    
        return (<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Import</Button>)
      }
}



export default ImportPlantsButton;