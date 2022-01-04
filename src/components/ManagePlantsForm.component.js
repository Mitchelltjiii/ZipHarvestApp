import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import CSVReader1 from './CsvReader1';
import PlantTable from './PlantTable.component';
import ImportPlantsButton from './ImportPlantsButton.component';
import RemoveFromAvailablePlants from './RemoveFromAvailablePlantsButton.component';
import TextField from '@material-ui/core/TextField';
import * as XLSX from 'xlsx';


function ManagePlantsForm({getPlants, refreshOuter, userID, setPlants, setNewPlantID,reloadPlants}) {

    const [uploadList,setUploadList] = React.useState([]);
    const [importing,setImporting] = React.useState(false);
	const [selectedToDelete,setSelectedToDelete] = React.useState([]);
	const [searchText,setSearchText] = React.useState('');
	let removeList = selectedToDelete;
	const [autoFoc,setAutoFoc] = React.useState(false);
	const [selectedFile, setSelectedFile] = React.useState(null);

	if(JSON.stringify(selectedFile) !== '""'){
		const reader = new FileReader();
		reader.onload = (evt) => { // evt = on_file_select event
		/* Parse data */
		const bstr = evt.target.result;
		const wb = XLSX.read(bstr, {type:'binary'});
		/* Get first worksheet */
		const wsname = wb.SheetNames[0];
		const ws = wb.Sheets[wsname];
		/* Convert array of arrays */
		const data = XLSX.utils.sheet_to_csv(ws, {header:1});
		/* Update state */
		console.log("Data>>>"+data);
		let fileSplit = data.split(/\r?\n/);
		let x = 0;
		let plantList = [];
		for(const val of fileSplit){
		  let rowSplit = val.split(",");
		  if(x > 0 && x < (fileSplit.length-2)){
			console.log(val);
			plantList.push(rowSplit[0] + "," + rowSplit[1]);
		  }
		  x++;
		}
			console.log("Plantlist: " + JSON.stringify(plantList));
			setPlantList(selectedFile.name,plantList);
		};
		reader.readAsBinaryString(selectedFile);
	}

	let plantsWithSearch = getPlantsWithSearch();

	let uploadNamesList = [];
	for(const val of uploadList){
		let splitList = val.split(",");
		uploadNamesList.push(splitList[0]);
	}

	const toggleDeleteAllSelected = () => {
		let currPlants = JSON.parse(getPlantsWithSearch());
		
		if(getDeleteAllSelected()){
			setSelectedToDelete([]);
		}else{
			let newSelectedToDelete = [];
			for (const val of currPlants) {
				if(val.active === 0){
					newSelectedToDelete.push(val.tag);
				}
			}
			setSelectedToDelete(newSelectedToDelete);
		}
		setAutoFoc(false);
	}

	const toggleDeletePlantSelected = (tag) => {
		let foundIndex = -1;
		let i = 0;
		for(const val of removeList){
			if(tag === val){
				foundIndex = i;
			}
			i++;
		}

		if(foundIndex !== -1){
			removeList.splice(foundIndex,1);
		}else{
			removeList.push(tag);
		}

		setSelectedToDelete(removeList);
		refreshOuter();
		setAutoFoc(false);
	}

	const getDeletePlantSelected = (tag) => {
		for(const val of removeList){
			if(tag === val){
				return true;
			}
		}

		return false;
	}

	const getDeleteAllSelected = () => {
		if(removeList.length===0){
			return false;
		}
		let x = 0;
		for(const val of JSON.parse(getPlantsWithSearch())){
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

		for(const val of plants){
			if(val.tag.toLowerCase().includes(searchText.toLowerCase()) || val.strain.toLowerCase().includes(searchText.toLowerCase())){
				plantsWSearch.push(val);
			}
		}
		return JSON.stringify(plantsWSearch);
	}

	const handleSearchFieldChange = (event) => {
		setSearchText(event.target.value);
		setSelectedToDelete([]);
		setAutoFoc(true);
	}

	const handleCancel = () => {
		setImporting(false);
        refreshOuter();
	  }

    
    const setPlantList = (fn,pl) => {
		let uList = uploadList;
		uList.push(fn + "," + pl);
		setUploadList(uList);
		refreshOuter();
	  }

    function removeUploadQueueButton(name){
		let index = 0;
		let foundIndex = -1;
		for(let val of uploadList){
			let splitList = val.split(",");
			if(splitList[0]===name){
				foundIndex = index;
			}
			index++;
		}

		if(foundIndex !== -1){
			let uList = uploadList;
			uList.splice(foundIndex,1);
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
						<input
        			  		type="file"
          					onChange={(e) => setSelectedFile(e.target.files[0])}
        				/>
						<div style={{minWidth:"10px",maxWidth:"10px"}}></div>
						<ImportPlantsButton getPlants={getPlants} uploadList={uploadList} setPlants={setPlants} setUploadList={setUploadList}
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></ImportPlantsButton>
						<Button style={{marginLeft:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancel}>Cancel</Button>
					</Grid>
					</div>
                : <div>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					>
						<TextField autoFocus={autoFoc} onChange={handleSearchFieldChange} value={searchText} label="Search" style={{width:"130px"}}></TextField>
					<Button style={{marginRight:"10px",marginLeft:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetReady}>Import Files</Button>
					<RemoveFromAvailablePlants getPlants={getPlants} removeList={removeList} setPlants={setPlants} setRemoveList={setSelectedToDelete}
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></RemoveFromAvailablePlants>
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

//							<CSVReader1 setPlantList={setPlantList}></CSVReader1>
		


export default ManagePlantsForm;
