import React, { useState } from 'react';
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

function HarvestForm({harvestBatches,setHarvestBatches,plants,setPlantMap,harvestedPlants,setHarvestedPlantMap,resetHarvestBatches, resetAll, currentHarvest, setNewHBID, getCurrentHarvestID, refreshOuter, setNewHarvestedPlantID}) { 

	function HarvestBatch(itemID,name,finalized,plantList,type,date){
		this.itemID = itemID;
		this.name = name;
		this.finalized = finalized;
		this.plantList = plantList;
		this.type = type;
		this.date = date;
	}

	function Plant(itemID,strain,tag){
		this.itemID = itemID;
		this.strain = strain;
		this.tag = tag;
	}

	function HarvestedPlant(itemID,uid,strain,tag,weight,unit){
		this.itemID = itemID;
		this.uid = uid;
		this.strain = strain;
		this.tag = tag;
		this.weight = weight;
		this.unit = unit;
	}

	let hbOptionsList = ["Add New Harvest Batch"];
	let currentHarvestedPlant = new HarvestedPlant('','','','',0,'');

	let addedHB = new HarvestBatch("","","","{}","","");

	console.log("ENTER HARVESTFORM, CURRENT HARVEST: " + JSON.stringify(currentHarvest));

	console.log("ENTER HARVESTFORM, CURRENT HARVESTBATCHES: " + JSON.stringify(harvestBatches));

	console.log("ENTER HARVESTFORM, CURRENT PLANTMAP: " + JSON.stringify(plants));

	console.log("ENTER HARVESTFORM, CURRENT HARVESTEDPLANTSMAP: " + JSON.stringify(harvestedPlants));

	var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
	};
	
	const handleClick = (event) => {
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


	let searchForList = [];
	let strain = '';

	console.log("Create Search for List");
	for (const val of plants) {
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

	const [selectedHB, setSelectedHB] = React.useState('');

	const handleSelectHB = (e) => {
		setSelectedHB(e.target.value);
	};

	function getHarvestBatch(selectedHB){
		console.log("Enter GetHarvestBatch");
		for(let val of harvestBatches) {
			console.log("VAL(STRING): " + JSON.stringify(val));
			console.log("Val.name: " + val.name);
			if(val.name == selectedHB){
				console.log("GRABBED");
				console.log("Val.id: " + val.id);
				console.log("Get CURRHARV ID FROM APP: " + getCurrentHarvestID(val.name));
				return new HarvestBatch(getCurrentHarvestID(val.name),val.name,val.finalized,val.plantList,val.type,val.date);
			}
		}
		console.log("Exit GetHarvestBatch");

	}

	function setHarvestBatch(selectedHB){
		console.log("Set Harvest Batch: " + JSON.stringify(selectedHB));
		let x = 0;
		let foundX = -1;
		for(let val of harvestBatches) {
			console.log("VAL: " + val);
			console.log("Val.name: " + val.name);
			if(val.name == selectedHB.name){
				console.log("FOUND X: " + x);
				foundX = x;
			}
			x++;
		}

		console.log("Harvest Batches Map Before SetHarvestBatch(STRINGIFIED): " + JSON.stringify(harvestBatches));
		console.log("HB TO BE ADDED: " + JSON.stringify(new HarvestBatch(selectedHB.id,selectedHB.name,selectedHB.finalized,selectedHB.plantList,selectedHB.type,selectedHB.date)));
		if(foundX != -1){
			harvestBatches.splice(foundX,foundX,new HarvestBatch(selectedHB.itemID,selectedHB.name,selectedHB.finalized,selectedHB.plantList,selectedHB.type,selectedHB.date));
		}
		console.log("Harvest Batches Map AFTER SetHarvestBatch(STRINGIFIED): " + JSON.stringify(harvestBatches));
	}

	function getNewUID(){
		let uid = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let charactersLength = characters.length;

		let i = 0;
		while(i < 8){
			uid += characters.charAt(Math.floor(Math.random() * charactersLength));
			i++;
		}
		console.log("Generated UID: " + uid);

		for(let val of harvestedPlants) {
			if(val.uid == uid){
				console.log("UID already exists, trying again");
				return getNewUID();
			}
		}
		return uid;
	}

	function getPlant(plantTag){
		console.log("GET PLANT - Tag: " + plantTag);
		for(let val of plants) {
			console.log("VAL: " + JSON.stringify(val));
			console.log("Val.tag: " + val.tag);
			if(val.tag == plantTag){
				console.log("GRABBED PLANT");
				return new Plant(val.id,val.strain,val.tag);
			}
		}
	}

	function getHarvestedPlant(uid){
		console.log("GET Harvested PLANT - UID: " + uid);
		for(let val of plants) {
			console.log("VAL: " + JSON.stringify(val));
			console.log("Val.uid: " + val.uid);
			if(val.uid == uid){
				console.log("GRABBED HARVESTEDPLANT");
				return new HarvestedPlant(val.itemID, val.uid, val.strain, val.tag, val.weight, val.unit);
			}
		}
	}

	function removePlant(plantTag){
		console.log("Remove Plant: " + plantTag);
		let x = 0;
		let foundX = -1;
		for(let val of plants) {
			console.log("VAL: " + val);
			console.log("Val.tag: " + val.tag);
			if(val.tag == plantTag){
				console.log("FOUND X: " + x);
				foundX = x;
			}
			x++;
		}

		console.log("Plant Map Before Remove Plant(STRINGIFIED): " + JSON.stringify(plants));
		if(foundX != -1){
			plants.splice(foundX,1);
		}
		console.log("Plant Map AFTER Remove Plant(STRINGIFIED): " + JSON.stringify(plants));
	}

	function addHarvestedPlant(plant){
		console.log("Add Harvested Plant: " + JSON.stringify(plant));
		console.log("Before Add Harvested Plant - harvsetedPlants: " + JSON.stringify(harvestedPlants));
		harvestedPlants.push(plant);
		console.log("After Add Harvested Plant - harvsetedPlants: " + JSON.stringify(harvestedPlants));
	}
	
	currentHarvest = getHarvestBatch(selectedHB);
	console.log("AFTER ALL THAT THE HARVESTBATCHES: " + harvestBatches);
	console.log("AFTER ALL THAT THE HARVESTBATCHES(STRING): " + JSON.stringify(harvestBatches));

  	const handleDayChange = (event) => {
    	setDay(event.target.value);
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

	let timeLimit = 100;

	let unitList = ["lbs","g"];

	let searchOptionsList = ["Contains","Ends With"];
    
	for(let val of harvestBatches) {
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
	if(harvestBatches!==undefined){
		for (const k of harvestBatches.keys()) {
			currHBMap.set(k,harvestBatches.get(k));
			console.log("HB: " + harvestBatches.get(k).name);
		}
	}*/

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
		if(currentHarvest.type=="manicure"){
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


	console.log("HB Info Tabs Hidden Now: " + hbInfoTabsHiddenNow);

	function commitSearch(){
		let newTagList = [];
		let plantTags = [];

		console.log("Commit Search!!");

		for (const val of plants) {
			console.log("Val: " + JSON.stringify(val));
			plantTags.push(val.tag);
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

	function addNewHB(){
		let hbName = document.getElementById("changeHBField").value;
		console.log("HB Name: " + hbName);

		let hbDate = getTodayStr();
		if(day==='yesterday'){
			hbDate=getYesterdayStr();
		}

		addedHB = new HarvestBatch("",hbName,false,"{}",harvestType,hbDate);

		if(hbName!=""&&!hbOptionsList.includes(hbName)){
			harvestBatches.push(addedHB);
			hbOptionsList.push(hbName);
			console.log("HB Added");
			setSelectedHB(hbName);
		}
		setChangeHBHidden(false);
		console.log("Embark on changing harvestbatchesmap");
		setHarvestBatches(harvestBatches);
		console.log("setChangeStrainHidden");
	}

	const handleCancelNewHB = (event) => {
		setChangeHBHidden(false);
		setSelectedHB("");
	};

	const handleAddBranch = (event) => {
		addBranch();
	  };

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
				currentHarvestedPlant = new HarvestedPlant('',getNewUID(),addPlant.strain,addPlant.tag,0,'');
				if(weight===""||weight===undefined){
					currentHarvestedPlant.weight=getBranchWeight();
				}else{
					console.log("Parse Float: " + parseFloat(weight));
					console.log("Branch Weight: " + getBranchWeight());
					currentHarvestedPlant.weight=parseFloat(weight)+getBranchWeight();
				}
				if(currentHarvestedPlant.weight===0){
					return false;
				}
				currentHarvestedPlant.unit=unit;
				let plantList = currentHarvest.plantList;
				console.log("PLANTLIST BEFORE APPEND: " + plantList);
				if(plantList==="{}"){
					plantList = "{" + currentHarvestedPlant.uid + "}";
				}else{
					plantList = plantList.substring(0,plantList.length-1) + "," + currentHarvestedPlant.uid + "}";
				}
				console.log("PLANTLIST AFTER APPEND" + plantList);

				currentHarvest.plantList = plantList;
								
				addHarvestedPlant(currentHarvestedPlant);

				removePlant(plantTag)
				setRemovedPlantID(addPlant.itemID);
				console.log("PLANTS AFTER REMOVED: " + plants);

				let plantTags = [];

				for (const val of plants) {
					console.log("Val: " + val);
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
		let parsedHBs = harvestBatches;
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
			newPlantList += element + ",";
			i++;
		});
		newPlantList+= addID + "}";
		if(i == 0){
			newPlantList = "{" + addID + "}";
		}

		console.log("NEW PLANT LIST: " + newPlantList);
		replaceHB.plantList = newPlantList;
		console.log("Parsed HBs before Splice: " + parsedHBs);
		console.log("Parsed HBs before Splice: " + JSON.stringify(parsedHBs));
		parsedHBs.splice(foundX,1,replaceHB);
		console.log("Parsed HBs after Splice: " + parsedHBs);
		console.log("Parsed HBs after Splice: " + JSON.stringify(parsedHBs));
		harvestBatches = parsedHBs;
		currentHarvest = parsedHBs[foundX];
	}

	function printData(){
		console.log("PRINT DATA!");

		console.log("===============");
		console.log("PLANTS: " + JSON.stringify(plants));
		console.log("===============");
		console.log("HARVESTEDPLANTS: " + JSON.stringify(harvestedPlants));
		console.log("===============");
		console.log("HARVESTBATCHES: " + JSON.stringify(harvestBatches));
		console.log("===============");
		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag('');		
		refreshOuter(plants,harvestedPlants,harvestBatches);
	}

	function setChanges(){
		console.log("Enter setchanges");

		setPlantMap(plants);
		setHarvestBatch(currentHarvest);
		setHarvestedPlantMap(harvestedPlants);

		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag('');
		setHarvestBatches(harvestBatches);	

		resetAll(currentHarvest);

		resetAll(currentHarvest);

		console.log("Exit setchanges");
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

	  const HarvestBatchInfoTabs = ({hbInfoTabsHiddenNow}) => {
		if (hbInfoTabsHiddenNow) return null;
	  
		return (
		  <div className="full tr">
			  <Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				<div className="full tr" style={{width: "100px",height: "30px", backgroundColor: bgColors.Green, verticalAlign: "middle"}}>
						<FormLabel id="harvest-type-label" style={{verticalAlign: "middle"}}><b>{harvestTypeLabelText}</b></FormLabel>
					</div>
					<div className="full tr" style={{width: "20px",height: "30px"}}>
					</div>
					<div className="full tr" style={{width: "100px",height: "30px", backgroundColor: bgColors.Green, verticalAlign: "middle"}}>
						<FormLabel id="date-label" style={{verticalAlign: "middle"}}><b>{harvestDateLabelText}</b></FormLabel>
					</div>
				</Grid>
			  		  
		  </div>
		);
	  };



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
            <AddHarvestBatchButton getHarvestBatchItem={getHarvestBatchItem} addNewHB={addNewHB} resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID}></AddHarvestBatchButton>
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

		for(let val of harvestedPlants){
			console.log("Val: " + JSON.stringify(val));
			if(val.uid == uid){
				console.log("Found UID: " + uid);
				console.log("Found hbItemID: " + val.id);

				return val.id;
			}
		}
		return '';
	}

	function getHarvestedPlantItem(){
		console.log("Enter getharvestedPlantitem")
		let plant = {
			uid: '',
			strain: '',
			tag: '',
			weight: 0,
			unit: ''
		  };

		plant.uid = currentHarvestedPlant.uid;
		plant.strain = currentHarvestedPlant.strain;
		plant.tag = currentHarvestedPlant.tag;
		plant.unit = currentHarvestedPlant.unit;
		plant.weight = currentHarvestedPlant.weight;
		if(currentHarvestedPlant.itemID!==""){
			plant.id = currentHarvestedPlant.itemID;
		}

		console.log("Adding " + plant.strain); 
		console.log("Stringified before passed: " + JSON.stringify(plant));
		console.log("Exit getharvestedPlantitem")
		return plant;
	}

	function getHarvestBatchItem(addNew){
		console.log("Enter getharvestBatchitem")
		let hb = {
			name: '',
			finalized: '',
			plantList: '{}',
			type: '',
			date: ''
			};

		let ch = currentHarvest;
		console.log("CURRENT HARVEST: " + currentHarvest);
		console.log("CURRENT HARVEST(STRING): " + JSON.stringify(currentHarvest));

		console.log("HarvestBatches in HarvestForm: " + harvestBatches);
		console.log("HarvestBatches in HarvestForm(STRING): " + JSON.stringify(harvestBatches));

		if(addNew){
			ch = addedHB;
		}
		hb.name = ch.name;
		hb.finalized = ch.finalized;
		hb.plantList = ch.plantList;
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
					direction="column"
  					justify="center"
					alignItems="center"
				>

				<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddBranch}>Add Branch</Button>
				<HarvestPlantButton getHarvestedPlantItem={getHarvestedPlantItem} getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} nextPlant={nextPlant} setChanges={setChanges} printData={printData} setNewHarvestedPlantID={setNewHarvestedPlantID} updateHBList={updateHBList}></HarvestPlantButton>

				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<EditButton editNow={editNow} setEditMode={setEditMode} setChanges={setChanges} getWeightChanges={getWeightChanges} harvestedPlants={harvestedPlants} currHidePlants={currHidePlants} currentHarvest={currentHarvest} timeLimit={timeLimit}></EditButton>		
				<FormLabel>Harvest Queue</FormLabel>

				</Grid>

					<TableWrapper currHarvest={currentHarvest} harvestedPlants={harvestedPlants} editNow={editNow} currWeightChanges={currWeightChanges} setWeightChanges={setWeightChanges} getRemovePlantIDDelete={getRemovePlantIDDelete} 
					currHidePlants={currHidePlants} setHidePlants={setHidePlants}></TableWrapper>			
				</Grid>
		</div>
	);
}

export default HarvestForm;
