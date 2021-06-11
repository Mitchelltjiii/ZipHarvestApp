import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class EditButton extends Component{
    emptyHarvestRecord = {
        tag: '',
        weight: '',
        unit: '',
        batchName: '',
        userID: ''
      };

    async clickEdit(){
	      function HarvestRecord(id,tag,weight,unit,batchName,userID){
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
              let foundHarvestRecord = new HarvestRecord('','','','','','');
              for(const val2 of JSON.parse(this.props.getHarvestRecords())){
                console.log("Val2 (HarvestRecords): " + JSON.stringify(val2));
                if(val2.tag==val.tag){
                  foundIndex = i;
                  if(isNaN(newWeight) || newWeight == 0){
                    newWeight = val2.weight;
                  }
                  if(newUnit == ''){
                    newUnit = val2.unit;
                  }
                  foundHarvestRecord = new HarvestRecord(val2.id,val2.tag,newWeight,newUnit,val2.batchName,val2.userID);
                  console.log("Found Index: " + i);
                }
                i++;
              }
    
              if(foundIndex != -1){
                let splicedHR = JSON.parse(this.props.getHarvestRecords());
                splicedHR.splice(foundIndex,1,foundHarvestRecord)
                this.props.setHarvestRecords(JSON.stringify(splicedHR));
                console.log("Harvested Plant Replaced");
  
                const harvestRecordItem = this.getHarvestRecordItem(foundHarvestRecord);
  
                console.log("Harvested Plant Item to update with: " + JSON.stringify(harvestRecordItem));
  
                console.log("Busy Updating activated");
                console.log("BUSYSETTINGHR"); 
                console.log("BUSYSETTINGHR before push: " + JSON.stringify(this.state.busySettingHarvestRecords)); 
                this.state.busySettingHarvestRecords.push(harvestRecordItem.id);
                console.log("BUSYSETTINGHR after push: " + JSON.stringify(this.state.busySettingHarvestRecords)); 
                console.log("Before updateHarvestRecord");
  
                this.updateHarvestRecord(harvestRecordItem);
                console.log("After updateHarvestRecord");
  
                let x = 0;
  
                while(this.state.busySettingHarvestRecords != [] && x<this.props.timeLimit){
                  console.log("Set timeout");
                  setTimeout('',200);
                  x++;
                }
  
                if(x==this.props.timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }
                console.log("Left timeout loop");
              }
    
              console.log("HarvestRecords after edit: " + JSON.stringify(this.props.getHarvestRecords()));
            }catch(s){
    
            }
          }

          for(const tag of this.props.currHidePlants){
            let addPlant = new Plant("","","","");
            for(const val of JSON.parse(this.props.getHarvestRecords())){
              if(val.tag == tag){
                addPlant = new Plant(val.tag,this.props.getStrainForPlantItem(val.tag),"mtj",0);

                const plantItem = this.getPlantItem(addPlant);
  
                console.log("Plant Item to update with: " + JSON.stringify(plantItem));
  
                console.log("BUSYADDINGPL"); 
                console.log("BUSYADDINGPL before push: " + JSON.stringify(this.state.busyAddingPlants)); 
                this.state.busyAddingPlants.push(addPlant.tag);
                console.log("BUSYSETTINGHR after push: " + JSON.stringify(this.state.busyAddingPlants)); 
                console.log("Before updateHarvestRecord");
  
                this.addPlant(plantItem);
                console.log("After addPlant");
  
                let x = 0;

                while(this.state.busyAddingPlants != [] && x<this.props.timeLimit){
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
              for(const val2 of JSON.parse(this.props.getHarvestRecords())){
                console.log("Val2 (HarvestRecords): " + JSON.stringify(val2));
                if(val2.tag==tag){
                  foundIndex = i;
                  console.log("Found Index: " + i);
                  foundID = val2.id;
                }
                i++;
              }
    
              if(foundIndex != -1){
                let splicedHR = JSON.parse(this.props.getHarvestRecords());
                splicedHR.splice(foundIndex,1);
                this.props.setHarvestRecords(JSON.stringify(splicedHR));
                console.log("Harvest Records after Set: " + JSON.stringify(this.props.getHarvestRecords()));
      
                console.log("BUSYREMOVINGHR"); 
                console.log("BUSYREMOVINGHR before push: " + JSON.stringify(this.state.busyDeletingHarvestRecords)); 
                this.state.busyDeletingHarvestRecords.push(foundID);
                console.log("BUSYREMOVINGHR after push: " + JSON.stringify(this.state.busyDeletingHarvestRecords)); 
                console.log("Before updateHarvestRecord");
  
                this.deleteHarvestRecord(foundID);
                console.log("After updateHarvestRecord");
  
                let x = 0;
  
                while(this.state.busyDeletingHarvestRecords != [] && x<this.props.timeLimit){
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
          console.log("HarvestRecords in EditButton after changes accepted: " + this.props.getHarvestRecords());
          this.props.printData();
          setTimeout(() => this.props.reloadFromEditButton(),0); 
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
    }

      
    async deleteHarvestRecord(removePlantID){
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
        console.log("AWAITING RESPONSE DELETEHarvestRecord")
        await response.text();
        console.log("RESPONSE RECIEVED DELETEHarvestRecord")
      }catch(err){
        console.log("NO RESPONSE RECIEVED DELETEHarvestRecord")
      } 

      console.log("Before removing busy removing record");
      console.log("BUSYREMOVINGHR before: " + JSON.stringify(this.state.busyDeletingHarvestRecords)); 
      for( var i = 0; i < this.state.busyDeletingHarvestRecords.length; i++){ 
        if (this.state.busyDeletingHarvestRecords[i] == harvestRecordItem.id) { 
            this.state.busyDeletingHarvestRecords.splice(i, 1); 
        }
      }
      console.log("BUSYREMOVINGHB after: " + JSON.stringify(this.state.busyDeletingHarvestRecords));       
      console.log("Exit remove harvest record")
    }

    async updateHarvestRecord(harvestRecordItem){
      console.log("Engage update harvested plant");
      const response = fetch('/hr', {
            method: (harvestRecordItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestRecordItem)
      });
      console.log("Create harvested plant should be done - no indicator");
      try{
        console.log("AWAITING RESPONSE UPDATEHarvestRecord")
        await response.text();
        console.log("RESPONSE RECIEVED UPDATEHarvestRecord")
      }catch(err){
        console.log("NO RESPONSE RECIEVED UPDATEHarvestRecord")
      }
      console.log("Before removing busy setting record");
      console.log("BUSYSETTINGHR before: " + JSON.stringify(this.state.busySettingHarvestRecords)); 
      for( var i = 0; i < this.state.busySettingHarvestRecords.length; i++){ 
        if ( this.state.busySettingHarvestRecords[i] == harvestRecordItem.id) { 
            this.state.busySettingHarvestRecords.splice(i, 1); 
        }
      }
      console.log("BUSYSETTINGHR after: " + JSON.stringify(this.state.busySettingHarvestRecords));       
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

    getHarvestRecordItem(currentHarvestRecord){
      console.log("Enter getHarvestRecorditem")
      console.log("Plant To Create PlantItem From: " + JSON.stringify(currentHarvestRecord));
      let plant = {
        tag: '',
			  weight: 0,
			  unit: '',
			  batchName: '',
			  userID: ''
        };
  
        plant.tag = currentHarvestRecord.tag;
        plant.unit = currentHarvestRecord.unit;
        plant.weight = currentHarvestRecord.weight;
        plant.batchName = currentHarvestRecord.batchName;
        plant.userID = currentHarvestRecord.userID;
      if(currentHarvestRecord.id!==""){
        plant.id = currentHarvestRecord.id;
      }
  
      console.log("Stringified before passed: " + JSON.stringify(plant));
      console.log("Exit getHarvestRecorditem")
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
          harvestRecordItem: this.emptyHarvestRecord,
          busyUpdating: false,
          busySettingHarvestRecords: [],
          busyAddingPlants: [],
          busyDeletingHarvestRecords: []
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