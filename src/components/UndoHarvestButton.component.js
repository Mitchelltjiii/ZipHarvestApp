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
      this.executeUndoHarvestPlant(event);
    }

    async executeUndoHarvestPlant(event){
      event.preventDefault();
      let parent = this;
          const strain = this.props.getStrainForPlantItem(this.props.lastHarvestedPlant.tag);
          const harvestRecordItem = this.props.getLastHarvestRecordItem();

          fetch(`/hr/${this.props.lastHarvestedPlant.itemID}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(function(response) {
          }).then(function(data) {
            if(parent.props.harvestType === "harvest"){
              parent.updatePlant(event,harvestRecordItem.tag,strain);
            }
          });
    }

    async updatePlant(event,plantTag,strain) {
      event.preventDefault();
      const parent = this;

      const plantItem = this.props.getPlantItem(0,plantTag,strain);

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
        parent.props.resetHarvestForm(true)
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