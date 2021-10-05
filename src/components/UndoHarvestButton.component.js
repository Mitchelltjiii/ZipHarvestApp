import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class UndoHarvestButton extends Component{
    emptyHarvestRecord = {
        tag: '',
        weight: '',
        unit: '',
        batchName: '',
        userID: ''
      };


    async handleSubmit(event) {

      event.preventDefault();
      console.log("Handle Submit Harvest Plant Button");

      this.executeUndoHarvestPlant(event);
    }

    async executeUndoHarvestPlant(event){
      event.preventDefault();
      let parent = this;
      console.log("Execute UndoHarvest Plant");
      console.log("Engage Harvested Plant Item");
          const strain = this.props.getStrainForPlantItem(this.props.lastHarvestedPlant.tag);
          const harvestRecordItem = this.props.getLastHarvestRecordItem();
          console.log("Harvseted Plant Item should be done");
          try{
            console.log("LastHarvestedPlant.itemid: " + this.props.lastHarvestedPlant.itemID);
          }catch(err){

          }

          const resp = fetch(`/hr/${this.props.lastHarvestedPlant.itemID}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(function(response) {
            console.log("THEN*");
          }).then(function(data) {
            console.log("THEN**");
            if(parent.props.harvestType == "harvest"){
              parent.updatePlant(event,harvestRecordItem.tag,strain);
            }
          });
    }

    async updatePlant(event,plantTag,strain) {
      console.log("Enter updatePlant");
      event.preventDefault();
      const parent = this;

      const plantItem = this.props.getPlantItem(0,plantTag,strain);

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
        parent.props.resetHarvestForm()
      });
    }
    
    constructor(props) {
        super(props);
        this.state = {
          harvestRecordItem: this.emptyHarvestRecord
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Undo</Button>
        </div>
      }
}



export default UndoHarvestButton;