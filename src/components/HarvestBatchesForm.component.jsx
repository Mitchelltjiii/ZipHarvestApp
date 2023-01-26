import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';
import {isMobile} from 'react-device-detect';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID, reloadExportRecords, getUniqueIDCount,getDryRooms,
	getPossiblePlantCount,getFreeTrial}) {


	let freeTrial = getFreeTrial();

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

	


	

	
	return (
		<div id="harvest-batches-form" style={{margin:"auto"}}>
			<Grid
				container
				direction="column"
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
					<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants} userID={userID} reloadExportRecords={reloadExportRecords} getUniqueIDCount={getUniqueIDCount} getDryRooms={getDryRooms}></HBTable>
					</div>
					</Grid>
				</div>
			</Grid>
		</div>
	);
}

export default HarvestBatchesForm;

/*{(JSON.parse(getHarvestBatches()).length>0 && !freeTrial) ? <div style={{margin:"auto"}}>
					<Grid
					container
					direction="row"
  					justifyContent="center"
					alignItems="center"
					>
						<div title="Unique tags exported this month" style={{fontSize:"20px",margin:"auto",textAlign:"center",backgroundColor:color,width:"100px",height:"30px",paddingTop:"2px",borderRadius:"5px", marginRight: "5px"}}>{uniqueIDCount}/{possiblePlantCount}</div>
						<div class="tooltip">?
  					          <span class="tooltiptext">Export your harvest batches as CSV files for upload to your compliance software. Before you export, you must create dry rooms in the Manage Dry Rooms section.</span>
				            </div>
					</Grid> 
					</div> : null} */