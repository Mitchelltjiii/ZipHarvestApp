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

        //setTimeout(() => this.props.resetHarvestBatches(), 0) 

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

    executeAddNewHB(){
      console.log("Execute Add New HB");

      //2021-05-03 22:06:12

      const harvestBatchItem = this.props.getHarvestBatchItem(true);
      console.log("HarvestBatchItem before fetch: " + JSON.stringify(harvestBatchItem));
  
  //method: (plantItem.id) ? 'PUT' : 'POST',
  
      fetch('/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem)
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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Add</Button>
        </div>
      }
}



export default AddHarvestBatchButton;