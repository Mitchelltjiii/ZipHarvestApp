import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';

function ManagePlantsForm({getHarvestBatches, getHarvestRecords, getPlants}) {

	return (
		<div id="harvest-batches-form">
			<Grid
				container
				direction="row"
  				justify="center"
				alignItems="center"
			>
                <div>ManagePlants</div>
			</Grid>
		</div>
	);
}

//			<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants}></HBTable>


export default ManagePlantsForm;
