import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID, reloadExportRecords, getUniqueIDCount,getDryRooms,getPossiblePlantCount}) {
	
	let uniqueIDCount = getUniqueIDCount();

	let possiblePlantCount = getPossiblePlantCount();

	let color = "#00FF00";

	let percent = uniqueIDCount/possiblePlantCount;

	if(percent >.5 && percent <.75){
		color = "#ECF87F";
	}else if(percent >=.75 && percent <.9){
		color = "#DBA40E";
	}else if(percent >=.9){
		color = "#CB6300";
	}

	console.log("Uid/possible plantcount: " + uniqueIDCount/possiblePlantCount)

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
						<div title="Unique tags exported this month" style={{fontSize:"20px",margin:"auto",textAlign:"center",backgroundColor:color,width:"100px",height:"30px",paddingTop:"2px",borderRadius:"5px"}}>{uniqueIDCount}/{possiblePlantCount}</div>
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
