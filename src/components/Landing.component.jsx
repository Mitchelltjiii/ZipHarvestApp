import React from 'react';
import HarvestForm from './HarvestForm.component';
import HarvestBatchesForm from './HarvestBatchesForm.component';
import ManagePlantsForm from './ManagePlantsForm.component';
import AccountForm from './AccountForm.component';
import CreateUserForm from './CreateUserForm.component';
import StripeForm from './StripeForm';
import VerificationForm from './VerificationForm.component';

function Landing({currentPage, getPlants, setPlants, getHarvestRecords, setHarvestRecords, getHarvestBatches, 
	setHarvestBatches, resetHarvestBatches, resetAll, currentHarvest,setNewHBID, getCurrentHarvestID, refreshOuter,
setNewHarvestRecordID, setNewPlantID, userID, setAll,reloadPlants,reloadPlantsAndHarvestRecords, reloadHarvestBatches,
reloadHarvestRecords,setCurrentPage,verCode,userFromUrl,userExists}){

	console.log("ENTER LANDING, GET PLANTS(STRINGIFIED): " + JSON.stringify(getPlants()));

	console.log("ENTER LANDING, GET harvestRecordsMap(STRINGIFIED): " + JSON.stringify(getHarvestRecords()));

	console.log("ENTER LANDING, GET harvestbatches(STRINGIFIED): " + JSON.stringify(getHarvestBatches()));

	const [possibleUsername,setPossibleUsername] = React.useState('');
    return(
		
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm getHarvestBatches={getHarvestBatches} setHarvestBatches={setHarvestBatches} getPlants={getPlants} setPlants={setPlants} getHarvestRecords={getHarvestRecords} setHarvestRecords={setHarvestRecords} 
				resetHarvestBatches={resetHarvestBatches} resetAll={resetAll} currentHarvest={currentHarvest} setNewHBID={setNewHBID} getCurrentHarvestID={getCurrentHarvestID} refreshOuter={refreshOuter} 
				setNewHarvestRecordID={setNewHarvestRecordID} setNewPlantID={setNewPlantID} userID={userID} setAll={setAll} reloadPlants={reloadPlants} reloadPlantsAndHarvestRecords={reloadPlantsAndHarvestRecords}
				reloadHarvestBatches={reloadHarvestBatches} reloadHarvestRecords={reloadHarvestRecords}/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID}/>
			) : currentPage === 'manage-plants-form' ? (
				<ManagePlantsForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} refreshOuter={refreshOuter} userID={userID} setPlants={setPlants} setNewPlantID={setNewPlantID} reloadPlants={reloadPlants}/>
			) : currentPage === 'account-form' ? (
				<AccountForm refreshOuter={refreshOuter} userID={userID}/>
			) : currentPage === 'create-user-form' ? (
				<CreateUserForm refreshOuter={refreshOuter} userID={userID} setCurrentPage={setCurrentPage} setPossibleUsername={setPossibleUsername}></CreateUserForm>
			) : currentPage === 'stripe-form' ? (
				<StripeForm verCode={verCode} userFromUrl={userFromUrl} userExists={userExists}></StripeForm>
			) : currentPage === 'verification-form' ? (
				<VerificationForm refreshOuter={refreshOuter} userID={userID} setCurrentPage={setCurrentPage} possibleUsername={possibleUsername}></VerificationForm>
			) : null}
        </div>
    )
}
export default Landing;