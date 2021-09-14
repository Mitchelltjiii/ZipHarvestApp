import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HBTable from './HBTable.component';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import CSVReader1 from './CsvReader1';
import PlantTable from './PlantTable.component';
import ImportPlantsButton from './ImportPlantsButton.component';
import RemoveFromAvailablePlants from './RemoveFromAvailablePlantsButton.component';
import TextField from '@material-ui/core/TextField';
function ManagePlantsForm({getHarvestBatches, getHarvestRecords, getPlants, refreshOuter, userID, setPlants, setNewPlantID,reloadPlants}) {

    const [uploadList,setUploadList] = React.useState([]);
    const [importing,setImporting] = React.useState(false);
	const [selectedToDelete,setSelectedToDelete] = React.useState([]);
	const [searchText,setSearchText] = React.useState("");
	let removeList = selectedToDelete;

	let plantsWithSearch = getPlantsWithSearch();

    console.log("Upload List after refresh: " + JSON.stringify(uploadList));

	let uploadNamesList = [];
	for(const val of uploadList){
		console.log('UploadList[m]: ' + val);
		let splitList = val.split(",");
		console.log("SplitList[0]: " + splitList[0]);
		uploadNamesList.push(splitList[0]);
	}

	const toggleDeleteAllSelected = () => {
		let currPlants = JSON.parse(getPlants());
		
		if(getDeleteAllSelected()){
			console.log("selectedToDelete.length == currPlants.length");
			setSelectedToDelete([]);
		}else{
			console.log("selectedToDelete.length != currPlants.length");
			let newSelectedToDelete = [];
			for (const val of currPlants) {
				if(val.active === 0){
					console.log("Val.tag: " + val.tag);
					newSelectedToDelete.push(val.tag);
				}
			}
			console.log("SelectedToDelete: " + newSelectedToDelete);
		    console.log("SelectedToDelete(STRING): " + JSON.stringify(newSelectedToDelete));
			setSelectedToDelete(newSelectedToDelete);
		}

		console.log("SelectedToDelete: " + selectedToDelete);
		console.log("SelectedToDelete(STRING): " + JSON.stringify(selectedToDelete));
	}

	const toggleDeletePlantSelected = (tag) => {
		console.log("Toggle Delete Plant Selected Tag: " + tag);
		let foundIndex = -1;
		let i = 0;
		for(const val of removeList){
			console.log("Removelist Val: " + val);
			if(tag === val){
				console.log("Tag === Val");
				foundIndex = i;
			}
			i++;
		}

		console.log("Found Index: " + JSON.stringify(foundIndex));

		if(foundIndex != -1){
			removeList.splice(foundIndex,1);
		}else{
			removeList.push(tag);
		}

		console.log("RemoveList After ToggleDeletePlantSelected: " + JSON.stringify(removeList));
		setSelectedToDelete(removeList);
		refreshOuter();
	}

	const getDeletePlantSelected = (tag) => {
		console.log("Get Delete Plant Selected Tag: " + tag);
		for(const val of removeList){
			console.log("Removelist Val: " + val);
			if(tag === val){
				console.log("Tag === Val");
				return true;
			}
		}
		console.log("No Tag Match");

		return false;
	}

	const getDeleteAllSelected = () => {
		if(removeList.length===0){
			return false;
		}
		console.log("Remove List Length: " + removeList.length);
		console.log("CurrPlants Length: " + JSON.parse(getPlants()).length);
		console.log("GetDeleteAllSelected: " + JSON.stringify(removeList.length === JSON.parse(getPlants()).length));
		
		let x = 0;
		for(const val of JSON.parse(getPlants())){
			if(val.active === 0){
				x++;
			}
		}
		return (removeList.length === x);
	}

    const handleGetReady = () => {
		setImporting(true);
       	 refreshOuter();
	  	}

	function getPlantsWithSearch(){
		let plants = JSON.parse(getPlants());
		let plantsWSearch = [];
		console.log("Get Plants With Search");
		console.log("Search Text: " + searchText);

		for(const val of plants){
			console.log("Val: " + JSON.stringify(val));
			if(val.tag.includes(searchText) || val.strain.includes(searchText)){
				plantsWSearch.push(val);
			}
		}
		console.log("Plants With Search: " + JSON.stringify(plantsWSearch));
		return JSON.stringify(plantsWSearch);
	}

	const handleSearchFieldChange = (event) => {
		setSearchText(event.target.value);
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
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></ImportPlantsButton>
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
							<TextField onChange={handleSearchFieldChange} value={searchText} style={{width:"100px"}}></TextField>
						</div>
					<div>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetReady}  style={{width: "120px"}}>Import Files</Button>
					</div>
					<div>
					<RemoveFromAvailablePlants getPlants={getPlants} removeList={removeList} setPlants={setPlants} setRemoveList={setSelectedToDelete}
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></RemoveFromAvailablePlants>
						               		</div>
					</Grid>
					</div>
			    }
				</div>
        )
    }

	return (
		<div id="manage-plants-form">
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
                    <PlantTable plantsWithSearch={plantsWithSearch} toggleDeleteAllSelected={toggleDeleteAllSelected} getDeleteAllSelected={getDeleteAllSelected} 
					toggleDeletePlantSelected={toggleDeletePlantSelected} getDeletePlantSelected={getDeletePlantSelected}></PlantTable>
                </div>
				</Grid>		  
		  </div>
			</Grid>
		</div>
	);
}

//			


export default ManagePlantsForm;
