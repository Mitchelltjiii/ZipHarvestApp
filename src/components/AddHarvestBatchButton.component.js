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

      let parent = this;

      const harvestBatchItem = this.props.getHarvestBatchItem(true);
      console.log("HarvestBatchItem before fetch: " + JSON.stringify(harvestBatchItem));
    
      const resp = fetch('/harvestbatch', {
        method: (harvestBatchItem.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(harvestBatchItem)
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log("EXCT DATA: " + data); // this will be a string
        parent.props.setNewHBID(data);
      });
      /*
      var text = "Text before change";
      try{
        text = await response.text;
      }catch(err){
        console.log("CAUGHT ERROR EXECUTEADDNEWHB");
      }
      console.log("EXECUTE ADD NEW HB RESPONSE: " + response);

      console.log("EXECUTE ADD NEW HB RESPONSE(STRING): " + JSON.stringify(response));

      console.log("EXECUTE ADD NEW HB text: " + text);
      
      console.log("EXECUTE ADD NEW HB text(STRING): " + JSON.stringify(text));*/
/*,function(error, results, fields) {
        console.log("RESPONSE FUNCTION CALLED");
        if (error) throw error;
        console.log("POST RESULTS: " + results);
        console.log(error);
        res.send({postResults: results}); //<-- send back the JSON response
      }*/

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
          harvestBatchItem: this.emptyHarvestBatch,
          postResults: "NO RESULTS"
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