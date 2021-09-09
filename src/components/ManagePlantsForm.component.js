import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import CSVReader1 from './CsvReader1';
import PlantTable from './PlantTable.component';
import ImportPlantsButton from './ImportPlantsButton.component';

function ManagePlantsForm({getHarvestBatches, getHarvestRecords, getPlants, refreshOuter, userID, setPlants, setNewPlantID}) {

    const [uploadList,setUploadList] = React.useState([]);
    const [importing,setImporting] = React.useState(false);
	const [deleteAllSelected,setDeleteAllSelected] = React.useState(false);

    console.log("Upload List after refresh: " + JSON.stringify(uploadList));

	let uploadNamesList = [];
	for(const val of uploadList){
		console.log('UploadList[m]: ' + val);
		let splitList = val.split(",");
		console.log("SplitList[0]: " + splitList[0]);
		uploadNamesList.push(splitList[0]);
	}

	const toggleDeleteAllSelected = () => {
		setDeleteAllSelected(!deleteAllSelected);
	}

	const getDeleteAllSelected = () => {
		return deleteAllSelected;
	}

    const handleGetReady = () => {
		setImporting(true);
        refreshOuter();
	  }

	const handleDelete = () => {
        refreshOuter();
	  }

	const handleCancel = () => {
		setImporting(false);
        refreshOuter();
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

    const ImportTab = () => {
        return(
            <div>
                {importing
                ? <div>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					>
						<div>
							<CSVReader1 setPlantList={setPlantList}></CSVReader1>
						</div>
						<div>
							<ImportPlantsButton getPlants={getPlants} uploadList={uploadList} setPlants={setPlants} setUploadList={setUploadList}
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter}></ImportPlantsButton>
						</div>
						<div>
							<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancel}  style={{width: "120px"}}>Cancel</Button>
						</div>
					</Grid>
					</div>
                : <div>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					>
					<div>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetReady}  style={{width: "120px"}}>+</Button>
					</div>
					<div>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleDelete}  style={{width: "120px"}}>-</Button>
               		</div>
					</Grid>
					</div>
			    }
				</div>
        )
    }

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
				<ImportTab></ImportTab>
				<div>
					{uploadNamesList.map((name,index) => (
            			<UploadTab name={name}></UploadTab>
          			))}
				</div>
                <div>
                    <PlantTable getPlants={getPlants} toggleDeleteAllSelected={toggleDeleteAllSelected} deleteAllSelected={getDeleteAllSelected}></PlantTable>
                </div>
				</Grid>		  
		  </div>
			</Grid>
		</div>
	);
}

//			


export default ManagePlantsForm;
