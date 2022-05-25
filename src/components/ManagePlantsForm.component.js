import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import PlantTable from './PlantTable.component';
import ImportPlantsButton from './ImportPlantsButton.component';
import RemoveFromAvailablePlantsButton from './RemoveFromAvailablePlantsButton.component';
import TextField from '@material-ui/core/TextField';
import * as XLSX from 'xlsx';
import {isMobile} from 'react-device-detect';


function ManagePlantsForm({getPlants, refreshOuter, userID, setPlants, setNewPlantID,reloadPlants,showHints,
	setGrantFreeMonthCode,getFreeMonthGrantedVisible,setFreeMonthGrantedVisible}) {
    const [uploadList,setUploadList] = React.useState([]);
    const [importing,setImporting] = React.useState(false);
	const [selectedToDelete,setSelectedToDelete] = React.useState([]);
	const [searchText,setSearchText] = React.useState('');
	let removeList = selectedToDelete;
	let freeMonthGrantedVisible = getFreeMonthGrantedVisible();
	const [selectedFile, setSelectedFile] = React.useState('');
	const [plantList, setPlantList] = React.useState([]);

	console.log("Plantlist empty: " + (JSON.stringify(plantList) === "[]"));


	let entryTutorialWidth = "500px";
  	let entryTutorialFontSize = "17px";

  	if(isMobile){
		entryTutorialWidth = "340px";
		entryTutorialFontSize = "15px";
  	}

	function getPlantList(){
		return plantList;
	}
	
	if(JSON.stringify(selectedFile) !== '""' && JSON.stringify(plantList) === "[]"){
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
		let fileSplit = data.split(/\r?\n/);
		let rowCount = 0;
		let pList = [];
		for(const val of fileSplit){
		  let rowSplit = val.split(",");
		  if(rowCount > 0 && rowCount < (fileSplit.length-2)){
			  if(rowSplit[0] !== "" && rowSplit[1] !== ""){
				pList.push(rowSplit[0] + "," + rowSplit[1]);
			  }
		  }
		  rowCount++;
		}
			setPlantList(pList);
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
	}

	const getDeletePlantSelected = (tag) => {
		for(const val of removeList){
			if(tag === val.substring(val.length-5)){
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

	function closeFreeMonthGranted(){
		setFreeMonthGrantedVisible(false);
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
	}

	const handleCancel = () => {
		setImporting(false);
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

	const hiddenFileInput = React.useRef(null);

	const handleClickInput = event => {
		hiddenFileInput.current.click();
	  };

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
				<div>
                {importing
                ? <div>
					<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
					>
						<Grid
						container
						direction="row"
  						justify="center"
						alignItems="center"
						style={{marginBottom:"10px"}}
						>
						<Button style={{marginLeft:"10px",marginRight:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickInput}>Choose File</Button>
						{(selectedFile !== "") ? <div>{selectedFile.name}</div> : null}
						<input
        			  		type="file"
          					onChange={(e) => {
								  setSelectedFile(e.target.files[0]);
								  refreshOuter();
								}}
							style={{display: 'none'}}
							ref={hiddenFileInput}
        				/>
						</Grid>
						<Grid
						container
						direction="row"
  						justify="center"
						alignItems="center"
						>
						<ImportPlantsButton getPlants={getPlants} getPlantList={getPlantList} setPlants={setPlants} setPlantList={setPlantList}
							setImporting={setImporting} setSelectedFile={setSelectedFile} setNewPlantID={setNewPlantID} userID={userID} 
							refreshOuter={refreshOuter} reloadPlants={reloadPlants} setFreeMonthGrantedVisible={setFreeMonthGrantedVisible}
							setGrantFreeMonthCode={setGrantFreeMonthCode}></ImportPlantsButton>
						<Button style={{marginLeft:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancel}>Cancel</Button>
						</Grid>
					</Grid>
					</div>
                : <div>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					wrap="nowrap"
					>
						<TextField onChange={handleSearchFieldChange} value={searchText} label="Search" style={{width:"100px"}}></TextField>
					<Button style={{marginRight:"10px",marginLeft:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetReady}>Import File</Button>
					<RemoveFromAvailablePlantsButton getPlants={getPlants} removeList={removeList} setPlants={setPlants} setRemoveList={setSelectedToDelete}
							setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></RemoveFromAvailablePlantsButton>
					{showHints ? <div class="tooltip">?
  					          <span class="tooltiptext">Before harvesting, download your flowering plants from your compliance software as an XLSX file. Then import the file here. To remove plants, select the boxes and click delete.</span>
				            </div>  : null}
					</Grid>
					</div>
			    }
				</div>
				<div>
					{uploadNamesList.map((name,index) => (
            			<UploadTab name={name}></UploadTab>
          			))}
				</div>

				<div>
				{(freeMonthGrantedVisible && userID.includes("Mitchell") && JSON.stringify(plantList) !== "[]") ? <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:entryTutorialWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				
				<div style={{margin:"5px",textAlign:"center",fontSize:entryTutorialFontSize}}>Your plants have been imported and your friend has been granted one month free! Follow the tutorial to finish all steps before harvesting.</div>
				<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{width:"100%"}}
			>
			<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={closeFreeMonthGranted}>Close</Button>

				</Grid>
				</Grid> : null}
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
export default ManagePlantsForm;
//<CSVReader1 setPlantList={setPlantList}></CSVReader1>
