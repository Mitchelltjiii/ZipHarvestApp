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
import TutorialForm from './TutorialForm.component';
import PrintPage from './PrintPage.component';

function Landing({currentPage, getPlants, setPlants, getHarvestRecords, setHarvestRecords, getHarvestBatches, 
	setHarvestBatches, resetHarvestBatches, currentHarvest,setNewHBID, refreshOuter,
setNewHarvestRecordID, setNewPlantID, userID,reloadPlants,reloadPlantsAndHarvestRecords, reloadHarvestBatches,
reloadHarvestRecords,setCurrentPage,executeLogout,setFromAccountSettings,attemptLogInFromEndSubForm,
logInSuccess,getDryRooms,reloadDryRooms,reloadExportRecords,getUniqueIDCount,reloadSubscription,
getPossiblePlantCount,getSubscriptionType,getTutorials,setTutorials,showHints,getPrint,print,getFreeTrial,
getFreeTrialEnds,getReferalLink,getGrantFreeMonthCode,setGrantFreeMonthCode,getFreeMonthGrantedVisible,setFreeMonthGrantedVisible,
setOffer}){
	let fromAccountSettings = true;

    return(
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm getHarvestBatches={getHarvestBatches} setHarvestBatches={setHarvestBatches} getPlants={getPlants} setPlants={setPlants} getHarvestRecords={getHarvestRecords} setHarvestRecords={setHarvestRecords} 
				resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID} refreshOuter={refreshOuter} 
				setNewHarvestRecordID={setNewHarvestRecordID} setNewPlantID={setNewPlantID} userID={userID} reloadPlants={reloadPlants} reloadPlantsAndHarvestRecords={reloadPlantsAndHarvestRecords}
				reloadHarvestBatches={reloadHarvestBatches} reloadHarvestRecords={reloadHarvestRecords} getTutorials={getTutorials} setTutorials={setTutorials} showHints={showHints}
				setCurrentPage={setCurrentPage} getFreeTrial={getFreeTrial} getReferalLink={getReferalLink} getGrantFreeMonthCode={getGrantFreeMonthCode} setOffer={setOffer}
				executeLogout={executeLogout}/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID} reloadExportRecords={reloadExportRecords} 
				getUniqueIDCount={getUniqueIDCount} getDryRooms={getDryRooms} getPossiblePlantCount={getPossiblePlantCount} getFreeTrial={getFreeTrial}/>
			) : currentPage === 'manage-dry-rooms-form' ? (
				<ManageDryRoomsForm getDryRooms={getDryRooms} refreshOuter={refreshOuter} reloadDryRooms={reloadDryRooms} userID={userID} showHints={showHints}/>
			) : currentPage === 'manage-plants-form' ? (
				<ManagePlantsForm getPlants={getPlants} refreshOuter={refreshOuter} userID={userID} setPlants={setPlants} 
				setNewPlantID={setNewPlantID} reloadPlants={reloadPlants} showHints={showHints} setGrantFreeMonthCode={setGrantFreeMonthCode}
				getFreeMonthGrantedVisible={getFreeMonthGrantedVisible} setFreeMonthGrantedVisible={setFreeMonthGrantedVisible}/>
			) : currentPage === 'account-form' ? (
				<AccountForm userID={userID} setCurrentPage={setCurrentPage} setFromAccountSettings={setFromAccountSettings} executeLogout={executeLogout} getPrint={getPrint}/>
			) : currentPage === 'subscription-form' ? (
				<SubscriptionForm userID={userID} setCurrentPage={setCurrentPage} getUniqueIDCount={getUniqueIDCount} getFreeTrial={getFreeTrial}
				getFreeTrialEnds={getFreeTrialEnds}/>
			) : currentPage === 'end-subscription-form' ? (
				<EndSubscriptionForm setCurrentPage={setCurrentPage} attemptLogInFromEndSubForm={attemptLogInFromEndSubForm} logInSuccess={logInSuccess}></EndSubscriptionForm>
			) : currentPage === 'reset-password-form' ? (
				<ResetPasswordForm setCurrentPage={setCurrentPage} linkCode='' userFromUrl='' fromAccountSettings={fromAccountSettings} userID={userID}></ResetPasswordForm>
			) : currentPage === 'change-subscription-form' ? (
				<ChangeSubscriptionForm userID={userID} reloadSubscription={reloadSubscription} getSubscriptionType={getSubscriptionType} setCurrentPage={setCurrentPage}></ChangeSubscriptionForm>
			) : currentPage === 'tutorial-form' ? (
				<TutorialForm></TutorialForm>
			) : currentPage === 'print-page' ? (
				<PrintPage print={print}></PrintPage>
			) : null}
        </div>
    )
}
export default Landing;