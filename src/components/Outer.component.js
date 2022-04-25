import React, { Component } from 'react';
import Landing from './Landing.component';

class Outer extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
  }

  refreshOuter = () => {
    this.forceUpdate();
  }

  render() {
      return (
        <div>
			<Landing currentPage={this.props.currentPage} getPlants={this.props.getPlants} setPlants={this.props.setPlants} getHarvestRecords={this.props.getHarvestRecords} 
      setHarvestRecords={this.props.setHarvestRecords} getHarvestBatches={this.props.getHarvestBatches} setHarvestBatches={this.props.setHarvestBatches} 
      resetHarvestBatches={this.props.resetHarvestBatches} resetAll={this.props.resetAll} currentHarvest={this.props.currentHarvest} setNewHBID={this.props.setNewHBID}
      refreshOuter={this.refreshOuter} setNewHarvestRecordID={this.props.setNewHarvestRecordID} 
      setNewPlantID={this.props.setNewPlantID} userID={this.props.userID} setAll={this.props.setAll} reloadPlants={this.props.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.props.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.props.reloadHarvestBatches}
      reloadHarvestRecords={this.props.reloadHarvestRecords} setCurrentPage={this.props.setCurrentPage}
      executeLogout={this.props.executeLogout} setFromAccountSettings={this.props.setFromAccountSettings}
      attemptLogInFromEndSubForm={this.props.attemptLogInFromEndSubForm} logInSuccess={this.props.logInSuccess} getDryRooms={this.props.getDryRooms}
      reloadDryRooms={this.props.reloadDryRooms} reloadExportRecords={this.props.reloadExportRecords}
      getUniqueIDCount={this.props.getUniqueIDCount} reloadSubscription={this.props.reloadSubscription} getPossiblePlantCount={this.props.getPossiblePlantCount}
      getSubscriptionType={this.props.getSubscriptionType} getTutorials={this.props.getTutorials} setTutorials={this.props.setTutorials} showHints={this.props.showHints}
      getPrint={this.props.getPrint} print={this.props.print} getFreeTrial={this.props.getFreeTrial} getFreeTrialEnds={this.props.getFreeTrialEnds}/>
		</div>
    );
  }
}

export default Outer;