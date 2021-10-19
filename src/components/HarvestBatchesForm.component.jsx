import React from 'react';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID}) {

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
					<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants}></HBTable>
					</div>
					</Grid>
				</div>
			</Grid>
		</div>
	);
}

export default HarvestBatchesForm;
