import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';

function ManagePlantsForm({getHarvestBatches, getHarvestRecords, getPlants}) {

    const [uploadList,setUploadList] = React.useState([]);

    console.log("Upload List after refresh: " + JSON.stringify(uploadList));

	let uploadNamesList = [];
	for(const val of uploadList){
		console.log('UploadList[m]: ' + val);
		let splitList = val.split(",");
		console.log("SplitList[0]: " + splitList[0]);
		uploadNamesList.push(splitList[0]);
	}

    const setPlantList = (fn,pl) => {
		let uList = uploadList;
		uList.push(fn + "," + pl);
		console.log("Upload List: " + JSON.stringify(uList));
		setUploadList(uList);
		refreshOuter();
	  }

    function removeUploadQueueButton(name){
		console.log("removeUploadQueueButton--");
		let index = 0;
		let foundIndex = -1;
		for(let val of uploadList){
			let splitList = val.split(",");
			console.log("SplitList[0]: " + splitList[0]);
			if(splitList[0]==name){
				foundIndex = index;
				console.log("Found Index: " + foundIndex);
			}
			index++;
		}

		if(foundIndex != -1){
			console.log("Found Index != -1");
			let uList = uploadList;
			uList.splice(foundIndex,1);
			console.log("Upload List: " + JSON.stringify(uList));
			setUploadList(uList);
			refreshOuter();	
		}
	}

    const UploadTab = ({name}) => {
        return (
          <div className="full tr">
              <Grid
                  container
                  direction="row"
                    justify="center"
                  alignItems="center"
              >
              <div>
                  {name}
              </div>
              <RemoveUploadQueueItemButton name={name} removeUploadQueueButton={removeUploadQueueButton}></RemoveUploadQueueItemButton>
              </Grid>
          </div>
        );
    };

	return (
		<div id="harvest-batches-form">
			<Grid
				container
				direction="row"
  				justify="center"
				alignItems="center"
			>
                <div className="full tr">
			    <Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
				<div>
					<CSVReader1 setPlantList={setPlantList}></CSVReader1>
				</div>
				<div>
					{uploadNamesList.map((name,index) => (
            			<UploadTab name={name}></UploadTab>
          			))}
				</div>
				</Grid>		  
		  </div>
			</Grid>
		</div>
	);
}

//			<HBTable getHarvestBatches={getHarvestBatches} getHarvestRecords={getHarvestRecords} getPlants={getPlants}></HBTable>


export default ManagePlantsForm;
