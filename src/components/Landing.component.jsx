import React from 'react';
import HarvestForm from './HarvestForm.component';
import HarvestBatchesForm from './HarvestBatchesForm.component';
import ManagePlantsForm from './ManagePlantsForm.component';
import AccountForm from './AccountForm.component';

function Landing({currentPage, getPlants, setPlants, getHarvestRecords, setHarvestRecords, getHarvestBatches, 
	setHarvestBatches, resetHarvestBatches, resetAll, currentHarvest,setNewHBID, getCurrentHarvestID, refreshOuter,
setNewHarvestRecordID, setNewPlantID, userID, setAll,reloadPlants,reloadPlantsAndHarvestRecords, reloadHarvestBatches}){

	console.log("ENTER LANDING, GET PLANTS(STRINGIFIED): " + JSON.stringify(getPlants()));

	console.log("ENTER LANDING, GET harvestRecordsMap(STRINGIFIED): " + JSON.stringify(getHarvestRecords()));

	console.log("ENTER LANDING, GET harvestbatches(STRINGIFIED): " + JSON.stringify(getHarvestBatches()));


    return(
		
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm getHarvestBatches={getHarvestBatches} setHarvestBatches={setHarvestBatches} getPlants={getPlants} setPlants={setPlants} getHarvestRecords={getHarvestRecords} setHarvestRecords={setHarvestRecords} 
				resetHarvestBatches={resetHarvestBatches} resetAll={resetAll} currentHarvest={currentHarvest} setNewHBID={setNewHBID} getCurrentHarvestID={getCurrentHarvestID} refreshOuter={refreshOuter} 
				setNewHarvestRecordID={setNewHarvestRecordID} setNewPlantID={setNewPlantID} userID={userID} setAll={setAll} reloadPlants={reloadPlants} reloadPlantsAndHarvestRecords={reloadPlantsAndHarvestRecords}
				reloadHarvestBatches={reloadHarvestBatches}/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID}/>
			) : currentPage === 'manage-plants-form' ? (
				<ManagePlantsForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} refreshOuter={refreshOuter} userID={userID} setPlants={setPlants} setNewPlantID={setNewPlantID} reloadPlants={reloadPlants}/>
			) : currentPage === 'account-form' ? (
				<AccountForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} refreshOuter={refreshOuter} userID={userID} setPlants={setPlants} setNewPlantID={setNewPlantID} reloadPlants={reloadPlants}/>
			) : null}
        </div>
    )
}
export default Landing;