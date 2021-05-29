import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class AddHarvestBatchButton extends Component{
    emptyHarvestBatch = {
      name: '',
      finalized: '',
      plantList: '{}',
      type: '',
      date: ''
      };

    async handleSubmit(event) {
        event.preventDefault();
        console.log("Enter Add New HB");
        this.props.addNewHB();

        this.executeAddNewHB();

        /*
        const harvestBatchItem = this.props.getHarvestBatchItem(true);
        console.log("HarvestBatchItem before fetch: " + JSON.stringify(harvestBatchItem));

    
        await fetch('/api/harvestbatch', {
            method: (harvestBatchItem.id) ? 'PUT' : 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem),
      });
        this.props.history.push('/plants');*/
    }

    async executeAddNewHB(){
      console.log("Execute Add New HB");

      const harvestBatchItem = this.props.getHarvestBatchItem(true);
      console.log("HarvestBatchItem before fetch: " + JSON.stringify(harvestBatchItem));

      setTimeout(() => this.props.resetHarvestBatches(harvestBatchItem), 0); 
    
      const response = fetch('/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem)
      });
      const text = await response.text();

      /*
      fetch('/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem)
      });*/
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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Add</Button>
        </div>
      }
}



export default AddHarvestBatchButton;