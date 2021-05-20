import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Landing from './Landing.component';

class Outer extends Component {

  constructor(props) {
    super(props);
    this.state = {plants: [], harvestedPlants: [], harvestBatches: [], isLoading: true};
    //this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.state.plants = this.props.plants;
    this.state.harvestedPlants = this.props.harvestedPlants;
    this.state.harvestBatches = this.props.harvestBatches;

    console.log("Component Mounted: Outer");
    console.log("=========================");
    console.log("this.state.plants: " + this.state.plants);
    console.log("this.state.harvestedPlants: " + this.state.harvestedPlants);
    console.log("this.state.harvestBatches: " + this.state.harvestBatches);
    console.log("=========================");
  }

  /*
  async remove(id) {
    await fetch(`/api/plant/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPlants = [...this.state.plants].filter(i => i.id !== id);
      this.setState({plants: updatedPlants});
    });
  }*/

  render() {
    var parent = this;

    function setHarvestBatches(harvestBatchesFromChild){
      console.log("SET HARVEST BATCHES - HB from child: " + JSON.stringify(harvestBatchesFromChild));
      parent.state.harvestBatches = harvestBatchesFromChild;
      console.log("SET HARVEST BATCHES - state.hbMap after transfer: " + JSON.stringify(parent.state.harvestBatches));
    }

    function setPlantMap(plantMapFromChild){
      console.log("SET PLANT MAP - PlantMap from child: " + JSON.stringify(plantMapFromChild));
      parent.state.plantMap = plantMapFromChild;
      console.log("SET PLANT MAP - PlantMap after transfer: " + JSON.stringify(parent.state.plantMap));
    }

    function setHarvestedPlantMap(harvestedPlantMapFromChild){
      console.log("SET HARVESTEDPLANT MAP - HarvestedPlantMap from child: " + JSON.stringify(harvestedPlantMapFromChild));
      parent.state.harvestedPlantMap = harvestedPlantMapFromChild;
      console.log("SET HARVESTEDPLANT MAP - HarvestedPlantMap after transfer: " + JSON.stringify(parent.state.harvestedPlantMap));
    }

    function resetHarvestBatches(){
      parent.setState({isLoading: true});
  
      console.log("RESETTING Harvest Batches");
  
      fetch('api/harvestbatches')
        .then(response => response.json())
        .then(data => parent.setState({harvestBatches: data, isLoading: false}));
    }

    function resetAll(){
      parent.setState({isLoading: true});
  
      console.log("RESETTING ALL");

      fetch('api/plants')
      .then(response => response.json())
      .then(data => parent.setState({plants: data, isLoading: false}));

      fetch('api/harvestedplants')
      .then(response => response.json())
      .then(data => parent.setState({harvestedPlants: data, isLoading: false}));
  
      fetch('api/harvestbatches')
        .then(response => response.json())
        .then(data => parent.setState({harvestBatches: data, isLoading: false}));
    }


    this.state.plants = this.props.plants;
    this.state.harvestedPlants = this.props.harvestedPlants;
    this.state.harvestBatches = this.props.harvestBatches;

    console.log("Rendering: Outer");
    console.log("***********************");
    console.log("this.state.plants: " + this.state.plants);
    console.log("this.state.harvestedPlants: " + this.state.harvestedPlants);
    console.log("this.state.harvestBatches: " + this.state.harvestBatches);
    console.log("***********************");

      console.log("Plants at render: " + JSON.stringify(this.state.plants));
      console.log("HarvestedPlants at render: " + JSON.stringify(this.state.harvestedPlants));
      console.log("HarvestBatches at render: " + JSON.stringify(this.state.harvestBatches));

      return (
        <div>
			<Landing/>
		</div>
    );
  }
}

export default Outer;