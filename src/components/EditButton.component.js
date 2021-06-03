import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class EditButton extends Component{
    emptyHarvestedPlant = {
        tag: '',
        weight: '',
        unit: '',
        batchName: '',
        userID: ''
      };

    async clickEdit(){
	      function HarvestedPlant(id,tag,weight,unit,batchName,userID){
	        	this.id = id;
		        this.tag = tag;
		        this.weight = weight;
		        this.unit = unit;
            this.batchName = batchName;
            this.userID = userID;
	      }

        function Plant(tag,strain,userID,active){
          this.tag = tag;
          this.strain = strain;
          this.userID = userID;
          this.active = active;
        }

        if(this.props.editNow){
          let currWeightChanges = this.props.getWeightChanges();

          console.log("Weight changes got from Harvestform: " + JSON.stringify(currWeightChanges));
          for(const val of currWeightChanges){
            console.log("Val (CurrWeightChanges): " + JSON.stringify(val));
            console.log("NEWWeight (CurrWeightChanges): " + val.newWeight);
  
            try{
              let newWeight = parseFloat(val.newWeight);
              let newUnit = val.newUnit;
              console.log("Parsed New Weight: " + newWeight);
              console.log("New Unit: " + newUnit);

              let i = 0;
              let foundIndex = -1;
              let foundHarvestedPlant = new HarvestedPlant('','','','','','');
              for(const val2 of this.props.harvestedPlants){
                console.log("Val2 (Harvestedplants): " + JSON.stringify(val2));
                if(val2.tag==val.tag){
                  foundIndex = i;
                  if(isNaN(newWeight) || newWeight == 0){
                    newWeight = val2.weight;
                  }
                  if(newUnit == ''){
                    newUnit = val2.unit;
                  }
                  foundHarvestedPlant = new HarvestedPlant(val2.id,val2.tag,newWeight,newUnit,val2.batchName,val2.userID);
                  console.log("Found Index: " + i);
                }
                i++;
              }
    
              if(foundIndex != -1){
                this.props.harvestedPlants.splice(foundIndex,1,foundHarvestedPlant);
                console.log("Harvested Plant Replaced");
  
                const harvestedPlantItem = this.getHarvestedPlantItem(foundHarvestedPlant);
  
                console.log("Harvested Plant Item to update with: " + JSON.stringify(harvestedPlantItem));
  
                console.log("Busy Updating activated")
                this.state.busyUpdating = true;
                console.log("Before updateharvestedplant");
  
                this.updateHarvestedPlant(harvestedPlantItem);
                console.log("After updateharvestedplant");
  
                let x = 0;
  
                while(this.state.busyUpdating && x<this.props.timeLimit){
                  console.log("Set timeout");
                  setTimeout('',200);
                  x++;
                }
  
                if(x==this.props.timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }
                console.log("Left timeout loop");
              }
    
              console.log("HarvestedPlants after edit: " + JSON.stringify(this.props.harvestedPlants));
            }catch(s){
    
            }
          }

          for(const tag of this.props.currHidePlants){
            let addPlant = new Plant("","","","");
            for(const val of this.props.harvestedPlants){
              if(val.tag == tag){
                addPlant = new Plant(val.tag,this.props.getStrainForPlantItem(val.tag),"mtj",0);

                const plantItem = this.getPlantItem(addPlant);
  
                console.log("Plant Item to update with: " + JSON.stringify(plantItem));
  
                console.log("Busy Updating activated")
                this.state.busyUpdating = true;
  
                this.addPlant(plantItem);
                console.log("After addPlant");
  
                let x = 0;

                while(this.state.busyUpdating && x<this.props.timeLimit){
                  console.log("Set timeout");
                  setTimeout('',200);
                  x++;
                }

                if(x==this.props.timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }
              }
            }
          }

          console.log("START HIDE PLANTS");

          for(const tag of this.props.currHidePlants){
              let i = 0;
              let foundIndex = -1;
              let foundID = '';
              for(const val2 of this.props.harvestedPlants){
                console.log("Val2 (Harvestedplants): " + JSON.stringify(val2));
                if(val2.tag==tag){
                  foundIndex = i;
                  console.log("Found Index: " + i);
                  foundID = val2.id;
                }
                i++;
              }
    
              if(foundIndex != -1){
                this.props.harvestedPlants.splice(foundIndex,1);
                console.log("Harvested Plants before Set: " + JSON.stringify(this.props.harvestedPlants));
                this.props.setHarvestedPlants(this.props.harvestedPlants);
                console.log("Harvested Plant Remove from HarvestedPlants");
      
                console.log("Busy Updating activated")
                this.state.busyUpdating = true;
                console.log("Before updateharvestedplant");
  
                this.deleteHarvestedPlant(foundID);
                console.log("After updateharvestedplant");
  
                let x = 0;
  
                while(this.state.busyUpdating && x<this.props.timeLimit){
                  console.log("Set timeout");
                  setTimeout('',200);
                  x++;
                }
  
                if(x==this.props.timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }
                console.log("Left timeout loop");
              }
          }
          this.props.setChanges();
        }
        console.log("HarvestedPlants in EditButton after changes accepted: " + JSON.stringify(this.props.harvestedPlants));
        this.props.printData();
      this.props.setEditMode(!this.props.editNow);
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log("Engage Handle Edit Plant");
        console.log("EditNow before clickedit: " + this.props.editNow);

        this.clickEdit();

        console.log("EditNow after clickedit: " + this.props.editNow);

        setTimeout(() => this.setState(this.state), 0) 

        /*
        if(this.props.clickEdit()){
          console.log("Next plant should be done");

          console.log("Engage Harvested Plant Item");
          const harvestedPlantItem = this.props.getHarvestedPlantItem();
          console.log("Harvseted Plant Item should be done");
  
      
          setTimeout(() => this.removePlant(event), 0) 
  
          console.log("Engage create harvested plant");
          await fetch('/api/harvestedplant', {
                method: (harvestedPlantItem.id) ? 'PUT' : 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(harvestedPlantItem),
          });
          console.log("Create harvested plant should be done - no indicator");
  
          this.props.history.push('/plants');
        }
        */
    }

      
    async deleteHarvestedPlant(removePlantID){
      console.log("getRemovedPlantID should be done");
      console.log("REMOVE PLANT ID: " + removePlantID);
      const response = fetch(`/hr/${removePlantID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      });

      try{
        console.log("AWAITING RESPONSE DELETEHARVESTEDPLANT")
        await response.text();
        console.log("RESPONSE RECIEVED DELETEHARVESTEDPLANT")
      }catch(err){
        console.log("NO RESPONSE RECIEVED DELETEHARVESTEDPLANT")
      }
      this.state.busyUpdating = false;    
    }

    async updateHarvestedPlant(harvestedPlantItem){
      console.log("Engage update harvested plant");
      const response = fetch('/hr', {
            method: (harvestedPlantItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestedPlantItem)
      });
      console.log("Create harvested plant should be done - no indicator");
      try{
        console.log("AWAITING RESPONSE UPDATEHARVESTEDPLANT")
        await response.text();
        console.log("RESPONSE RECIEVED UPDATEHARVESTEDPLANT")
      }catch(err){
        console.log("NO RESPONSE RECIEVED UPDATEHARVESTEDPLANT")
      }
      this.state.busyUpdating = false;
      
      console.log("Exit update harvested plant")
    }

    async addPlant(plantItem){
      console.log("Engage add Plant");
      let parent = this;
      const resp = fetch('/pl', {
        method: (plantItem.tag) ? 'PUT' : 'POST',
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
        parent.state.busyUpdating = false;
      });
      
      console.log("Exit update plant")
    }

    getHarvestedPlantItem(currentHarvestedPlant){
      console.log("Enter getharvestedPlantitem")
      console.log("Plant To Create PlantItem From: " + JSON.stringify(currentHarvestedPlant));
      let plant = {
        tag: '',
			  weight: 0,
			  unit: '',
			  batchName: '',
			  userID: ''
        };
  
        plant.tag = currentHarvestedPlant.tag;
        plant.unit = currentHarvestedPlant.unit;
        plant.weight = currentHarvestedPlant.weight;
        plant.batchName = currentHarvestedPlant.batchName;
        plant.userID = currentHarvestedPlant.userID;
      if(currentHarvestedPlant.id!==""){
        plant.id = currentHarvestedPlant.id;
      }
  
      console.log("Stringified before passed: " + JSON.stringify(plant));
      console.log("Exit getharvestedPlantitem")
      return plant;
    }
  

    async removePlant(event) {
      console.log("Enter removePlant");
      setTimeout(() => this.updateHB(event), 0) 

      event.preventDefault();
      console.log("Engage getRemovedPlantID");
      const removePlantID = this.props.getRemovedPlantID();
      console.log("getRemovedPlantID should be done");
      console.log("REMOVE PLANT ID: " + removePlantID);
      await fetch(`/api/zhplant/${removePlantID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      });
      console.log("Exit removePlant");
    }

    async updateHB(event) {
      console.log("Enter UpdateHB");
      setTimeout(() => this.props.setChanges(), 0) 

      event.preventDefault();

      const harvestBatchItem = this.props.getHarvestBatchItem(false);
    
      await fetch('/api/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem),
      });
    }

    getHarvestBatchItem(ch){
		  console.log("Enter getharvestBatchitem")
		  let hb = {
        name: '',
        finalized: '',
        plantList: '{}',
        type: '',
        date: ''
        };

        hb.name = ch.name;
	    	hb.finalized = ch.finalized;
	    	hb.plantList = ch.plantList;
	    	hb.type = ch.type;
	    	hb.date = ch.date;
	    	if(ch.itemID!==""){
	    		hb.id = ch.itemID;
	    	}

    		console.log("Adding " + hb.name); 
    		console.log("Stringified before passed: " + JSON.stringify(hb));
    		console.log("Exit getharvestBatchitem")
    		return hb;
  	}

    getPlantItem(plant){
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
    
    constructor(props) {
        super(props);
        this.state = {
          harvestedPlantItem: this.emptyHarvestedPlant,
          busyUpdating: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render() {    
        let editButtonText = "Edit";
	      if(this.props.editNow){
          editButtonText = "Accept Changes";
	      }   
        return <div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>{editButtonText}</Button>
        </div>
      }
}

export default EditButton;