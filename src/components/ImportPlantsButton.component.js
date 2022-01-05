import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class ImportPlantsButton extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    
    async addPlant(plantItem,tagExists){        
        let parent = this;
        fetch('/pl', {
          method: (tagExists) ? 'PUT' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(plantItem),
        }).then(function(response) {
          return response.json();
        }).then(function(data) { 
          for( var i = 0; i < parent.state.busyAddingPlants.length; i++){ 
            if ( parent.state.busyAddingPlants[i] === plantItem.tag) { 
                parent.state.busyAddingPlants.splice(i, 1); 
            }
          }
        });
    }

    async handleSubmit(event) {

        function Plant(tag,strain,userID,active){
            this.tag = tag;
            this.strain = strain;
            this.userID = userID;
            this.active = active;
        }

        function getPlantItem(plant){
            let plantItem = {
              tag: '',
              strain: '',
              userID: '',
              active: ''
             };
    
             plantItem.tag = plant.tag;
             plantItem.strain = plant.strain;
             plantItem.userID = plant.userID;
             plantItem.active = plant.active;
    
              if(plant.itemID!==""){
                  plantItem.id = plant.itemID;
              }
              return plantItem;
          }
        
        event.preventDefault();

    let timeLimit = 3000;
            let addPlant = new Plant("","","","");
            let pList = JSON.parse(this.props.getPlants());
			    let splitList = this.props.getPlantList().split(",");

			    for(let i = 0; i < splitList.length; i++){
                    addPlant = new Plant(splitList[i],splitList[i+1],this.props.userID,0);

                    const plantItem = getPlantItem(addPlant);
                    this.state.busyAddingPlants.push(addPlant.tag);
                let tagExists = false;

                for(const val2 of pList){
                  if(val2.tag === plantItem.tag){
                    tagExists = true;
                  }
                }
                this.addPlant(plantItem,tagExists);
                
                i++;
            }

        let x = 0;

        while(this.state.busyAddingPlants !== [] && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }

        this.props.reloadPlants([]);
		    this.props.setPlantList([]);
		    this.props.setImporting(false);
        this.props.refreshOuter();
    }

    async executeAddPlant(event,plantItem){
      event.preventDefault();
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
          });
    }
    
    constructor(props) {
        super(props);
        this.state = {
            busyAddingPlants: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.executeAddPlant = this.executeAddPlant.bind(this);
    }

    render() {    
        return (<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Import</Button>)
      }
}



export default ImportPlantsButton;