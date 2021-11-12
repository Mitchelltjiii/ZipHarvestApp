import React, {useRef } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import HarvestPlantButton from './HarvestPlantButton.component';
import AddHarvestBatchButton from './AddHarvestBatchButton.component';
import EditButton from './EditButton.component';
import TableWrapper from './TableWrapper.component';
import Dictaphone from './Dictaphone.component';
import LastHarvested from './LastHarvested.component';
import edit from '../edit.png';
import SaveHarvestDateButton from './SaveHarvestDateButton.component';


function HarvestForm({getHarvestBatches,setHarvestBatches,getPlants,setPlants,getHarvestRecords,setHarvestRecords,resetHarvestBatches, 
	resetAll, currentHarvest, setNewHBID, getCurrentHarvestID, refreshOuter, setNewHarvestRecordID, setNewPlantID, userID, setAll, 
	reloadPlants, reloadPlantsAndHarvestRecords, reloadHarvestBatches, reloadHarvestRecords}) { 

	function HarvestBatch(name,type,date,userID){
		this.name = name;
		this.type = type;
		this.date = date;
		this.userID = userID;
	}

	function Plant(userID,strain,tag,active){
		this.userID = userID;
		this.strain = strain;
		this.tag = tag;
		this.active = active;
	}

	function HarvestRecord(itemID,tag,weight,unit,batchName,userID){
		this.itemID = itemID;
		this.tag = tag;
		this.weight = weight;
		this.unit = unit;
		this.batchName = batchName;
		this.userID = userID;
	}

	let hbOptionsList = ["Add New Harvest Batch"];
	let currentHarvestRecord = new HarvestRecord('','','','','','');

	let addedHB = new HarvestBatch("","","",userID);

	console.log("ENTER HARVESTFORM, CURRENT HARVEST: " + JSON.stringify(currentHarvest));

	console.log("ENTER HARVESTFORM, CURRENT HARVESTBATCHES: " + getHarvestBatches());

	console.log("ENTER HARVESTFORM, CURRENT PLANTMAP: " + getPlants());

	console.log("ENTER HARVESTFORM, CURRENT HarvestRecords: " + getHarvestRecords());

	var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#FFE9EF",
                    "Yellow": "#F6BB42",
					"Offwhite": "#f3f6f4"
	};

	const [day, setDay] = React.useState('today');

	const [harvestType, setHarvestType] = React.useState('harvest');

	const [searchTag, setSearchTag] = React.useState('');

	const [searchParam, setSearchParam] = React.useState('Contains');

	const [changeHBHidden, setChangeHBHidden] = React.useState(false);

	const [selectedTag, setSelectedTag] = React.useState('');

	const [weight, setWeight] = React.useState('');

	const [unit, setUnit] = React.useState('lbs');

	const [branchValue, setBranchValue] = React.useState('');

	const [editMode, setEditMode] = React.useState(false);

	const [removedPlantID, setRemovedPlantID] = React.useState("");

	const [tableVisible,setTableVisible] = React.useState(true);

	const [edittingHarvestDate, setEdittingHarvestDate] = React.useState(false);

	const [errorMessage, setErrorMessage] = React.useState('');

	let errorMessageText = errorMessage;

	let isEdittingHarvestDate = edittingHarvestDate;

	let tableIsVisible = tableVisible;

	let showTableText = "Show Table";
	if(tableIsVisible){
		showTableText = "Hide Table";
	}


	let searchForList = [];
	let strain = '';

	const [lastHarvestedPlant, setLastHarvestedPlant] = React.useState([]);

	console.log("Last Harvested Plant At Load: " + JSON.stringify(lastHarvestedPlant));

	const nextPlantRef = useRef();

	const ErrorMessageLabel = () => {
		return(
			<div style={{backgroundColor:bgColors.Red,padding:"10px"}}>{errorMessageText}</div>
		)
	}

	console.log("Create Search for List");
	for (const val of JSON.parse(getPlants())) {
		console.log("Val Search For: " + JSON.stringify(val));
		console.log("Val.tag: " + val.tag);
		if(getPlant(val.tag) !== undefined){
			strain = getPlant(val.tag).strain;
		}
		console.log("Strain: " + JSON.stringify(strain));
		if(!searchForList.includes(strain)){
			console.log("Push: " + strain);
			searchForList.push(strain);
		}
	}
	searchForList = searchForList.sort(function (a, b) {
		return a.localeCompare(b); //using String.prototype.localCompare()
	  });
	searchForList.unshift("All Strains");

	const [searchStrain, setSearchStrain] = React.useState('All Strains');

	let selHB = '';

	console.log("JSON.stringify-currentharvest: " + JSON.stringify(currentHarvest));
	if((currentHarvest !== undefined) && (JSON.stringify(currentHarvest)!== "[]")){
		selHB = currentHarvest.name;
	}

	const [selectedHB, setSelectedHB] = React.useState(selHB);

	
	const handleSelectHB = (e) => {
		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag("");	
		setErrorMessage("");
		setEditMode(false);
		setLastHarvestedPlant([])	
		setSelectedHB(e.target.value);
	};

	function getHarvestBatch(selectedHB){
		console.log("Enter GetHarvestBatch");
		console.log("Get Harvest Batches: " + getHarvestBatches());

		try{
			for(let val of JSON.parse(getHarvestBatches())) {
				console.log("VAL(STRING): " + JSON.stringify(val));
				console.log("Val.name: " + val.name);
				if(val.name === selectedHB){
					console.log("GRABBED");
					return new HarvestBatch(val.name,val.type,val.date,val.userID);
				}
			}
		}catch(excc){
			
		}
		
		console.log("Exit GetHarvestBatch");

	}

	function setCurrentHarvestDate(){
		let monthZero = "";
		if(monthValue<10){
			monthZero = "0";
		}
		let dayZero = "";
		if(dayValue<10){
			dayZero = "0";
		}
		let newDate = monthZero+monthValue+"/"+dayZero+dayValue+"/"+yearValue;
		currentHarvest.date = newDate;
		console.log("New Date: " + newDate);
	}

	function getPlant(plantTag){
		console.log("GET PLANT - Tag: " + plantTag);
		for(let val of JSON.parse(getPlants())) {
			if(val.tag === plantTag){
				console.log("GRABBED PLANT");
				return new Plant(val.userID,val.strain,val.tag,val.active);
			}
		}
	}

	function removePlant(plantTag){
		console.log("Remove Plant: " + plantTag);
		console.log("Current Harvest: " + currentHarvest);
		console.log("Current Harvest(STRING): " + JSON.stringify(currentHarvest));

		let x = 0;
		let foundX = -1;
		let replaceEntry = "";
		for(let val of JSON.parse(getPlants())) {
			if(val.tag === plantTag){
				console.log("FOUND X: " + x);
				foundX = x;
				replaceEntry = val;
				if(currentHarvest.type === 0){
					replaceEntry.active = 1;
				}
			}
			x++;
		}

		console.log("Plant Map Before Remove Plant: " + getPlants());
		if(foundX !== -1){
			setPlants(JSON.stringify(JSON.parse(getPlants()).splice(foundX,1,replaceEntry)));
		}
		console.log("Plant Map AFTER Remove Plant: " + getPlants());
	}
	
	currentHarvest = getHarvestBatch(selectedHB);
	console.log("AFTER ALL THAT THE HARVESTBATCHES: " + getHarvestBatches());

  	const handleDayChange = (event) => {
    	setDay(event.target.value);
	  };

	const handleRevertChanges = () => {
		revertChanges();
	  };  

	function revertChanges(){
    	console.log("revert changes");
		resetHarvestForm(true);
	}

	

	function editHarvestDate(){
		console.log("Edit Harvest Date");
		setEdittingHarvestDate(true);
		let monthVal = parseInt(currentHarvest.date.substring(0,2),10)
		setMonthValue(monthVal);
		let dayVal = parseInt(currentHarvest.date.substring(3,5),10);
		console.log("Day val: " + dayVal);
		setDayValue(dayVal);
		let yearVal = parseInt(currentHarvest.date.substring(6,10),10);
		console.log("year val: " + yearVal);
		setYearValue(yearVal);
		refreshOuter();
	}

	function saveHarvestDate(){
		console.log("Save Harvest Date");
		setEdittingHarvestDate(false);
		reloadHarvestBatches(currentHarvest);
		refreshOuter();
	}

	const handleEditHarvestDate = () => {
    	editHarvestDate();
	  };


	const handleHarvestTypeChange = (event) => {
    	setHarvestType(event.target.value);
	  };

	const handleSearchTag = (event) => {
		setSearchTag(event.target.value);
	  };

	const handleSelectedTag = (event) => {
		setSelectedTag(event.target.value);
	  };

	const handleWeight = (event) => {
		setWeight(event.target.value);
	  };

	const handleUnitSelect = (event) => {
		setUnit(event.target.value);
	  };

	const handleSearchParamSelect = (event) => {
		setSearchParam(event.target.value);
	  };

	const handleChangeSearchForStrainSelect = (event) => {
		setSearchStrain(event.target.value);
	  };  

	let dateText = "Harvest Date";

	try{
		dateText = currentHarvest.date;
	}catch(errorror){

	}

	let timeLimit = 10000;

	let unitList = ["lbs","g"];

	let searchOptionsList = ["Contains","Ends With"];
    
	for(let val of JSON.parse(getHarvestBatches())) {
		console.log("XX-VAL[name]: " + val.name);
		if(!hbOptionsList.includes(val.name)){
			hbOptionsList.push(val.name);
		}
	  }

	console.log("HBOPTIONSLIST: " + hbOptionsList);

		 

	let tagList = searchTag ? commitSearch(): ["Search For Results"];

	console.log("ON REFRESH SELECTED TAG: " + selectedTag);
	let currSelectedTag = selectedTag;
	if(tagList.length>0 && selectedTag === ''){
		currSelectedTag = tagList[0];
	}
	console.log("CURRSELECTED TAG AFTER TRANSFORM: " + currSelectedTag);

	console.log("ON REFRESH CURRHARVEST: " + currentHarvest);
	console.log("ON REFRESH CURRHARVEST(STRING): " + JSON.stringify(currentHarvest));



	let currWeightChanges = [];

	function setWeightChanges(currentWeightChanges){
		currWeightChanges = currentWeightChanges;
		console.log("Set Weight Changes in HarvestForm: " + JSON.stringify(currWeightChanges));
	}

	function getWeightChanges(){
		return currWeightChanges;
	}

	let currHidePlants = [];

	function setHidePlants(currentHidePlants){
		currHidePlants = currentHidePlants;
		console.log("Set Hide Plants in HarvestForm: " + JSON.stringify(currHidePlants));
	}

	let changeHBHiddenNow = changeHBHidden;

	if(selectedHB==="Add New Harvest Batch"){
		changeHBHiddenNow=true;
	}

	let hbInfoTabsHiddenNow = true;

	if(!(currentHarvest === undefined || currentHarvest.name === '')){
		hbInfoTabsHiddenNow=false;
	}

	let harvestTypeLabelText = "Harvest";
	if(!(currentHarvest === undefined || currentHarvest.name === '')){
		console.log("Currenharvest.type: " + currentHarvest.type);
		if(currentHarvest.type===1){
			harvestTypeLabelText = "Manicure";
		}
	}

	console.log("Harvest Type Text: " + harvestTypeLabelText);

  const handleMonthSelect = (event) => {
		setMonthValue(event.target.value);
	  };

    const handleDaySelect = (event) => {
      setDayValue(event.target.value);
      };

      const handleYearSelect = (event) => {
        setYearValue(event.target.value);
        };

  const [monthValue, setMonthValue] = React.useState(1);
  const [dayValue, setDayValue] = React.useState(1);
  const [yearValue, setYearValue] = React.useState(2021);

  let monthList = [];
  for(let i = 1; i < 13; i++){
    monthList.push("" + i);
  }

  let dayList = [];
  let dayNumber = 31;
  if((monthValue===4)||(monthValue===6)||(monthValue===9)||(monthValue===11)){
    dayNumber = 30;
  }else if(monthValue===2){
    if((yearValue%4)===0){
      dayNumber=29;
    }else{
      dayNumber=28;
    }
  }
  if(dayValue>dayNumber){
    setDayValue(dayNumber);
  }
  console.log("Day Number: " + dayNumber);
  for(let i = 1; i <= dayNumber; i++){
    dayList.push("" + i);
  }

  let yearList = [];
  yearList.push("2021");
  yearList.push("2022");
  yearList.push("2023");
  yearList.push("2024");
  yearList.push("2025");
  yearList.push("2026");
  yearList.push("2027");
  yearList.push("2028");
  yearList.push("2029");
  yearList.push("2030");

	function searchTagFromSpeech(searchText){
		let fixedSearch = searchText;
		    while(fixedSearch.includes(" to ")){
			    console.log("SearchText before Fix: " + fixedSearch);
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to ")) + 2 + fixedSearch.substring(fixedSearch.indexOf(" to ")+4);
			    console.log("SearchText after Fix: " + fixedSearch);
		}
		console.log("SearchText after final Fix: " + fixedSearch);

		setSearchTag(fixedSearch);
	}

	function enterWeightFromSpeech(weight,unit){
		setWeight(weight);
		if(unit === 0){
			setUnit('lbs');
		}else if(unit === 1){
			setUnit('g');
		}
	}

	function nextPlantFromSpeech(){
		nextPlantRef.current.click();
	}

	function voiceCommand(text){
		console.log("Voice Command in HarvestForm: " + text);
	}

	console.log("HB Info Tabs Hidden Now: " + hbInfoTabsHiddenNow);

	function commitSearch(){
		let newTagList = [];
		let plantTags = [];

		console.log("Commit Search!!");

		for (const val of JSON.parse(getPlants())) {
			if(val.active === 0){
				plantTags.push(val.tag);
			}
		}
		console.log("Commit Search... PlantTags Size:" + plantTags.length);

		if(searchParam==="Contains"){
			for(const tag of plantTags){
				let p = getPlant(tag);
				if((p!==undefined)&&(p.tag.includes(searchTag))&&(!p.harvested)){
					if((searchStrain === 'All Strains') || (searchStrain === p.strain)){
						newTagList.push(p.tag + " | " + p.strain);
					}
				}
			}
		}else if(searchParam==="Ends With"){
			for(const tag of plantTags){
				let p = getPlant(tag);
				if((p!==undefined)&&(p.tag.substring(p.tag.length-searchTag.length)===(searchTag))&&(!p.harvested)){
					if((searchStrain === 'All Strains' )|| (searchStrain === p.strain)){
						newTagList.push(p.tag + " | " + p.strain);
					}
				}
			}
		}

		return newTagList; 
	}

	function reloadHarvestBatchesFromAddHB(){
		reloadHarvestBatches(currentHarvest)
	}

	function addNewHB(){
		let hbName = document.getElementById("changeHBField").value;
		if(hbName !== ""){
			let hbDate = getTodayStr();
		if(day==='yesterday'){
			hbDate=getYesterdayStr();
		}

		let harvType = 0;
		if(harvestType === "manicure"){
			harvType = 1;
		}

		addedHB = new HarvestBatch(hbName,harvType,hbDate,userID);

		setSelectedHB(hbName);
		setChangeHBHidden(false);
		setErrorMessage("");
		return true;
		}
		return false;
	}

	const handleCancelNewHB = (event) => {
		setChangeHBHidden(false);
		setSelectedHB("");
	};

	const handleAddBranch = (event) => {
		addBranch();
	  };

	const handleShowTable = (event) => {
		showTable();
	  };

	function showTable(){
		console.log("Show Table");
		setTableVisible(!tableIsVisible);
		resetHarvestForm(false);
	}

	function addBranch(){
		if(isNumeric(weight)){
			if(branchValue===undefined || branchValue.length===0){
				setBranchValue(" + " + weight);
			}else{
				setBranchValue(branchValue + " + " + weight);
			}
			setWeight("");
		}

	}

	let editNow = editMode;

	
	function getBranchWeight(){
		let textSplit = branchValue;

		if(textSplit.substring(0,1)==="+"){
			textSplit = textSplit.substring(1);
		}

		textSplit = textSplit.split("+");


		let branchWeight = 0.0;
		textSplit.forEach((element) => {
			if(element!==""){
				branchWeight+=parseFloat(element);
			}
		  })

		return branchWeight;
	}

	function isNumeric(str) {
		if (typeof str !== "string") return false // we only process strings!  
		return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
			   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	  }

	function nextPlant(){
		console.log("Enter Next Plant");

		
		let plantCount = 0;
		for(const val of JSON.parse(getHarvestRecords())) {  
			if(val.batchName === currentHarvest.name){
                plantCount++;
			}
		}

		if(plantCount>=150){
            setErrorMessage("Harvest Batch cannot exceed 150 items. Create new batch to continue.");
			setLastHarvestedPlant([]);
			return false;
		}

		if(isNumeric(weight)){
			console.log("Weight is numeric");
			if(Array.isArray(tagList) && tagList.length>0){
				let plantTag = currSelectedTag;
				if(plantTag !== ''){
					plantTag = plantTag.substring(0,plantTag.indexOf(" | "));
					currSelectedTag = '';
				}

				let addPlant = getPlant(plantTag);

				console.log("ADD PLANT CREATED: " + addPlant);
				console.log("ADD PLANT CREATED(STRING): " + JSON.stringify(addPlant));

				if(addPlant===null||addPlant===undefined){
					return false;
				}
				currentHarvestRecord = new HarvestRecord('',plantTag,0,'',currentHarvest.name,userID);
				if(weight===""||weight===undefined){
					currentHarvestRecord.weight=getBranchWeight();
				}else{
					console.log("Parse Float: " + parseFloat(weight));
					console.log("Branch Weight: " + getBranchWeight());
					currentHarvestRecord.weight=parseFloat(weight)+getBranchWeight();

				}
				if(currentHarvestRecord.weight===0){
					return false;
				}
				currentHarvestRecord.unit=unit;
				setLastHarvestedPlant(currentHarvestRecord);
				console.log("Last Harvested Plant Set: " + JSON.stringify(lastHarvestedPlant));
								
				//addHarvestRecord(currentHarvestRecord);

				removePlant(plantTag)
				//setRemovedPlantID(addPlant.itemID);
				console.log("getPlants() AFTER REMOVED: " + getPlants());

				let plantTags = [];

				for (const val of JSON.parse(getPlants())) {
					plantTags.push(val.tag);
				}
				console.log("Exit Next Plant");
				return true;
			}
		}
		return false;
	}

	function updateHBList(addID){
		let hbID = currentHarvest.itemID;
		console.log("HB ID: " + hbID);
		console.log("Add Plant ID: " + addID);

		let foundX = -1;
		let x = 0;
		let parsedHBs = getHarvestBatches();
      	console.log("ParsedHBs: " + JSON.stringify(parsedHBs));
		for(const hb of parsedHBs){
			console.log("HB: " + JSON.stringify(hb));
			if(hb.id === hbID){
				console.log("GOT HB!");
				foundX = x;
			}
			x++;
		}  
		let replaceHB = parsedHBs[foundX];
		let plantList = replaceHB.plantList;
		console.log("Replace HB: " + JSON.stringify(replaceHB));
		console.log("PlantList: " + plantList);
		console.log("PlantList(STRING): " + JSON.stringify(plantList));
		let textSplit = plantList.substring(1,plantList.length-1);
		textSplit = textSplit.split(",");
		let newPlantList = "{";

		let i = 0;
		textSplit.forEach((element) => {
			console.log("Split Element: " + element);
			if(element !== ""){
				newPlantList += element + ",";
				i++;
			}
		});
		console.log("New Plant List after Loop: " + newPlantList);
		newPlantList+= addID + "}";
		if(i === 0){
			newPlantList = "{" + addID + "}";
		}
		console.log("New Plant List after if: " + newPlantList);

		replaceHB.plantList = newPlantList;
		parsedHBs.splice(foundX,1,replaceHB);
		setHarvestBatches(JSON.stringify(parsedHBs));
		let tempHB = parsedHBs[foundX];
		currentHarvest = new HarvestBatch(tempHB.name,tempHB.type,tempHB.date,userID);
	}

	function resetHarvestForm(resetLastHarvested){
		console.log("RESET HARVEST FORM - GO TO PRINT DATA!");
		console.log("Reset Last Harvested: " + resetLastHarvested);
		printData();
		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag("");	
		setErrorMessage("");
		setEditMode(false);
		reloadPlants(currentHarvest);
		if(resetLastHarvested){
			reloadHarvestRecords();
			setLastHarvestedPlant([])	
		}
		//refreshOuter();
	}

	function reloadFromEditButton(){
		reloadPlantsAndHarvestRecords(currentHarvest);
	}

	function printData(){
		console.log("PRINT DATA!");

		console.log("===============");
		console.log("PLANTS: " + getPlants());
		console.log("===============");
		console.log("HARVESTRECORDS: " + getHarvestRecords());
		console.log("===============");
		console.log("HARVESTBATCHES: " + getHarvestBatches());
		console.log("===============");
	}

	function setChanges(){
		console.log("Enter setchanges");

		//setPlantMap(plants);
		//setHarvestBatch(currentHarvest);
		//setHarvestRecords(harvestRecords);

		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag('');

		//resetAll(currentHarvest);

		console.log("Exit setchanges");
	}

	function interceptSetNewHarvestRecordID(data,harvestRecordItem){
		let lhp = lastHarvestedPlant;
		console.log("intercept set new harvestrid");

		try{
			lhp.itemID = data.insertId;
			console.log("LHP.itemID: " + lhp.itemID);
		}catch(err){

		}
		
		setLastHarvestedPlant(lhp);
		setNewHarvestRecordID(data.insertId,harvestRecordItem);
	}

	const ChangeHBForm = () => {	  
		return (
			<Grid
				container
				direction="column"
			  	justifyContent="center"
				alignItems="center"
			>
			<FormLabel>Choose Harvest Batch</FormLabel>
				<Select id="change-strain-select" value={selectedHB} onChange={handleSelectHB} style={{minWidth:"120px"}}>
                	{hbOptionsList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
			</Grid>
		);
	  };

	  const UpdateHarvestDateTab = () => {	  
		return (<div>
      <Grid
					container
					direction="row"
  					justify="center"
					align="center"
				>
            <Select id="month-select" value={monthValue} onChange={handleMonthSelect} style={{minWidth: 50,maxWidth: 50}}>
                	{monthList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>	

               <Select id="day-select" value={dayValue} onChange={handleDaySelect} style={{minWidth: 50,maxWidth: 50}}>
                	{dayList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

               <Select id="year-select" value={yearValue} onChange={handleYearSelect} style={{minWidth: 80,maxWidth: 80}}>
                	{yearList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
			<SaveHarvestDateButton getHarvestBatchItem={getHarvestBatchItem} setCurrentHarvestDate={setCurrentHarvestDate} saveHarvestDate={saveHarvestDate}></SaveHarvestDateButton>
          </Grid>
    </div>)}

	  const HarvestDateTab = () => {	  
		return (
		  <div>
			  <Grid
					container
					direction="row"
  					justifyContent="center"
					align="center"
				>
				
				{isEdittingHarvestDate ?
				<div><UpdateHarvestDateTab></UpdateHarvestDateTab></div>
				:
				<div style={{marginBottom:"5px"}}>
					<Grid
					container
					direction="row"
  					justifyContent="center"
					alignItems="center"
					>
					<FormLabel style={{fontSize:"15px",textAlign:"right"}}><b>{dateText}</b></FormLabel>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleEditHarvestDate} style={{minWidth: "20px",maxWidth: "20px",minHeight: "20px",maxHeight: "20px"}}>
                	<img alt="edit" src={edit} style={{minWidth: "20px",maxWidth: "20px",minHeight: "20px",maxHeight: "20px"}}/>
					</Button> 
					</Grid>
				</div>
				}
				</Grid>
			  		  
		  </div>
		);
	  };

	  const HarvestBatchInfoTabs = ({hbInfoTabsHiddenNow}) => {
		if (hbInfoTabsHiddenNow) return null;
		return (
		  <div className="full tr">
			  <Grid
					container
					direction="column"
  					justify="center"
					align="center"
				>
					<FormLabel id="harvest-type-label" style={{verticalAlign:"center",align:"center",marginTop:"2px",marginBottom:"2px",marginLeft:"2px",marginRight:"2px"}}><b>{harvestTypeLabelText}</b></FormLabel>
					<HarvestDateTab></HarvestDateTab>
				</Grid>
			  		  
		  </div>
		);
	  };

	const AddNewHBForm = () => {	  
		return (
		  <div className="full tr" style={{border:"1px solid #d7d7d7",borderRadius:5}}>
			  <div style={{margin:"10px"}}>
			<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>

				<FormLabel component="legend" style={{marginTop:"5px"}}><b>New Harvest Batch</b></FormLabel>

				<TextField id="changeHBField" label="Batch Name"/>
				
				<FormControl component="fieldset" style={{marginTop:"10px",marginBottom:"5px"}}>
  					<FormLabel component="legend">Harvest Date</FormLabel>
  					<RadioGroup aria-label="Harvest Date" name="harvest-date" value={day} onClick={handleDayChange} row>
						<FormControlLabel value="today" control={<Radio />} label="Today" />
    					<FormControlLabel value="yesterday" control={<Radio />} label="Yesterday" />
  					</RadioGroup>
				</FormControl>
				
				<FormControl component="fieldset" style={{marginBottom:"5px"}}>
  					<FormLabel component="legend">Harvest Type</FormLabel>
  					<RadioGroup aria-label="Harvest Type" name="harvest-type" value={harvestType} onClick={handleHarvestTypeChange} row>
						<FormControlLabel value="harvest" control={<Radio />} label="Harvest" />
    					<FormControlLabel value="manicure" control={<Radio />} label="Manicure" />
  					</RadioGroup>
				</FormControl>

				</Grid>


				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
					<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancelNewHB}>Cancel</Button>
					<AddHarvestBatchButton getHarvestBatchItem={getHarvestBatchItem} addNewHB={addNewHB} resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID} reloadHarvestBatchesFromAddHB={reloadHarvestBatchesFromAddHB}></AddHarvestBatchButton>
				</Grid>
				</div>
		  </div>
		);
	  };

	function getTodayStr(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		console.log("Today Str: " + today.toString());
		return today.toString();
	}

	function getYesterdayStr(){
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		var dd = String(yesterday.getDate()).padStart(2, '0');
		var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = yesterday.getFullYear();

		yesterday = mm + '/' + dd + '/' + yyyy;
		return yesterday.toString();
	}

	function getAndResetRemovedPlantID(){
		console.log("Enter getRemovedPlantID");
		let toRet = removedPlantID;
		setRemovedPlantID("");
		console.log("Get and Reset Removed Plant ID Returning: " + toRet); 
		console.log("Exit getRemovedPlantID");
		return toRet;
	}

	function getRemovePlantIDDelete(uid){
		console.log("Get Remove Plant ID Delete: UID: " + uid)

		for(let val of JSON.parse(getHarvestRecords())){
			if(val.uid === uid){
				console.log("Found UID: " + uid);
				console.log("Found hbItemID: " + val.id);

				return val.id;
			}
		}
		return '';
	}

	function getHarvestRecordItem(){
		console.log("Enter getHarvestRecorditem")
		let plant = {
			tag: '',
			weight: 0,
			unit: '',
			batchName: '',
			userID: ''
		  };

		plant.tag = currentHarvestRecord.tag;
		plant.unit = currentHarvestRecord.unit;
		plant.weight = currentHarvestRecord.weight;
		plant.batchName = currentHarvestRecord.batchName;
		plant.userID = userID;

		if(currentHarvestRecord.itemID!==""){
			plant.id = currentHarvestRecord.itemID;
		}

		console.log("Stringified before passed: " + JSON.stringify(plant));
		console.log("Exit getHarvestRecorditem")
		return plant;
	}

	function getLastHarvestRecordItem(){
		console.log("Enter getLastHarvestRecorditem")
		let plant = {
			tag: '',
			weight: 0,
			unit: '',
			batchName: '',
			userID: ''
		  };

		plant.tag = lastHarvestedPlant.tag;
		plant.unit = lastHarvestedPlant.unit;
		plant.weight = lastHarvestedPlant.weight;
		plant.batchName = lastHarvestedPlant.batchName;
		plant.userID = userID;

		if(lastHarvestedPlant.itemID!==""){
			plant.id = lastHarvestedPlant.itemID;
		}

		console.log("Stringified before passed: " + JSON.stringify(plant));
		console.log("Exit getLastHarvestRecorditem")
		return plant;
	}

	function getStrainForPlantItem(tag){
		console.log("Get Strain For Plant Item");
		if(tag === null){
			tag = currentHarvestRecord.tag;
		}
		console.log("Searching For: " + tag);
		for(let val of JSON.parse(getPlants())){
			console.log("VAL(STRING): " + JSON.stringify(val));
			if(val.tag === tag){
				return val.strain;
			}
		}
	}

	function getPlantItem(active,plantTag,strain){

		console.log("Enter getPlantItem")
		let plant = {
			tag: '',
			strain: '',
			userID: '',
			active: ''
		  };

		console.log("Current Harvested Plant(STRING): " + JSON.stringify(currentHarvestRecord));

		plant.tag = plantTag;
		plant.strain = strain;
		plant.userID = userID;
		plant.active = active;

		if(currentHarvestRecord.itemID!==""){
			plant.id = currentHarvestRecord.itemID;
		}

		console.log("Adding " + plant.strain); 
		console.log("Stringified before passed: " + JSON.stringify(plant));
		console.log("Exit getHarvestRecorditem")
		return plant;
	}

	function getHarvestBatchItem(addNew){
		console.log("Enter getharvestBatchitem")
		let hb = {
			name: '',
			userID: '',
			type: '',
			date: ''
			};

		let ch = currentHarvest;
		console.log("CURRENT HARVEST: " + currentHarvest);
		console.log("CURRENT HARVEST(STRING): " + JSON.stringify(currentHarvest));

		console.log("HarvestBatches in HarvestForm(STRING): " + JSON.stringify(getHarvestBatches()));

		if(addNew){
			ch = addedHB;
		}
		hb.name = ch.name;
		hb.userID = userID;
		hb.type = ch.type;
		hb.date = ch.date;
		if(ch.itemID!==""){
			hb.id = ch.itemID;
		}

		console.log("Adding " + hb.name); 
		console.log("Stringified before passed: " + JSON.stringify(hb));
		console.log("Exit getharvestBatchitem")
		return hb;
	}

	return (
		<div id="harvest-form" style={{margin:"auto"}}>
				<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
					<div style={{margin:"auto"}}>
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
				>

				{changeHBHiddenNow ?
				<AddNewHBForm></AddNewHBForm> :
				<ChangeHBForm></ChangeHBForm>
				}
				

				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

					<HarvestBatchInfoTabs hbInfoTabsHiddenNow={hbInfoTabsHiddenNow}> </HarvestBatchInfoTabs>

				</Grid>
				
				<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
				<FormLabel style={{marginTop:"8px"}} component="legend">Search For Strain</FormLabel>
				<Select id="search-for-strain-select" value={searchStrain} onChange={handleChangeSearchForStrainSelect} style={{minWidth:"120px"}}>
                	{searchForList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

				</Grid>
				
				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<Select id="search-param-select" value={searchParam} onChange={handleSearchParamSelect} style={{minWidth:"120px"}}>
                	{searchOptionsList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

				<TextField id="search-field" value={searchTag} label="Search Tag" onChange={handleSearchTag} style={{width: "100px"}}/>

				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
			
				<Select id="searchTagSelect" value={currSelectedTag} onChange={handleSelectedTag} style={{minWidth: 80}}>
                	{    
                    tagList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<TextField id="Weight" value={weight} onChange={handleWeight} style={{width: "100px"}}/>

				<Select id="unit-select" value={unit} onChange={handleUnitSelect} style={{minWidth: 80}}>
                	{unitList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

				</Grid>

				<Grid
					id="branchGrid"
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>

				<FormLabel id="branchLabel">{branchValue}</FormLabel>

				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddBranch}>Add Branch</Button>
				<HarvestPlantButton plantRef={nextPlantRef} getHarvestRecordItem={getHarvestRecordItem} getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
				nextPlant={nextPlant} setChanges={setChanges} resetHarvestForm={resetHarvestForm} setNewHarvestRecordID={interceptSetNewHarvestRecordID} 
				updateHBList={updateHBList} getPlantItem={getPlantItem} harvestType={harvestType} getStrainForPlantItem={getStrainForPlantItem}></HarvestPlantButton>

				</Grid>

                {(errorMessageText.length!==0) ? <ErrorMessageLabel></ErrorMessageLabel> : null}

				{(lastHarvestedPlant.tag === undefined) ? 
				<div></div> :
					<LastHarvested lastHarvestedPlant={lastHarvestedPlant} getStrainForPlantItem={getStrainForPlantItem} getLastHarvestRecordItem={getLastHarvestRecordItem} 
					getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
					setChanges={setChanges} resetHarvestForm={resetHarvestForm}
					getPlantItem={getPlantItem} harvestType={harvestType}></LastHarvested>}		


				</Grid>
				</div>
					<Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
					nextPlantFromSpeech={nextPlantFromSpeech} voiceCommand={voiceCommand}></Dictaphone>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
					{editNow ? null : <Button variant="outlined" style={{marginRight:"5px"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleShowTable}>{showTableText}</Button>}
					
					{(tableVisible && editNow) ? <Button variant="outlined" style={{marginRight:"5px"}}aria-controls="simple-menu" aria-haspopup="true" onClick={handleRevertChanges}>Cancel</Button>
					: null}
					{tableVisible ? <EditButton editNow={editNow} setEditMode={setEditMode} setChanges={setChanges} getWeightChanges={getWeightChanges} getHarvestRecords={getHarvestRecords} currHidePlants={currHidePlants}
				    currentHarvest={currentHarvest} timeLimit={timeLimit} setNewPlantID={setNewPlantID} getStrainForPlantItem={getStrainForPlantItem} 
				    setHarvestRecords={setHarvestRecords} setPlants={setPlants} printData={printData} resetHarvestForm={resetHarvestForm}
				    reloadFromEditButton={reloadFromEditButton}></EditButton> : null}
				 
				 </Grid>
					{tableVisible ? <div>
				<TableWrapper currHarvest={currentHarvest} getHarvestRecords={getHarvestRecords} editNow={editNow} 
      currWeightChanges={currWeightChanges} setWeightChanges={setWeightChanges} 
      getRemovePlantIDDelete={getRemovePlantIDDelete} currHidePlants={currHidePlants} setHidePlants={setHidePlants}
      getPlants={getPlants}></TableWrapper>
	  </div> :
	  null}
				</Grid>
		</div>
	);
}

export default HarvestForm;

/*
<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<EditButton editNow={editNow} setEditMode={setEditMode} setChanges={setChanges} getWeightChanges={getWeightChanges} getHarvestRecords={getHarvestRecords} currHidePlants={currHidePlants}
				 currentHarvest={currentHarvest} timeLimit={timeLimit} setNewPlantID={setNewPlantID} getStrainForPlantItem={getStrainForPlantItem} 
				 setHarvestRecords={setHarvestRecords} setPlants={setPlants} printData={printData} resetHarvestForm={resetHarvestForm}
				 reloadFromEditButton={reloadFromEditButton}></EditButton>		
				<FormLabel>Harvest Queue</FormLabel>

				</Grid>*/
