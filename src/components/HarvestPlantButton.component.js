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
        }
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