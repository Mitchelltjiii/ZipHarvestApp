import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID, reloadExportRecords, getUniqueIDCount,getDryRooms,getPossiblePlantCount}) {
	
	let uniqueIDCount = getUniqueIDCount();

	let possiblePlantCount = getPossiblePlantCount();

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
					<Grid
					container
					direction="column"
  					justifyContent="center"
					alignItems="center"
					>
						<div style={{fontSize:"16px",backgroundColor:"#59981A"}}>{uniqueIDCount}/{possiblePlantCount}</div>
						<div style={{fontSize:"10px"}}>Unique tags exported this month</div>
					</Grid>
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
