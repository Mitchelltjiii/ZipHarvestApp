import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class HarvestPlantButton extends Component{
    emptyHarvestRecord = {
        tag: '',
        weight: '',
        unit: '',
        batchName: '',
        userID: ''
      };

    emptyHarvestBatch = {
        name: '',
        plantList: '{}',
        type: '',
        date: ''
        };

    async handleSubmit(event) {

      event.preventDefault();

      this.executeHarvestPlant(event);
    }

    async executeHarvestPlant(event){
      event.preventDefault();
      let parent = this;
      if(this.props.nextPlant()){
          const strain = this.props.getStrainForPlantItem(null);
          const harvestRecordItem = this.props.getHarvestRecordItem();

          fetch('/hr', {
            method: (harvestRecordItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvestRecordItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            parent.props.setNewHarvestRecordID(data,harvestRecordItem);
            if(parent.props.harvestType === "harvest"){
              parent.updatePlant(event,harvestRecordItem.tag,strain);
            }
          });
      }
    }

    async updatePlant(event,plantTag,strain) {
      event.preventDefault();
      const parent = this;

      const plantItem = this.props.getPlantItem(1,plantTag,strain);

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
        parent.props.resetHarvestForm(false);
      });
    }

    async updateHB(event,addID) {
      event.preventDefault();
      this.props.updateHBList(addID)
      const harvestBatchItem = this.props.getHarvestBatchItem(false);

      fetch('/hb', {
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
    }
    
    constructor(props) {
        super(props);
        this.state = {
          harvestRecordItem: this.emptyHarvestRecord,
          harvestBatchItem: this.emptyHarvestBatch
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div> 
            <Button style={{marginTop:"10px",marginBottom:"15px",width:"80%",backgroundColor:"#444444",color:"#FFFFFF",height:"50px"}} variant="contained" ref={this.props.plantRef} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Save Plant</Button>
        </div>
      }
}



export default HarvestPlantButton;