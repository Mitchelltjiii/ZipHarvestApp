import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class AddHarvestBatchButton extends Component{
    emptyHarvestBatch = {
      name: '',
      plantList: '{}',
      type: '',
      date: ''
      };

    async handleSubmit(event) {
        event.preventDefault();
        console.log("Enter Add New HB");
        if(this.props.addNewHB()){
          this.executeAddNewHB();
        }
    }

    async executeAddNewHB(){
      console.log("Execute Add New HB");

      let parent = this;

      const harvestBatchItem = this.props.getHarvestBatchItem(true);
      console.log("HarvestBatchItem before fetch: " + JSON.stringify(harvestBatchItem));
    
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
        parent.props.reloadHarvestBatchesFromAddHB();
      });
    }
    
    constructor(props) {
        super(props);
        this.state = {
          harvestBatchItem: this.emptyHarvestBatch,
          postResults: "NO RESULTS"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div>
            <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit} style={{marginLeft:"5px"}}>Create Batch</Button>
        </div>
      }
}



export default AddHarvestBatchButton;