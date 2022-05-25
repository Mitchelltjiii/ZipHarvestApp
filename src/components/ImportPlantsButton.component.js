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
            if(plantList.length === 0){
              console.log("plantlist length zero");
              return;
            }
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
        this.grantFreeMonth();
    }
    
    async grantFreeMonth(){
      try{
        const getGrantFreeMonthCodeResponse = await fetch(`/api/user-get-grantFreeMonthCode/${this.props.userID}`);
        const grantFreeMonthCodeText = await getGrantFreeMonthCodeResponse.text();

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

        const response = await fetch(`api/refcode-get-userid/${grantFreeMonthCode}`);
        const userId = await response.text();
        let uid = userId.substring(1,userId.length-1);
        const response2 = await fetch(`api/user-get-subid/${uid}`);
        const subid = await response2.text();
        
        let sid = subid.substring(1,subid.length-1);
        
        const response3 = await fetch(`/get-subscription/${sid}`);
        const sub = await response3.json();

        this.pauseSubscription(sub,uid);

        }catch(err){
        }
      
    }

    async pauseSubscription(sub,userID){
      let resumeAt = (new Date()).getTime()+2678400000;
      if(sub.pause_collection !== null){
        resumeAt = parseInt(sub.pause_collection.resumes_at) + 2678400000;
      }
      const response = await fetch(`/pause-subscription/${sub.id}/${resumeAt}`);
      const json = await response.json();
      const response2 = await fetch(`/user-set-grantFreeMonthCode/${this.props.userID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    const text = await response2.text();

    const response3 = await fetch(`/get-email/${userID}`);
    const email = await response3.text();
    let em = email.substring(1,email.length-1);

    const response4 = await fetch(`/send-pause-notification-email/${em}/${userID}/${resumeAt}`);
    await response4.json();
      
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