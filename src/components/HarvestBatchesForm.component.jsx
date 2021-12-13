import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID, reloadExportRecords, getUniqueIDCount,getDryRooms,getPossiblePlantCount}) {
	
	let uniqueIDCount = getUniqueIDCount();

	let possiblePlantCount = getPossiblePlantCount();

	let color = "#59981A";

	console.log("Uid/possibleplantcount: " + uniqueIDCount/possiblePlantCount)
	console.log("2500/Possibleplantcount: " + 2500/possiblePlantCount);

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
						<div title="Unique tags exported this month" style={{margin:"auto",border:"thin solid #000000",backgroundColor:"#59981A",width:"150px",height:"40px",borderRadius:"5px"}}>
							<div style={{fontSize:"20px",backgroundColor:"#59981A"}}>{uniqueIDCount}/{possiblePlantCount}</div>
						</div>
						
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
