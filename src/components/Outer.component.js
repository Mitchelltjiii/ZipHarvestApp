import React, { Component } from 'react';
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
      setNewPlantID={this.props.setNewPlantID} userID={this.props.userID} setAll={this.props.setAll} reloadPlants={this.props.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.props.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.props.reloadHarvestBatches}
      reloadHarvestRecords={this.props.reloadHarvestRecords} setCurrentPage={this.props.setCurrentPage} verCode={this.props.verCode} 
      userFromUrl={this.props.userFromUrl} linkCode={this.props.linkCode} executeLogout={this.props.executeLogout} setFromAccountSettings={this.props.setFromAccountSettings}
      attemptLogInFromEndSubForm={this.props.attemptLogInFromEndSubForm} logInSuccess={this.props.logInSuccess} getDryRooms={this.props.getDryRooms}
      getExportRecords={this.props.getExportRecords} reloadDryRooms={this.props.reloadDryRooms} reloadExportRecords={this.props.reloadExportRecords}
      getUniqueIDCount={this.props.getUniqueIDCount} reloadSubscription={this.props.reloadSubscription} getPossiblePlantCount={this.props.getPossiblePlantCount}
      getSubscriptionType={this.props.getSubscriptionType}/>
		</div>
    );
  }
}

export default Outer;