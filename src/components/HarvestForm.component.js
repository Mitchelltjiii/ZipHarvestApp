import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HarvestPlantButton from './HarvestPlantButton.component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddHarvestBatchButton from './AddHarvestBatchButton.component';
import EditButton from './EditButton.component';
import TableWrapper from './TableWrapper.component';
import { setGlobalCssModule } from 'reactstrap/es/utils';
import Collapsible from 'react-collapsible';
import Dictaphone from './Dictaphone.component';
import LastHarvested from './LastHarvested.component';
import edit from '../edit.png';
import SaveHarvestDateButton from './SaveHarvestDateButton.component';


function HarvestForm({getHarvestBatches,setHarvestBatches,getPlants,setPlants,getHarvestRecords,setHarvestRecords,resetHarvestBatches, 
	resetAll, currentHarvest, setNewHBID, getCurrentHarvestID, refreshOuter, setNewHarvestRecordID, setNewPlantID, userID, setAll, 
	reloadPlants, reloadPlantsAndHarvestRecords, reloadHarvestBatches}) { 

	function HarvestBatch(name,submitted,type,date,userID){
		this.name = name;
		this.submitted = submitted;
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

	let addedHB = new HarvestBatch("",0,"","",userID);

	console.log("ENTER HARVESTFORM, CURRENT HARVEST: " + JSON.stringify(currentHarvest));

	console.log("ENTER HARVESTFORM, CURRENT HARVESTBATCHES: " + getHarvestBatches());

	console.log("ENTER HARVESTFORM, CURRENT PLANTMAP: " + getPlants());

	console.log("ENTER HARVESTFORM, CURRENT HarvestRecords: " + getHarvestRecords());

	var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
					"Offwhite": "#f3f6f4"
	};

	const [day, setDay] = React.useState('today');

	const [harvestType, setHarvestType] = React.useState('harvest');

	const [searchTag, setSearchTag] = React.useState('');

	const [searchParam, setSearchParam] = React.useState('Contains');

	const [changeStrain, setChangeStrain] = React.useState("Don't Change Strain");

	const [changeStrainHidden, setChangeStrainHidden] = React.useState(false);

	const [hbInfoTabsHidden, setHbInfoTabsHidden] = React.useState(true);

	const [changeHBHidden, setChangeHBHidden] = React.useState(false);

	const [selectedTag, setSelectedTag] = React.useState('');

	const [weight, setWeight] = React.useState('');

	const [unit, setUnit] = React.useState('lbs');

	const [branchValue, setBranchValue] = React.useState('');

	const [strainList, setStrainList] = React.useState(["Don't Change Strain","Add New Strain"]);

	const [editMode, setEditMode] = React.useState(false);

	const [removedPlantID, setRemovedPlantID] = React.useState("");

	const [tableVisible,setTableVisible] = React.useState(true);

	const [edittingHarvestDate, setEdittingHarvestDate] = React.useState(false);

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

	console.log("Create Search for List");
	for (const val of JSON.parse(getPlants())) {
		console.log("Val Search For: " + JSON.stringify(val));
		console.log("Val.tag: " + val.tag);
		if(getPlant(val.tag) != undefined){
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
	if(currentHarvest != undefined && JSON.stringify(currentHarvest)!= "[]"){
		selHB = currentHarvest.name;
	}

	const [selectedHB, setSelectedHB] = React.useState(selHB);

	
	const handleSelectHB = (e) => {
		setSelectedHB(e.target.value);
	};

	function getHarvestBatch(selectedHB){
		console.log("Enter GetHarvestBatch");
		console.log("Get Harvest Batches: " + getHarvestBatches());

		try{
			for(let val of JSON.parse(getHarvestBatches())) {
				console.log("VAL(STRING): " + JSON.stringify(val));
				console.log("Val.name: " + val.name);
				if(val.name == selectedHB){
					console.log("GRABBED");
					return new HarvestBatch(val.name,val.submitted,val.type,val.date,val.userID);
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
			if(val.tag == plantTag){
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
			if(val.tag == plantTag){
				console.log("FOUND X: " + x);
				foundX = x;
				replaceEntry = val;
				if(currentHarvest.type == 0){
					replaceEntry.active = 1;
				}
			}
			x++;
		}

		console.log("Plant Map Before Remove Plant: " + getPlants());
		if(foundX != -1){
			setPlants(JSON.stringify(JSON.parse(getPlants()).splice(foundX,1,replaceEntry)));
		}
		console.log("Plant Map AFTER Remove Plant: " + getPlants());
	}

	function addHarvestRecord(plant){
		console.log("Add Harvested Plant: " + JSON.stringify(plant));
		let tempHarvestRecords = JSON.parse(getHarvestRecords());
		console.log("Before Add Harvest Record - HarvestRecords: " + JSON.stringify(tempHarvestRecords));
		tempHarvestRecords.push(plant);
		setHarvestRecords(JSON.stringify(tempHarvestRecords));
		console.log("After Add Harvest Record - HarvestRecords: " + getHarvestRecords());
	}
	
	currentHarvest = getHarvestBatch(selectedHB);
	console.log("AFTER ALL THAT THE HARVESTBATCHES: " + getHarvestBatches());

  	const handleDayChange = (event) => {
    	setDay(event.target.value);
	  };

	

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

	const handleChangeStrainSelect = (event) => {
		setChangeStrain(event.target.value);
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
	if(tagList.length>0 && selectedTag == ''){
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

	function getHidePlants(){
		return currHidePlants;
	}

	/*
					<ChangeStrainForm changeStrainHiddenNow={changeStrainHiddenNow}></ChangeStrainForm>
				<AddNewChangeStrainForm changeStrainHiddenNow={changeStrainHiddenNow}></AddNewChangeStrainForm>
*/
	let changeStrainHiddenNow = changeStrainHidden;

	if(changeStrain==="Add New Strain"){
		changeStrainHiddenNow=true;
	}


	let changeHBHiddenNow = changeHBHidden;

	if(selectedHB==="Add New Harvest Batch"){
		changeHBHiddenNow=true;
	}

	let hbInfoTabsHiddenNow = hbInfoTabsHidden;

	if(!(currentHarvest == undefined || currentHarvest.name == '')){
		hbInfoTabsHiddenNow=false;
	}

	let harvestTypeLabelText = "Harvest";
	let harvestDateLabelText = "Today";
	if(!(currentHarvest == undefined || currentHarvest.name == '')){
		if(currentHarvest.type==1){
			harvestTypeLabelText = "Manicure";
		}
		if(currentHarvest.date==getTodayStr()){
			harvestDateLabelText = "Today - " + currentHarvest.date;
		}else if(currentHarvest.date==getYesterdayStr()){
			harvestDateLabelText = "Yesterday - " + currentHarvest.date;
		}else{
			harvestDateLabelText = currentHarvest.date;
		}
	}

	const [searchText,setSearchText] = React.useState('');

  const handleSearchFieldChange = (event) => {
		setSearchText(event.target.value);
	}

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
  if(monthValue==4||monthValue==6||monthValue==9||monthValue==11){
    dayNumber = 30;
  }else if(monthValue==2){
    if(yearValue%4==0){
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
			if(val.active == 0){
				plantTags.push(val.tag);
			}
		}
		console.log("Commit Search... PlantTags Size:" + plantTags.length);

		if(searchParam==="Contains"){
			plantTags.map((tag) => {
				let p = getPlant(tag);
				if(p!=undefined&&p.tag.includes(searchTag)&&!p.harvested){
					if(searchStrain == 'All Strains' || searchStrain == p.strain){
						newTagList.push(p.tag + " | " + p.strain);
					}
				}
			})
		}else if(searchParam==="Ends With"){
			plantTags.map((tag) => {
				let p = getPlant(tag);
				if(p!=undefined&&p.tag.substring(p.tag.length-searchTag.length)===(searchTag)&&!p.harvested){
					if(searchStrain == 'All Strains' || searchStrain == p.strain){
						newTagList.push(p.tag + " | " + p.strain);
					}
				}
			})
		}

		return newTagList; 
	}

	const handleAddNewStrain = (event) => {
		let strain = document.getElementById("changeStrainField").value;
		console.log("Strain: " + strain);
		if(strain!=""&&!strainList.includes(strain)){
			strainList.push(strain);
			console.log("Strain Added");
		}
		setStrainList(strainList);
		console.log("setStrainList");
		setChangeStrainHidden(false);
		console.log("setChangeStrainHidden");
		setChangeStrain(strain);
	};

	function reloadHarvestBatchesFromAddHB(){
		reloadHarvestBatches(currentHarvest)
	}

	function addNewHB(){
		let hbName = document.getElementById("changeHBField").value;
		console.log("HB Name: " + hbName);

		let hbDate = getTodayStr();
		if(day==='yesterday'){
			hbDate=getYesterdayStr();
		}

		let harvType = 0;
		if(harvestType == "manifest"){
			harvType = 1;
		}

		addedHB = new HarvestBatch(hbName,0,harvType,hbDate,userID);

		/*
		if(hbName!=""&&!hbOptionsList.includes(hbName)){
			let tempHarvestBatches = JSON.parse(getHarvestBatches());
			tempHarvestBatches.push(addedHB);
			//reloadHarvestBatches();
			//setHarvestBatches(JSON.stringify(tempHarvestBatches));
			hbOptionsList.push(hbName);
			console.log("HB Added");
			setSelectedHB(hbName);
		}*/
		if(hbName!=""){
			setSelectedHB(hbName);
		}
		setChangeHBHidden(false);
		console.log("setChangeStrainHidden");
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
				setBranchValue("+" + weight);
			}else{
				setBranchValue(branchValue + "+" + weight);
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
		if (typeof str != "string") return false // we only process strings!  
		return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
			   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	  }

	function nextPlant(){
		console.log("Enter Next Plant");

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
			if(hb.id == hbID){
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
			if(element != ""){
				newPlantList += element + ",";
				i++;
			}
		});
		console.log("New Plant List after Loop: " + newPlantList);
		newPlantList+= addID + "}";
		if(i == 0){
			newPlantList = "{" + addID + "}";
		}
		console.log("New Plant List after if: " + newPlantList);

		replaceHB.plantList = newPlantList;
		parsedHBs.splice(foundX,1,replaceHB);
		setHarvestBatches(JSON.stringify(parsedHBs));
		let tempHB = parsedHBs[foundX];
		currentHarvest = new HarvestBatch(tempHB.name,tempHB.submitted,tempHB.type,tempHB.date,userID);
	}

	function resetHarvestForm(resetLastHarvested){
		console.log("RESET HARVEST FORM - GO TO PRINT DATA!");
		console.log("Reset Last Harvested: " + resetLastHarvested);
		printData();
		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag("");	
		reloadPlants(currentHarvest);
		if(resetLastHarvested){
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
			lhp.id = data.insertId;
			console.log("LHP.id: " + lhp.id);
		}catch(err){

		}
		
		setLastHarvestedPlant(lhp);
		setNewHarvestRecordID(data.insertId,harvestRecordItem);
	}

	function removeHarvestRecord(removeID){
		console.log("Remove Harvested Plant ID: " + removeID );
		let x = 0;
		let foundX = -1;
		for(let val of JSON.parse(getHarvestRecords())){
			console.log("Val: " + JSON.stringify(val));
			if(val.id == removeID){
				foundX=x;
			}
			x++;
		}
		if(foundX != -1){
			console.log("HarvestRecords before splice: " + JSON.stringify(getHarvestRecords()) );
			setHarvestRecords(JSON.stringify(JSON.parse(getHarvestRecords()).splice(foundX,1)));
			console.log("HarvestRecords after splice: " + JSON.stringify(getHarvestRecords()) );
		}
	}

	const ChangeHBForm = ({changeHBHiddenNow}) => {
		if (changeHBHiddenNow) return null;
	  
		return (
		  <div className="full tr">
			<FormLabel component="legend">Choose Harvest Batch</FormLabel>
			<Select id="change-strain-select" value={selectedHB} onChange={handleSelectHB} style={{minWidth: 80}}>
                	{hbOptionsList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
		  </div>
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
		  <div className="full tr" style={{backgroundColor:bgColors.Offwhite,marginBottom:"3px"}}>
			  <Grid
					container
					direction="row"
  					justifyContent="center"
					align="center"
				>
				
				{isEdittingHarvestDate ?
				<div><UpdateHarvestDateTab></UpdateHarvestDateTab></div>
				:
				<div style={{width:"130px",height:"20px"}}>
					<Grid
					container
					direction="row"
  					justifyContent="right"
					alignItems="right"
					>
					<FormLabel id="harvest-date-label" style={{width:"80px",height:"20px",verticalAlign:"center",textAlign:"center"}}><b>{dateText}</b></FormLabel>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleEditHarvestDate}  style={{minWidth: "30px",maxWidth: "30px",minHeight: "20px",maxHeight: "20px"}}>
                	<img src={edit} style={{minWidth: "20px",maxWidth: "20px",minHeight: "20px",maxHeight: "20px"}}/>
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

	  

	  

//<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleImport}>Import</Button>


	const ChangeStrainForm = ({changeStrainHiddenNow}) => {
		if (changeStrainHiddenNow) return null;
	  
		return (
		  <div className="full tr">
			<FormLabel component="legend">Change Strain</FormLabel>
			<Select id="change-strain-select" value={changeStrain} onChange={handleChangeStrainSelect} style={{minWidth: 80}}>
                	{strainList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
		  </div>
		);
	  };

	const AddNewChangeStrainForm = ({changeStrainHiddenNow}) => {
		if (!changeStrainHiddenNow) return null;
	  
		return (
		  <div className="full tr">
			<TextField id="changeStrainField" label="New Strain"/>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddNewStrain}>Add</Button>

		  </div>
		);
	  };

	const AddNewHBForm = ({changeHBHiddenNow}) => {
		if (!changeHBHiddenNow) return null;
	  
		return (
		  <div className="full tr" style={{backgroundColor: bgColors.Green}}>
			<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				
				<FormControl component="fieldset">
  					<FormLabel component="legend">Harvest Date</FormLabel>
  					<RadioGroup aria-label="Harvest Date" name="harvest-date" value={day} onClick={handleDayChange} row>
						<FormControlLabel value="today" control={<Radio />} label="Today" />
    					<FormControlLabel value="yesterday" control={<Radio />} label="Yesterday" />
  					</RadioGroup>
				</FormControl>
				
				</Grid>


				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				
				<FormControl component="fieldset">
  					<FormLabel component="legend">Harvest Type</FormLabel>
  					<RadioGroup aria-label="Harvest Type" name="harvest-type" value={harvestType} onClick={handleHarvestTypeChange} row>
						<FormControlLabel value="harvest" control={<Radio />} label="Harvest" />
    					<FormControlLabel value="manicure" control={<Radio />} label="Manicure" />
  					</RadioGroup>
				</FormControl>
				
				</Grid>

			<TextField id="changeHBField" label="New Harvest Batch"/>
            <AddHarvestBatchButton getHarvestBatchItem={getHarvestBatchItem} addNewHB={addNewHB} resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID} reloadHarvestBatchesFromAddHB={reloadHarvestBatchesFromAddHB}></AddHarvestBatchButton>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancelNewHB}>Cancel</Button>

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
			if(val.uid == uid){
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

		if(currentHarvestRecord.itemID!==""){
			plant.id = currentHarvestRecord.itemID;
		}

		console.log("Stringified before passed: " + JSON.stringify(plant));
		console.log("Exit getLastHarvestRecorditem")
		return plant;
	}

	function getStrainForPlantItem(tag){
		console.log("Get Strain For Plant Item");
		if(tag == null){
			tag = currentHarvestRecord.tag;
		}
		console.log("Searching For: " + tag);
		for(let val of JSON.parse(getPlants())){
			console.log("VAL(STRING): " + JSON.stringify(val));
			if(val.tag == tag){
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
			submitted: '',
			userID: '',
			type: '',
			date: ''
			};

		let ch = currentHarvest;
		console.log("CURRENT HARVEST: " + currentHarvest);
		console.log("CURRENT HARVEST(STRING): " + JSON.stringify(currentHarvest));

		console.log("HarvestBatches in HarvestForm: " + getHarvestBatches());
		console.log("HarvestBatches in HarvestForm(STRING): " + JSON.stringify(getHarvestBatches()));

		if(addNew){
			ch = addedHB;
		}
		hb.name = ch.name;
		hb.submitted = ch.submitted;
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
		<div id="harvest-form">
			<Grid
				container
				direction="row"
  				justify="center"
				alignItems="center"
			>
				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>


				<ChangeHBForm changeHBHiddenNow={changeHBHiddenNow}></ChangeHBForm>
				<AddNewHBForm changeHBHiddenNow={changeHBHiddenNow}></AddNewHBForm>
				

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
				<FormLabel component="legend">Search For Strain</FormLabel>
				<Select id="search-for-strain-select" value={searchStrain} onChange={handleChangeSearchForStrainSelect} style={{minWidth: 80}}>
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

				<Select id="search-param-select" value={searchParam} onChange={handleSearchParamSelect} style={{minWidth: 80}}>
                	{searchOptionsList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

				<TextField id="search-field" value={searchTag} label="Search Tag" onChange={handleSearchTag}/>

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

				<TextField id="Weight" value={weight} onChange={handleWeight}/>

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

				<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleShowTable}>{showTableText}</Button>

				{(lastHarvestedPlant.tag === undefined) ? 
				<div></div> :
					<LastHarvested lastHarvestedPlant={lastHarvestedPlant} getStrainForPlantItem={getStrainForPlantItem} getLastHarvestRecordItem={getLastHarvestRecordItem} 
					getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
					setChanges={setChanges} resetHarvestForm={resetHarvestForm}
					getPlantItem={getPlantItem} harvestType={harvestType}></LastHarvested>}		
				</Grid>

				<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
					<Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
					nextPlantFromSpeech={nextPlantFromSpeech} voiceCommand={voiceCommand}></Dictaphone>
					{tableVisible ? <div><Grid
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

				</Grid>
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
