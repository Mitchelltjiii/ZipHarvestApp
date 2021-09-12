import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ImportPlantsButton extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    
    async addPlant(plantItem){
        console.log("Engage add Plant");
        let parent = this;
        const resp = fetch('/pl', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(plantItem),
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log("EXECUTE PLANT EXCT DATA: " + data); // this will be a string
          //parent.props.setNewPlantID(data,plantItem);
          console.log("Before removing busy adding record");
          console.log("BUSYADDINGPL before: " + JSON.stringify(parent.state.busyAddingPlants)); 
          for( var i = 0; i < parent.state.busyAddingPlants.length; i++){ 
            if ( parent.state.busyAddingPlants[i] == plantItem.tag) { 
                parent.state.busyAddingPlants.splice(i, 1); 
            }
          }
          console.log("BUSYADDINGPL after: " + JSON.stringify(parent.state.busyAddingPlants));          
        });
        
        console.log("Exit update plant")
      }

    async handleSubmit(event) {

        function Plant(tag,strain,userID,active){
            this.tag = tag;
            this.strain = strain;
            this.userID = userID;
            this.active = active;
        }

        function getPlantItem(plant){
            console.log("Enter getPlantItem")
            console.log("Plant: " + plant);
            console.log("Plant(STRING): " + JSON.stringify(plant));
    
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
    
              console.log("Stringified before passed: " + JSON.stringify(plantItem));
              console.log("Exit getPlantItem")
              return plantItem;
          }
        
        event.preventDefault();
        console.log("Handle Submit Plant Button");

	    //let tempPlants = JSON.parse(this.props.getPlants());
		//console.log("Before Import Plants - Plants: " + JSON.stringify(tempPlants));
/*
		for(const val of this.props.uploadList){
			console.log('**UploadList[m]: ' + val);
			let splitList = val.split(",");

			for(let i = 1; i < splitList.length; i++){
				console.log("Add Plant: " + JSON.stringify(splitList[i]));
				let plant = new Plant(splitList[i],splitList[i+1],this.props.userID,0);
				//tempPlants.push(plant);
                let pl = getPlantItem(plant);
                console.log("Execute Add Plant from loop");
                this.executeAddPlant(event,pl);
				i++;
			}
		}*/

            let addPlant = new Plant("","","","");
            for(const val of this.props.uploadList){
                console.log('**UploadList[m]: ' + val);
			    let splitList = val.split(",");

			    for(let i = 1; i < splitList.length; i++){
                    addPlant = new Plant(splitList[i],splitList[i+1],this.props.userID,0);

                    const plantItem = getPlantItem(addPlant);
  
                    console.log("Plant Item to update with: " + JSON.stringify(plantItem));
  
                    console.log("BUSYADDINGPL"); 
                    console.log("BUSYADDINGPL before push: " + JSON.stringify(this.state.busyAddingPlants)); 
                 this.state.busyAddingPlants.push(addPlant.tag);
                console.log("BUSYSETTINGHR after push: " + JSON.stringify(this.state.busyAddingPlants)); 
                console.log("Before updateHarvestRecord");
  
                this.addPlant(plantItem);
                console.log("After addPlant");
  
                
                i++;
            }
        }

        let x = 0;

        while(this.state.busyAddingPlants != [] && x<this.props.timeLimit){
                  console.log("Set timeout");
                  setTimeout('',200);
                  x++;
                }

        if(x==this.props.timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }

		//this.props.setPlants(JSON.stringify(tempPlants));
        console.log("*A*");
        this.props.reloadPlants([]);
        console.log("Plants Reloaded");
		    this.props.setUploadList([]);
        console.log("*B*");

		    //console.log("After Add Plants - Plants: " + this.props.getPlants());
		    this.props.setImporting(false);
        console.log("*C*");

        this.props.refreshOuter();
        console.log("*D*");

    }

    async executeAddPlant(event,plantItem){
      event.preventDefault();
      console.log("Execute Import Plant");
      const parent = this;
      console.log("Plant Item**: " + JSON.stringify(plantItem));
        const resp = fetch('/pl', {
            method: (plantItem.tag) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(plantItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log("EXECUTE PLANT EXCT DATA: " + data); // this will be a string
            //parent.props.setNewPlantID(data,plantItem);
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
        return <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Import</Button>
        </div>
      }
}



export default ImportPlantsButton;