import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function HarvestBatchesForm({harvestBatches, harvestedPlants}) {

	return (
		<div id="harvest-batches-form">
			<Grid
				container
				direction="row"
  				justify="center"
				alignItems="center"
			>
			<HBTable harvestBatches={harvestBatches} harvestedPlants={harvestedPlants}></HBTable>

			</Grid>
		</div>
	);
}

export default HarvestBatchesForm;
