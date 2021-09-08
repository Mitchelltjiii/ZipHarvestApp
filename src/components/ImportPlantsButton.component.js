import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ImportPlantsButton extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    plantItem = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
    }

    async handleSubmit(event) {

        function Plant(userID,strain,tag,active){
            this.userID = userID;
            this.strain = strain;
            this.tag = tag;
            this.active = active;
        }

        function getPlantItem(pl){
            console.log("Enter getPlantItem")
            let pl = {
                tag: plant.tag,
                strain: plant.strain,
                userID: this.props.userID,
                active: 0
                };
        }

        event.preventDefault();
        console.log("Handle Submit Plant Button");

	    let tempPlants = JSON.parse(getPlants());
		console.log("Before Import Plants - Plants: " + JSON.stringify(tempPlants));

		for(const val of this.props.uploadList){
			console.log('**UploadList[m]: ' + val);
			let splitList = val.split(",");

			for(let i = 1; i < splitList.length; i++){
				console.log("Add Plant: " + JSON.stringify(splitList[i]));
				let plant = new Plant(userID,splitList[i+1],splitList[i],0);
				tempPlants.push(plant);
                plantItem = getPlantItem(plant);
                console.log("Execute Add Plant from loop");
                this.executeAddPlant(event);
				i++;
			}
		}

		this.props.setPlants(JSON.stringify(tempPlants));
		this.props.setUploadList([]);
		console.log("After Add Plants - Plants: " + getPlants());
		this.props.setImporting(false);
        refreshOuter();
    }

    async executeAddPlant(event){
      event.preventDefault();
      let parent = this;
      console.log("Execute Import Plant");
      console.log("Plant Item**: " + JSON.stringify(plantItem));
        const resp = fetch('/pl', {
            method: (plantItem.id) ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(plantItem)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log("EXECUTE PLANT EXCT DATA: " + data); // this will be a string
            parent.props.setNewPlantID(data,plantItem); //***/
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