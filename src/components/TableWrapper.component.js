import React from 'react';
import MyTable from './MyTable.component';

class TableWrapper extends React.Component {

constructor()
    {
        super();
        this.state = {reset: false};
    }

  reset = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <MyTable id="myTable" currHarvest={this.props.currHarvest} getHarvestRecords={this.props.getHarvestRecords} editNow={this.props.editNow} 
      currWeightChanges={this.props.currWeightChanges} setWeightChanges={this.props.setWeightChanges} wrapper={this} 
      getRemovePlantIDDelete={this.props.getRemovePlantIDDelete} currHidePlants={this.props.currHidePlants} setHidePlants={this.props.setHidePlants}
      getPlants={this.props.getPlants} reset={this.reset}></MyTable>
    );
  }
}

export default TableWrapper;