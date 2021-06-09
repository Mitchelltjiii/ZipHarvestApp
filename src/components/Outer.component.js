import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Landing from './Landing.component';

class Outer extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
    //this.remove = this.remove.bind(this);
  }

  componentDidMount() {
  }

  refreshOuter = () => {
    this.forceUpdate();
  }

  render() {
    console.log("Rendering: Outer");
    console.log("***********************");
    console.log("this.props.plants: " + this.props.getPlants());
    console.log("this.props.harvestRecords: " + this.props.getHarvestRecords());
    console.log("this.props.harvestBatches: " + this.props.getHarvestBatches());
    console.log("***********************");
      return (
        <div>
			<Landing currentPage={this.props.currentPage} getPlants={this.props.getPlants} setPlants={this.props.setPlants} getHarvestRecords={this.props.getHarvestRecords} 
      setHarvestRecords={this.props.setHarvestRecords} getHarvestBatches={this.props.getHarvestBatches} setHarvestBatches={this.props.setHarvestBatches} 
      resetHarvestBatches={this.props.resetHarvestBatches} resetAll={this.props.resetAll} currentHarvest={this.props.currentHarvest} setNewHBID={this.props.setNewHBID}
      getCurrentHarvestID={this.props.getCurrentHarvestID} refreshOuter={this.refreshOuter} setNewHarvestRecordID={this.props.setNewHarvestRecordID} 
      setNewPlantID={this.props.setNewPlantID} userID={this.props.userID} setAll={this.props.setAll} reloadPlants={this.props.reloadPlants}/>
		</div>
    );
  }
}

export default Outer;