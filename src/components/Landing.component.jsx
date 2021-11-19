import React from 'react';
import HarvestForm from './HarvestForm.component';
import HarvestBatchesForm from './HarvestBatchesForm.component';
import ManagePlantsForm from './ManagePlantsForm.component';
import AccountForm from './AccountForm.component';
import SubscriptionForm from './SubscriptionForm.component';
import EndSubscriptionForm from './EndSubscriptionForm.component';
import ResetPasswordForm from './ResetPasswordForm.component';
import ManageDryRoomsForm from './ManageDryRoomsForm.component';
import ChangeSubscriptionForm from './ChangeSubscriptionForm.component';

function Landing({currentPage, getPlants, setPlants, getHarvestRecords, setHarvestRecords, getHarvestBatches, 
	setHarvestBatches, resetHarvestBatches, currentHarvest,setNewHBID, getCurrentHarvestID, refreshOuter,
setNewHarvestRecordID, setNewPlantID, userID,reloadPlants,reloadPlantsAndHarvestRecords, reloadHarvestBatches,
reloadHarvestRecords,setCurrentPage,verCode,userFromUrl,linkCode,executeLogout,setFromAccountSettings,attemptLogInFromEndSubForm,
logInSuccess,getDryRooms,getExportRecords,reloadDryRooms,reloadExportRecords,getUniqueIDCount,reloadSubscription}){

	console.log("ENTER LANDING, GET PLANTS(STRINGIFIED): " + JSON.stringify(getPlants()));

	console.log("ENTER LANDING, GET harvestRecordsMap(STRINGIFIED): " + JSON.stringify(getHarvestRecords()));

	console.log("ENTER LANDING, GET harvestbatches(STRINGIFIED): " + JSON.stringify(getHarvestBatches()));

	let fromAccountSettings = true;
	
    return(
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm getHarvestBatches={getHarvestBatches} setHarvestBatches={setHarvestBatches} getPlants={getPlants} setPlants={setPlants} getHarvestRecords={getHarvestRecords} setHarvestRecords={setHarvestRecords} 
				resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID} getCurrentHarvestID={getCurrentHarvestID} refreshOuter={refreshOuter} 
				setNewHarvestRecordID={setNewHarvestRecordID} setNewPlantID={setNewPlantID} userID={userID} reloadPlants={reloadPlants} reloadPlantsAndHarvestRecords={reloadPlantsAndHarvestRecords}
				reloadHarvestBatches={reloadHarvestBatches} reloadHarvestRecords={reloadHarvestRecords}/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID} reloadExportRecords={reloadExportRecords} getUniqueIDCount={getUniqueIDCount} getDryRooms={getDryRooms}/>
			) : currentPage === 'manage-dry-rooms-form' ? (
				<ManageDryRoomsForm getDryRooms={getDryRooms} refreshOuter={refreshOuter} reloadDryRooms={reloadDryRooms} userID={userID}/>
			) : currentPage === 'manage-plants-form' ? (
				<ManagePlantsForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} refreshOuter={refreshOuter} userID={userID} setPlants={setPlants} setNewPlantID={setNewPlantID} reloadPlants={reloadPlants}/>
			) : currentPage === 'account-form' ? (
				<AccountForm refreshOuter={refreshOuter} userID={userID} setCurrentPage={setCurrentPage} setFromAccountSettings={setFromAccountSettings}/>
			) : currentPage === 'subscription-form' ? (
				<SubscriptionForm refreshOuter={refreshOuter} userID={userID} setCurrentPage={setCurrentPage} getUniqueIDCount={getUniqueIDCount}/>
			) : currentPage === 'end-subscription-form' ? (
				<EndSubscriptionForm setCurrentPage={setCurrentPage} logInFailed={false} executeLogout={executeLogout} attemptLogInFromEndSubForm={attemptLogInFromEndSubForm} logInSuccess={logInSuccess}></EndSubscriptionForm>
			) : currentPage === 'reset-password-form' ? (
				<ResetPasswordForm setCurrentPage={setCurrentPage} linkCode='' userFromUrl='' executeLogout={executeLogout} fromAccountSettings={fromAccountSettings} userID={userID}></ResetPasswordForm>
			) : currentPage === 'change-subscription-form' ? (
				<ChangeSubscriptionForm setCurrentPage={setCurrentPage} userID={userID} reloadSubscription={reloadSubscription}></ChangeSubscriptionForm>
			) : null}
        </div>
    )
}
export default Landing;