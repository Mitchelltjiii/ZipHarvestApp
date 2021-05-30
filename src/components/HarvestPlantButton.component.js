import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class HarvestPlantButton extends Component{
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

    async handleSubmit(event) {

      event.preventDefault();

      this.executeHarvestPlant(event);
      /*
        event.preventDefault();
        console.log("Engage Next Plant");
        if(this.props.nextPlant()){
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
        }*/
    }

    async executeHarvestPlant(event){
      event.preventDefault();
      let parent = this;
      console.log("Execute Harvest Plant");
      if(this.props.nextPlant()){
          console.log("Engage Harvested Plant Item");
          const harvestedPlantItem = this.props.getHarvestedPlantItem();
          console.log("Harvseted Plant Item should be done");

          const resp = fetch('/harvestedplant', {
            method: (harvestedPlantItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestedPlantItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log("EXECUTE HARVSET PLANT EXCT DATA: " + data); // this will be a string
            parent.props.setNewHarvestedPlantID(data,harvestedPlantItem);
            parent.removePlant(event,harvestedPlantItem.uid)
          });
          
      }
    }

      /*
      fetch('/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem)
      });*/

    async removePlant(event,addID) {
      console.log("Enter removePlant");
      setTimeout(() => this.updateHB(event,addID), 0) 

      event.preventDefault();

      console.log("Engage RemovePlantID");
      const removePlantID = this.props.getRemovedPlantID();
      console.log("removePlantID:  " + removePlantID);

      console.log("getRemovedPlantID should be done");

      const response = fetch(`/plant/${removePlantID}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

      const text = await response.text();

      /*
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
      console.log("Exit removePlant");*/
    }

    async updateHB(event,addID) {
      event.preventDefault();
      console.log("Execute Update HB");
      const harvestBatchItem = this.props.getHarvestBatchItem(false);
      console.log("Harvest Batch Item should be done");

      setTimeout(() => this.props.printData(harvestBatchItem.id,addID), 0); 

      const response = fetch('/harvestbatch', {
          method: (harvestBatchItem.id) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(harvestBatchItem)
        });
      try{
          await response.text();
      }catch(err){
      }


      /*    
      await fetch('/api/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem),
      });*/
    }
    
    constructor(props) {
        super(props);
        this.state = {
          harvestedPlantItem: this.emptyHarvestedPlant,
          harvsetBatchItem: this.emptyHarvestBatch
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Next Plant</Button>
        </div>
      }
}



export default HarvestPlantButton;