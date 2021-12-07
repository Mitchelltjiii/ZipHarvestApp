import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class SaveHarvestDateButton extends Component{
    emptyHarvestBatch = {
        name: '',
        plantList: '{}',
        type: '',
        date: ''
        };

    async updateHB(event) {
      event.preventDefault();
      this.props.setCurrentHarvestDate();
      const harvestBatchItem = this.props.getHarvestBatchItem(false);

      let parent = this;
      fetch('/hb', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(harvestBatchItem)
        }).then(function(response) {
            return response.json();
          }).then(function(data) {
            parent.props.saveHarvestDate();
          });
    }
    async handleSubmit(event) {
      event.preventDefault();
      this.updateHB(event);
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