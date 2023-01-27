import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class RemoveFromAvailablePlants extends Component{
    emptyPlant = {
        tag: '',
        strain: '',
        userID: '',
        active: ''
      }; 

       async addPlant(tag,active){
        let parent = this;
        fetch(`/pl/active/${tag}/${active}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(function(data) {
          while(parent.state.locked){
            setTimeout(null,200);
          }
          parent.setState({locked:true});
          let foundIndex = -1;
          for( var i = 0; i < parent.state.busyAddingPlants.length; i++){ 
            if ( parent.state.busyAddingPlants[i] === tag) {
                foundIndex = i; 
            }
          }

          let bap = parent.state.busyAddingPlants;
          bap.splice(foundIndex,1);
          parent.setState({busyAddingPlants:bap,locked:false});
        });        
      }

    async handleSubmit(event) { 
        event.preventDefault();

        let timeLimit = 10000;

        this.setState({busyAddingPlants:this.props.selectedToDelete});
            for(const val of this.props.selectedToDelete){
			        for(const val2 of JSON.parse(this.props.getPlants())){
                if(val2.tag === val){
                  
                  this.addPlant(val2.tag,1);
                }
              }
            }

        let x = 0;

        while(this.state.busyAddingPlants !== [] && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }

        this.props.reloadPlants([]);
		    this.props.setSelectedToDelete([]);
        this.props.refreshOuter();
    }
    constructor(props) {
        super(props);
        this.state = {
            busyAddingPlants: [],
            locked: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        return (<Button style={{marginRight:"5px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}>Delete</Button>);
      }
}



export default RemoveFromAvailablePlants;