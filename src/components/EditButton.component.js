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

          for(const val of currWeightChanges){
            try{
              let newWeight = parseFloat(val.newWeight);
              let newUnit = val.newUnit;

              let i = 0;
              let foundIndex = -1;
              let foundHarvestRecord = new HarvestRecord('','','','','','');
              for(const val2 of JSON.parse(this.props.getHarvestRecords())){
                if(val2.tag===val.tag){
                  foundIndex = i;
                  if(isNaN(newWeight) || newWeight === 0){
                    newWeight = val2.weight;
                  }
                  if(newUnit === ''){
                    newUnit = val2.unit;
                  }
                  foundHarvestRecord = new HarvestRecord(val2.id,val2.tag,newWeight,newUnit,val2.batchName,val2.userID);
                }
                i++;
              }
    
              if(foundIndex !== -1){
                let splicedHR = JSON.parse(this.props.getHarvestRecords());
                splicedHR.splice(foundIndex,1,foundHarvestRecord)
                this.props.setHarvestRecords(JSON.stringify(splicedHR));
  
                const harvestRecordItem = this.getHarvestRecordItem(foundHarvestRecord);
                this.state.busySettingHarvestRecords.push(harvestRecordItem.id);
  
                this.updateHarvestRecord(harvestRecordItem);
  
                let x = 0;
  
                while(this.state.busySettingHarvestRecords !== [] && x<this.props.timeLimit){
                  setTimeout(null,200);
                  x++;
                }
              }
          }catch(s){
    
            }
          }

          for(const tag of this.props.currHidePlants){
            let addPlant = new Plant("","","","");
            for(const val of JSON.parse(this.props.getHarvestRecords())){
              if(val.tag === tag){
                addPlant = new Plant(val.tag,this.props.getStrainForPlantItem(val.tag),val.userID,0);

                const plantItem = this.getPlantItem(addPlant);
  
                this.state.busyAddingPlants.push(addPlant.tag);
                
                this.addPlant(plantItem);
  
                let x = 0;

                while(this.state.busyAddingPlants !== [] && x<this.props.timeLimit){
                  setTimeout(null,200);
                  x++;
                }
              }
            }
          }

          for(const tag of this.props.currHidePlants){
              let i = 0;
              let foundIndex = -1;
              let foundID = '';
              for(const val2 of JSON.parse(this.props.getHarvestRecords())){
                if(val2.tag===tag){
                  foundIndex = i;
                  foundID = val2.id;
                }
                i++;
              }
    
              if(foundIndex !== -1){
                let splicedHR = JSON.parse(this.props.getHarvestRecords());
                splicedHR.splice(foundIndex,1);
                this.props.setHarvestRecords(JSON.stringify(splicedHR));
                this.state.busyDeletingHarvestRecords.push(foundID);
                
                this.deleteHarvestRecord(foundID);
                
                let x = 0;
  
                while(this.state.busyDeletingHarvestRecords !== [] && x<this.props.timeLimit){
                  setTimeout(null,200);
                  x++;
                }
              }
          }
          this.props.setChanges();
          this.props.printData();
          this.props.reloadFromEditButton(); 
        }
      this.props.setEditMode(!this.props.editNow);
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.clickEdit();
        setTimeout(() => this.setState(this.state), 0) 
    }

      
    async deleteHarvestRecord(removePlantID){
      const response = fetch(`/hr/${removePlantID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      });

      try{
        await response.text();
      }catch(err){
      } 
      for( var i = 0; i < this.state.busyDeletingHarvestRecords.length; i++){ 
        if (this.state.busyDeletingHarvestRecords[i] === removePlantID) { 
            this.state.busyDeletingHarvestRecords.splice(i, 1); 
        }
      }
    }

    async updateHarvestRecord(harvestRecordItem){
      const response = fetch('/hr', {
            method: (harvestRecordItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestRecordItem)
      });
      try{
        await response.text();
      }catch(err){
      } 
      for( var i = 0; i < this.state.busySettingHarvestRecords.length; i++){ 
        if ( this.state.busySettingHarvestRecords[i] === harvestRecordItem.id) { 
            this.state.busySettingHarvestRecords.splice(i, 1); 
        }
      }
    }

    async addPlant(plantItem){
      let parent = this;
      fetch('/pl', {
        method: (plantItem.tag) ? 'PUT' : 'POST',
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

    getHarvestRecordItem(currentHarvestRecord){
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
      return plant;
    }
  

    async removePlant(event) {
      setTimeout(() => this.updateHB(event), 0) 

      event.preventDefault();
      const removePlantID = this.props.getRemovedPlantID();
      await fetch(`/api/zhplant/${removePlantID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      });
    }

    async updateHB(event) {
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
		  let hb = {
        name: '',
        plantList: '{}',
        type: '',
        date: ''
        };

        hb.name = ch.name;
	    	hb.plantList = ch.plantList;
	    	hb.type = ch.type;
	    	hb.date = ch.date;
	    	if(ch.itemID!==""){
	    		hb.id = ch.itemID;
	    	}

    		return hb;
  	}

    getPlantItem(plant){

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
        return <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>{editButtonText}</Button>
        
      }
}

export default EditButton;