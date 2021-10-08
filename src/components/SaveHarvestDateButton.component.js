import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class SaveHarvestDateButton extends Component{
    emptyHarvestBatch = {
        name: '',
        submitted: '',
        plantList: '{}',
        type: '',
        date: ''
        };

    async handleSubmit(event) {

      event.preventDefault();
      console.log("Handle Submit Save Harvest Date Button");

      this.updateHB(event);
    }

    async updateHB(event) {
      event.preventDefault();
      console.log("Execute Update HB");
      this.props.setCurrentHarvestDate();
      const harvestBatchItem = this.props.getHarvestBatchItem(false);
      console.log("Harvest Batch Item should be done");

      const resp = fetch('/hb', {
          method: (harvestBatchItem.name) ? 'PUT' : 'POST',
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
          harvestBatchItem: this.emptyHarvestBatch
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div>
            <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Save</Button>
        </div>
      }
}



export default SaveHarvestDateButton;