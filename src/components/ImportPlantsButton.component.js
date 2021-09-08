import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ImportPlantsButton extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    async handleSubmit(event) {

        function Plant(userID,strain,tag,active){
            this.userID = userID;
            this.strain = strain;
            this.tag = tag;
            this.active = active;
        }

        function getPlantItem(plant){
            console.log("Enter getPlantItem");

            let pl = {
                tag: plant.tag,
                strain: plant.strain,
                userID: plant.userID,
                active: 0
                };
            return pl;
        }

        event.preventDefault();
        console.log("Handle Submit Plant Button");

	    let tempPlants = JSON.parse(this.props.getPlants());
		console.log("Before Import Plants - Plants: " + JSON.stringify(tempPlants));

		for(const val of this.props.uploadList){
			console.log('**UploadList[m]: ' + val);
			let splitList = val.split(",");

			for(let i = 1; i < splitList.length; i++){
				console.log("Add Plant: " + JSON.stringify(splitList[i]));
				let plant = new Plant(this.props.userID,splitList[i+1],splitList[i],0);
				tempPlants.push(plant);
                this.state.plantItem = getPlantItem(plant);
                console.log("Execute Add Plant from loop");
                this.executeAddPlant(event);
				i++;
			}
		}

		this.props.setPlants(JSON.stringify(tempPlants));
		this.props.setUploadList([]);
		console.log("After Add Plants - Plants: " + this.props.getPlants());
		this.props.setImporting(false);
        this.props.refreshOuter();
    }

    async executeAddPlant(event){
      event.preventDefault();
      console.log("Execute Import Plant");
      const parent = this;
      console.log("Plant Item**: " + JSON.stringify(parent.state.plantItem));
        const resp = fetch('/pl', {
            method: (parent.state.plantItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(parent.state.plantItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log("EXECUTE PLANT EXCT DATA: " + data); // this will be a string
            parent.props.setNewPlantID(data,parent.state.plantItem);
          });
    }
    
    constructor(props) {
        super(props);
        this.state = {
          plantItem: this.emptyPlant
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Import</Button>
        </div>
      }
}



export default ImportPlantsButton;