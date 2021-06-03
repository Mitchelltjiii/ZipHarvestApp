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
      console.log("Handle Submit Harvest Plant Button");

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

          const resp = fetch('/hr', {
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
            console.log("Harvest Type Check");
            console.log("Harvest Type: " + parent.props.harvestType);
            console.log("Harvest Type(STRING): " + JSON.stringify(parent.props.harvestType));

            if(parent.props.harvestType == "harvest"){
              parent.updatePlant(event);
            }
          });
      }
    }

    async updatePlant(event) {
      console.log("Enter updatePlant");
      event.preventDefault();
      const parent = this;

      const plantItem = this.props.getPlantItem(1);

      console.log("getRemovedPlantID should be done");

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
        parent.props.printData()
      });

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
      this.props.updateHBList(addID)
      const harvestBatchItem = this.props.getHarvestBatchItem(false);
      console.log("Harvest Batch Item should be done");

      let parent = this;

      const resp = fetch('/hb', {
          method: (harvestBatchItem.id) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(harvestBatchItem)
        }).then(function(response) {
            return response.json();
          }).then(function(data) {
          });


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