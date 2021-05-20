import React from 'react';
import HarvestForm from './HarvestForm.component';
import HarvestBatchesForm from './HarvestBatchesForm.component';


function Landing({currentPage, plantMap, setPlantMap, harvestedPlantsMap, setHarvestedPlantMap, harvestBatchesMap, setHarvestBatches, resetHarvestBatches, resetAll}){

	console.log("ENTER LANDING, PLANTS(STRINGIFIED): " + JSON.stringify(plantMap));

	console.log("ENTER LANDING, harvestedPlantsMap(STRINGIFIED): " + JSON.stringify(harvestedPlantsMap));

	console.log("ENTER LANDING, harvestbatches(STRINGIFIED): " + JSON.stringify(harvestBatchesMap));


    return(
		
        <div>
			{currentPage === 'harvest-form' ? (
				<HarvestForm/>
			) : currentPage === 'harvest-batches-form' ? (
				<HarvestBatchesForm/>
			) : null}
        </div>
    )
}
export default Landing;