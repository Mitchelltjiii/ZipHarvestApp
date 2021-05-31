import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class EditButton extends Component{
    emptyHarvestedPlant = {
        uid: '',
        strain: '',
        tag: '',
        weight: 0,
        unit: ''
      };

    emptyHarvestBatch = {
      name: '',
      finalized: '',
      plantList: '{}',
      type: '',
      date: ''
      };  

      

    async clickEdit(){
	      function HarvestedPlant(itemID,uid,strain,tag,weight,unit){
	        	this.itemID = itemID;
	        	this.uid = uid;
	        	this.strain = strain;
		        this.tag = tag;
		        this.weight = weight;
		        this.unit = unit;
	      }

        function Plant(itemID,strain,tag){
          this.itemID = itemID;
          this.strain = strain;
          this.tag = tag;
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
              let foundHarvestedPlant = new HarvestedPlant('','','','',0,'');
              for(const val2 of this.props.harvestedPlants){
                console.log("Val2 (Harvestedplants): " + JSON.stringify(val2));
                if(val2.uid==val.uid){
                  foundIndex = i;
                  if(isNaN(newWeight) || newWeight == 0){
                    newWeight = val2.weight;
                  }
                  if(newUnit == ''){
                    newUnit = val2.unit;
                  }
                  foundHarvestedPlant = new HarvestedPlant(val2.id,val2.uid,val2.strain,val2.tag,newWeight,newUnit);
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

          for(const uid of this.props.currHidePlants){
            let addPlant = new Plant("","","");
            for(const val of this.props.harvestedPlants){
              if(val.uid == uid){
                addPlant = new Plant("",val.strain,val.tag);

                const plantItem = this.getPlantItem(addPlant);
  
                console.log("Plant Item to update with: " + JSON.stringify(plantItem));
  
                console.log("Busy Updating activated")
                this.state.busyUpdating = true;
                console.log("Before updateharvestbatch");
  
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

          for(const uid of this.props.currHidePlants){
              let i = 0;
              let foundIndex = -1;
              let foundID = '';
              for(const val2 of this.props.harvestedPlants){
                console.log("Val2 (Harvestedplants): " + JSON.stringify(val2));
                if(val2.uid==uid){
                  foundIndex = i;
                  console.log("Found Index: " + i);
                  foundID = val2.id;
                }
                i++;
              }
    
              if(foundIndex != -1){
                this.props.harvestedPlants.splice(foundIndex,1);
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

          let plantList = this.props.currentHarvest.plantList;
          console.log("Plantlist: " + plantList);

          let parsedPlantsList = (plantList.substring(1,plantList.length-1)).split(",");

          console.log("Parsed Plants List Before: " + JSON.stringify(parsedPlantsList));

          for(const uid of this.props.currHidePlants){
				    
            let i = 0;
            let foundIndex = -1;

            for(let id of parsedPlantsList){
              if(id == uid){
                foundIndex = i;
              }
              i++;
            }

            if(foundIndex != -1){
              parsedPlantsList.splice(foundIndex,1);
            }
          }

          let newPlantList = "{";
          console.log("New Parsed Plants List: " + JSON.stringify(parsedPlantsList));
          if(parsedPlantsList.length > 0){
            for(const uid of parsedPlantsList){
              newPlantList += uid + ",";
            }
            if(newPlantList.includes(",")){
              newPlantList = newPlantList.substring(0,newPlantList.length-1);
            }
          }
          newPlantList += "}";
          console.log("NEW PLANT LIST: " + newPlantList);

          this.props.currentHarvest.plantList = newPlantList;

          const harvestBatchItem = this.getHarvestBatchItem(this.props.currentHarvest);
  
          console.log("Harvest Batch Item to update with: " + JSON.stringify(harvestBatchItem));
  
          console.log("Busy Updating activated")
          this.state.busyUpdating = true;
          console.log("Before updateharvestbatch");
  
          this.updateHarvestBatch(harvestBatchItem);
          console.log("After updateharvestbatch");
  
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

          this.props.setChanges();
        }
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
      const response = fetch(`/harvestedplant/${removePlantID}`, {
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
      this.state.busyUpdating = false;    }

    async updateHarvestedPlant(harvestedPlantItem){
      console.log("Engage update harvested plant");
      const response = fetch('/harvestedplant', {
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


    async updateHarvestBatch(harvestBatchItem){
      console.log("Engage update harvest batch");
      const response = fetch('/harvestbatch', {
            method: (harvestBatchItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestBatchItem),
      });
      console.log("Create harvested plant should be done - no indicator");
      try{
        console.log("AWAITING RESPONSE UPDATEHARVESTBATCH")
        await response.text();
        console.log("RESPONSE RECIEVED UPDATEHARVESTBATCH")
      }catch(err){
        console.log("NO RESPONSE RECIEVED UPDATEHARVESTBATCH")
      }
      this.state.busyUpdating = false;
      
      console.log("Exit update harvest batch")
    }

    async addPlant(plantItem){
      console.log("Engage add Plant");
      let parent = this;
      const resp = fetch('/plant', {
        method: (plantItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantItem),
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log("EXECUTE PLANT EXCT DATA: " + data); // this will be a string
        parent.props.setNewPlantID(data,plantItem);
        this.state.busyUpdating = false;
      });
      
      console.log("Exit update plant")
    }

    getHarvestedPlantItem(currentHarvestedPlant){
      console.log("Enter getharvestedPlantitem")
      let plant = {
        uid: '',
        strain: '',
        tag: '',
        weight: 0,
        unit: ''
        };
  
      plant.uid = currentHarvestedPlant.uid;
      plant.strain = currentHarvestedPlant.strain;
      plant.tag = currentHarvestedPlant.tag;
      plant.unit = currentHarvestedPlant.unit;
      plant.weight = currentHarvestedPlant.weight;
      if(currentHarvestedPlant.itemID!==""){
        plant.id = currentHarvestedPlant.itemID;
      }
  
      console.log("Adding " + plant.strain); 
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
      await fetch(`/api/plant/${removePlantID}`, {
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
		  let plantItem = {
        strain: '',
        tag: ''
        };

        plantItem.strain = plant.strain;
        plantItem.tag = plant.tag;

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
          harvsetBatchItem: this.emptyHarvestBatch,
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