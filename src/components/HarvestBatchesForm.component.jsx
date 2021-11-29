import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID, reloadExportRecords, getUniqueIDCount,getDryRooms,getPossiblePlantCount}) {
	
	let uniqueIDCount = getUniqueIDCount();
	console.log("HarvestBatchesForm unique id Count: " + uniqueIDCount);

	let possiblePlantCount = getPossiblePlantCount();
	console.log("HarvestBatchesForm possible plant Count: " + possiblePlantCount);

	return (
		<div id="harvest-batches-form" style={{margin:"auto"}}>
			<Grid
				container
				direction="row"
  				justifyContent="center"
				alignItems="center"
			>
				<div className="full tr" style={{margin:"auto"}}>
			    <Grid
					container
					direction="column"
  					justifyContent="center"
					alignItems="center"
				>
					<div style={{margin:"auto"}}>
						<div>{uniqueIDCount}/{possiblePlantCount} plants exported this month.</div>
					</div>

					<div style={{margin:"auto"}}>
					<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID} reloadExportRecords={reloadExportRecords} getUniqueIDCount={getUniqueIDCount} getDryRooms={getDryRooms}></HBTable>
					</div>
					</Grid>
				</div>
			</Grid>
		</div>
	);
}

export default HarvestBatchesForm;
