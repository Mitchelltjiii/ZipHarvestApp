import React from 'react';
import HarvestForm from './HarvestForm.component';
import HarvestBatchesForm from './HarvestBatchesForm.component';


function Landing({currentPage, plantMap, setPlantMap, harvestedPlantsMap, setHarvestedPlantMap, harvestBatchesMap, 
	setHarvestBatches, resetHarvestBatches, resetAll, currentHarvest,setNewHBID, getCurrentHarvestID, refreshOuter,
setNewHarvestedPlantID, setNewPlantID}){

	console.log("ENTER LANDING, PLANTS(STRINGIFIED): " + JSON.stringify(plantMap));

	console.log("ENTER LANDING, harvestedPlantsMap(STRINGIFIED): " + JSON.stringify(harvestedPlantsMap));

	console.log("ENTER LANDING, harvestbatches(STRINGIFIED): " + JSON.stringify(harvestBatchesMap));


    return(
		
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm harvestBatches={harvestBatchesMap} setHarvestBatches={setHarvestBatches} plants={plantMap} setPlantMap={setPlantMap} harvestedPlants={harvestedPlantsMap} setHarvestedPlantMap={setHarvestedPlantMap} 
				resetHarvestBatches={resetHarvestBatches} resetAll={resetAll} currentHarvest={currentHarvest} setNewHBID={setNewHBID} getCurrentHarvestID={getCurrentHarvestID} refreshOuter={refreshOuter} 
				setNewHarvestedPlantID={setNewHarvestedPlantID} setNewPlantID={setNewPlantID}/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm harvestBatches={harvestBatchesMap} harvestedPlants={harvestedPlantsMap}/>
			) : null}
        </div>
    )
}
export default Landing;