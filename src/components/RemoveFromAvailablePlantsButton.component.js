import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class RemoveFromAvailablePlants extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

    
    async addPlant(plantItem){
        let parent = this;
        fetch('/pl', {
          method: 'PUT',
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

    let timeLimit = 10000;

            let addPlant = new Plant("","","","");
            for(const val of this.props.removeList){
			        for(const val2 of JSON.parse(this.props.getPlants())){
                if(val2.tag === val){
                  addPlant = new Plant(val2.tag,val2.strain,this.props.userID,1);

                  const plantItem = getPlantItem(addPlant);
                  this.state.busyAddingPlants.push(addPlant.tag);
                  
                  this.addPlant(plantItem);
                }
              }
            }

        let x = 0;

        while(this.state.busyAddingPlants !== [] && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }

        this.props.reloadPlants([]);
		    this.props.setRemoveList([]);
        this.props.refreshOuter();
    }
    constructor(props) {
        super(props);
        this.state = {
            busyAddingPlants: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return (<Button style={{marginRight:"5px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Delete</Button>);
      }
}



export default RemoveFromAvailablePlants;