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

  refreshOuter = (plants,harvestedPlants,harvestBatches) => {
    this.setState({plants:plants,harvestedPlants:harvestedPlants,harvestBatches:harvestBatches});
    console.log("REFRESH OUTER");
    console.log("$$$$$$$$$$$$");
    console.log("Plants: " + this.state.plants);
    console.log("Plants(STRING): " + JSON.stringify(this.state.plants));
    console.log("HarvestedPlants: " + this.state.harvestedPlants);
    console.log("HarvestedPlants(STRING): " + JSON.stringify(this.state.harvestedPlants));
    console.log("HarvestBatches: " + this.state.harvestBatches);
    console.log("HarvestBatches(STRING): " + JSON.stringify(this.state.harvestBatches));
    this.forceUpdate();
  }

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


    try{
      this.state.plants = JSON.parse(this.props.plants);
    }catch(err){

    }

    try{
      this.state.harvestedPlants = JSON.parse(this.props.harvestedPlants);
    }catch(err){

    }

    try{
      this.state.harvestBatches = JSON.parse(this.props.harvestBatches);
    }catch(err){

    }

    console.log("Rendering: Outer");
    console.log("***********************");
    console.log("this.props.plants: " + this.props.plants);
    console.log("this.props.harvestedPlants: " + this.props.harvestedPlants);
    console.log("this.props.harvestBatches: " + this.props.harvestBatches);
    console.log("***********************");


    console.log("this.state.plants: " + JSON.stringify(this.state.plants));
    console.log("this.state.harvestedPlants: " + JSON.stringify(this.state.harvestedPlants));
    console.log("this.state.harvestBatches: " + JSON.stringify(this.state.harvestBatches));


      return (
        <div>
			<Landing currentPage={this.props.currentPage} plantMap={this.state.plants} setPlantMap={setPlantMap} harvestedPlantsMap={this.state.harvestedPlants} 
      setHarvestedPlantMap={setHarvestedPlantMap} harvestBatchesMap={this.state.harvestBatches} setHarvestBatches={setHarvestBatches} 
      resetHarvestBatches={this.props.resetHarvestBatches} resetAll={this.props.resetAll} currentHarvest={this.props.currentHarvest} setNewHBID={this.props.setNewHBID}
      getCurrentHarvestID={this.props.getCurrentHarvestID} refreshOuter={this.refreshOuter}/>
		</div>
    );
  }
}

export default Outer;