import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({getHarvestBatches, getHarvestRecords, getPlants, userID}) {

	return (
		<div id="harvest-batches-form">
			<Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			>
			<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants}></HBTable>
			</Grid>
		</div>
	);
}

export default HarvestBatchesForm;
