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
import {isMobile} from 'react-device-detect';
import InputLabel from '@material-ui/core/InputLabel';
import Popup from 'reactjs-popup';

function HarvestForm({getHarvestBatches,setHarvestBatches,getPlants,setPlants,getHarvestRecords,setHarvestRecords,resetHarvestBatches,
	currentHarvest, setNewHBID, refreshOuter, setNewHarvestRecordID, setNewPlantID, userID, 
	reloadPlants, reloadPlantsAndHarvestRecords, reloadHarvestBatches, reloadHarvestRecords,getTutorials,setTutorials,showHints,
	setCurrentPage,getFreeTrial,getReferalLink,getGrantFreeMonthCode,setOffer,executeLogout,setNewUsername,getOutdoorOffer}) {
		
	let referalLink = getReferalLink();
	let tutorials = getTutorials();
	let grantFreeMonthCode = getGrantFreeMonthCode();
	let outdoorOffer = getOutdoorOffer();
	function HarvestBatch(hbid,type,date,userID,name){
		this.hbid = hbid;
		this.type = type;
		this.date = date;
		this.userID = userID;
		this.name = name;
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

	let addedHB = new HarvestBatch("","","",userID,"");

	var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#FFE9EF",
                    "Yellow": "#F6BB42",
					"Offwhite": "#f3f6f4"
	};

	let freeTrail = getFreeTrial();

	const [day, setDay] = React.useState('today');
	const [currentHBItem, setCurrentHBItem] = React.useState([]);

	const [harvestType, setHarvestType] = React.useState('harvest');

	const [searchTag, setSearchTag] = React.useState('');

	//const [searchParam, setSearchParam] = React.useState('Contains');

	const [changeHBHidden, setChangeHBHidden] = React.useState(false);

	const [selectedTag, setSelectedTag] = React.useState('');

	const [currentEditPlant,setCurrentEditPlant] = React.useState([]);

	const [weight, setWeight] = React.useState('');
	const [editWeight, setEditWeight] = React.useState('');

	const [unit, setUnit] = React.useState('lbs');
	const [editUnit, setEditUnit] = React.useState('lbs');

	const [branchValue, setBranchValue] = React.useState('');

	const [editMode, setEditMode] = React.useState(false);

	const [removedPlantID, setRemovedPlantID] = React.useState("");

	const [tableVisible,setTableVisible] = React.useState(true);

	const [edittingHarvestDate, setEdittingHarvestDate] = React.useState(false);

	const [errorMessage, setErrorMessage] = React.useState('');

	const [hbName, setHbName] = React.useState('');

	const [hbNameError,setHbNameError] = React.useState(false);
	const [hbNameHelperText,setHbNameHelperText] = React.useState('');

	const [grantFreeMonthHintVisible,setGrantFreeMonthHintVisible] = React.useState(true);

	const [busy,setBusy] = React.useState(false);

	
	if(hbNameError && hbName.length === 0){
		setHbNameError(false);
		setHbNameHelperText('');
	  }


	let errorMessageText = errorMessage;

	let isEdittingHarvestDate = edittingHarvestDate;

	let tableIsVisible = tableVisible;

	let showTableText = "Show Table";
	if(tableIsVisible){
		showTableText = "Hide Table";
	}

	const handleClickedRow = (row) => {
		setEditWeight(row.weight+"");
		setEditUnit(row.unit);
		setCurrentEditPlant(row);
	  };

	  const handlePopupClosed = () => {
		  setCurrentEditPlant([]);
		};

	const handleCancelEdit = () => {
			setCurrentEditPlant([]);
		};

	const handleSaveEdit = () => {
		let newWeight = 0;
		try{
			newWeight = parseFloat(editWeight);
		}catch(err){
			
		}
		let i = 0;
              let foundIndex = -1;
              let foundHarvestRecord = new HarvestRecord('','','','','','');
              for(const val2 of JSON.parse(getHarvestRecords())){
                if(val2.tag===currentEditPlant.tag){
                  foundIndex = i;
                  if(isNaN(newWeight) || newWeight === 0){
                    newWeight = val2.weight;
                  }
                  foundHarvestRecord = new HarvestRecord(val2.id,val2.tag,newWeight,editUnit,val2.batchName,val2.userID);
                }
                i++;
              }
    
        if(foundIndex !== -1){
            let splicedHR = JSON.parse(getHarvestRecords());
            splicedHR.splice(foundIndex,1,foundHarvestRecord)
            setHarvestRecords(JSON.stringify(splicedHR));

  			updateHarvestRecord(getHarvestRecordItemFromRecord(foundHarvestRecord));
  		  }		
		setCurrentEditPlant([]);
		reloadPlantsAndHarvestRecords(currentHarvest);
		};

	const handleUndoEdit = () => {

			let newPlant = new Plant(userID,currentEditPlant.strain,currentEditPlant.tag,0);
			addPlant(getPlantItemFromPlant(newPlant));
			setBusy(true);
			let i = 0;
              let foundIndex = -1;
              let foundID = '';
              for(const val2 of JSON.parse(getHarvestRecords())){
                if(val2.tag===currentEditPlant.tag){
                  foundIndex = i;
                  foundID = val2.id;
                }
                i++;
              }
    
              if(foundIndex !== -1){
                let splicedHR = JSON.parse(getHarvestRecords());
                splicedHR.splice(foundIndex,1);
                setHarvestRecords(JSON.stringify(splicedHR));
				deleteHarvestRecord(currentEditPlant.id);	
			  }		
			setCurrentEditPlant([]);
			reloadPlantsAndHarvestRecords(currentHarvest);
		};

	
	function getPlantItemFromPlant(plant){
			let plantItem = {
			  tag: '',
			  strain: '',
			  userID: '',
			  active: ''
			  };
	  
			  plantItem.tag = plant.tag;
			  plantItem.strain = plant.strain;
			  plantItem.userID = plant.userID;
			  plantItem.active = plant.active;
	  
				  if(plant.itemID!==""){
					  plantItem.id = plant.itemID;
				  }
				  return plantItem;
			  }
			  
		async function addPlant(plantItem){
			fetch('/pl', {
			  method: (plantItem.tag) ? 'PUT' : 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(plantItem),
			}).then(function(response) {
			  return response.json();
			}).then(function(data) {
			  setBusy(false);
			});
		  }	  	
		
	async function deleteHarvestRecord(removePlantID){
			const response = fetch(`/hr/${removePlantID}`, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			}
			});
	  
			try{
			  await response.text();
			}catch(err){
			} 
			setBusy(false);
		  }
	  
	async function updateHarvestRecord(harvestRecordItem){
			const response = fetch('/hr', {
				  method: (harvestRecordItem.id) ? 'PUT' : 'POST',
				  headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(harvestRecordItem)
			});
			try{
			  await response.text();
			}catch(err){
			} 
			setBusy(false);
		  }	

	function getHarvestRecordItemFromRecord(currentHarvestRecord){
			let plant = {
				id: '',
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
			  plant.userID = currentHarvestRecord.userID;
			if(currentHarvestRecord.itemID!==""){
			  plant.id = currentHarvestRecord.itemID;
			}
			return plant;
		  }

	let searchForList = [];
	let strain = '';

	const [lastHarvestedPlant, setLastHarvestedPlant] = React.useState([]);

	const nextPlantRef = useRef();

	const ErrorMessageLabel = () => {
		return(
			<div style={{backgroundColor:bgColors.Red,padding:"10px"}}>{errorMessageText}</div>
		)
	}

	for (const val of JSON.parse(getPlants())) {
		strain = "";
		if(val.active===0){
			strain = val.strain;
		}
		if(strain !== "" && !searchForList.includes(strain)){
			searchForList.push(strain);
		}
	}
	searchForList = searchForList.sort(function (a, b) {
		return a.localeCompare(b); //using String.prototype.localCompare()
	  });
	searchForList.unshift("All Strains");

	const [searchStrain, setSearchStrain] = React.useState('All Strains');

	let selHB = '';

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
		try{
			for(let val of JSON.parse(getHarvestBatches())) {
				if(val.name === selectedHB){
					return new HarvestBatch(val.hbid,val.type,val.date,val.userID,val.name);
				}
			}
		}catch(excc){
			
		}
		return currentHBItem;
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
	}

	function getPlant(plantTag){
		for(let val of JSON.parse(getPlants())) {
			if(val.tag === plantTag){
				return new Plant(val.userID,val.strain,val.tag,val.active);
			}
		}
	}

	function removePlant(plantTag){
		let x = 0;
		let foundX = -1;
		let replaceEntry = [];
		for(let val of JSON.parse(getPlants())) {
			if(val.tag === plantTag){
				foundX = x;
				replaceEntry = val;
				if(currentHarvest.type === 0){
					replaceEntry.active = 1;
				}
			}
			x++;
		}
		if(foundX !== -1){
			let pl = JSON.parse(getPlants());
			let spliced = [];
			let x = 0;
			for(let val of pl){
				if(x === foundX){
					spliced.push(replaceEntry);
				}else{
					spliced.push(val);
				}
				x++;
			}
			//let spliced = pl.splice(foundX,1,JSON.stringify(replaceEntry));
			setPlants(JSON.stringify(spliced));
		}
	}

	currentHarvest = getHarvestBatch(selectedHB);

  	const handleDayChange = (event) => {
    	setDay(event.target.value);
	  };

	const handleRevertChanges = () => {
		revertChanges();
	  };  

	function revertChanges(){
		resetHarvestForm(true);
	}
	
	function editHarvestDate(){
		setEdittingHarvestDate(true);
		let monthVal = parseInt(currentHarvest.date.substring(0,2),10)
		setMonthValue(monthVal);
		let dayVal = parseInt(currentHarvest.date.substring(3,5),10);
		setDayValue(dayVal);
		let yearVal = parseInt(currentHarvest.date.substring(6,10),10);
		setYearValue(yearVal);
		refreshOuter();
	}

	function saveHarvestDate(){
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
	 
	const handleEditWeight = (event) => {
		setEditWeight(event.target.value);
	  };  

	const handleUnitSelect = (event) => {
		setUnit(event.target.value);
	  };

	  const handleEditUnitSelect = (event) => {
		setEditUnit(event.target.value);
	  };

	  /*
	const handleSearchParamSelect = (event) => {
		setSearchParam(event.target.value);
	  };
*/
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
		if(!hbOptionsList.includes(val.name)){
			hbOptionsList.push(val.name);
		}
	  }

	if(JSON.stringify(currentHBItem) !== "[]"){
		if(!hbOptionsList.includes(currentHBItem.name)){
			hbOptionsList.push(currentHBItem.name);
		}
	}

	let tagList = searchTag ? commitSearch(): ["Search For Results"];

	let currSelectedTag = selectedTag;
	if(tagList.length>0 && selectedTag === ''){
		currSelectedTag = tagList[0];
	}
	
	let currWeightChanges = [];

	function setWeightChanges(currentWeightChanges){
		currWeightChanges = currentWeightChanges;
	}

	function getWeightChanges(){
		return currWeightChanges;
	}

	let currHidePlants = [];

	function setHidePlants(currentHidePlants){
		currHidePlants = currentHidePlants;
	}

	let changeHBHiddenNow = changeHBHidden;

	if(selectedHB==="Add New Harvest Batch"){
		changeHBHiddenNow=true;
	}

	let hbInfoTabsHiddenNow = true;

	if(!(currentHarvest === undefined || currentHarvest.name === '' || JSON.stringify(currentHarvest)) === "[]"){
		hbInfoTabsHiddenNow=false;
	}

	let harvestTypeLabelText = "Harvest";
	if(!(currentHarvest === undefined || currentHarvest.name === '')){
		if(currentHarvest.type==="1"){
			harvestTypeLabelText = "Manicure";
		}
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

  const handleTutorialLink = () => {
	setCurrentPage('tutorial-form');
	};

  var tutorialLink = <a onClick={handleTutorialLink} style={{cursor:"pointer",textDecoration:"none"}}>tutorial.</a>;

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

  let entryTutorialWidth = "500px";
  let entryTutorialFontSize = "17px";
  const[entryTutorialVisible,setEntryTutorialVisible] = React.useState(true);
  const[referalVisible,setReferalVisible] = React.useState(false);
  const[offerVisible,setOfferVisible] = React.useState(false);

  if(isMobile){
	entryTutorialWidth = "340px";
	entryTutorialFontSize = "15px";
  }

	function searchTagFromSpeech(searchText,searchText2){
		let fixedSearch = searchText;
		    while(fixedSearch.includes(" to ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to ")) + 2 + fixedSearch.substring(fixedSearch.indexOf(" to ")+4);
			}
			while(fixedSearch.includes(" to")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to")) + 2 + fixedSearch.substring(fixedSearch.indexOf(" to")+3);
			}
			while(fixedSearch.includes("to ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("to ")) + 2 + fixedSearch.substring(fixedSearch.indexOf("to ")+3);
			}
			while(fixedSearch.includes(" for ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" for ")) + 4 + fixedSearch.substring(fixedSearch.indexOf(" for ")+5);
			}
			while(fixedSearch.includes(" for")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" for")) + 4 + fixedSearch.substring(fixedSearch.indexOf(" for")+4);
			}
			while(fixedSearch.includes("for ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("for ")) + 4 + fixedSearch.substring(fixedSearch.indexOf("for ")+4);
			}
			while(fixedSearch.includes("one")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("one")) + 1 + fixedSearch.substring(fixedSearch.indexOf("one")+3);
			}
			while(fixedSearch.includes(" ")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" ")) + fixedSearch.substring(fixedSearch.indexOf(" ")+1);
			}
			while(fixedSearch.includes("-")){
			    fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf("-")) + fixedSearch.substring(fixedSearch.indexOf("-")+1);
			}
			if(searchText2.includes("lb") || searchText2.includes("lbs") || searchText2.includes("pounds")){
				enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf(" ")),0);
			}else{
				if(searchText2.includes(" ")){
					enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf(" ")),1);
				}else{
					if(searchText2.includes("g")){
						enterWeightFromSpeech(searchText2.substring(0,searchText2.indexOf("g")),1);
					}
				}
			}
		setSearchTag(fixedSearch);
	}

	function getWeightAndUnit(w,u){
        if(w==0){
          return "";
        }else{
          return w + " " + u;
        }
      }

	function enterWeightFromSpeech(weight,unit){
		if(!isNaN(weight)){
			setWeight(weight);
			if(unit === 0){
				setUnit('lbs');
			}else{
				setUnit('g');
			}
		}
	}

	function nextPlantFromSpeech(){
		nextPlantRef.current.click();
	}

	function voiceCommand(text){
	}

	function fixStrain(strain){
		if(strain.length>8){
			strain = strain.substring(0,8);
		}
		return strain;
	}

	function commitSearch(){
		let newTagList = [];
		let plantTags = [];

		for (const val of JSON.parse(getPlants())) {
			if(val.active === 0){
				plantTags.push(val.tag);
			}
		}

		/*if(searchParam==="Contains"){
			for(const tag of plantTags){
				let p = getPlant(tag);
				if((p!==undefined)&&(p.tag.includes(searchTag))&&(!p.harvested)){
					if((searchStrain === 'All Strains') || (searchStrain === p.strain)){
						newTagList.push(p.tag + " | " + p.strain);
					}
				}
			}
		}else if(searchParam==="Ends With"){*/
			for(const tag of plantTags){
				let p = getPlant(tag);
				if((p!==undefined)&&(p.tag.substring(p.tag.length-searchTag.length)===(searchTag))&&(!p.harvested)){
					if((searchStrain === 'All Strains' )|| (searchStrain === p.strain)){
						newTagList.push(p.tag + " | " + fixStrain(p.strain));
					}
				}
			}
		//}

		return newTagList; 
	}

	function reloadHarvestBatchesFromAddHB(harvestBatchItem){
		setHbName("");
		setCurrentHBItem(harvestBatchItem);
		reloadHarvestBatches(harvestBatchItem)
	}

	function isValidHBName(str){
		for(let val of JSON.parse(getHarvestBatches())){
			if(val.name === str){
				setHbNameError(true);
				setHbNameHelperText("Batch exists already.");
				return false;
			}
		}
		var minNumberofChars = 1;
		var maxNumberofChars = 24;
		var regularExpression = /^[a-zA-Z0-9!_\- ]{1,24}$/;
		if(str.length < minNumberofChars || str.length > maxNumberofChars){
			setHbNameError(true);
			setHbNameHelperText("Must include only letters,numbers,[-!_], or spaces.");
		  return false;
		}
		if(!regularExpression.test(str)) {
			setHbNameError(true);
			setHbNameHelperText("Must include only letters, numbers, [-!_], or spaces.");
		  return false;
		}
		return true;
	  }

	function addNewHB(){
		if(isValidHBName(hbName)){
			let hbDate = getTodayStr();
		if(day==='yesterday'){
			hbDate=getYesterdayStr();
		}

		let harvType = 0;
		if(harvestType === "manicure"){
			harvType = 1;
		}

		for(const val of JSON.parse(getHarvestRecords())) {  
			if(val.name === hbName){
				return false;
			}
		}

		let harvID = makeid(8);

		addedHB = new HarvestBatch(harvID,harvType,hbDate,userID,hbName);

		setSelectedHB(hbName); //xx
		setChangeHBHidden(false);
		setErrorMessage("");
		setHbNameError(false);
		setHbNameHelperText('');
		return true;
		}
		return false;
	}

	let tableWidth = "600px";
    
    if(isMobile){
      tableWidth = "345px";
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
		setTableVisible(!tableIsVisible);
		resetHarvestForm(false);
	}

	function closeEntryTutorial(){
		setEntryTutorialVisible(false);
	}

	function closeReferal(){
		setReferalVisible(false);
	}

	function closeOffer(){
		setOfferVisible(false);
	}

	function goToOffer(){
		let uid = userID;
		executeLogout();
		setOffer(true);
		setNewUsername(uid);
		setCurrentPage('stripe-form');
	}

	function closeGrantFreeMonthHint(){
		setGrantFreeMonthHintVisible(false);
	}

	function dontShowAgain(){
		updateTutorials();
		closeEntryTutorial();
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

	const handleHbNameChange = (event) => {
		setHbName(event.target.value);
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
		
		let plantCount = 0;
		for(const val of JSON.parse(getHarvestRecords())) {  
			if(val.batchName === currentHarvest.hbid){
                plantCount++;
			}
		}

		if(plantCount>=150){
            setErrorMessage("Harvest Batch cannot exceed 150 items. Create new batch to continue.");
			setLastHarvestedPlant([]);
			return false;
		}

		if(isNumeric(weight)){
			if(Array.isArray(tagList) && tagList.length>0){
				let plantTag = currSelectedTag;
				if(plantTag !== ''){
					plantTag = plantTag.substring(0,plantTag.indexOf(" | "));
					currSelectedTag = '';
				}

				let addPlant = getPlant(plantTag);
				if(addPlant===null||addPlant===undefined){
					return false;
				}
				currentHarvestRecord = new HarvestRecord('',plantTag,0,'',currentHarvest.hbid,userID);
				if(weight===""||weight===undefined){
					currentHarvestRecord.weight=getBranchWeight();
				}else{
					currentHarvestRecord.weight=parseFloat(weight)+getBranchWeight();

				}
				if(currentHarvestRecord.weight===0){
					return false;
				}
				currentHarvestRecord.unit=unit;
				setLastHarvestedPlant(currentHarvestRecord);
								
				removePlant(plantTag)

				let plantTags = [];

				for (const val of JSON.parse(getPlants())) {
					plantTags.push(val.tag);
				}
				return true;
			}
		}
		return false;
	}

	function updateHBList(addID){
		let hbID = currentHarvest.hbid;

		let foundX = -1;
		let x = 0;
		let parsedHBs = getHarvestBatches();
		for(const hb of parsedHBs){
			if(hb.hbid === hbID){
				foundX = x;
			}
			x++;
		}  
		let replaceHB = parsedHBs[foundX];
		let plantList = replaceHB.plantList;
		let textSplit = plantList.substring(1,plantList.length-1);
		textSplit = textSplit.split(",");
		let newPlantList = "{";

		let i = 0;
		textSplit.forEach((element) => {
			if(element !== ""){
				newPlantList += element + ",";
				i++;
			}
		});
		newPlantList+= addID + "}";
		if(i === 0){
			newPlantList = "{" + addID + "}";
		}

		replaceHB.plantList = newPlantList;
		parsedHBs.splice(foundX,1,replaceHB);
		setHarvestBatches(JSON.stringify(parsedHBs));
		let tempHB = parsedHBs[foundX];
		currentHarvest = new HarvestBatch(tempHB.hbid,tempHB.type,tempHB.date,userID,tempHB.name);
	}

	function resetHarvestForm(resetLastHarvested){
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
	}

	function reloadFromEditButton(){
		reloadPlantsAndHarvestRecords(currentHarvest);
	}

	function setChanges(){
		setWeight("");
		setBranchValue("");
		setSearchTag("");
		setSelectedTag('');
	}

	function interceptSetNewHarvestRecordID(data,harvestRecordItem){
		let lhp = lastHarvestedPlant;
		try{
			lhp.itemID = data.insertId;
		}catch(err){

		}
		
		setLastHarvestedPlant(lhp);
		setNewHarvestRecordID(data.insertId,harvestRecordItem);
	}

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
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleEditHarvestDate} style={{minWidth: "20px",maxWidth: "20px",minHeight: "20px",maxHeight: "20px",marginLeft:"5px"}}>
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

	function getTodayStr(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
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
		let toRet = removedPlantID;
		setRemovedPlantID("");
		return toRet;
	}

	function getRemovePlantIDDelete(uid){
		for(let val of JSON.parse(getHarvestRecords())){
			if(val.uid === uid){
				return val.id;
			}
		}
		return '';
	}

	function getHarvestRecordItem(){
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
		return plant;
	}

	function getLastHarvestRecordItem(){
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

		return plant;
	}

	function getStrainForPlantItem(tag){
		if(tag === null){
			tag = currentHarvestRecord.tag;
		}
		for(let val of JSON.parse(getPlants())){
			if(val.tag === tag){
				return val.strain;
			}
		}
	}

	function getPlantItem(active,plantTag,strain){

		let plant = {
			tag: '',
			strain: '',
			userID: '',
			active: ''
		  };

		plant.tag = plantTag;
		plant.strain = strain;
		plant.userID = userID;
		plant.active = active;

		if(currentHarvestRecord.itemID!==""){
			plant.id = currentHarvestRecord.itemID;
		}

		return plant;
	}

	function getHarvestBatchItem(addNew){
		
		let hb = {
			hbid: '',
			userID: '',
			type: '',
			date: '',
			name: ''
			};

		let ch = currentHarvest;
		if(addNew){
			ch = addedHB;
		}
		hb.userID = userID;
		hb.type = ch.type;
		hb.date = ch.date;
		hb.name = ch.name;
		/*
		if(!addNew && ch.id!=="" && ch.id !==null){
			hb.id = ch.id;
		}else{
			hb.id = ch.id;
		}*/
		hb.hbid = ch.hbid;
		if(ch.itemID!==""){
			hb.id = ch.itemID;
		}


		return hb;
	}

	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * 
		  charactersLength));
	   }
	   return result;
	}

	async function updateTutorials(){
		tutorials = "0" + tutorials.substring(1);
        fetch(`/user/tutorials/${userID}/${tutorials}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(function(response) {
			setTutorials(tutorials);
        }).then(function(data) {
        });
    }


	let tableFontSize = "18px";
	let tableFontSizeBig = "20px";
	if(isMobile){
		tableFontSize = "16px";
	    tableFontSizeBig = "18px";
	}

	function getStrainFromTag(tag){
		for(let val of JSON.parse(getPlants())){
		  if(val.tag === tag){
			return val.strain;
		  }
		}
	  }

	  function createData(id, tag, strain, weight, unit) {
		return {id, tag, strain, weight, unit};
	  }

	let rows = [];
      try{
        for(let val of JSON.parse(getHarvestRecords())) {  
          if(val.batchName === currentHarvest.hbid){
            let hidden = false;
            for(let val2 of currHidePlants){
              if(val2 === val.tag){
                hidden = true;
              }
            }
            if(!hidden){
              rows.push(createData(val.id,val.tag,getStrainFromTag(val.tag),val.weight,val.unit));
            }
          }
        }
      }catch(error){
  
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
				
				{(offerVisible && freeTrail && !outdoorOffer) ? <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:entryTutorialWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				
				<div style={{margin:"5px",textAlign:"center",fontSize:entryTutorialFontSize}}>Outdoor Harvest Sale: Get 50% off 3 months!</div>
				<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{width:"100%"}}
			>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={goToOffer}>Go To Offer</Button>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={closeOffer}>Close</Button>
				</Grid>
				</Grid> : null}
				{(entryTutorialVisible && tutorials.substring(0,1)==="1") ? <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:entryTutorialWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				
				<div style={{margin:"5px",textAlign:"center",fontSize:entryTutorialFontSize}}>Before harvesting, open the menu and visit the {tutorialLink}</div>
				<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{width:"100%"}}
			>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={dontShowAgain}>Don't show again</Button>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={closeEntryTutorial}>Close</Button>
				</Grid>
				</Grid> : null}

				{(grantFreeMonthCode!=="" && grantFreeMonthHintVisible) ? <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:entryTutorialWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				
				<div style={{margin:"5px",textAlign:"center",fontSize:entryTutorialFontSize}}>Thanks for signing up with a referral code! Import your plants in the Manage Plants section to activate a month free for the account that sent you the referral code.</div>
				<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{width:"100%"}}
			>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={closeGrantFreeMonthHint}>Close</Button>
				</Grid>
				</Grid> : null}
				
				{(referalVisible && !freeTrail && !outdoorOffer) ? <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:entryTutorialWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				
				<div style={{margin:"5px",textAlign:"center",fontSize:entryTutorialFontSize}}>Get one month free for you and a friend! Just send them this link: {referalLink}</div>
				<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{width:"100%"}}
			>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={closeReferal}>Close</Button>
				</Grid>
				</Grid> : null}

				<div style={{display:"flex",flexDirection:"column",width:"350px"}}>

				{changeHBHiddenNow ?
				<div className="full tr" style={{border:"1px solid #d7d7d7",borderRadius:5}}>
				<div style={{margin:"10px"}}>
			  <Grid
					  container
					  direction="column"
						justify="center"
					  alignItems="center"
				  >
  
				  <FormLabel component="legend" style={{marginTop:"5px"}}><b>New Harvest Batch</b></FormLabel>
  
				  <Grid
					  container
					  direction="row"
						justify="center"
					  alignItems="center"
				  >
				  <TextField id="changeHBField" helperText={hbNameHelperText} error={hbNameError} value={hbName} onChange={handleHbNameChange} label="Batch Name"/> 
				  {showHints ? <div class="tooltip">?
						<span class="tooltiptext">Harvest Batch Name. Harvest batches should only be one strain and for only one day.</span>
				  </div>  : null}
				  
				  </Grid>
				  
				  <Grid
					  container
					  direction="row"
						justify="center"
					  alignItems="center"
				  >
				  <FormControl component="fieldset" style={{marginTop:"10px",marginBottom:"5px"}}>
						<FormLabel component="legend">Harvest Date</FormLabel>
						<RadioGroup aria-label="Harvest Date" name="harvest-date" value={day} onClick={handleDayChange} row>
						  <FormControlLabel value="today" control={<Radio />} label="Today" />
						  <FormControlLabel value="yesterday" control={<Radio />} label="Yesterday" />
						</RadioGroup>
				  </FormControl>
				  {showHints ? <div class="tooltip">?
						<span class="tooltiptext">Harvest date can be changed to any date after the batch is created.</span>
				  </div>  : null}
				  
				  </Grid>
  
				  <Grid
					  container
					  direction="row"
						justify="center"
					  alignItems="center"
				  >
				  <FormControl component="fieldset" style={{marginBottom:"5px"}}>
						<FormLabel component="legend">Harvest Type</FormLabel>
						<RadioGroup aria-label="Harvest Type" name="harvest-type" value={harvestType} onClick={handleHarvestTypeChange} row>
						  <FormControlLabel value="harvest" control={<Radio />} label="Harvest" />
						  <FormControlLabel value="manicure" control={<Radio />} label="Manicure" />
						</RadioGroup>
				  </FormControl>
				  {showHints ? <div class="tooltip">?
						<span class="tooltiptext">This is final. Manicures and full harvests must be separated into different batches.</span>
				  </div>  : null}
				  
				  </Grid>
  
				  </Grid>
  
  
				  <Grid
					  container
					  direction="row"
						justify="center"
					  alignItems="center"
				  >
					  <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancelNewHB}>Cancel</Button>
					  <AddHarvestBatchButton getHarvestBatchItem={getHarvestBatchItem} addNewHB={addNewHB} resetHarvestBatches={resetHarvestBatches} currentHarvest={currentHarvest} setNewHBID={setNewHBID} reloadHarvestBatchesFromAddHB={reloadHarvestBatchesFromAddHB} setHbName={setHbName}></AddHarvestBatchButton>
				  </Grid>
				  </div>
			</div> :
							<Grid
							container
							direction="column"
							  justifyContent="center"
							alignItems="center"
						>
						<FormLabel>Choose Harvest Batch</FormLabel>
						<Grid
							container
							direction="row"
							  justifyContent="center"
							alignItems="center"
						>
							<Select id="change-HB-select" value={selectedHB} onChange={handleSelectHB} style={{width:"80%"}}>
								{hbOptionsList.map((name, index) => (
									<MenuItem key={index} value={name}>
									  {name}
									</MenuItem>
								  ))}
							 </Select>
							 {showHints ? <div class="tooltip">?
								  <span class="tooltiptext">Create and select harvest batch.</span>
							</div>  : null}
							 
							</Grid>
						</Grid>
				}
				
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
				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				<Select id="search-for-strain-select" value={searchStrain} onChange={handleChangeSearchForStrainSelect} style={{width:"80%"}}>
                	{searchForList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
				 {showHints ? <div class="tooltip">?
  					<span class="tooltiptext">Filter your search by strain.</span>
				</div>  : null}
				 
				</Grid>


				</Grid>
              <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <TextField id="search-field" value={searchTag} label="Searching For Tag" onChange={handleSearchTag} style={{width:"80%"}}/>
          </Grid>
  
          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
        
        <FormControl style={{width:"80%",marginTop:"15px"}}>
            <InputLabel id="search-results-label">Results</InputLabel>
            <Select 
              id="search-results-select"
              label="Results"
              labelId ="search-results-label" 
              value={currSelectedTag} 
              onChange={handleSelectedTag} 
              >
                    {tagList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
              justify="center"
            alignItems="center"
          >
  
          <div style={{display:"flex",flexDirection:"row",flexWrap:"nowrap",width:"80%"}}>
  
          <TextField id="Weight" label="Weight" value={weight} onChange={handleWeight} style={{width:"100%"}}/>
  
          <FormControl fullWidth>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select 
              id="unit-select"
              label="Unit"
              labelId ="unit-select-label" 
              value={unit} 
              onChange={handleUnitSelect} 
              style={{width:"100%"}}>
                    {unitList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>
          
          </div>
		  <Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
		  		<Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
					nextPlantFromSpeech={nextPlantFromSpeech} voiceCommand={voiceCommand}></Dictaphone>	
					</Grid>
		  <HarvestPlantButton plantRef={nextPlantRef} getHarvestRecordItem={getHarvestRecordItem} getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
				nextPlant={nextPlant} setChanges={setChanges} resetHarvestForm={resetHarvestForm} setNewHarvestRecordID={interceptSetNewHarvestRecordID} 
				updateHBList={updateHBList} getPlantItem={getPlantItem} harvestType={harvestType} getStrainForPlantItem={getStrainForPlantItem}></HarvestPlantButton>
    
	<Popup
	open={(JSON.stringify(currentEditPlant)!=="[]")}
    modal
    nested
    style={{width:"100%",display:"flex"}}
	onClose={handlePopupClosed}
  >
    {close => (
      <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex"}}>

        <div style={{backgroundColor:"#e4e4e4",margin:"auto",position:"relative",width:"320px"}}>
        <Button className="close" onClick={close}>
          &times;
        </Button>
		<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
			<div style={{width:"100%",textAlign:"center",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Plant Info</div> 
         	<TextField id="edit-tag" 
			 value={JSON.stringify(currentEditPlant)!=="[]" ? currentEditPlant.tag : null} 
			 label="Tag" 
			 style={{width:"80%",marginTop:"20px",marginBottom:"10px"}}
			 inputProps={
				{ readOnly: true, }
			}/>

			<TextField id="edit-strain" 
			 value={JSON.stringify(currentEditPlant)!=="[]" ? currentEditPlant.strain : null} 
			 label="Strain" 
			 style={{width:"80%",marginTop:"10px",marginBottom:"10px"}}
			 inputProps={
				{ readOnly: true, }
			}/>

			<TextField id="edit-weight" 
			 value={editWeight} 
			 onChange={handleEditWeight}
			 label="Weight" 
			 style={{width:"80%",marginTop:"10px",marginBottom:"10px"}}
			 />

			<FormControl style={{width:"80%",marginTop:"10px",marginBottom:"10px"}}>
            <InputLabel id="edit-unit-select-label">Unit</InputLabel>
            <Select 
              id="edit-unit-select"
              label="Unit"
              labelId ="edit-unit-select-label" 
              value={editUnit} 
              onChange={handleEditUnitSelect} 
              style={{width:"100%"}}>
                    {unitList.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                 </Select>
          </FormControl>

		  <div style={{display:"flex",flexDirection:"row"}}>
		  		<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancelEdit}>Cancel</Button>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleUndoEdit}>Undo Record</Button>
				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px",fontSize:"10px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSaveEdit}>Save</Button>
		  </div>
		</div>
      </div>
      </div>
    )}
  </Popup>
          </Grid>  
            
          
              </div>
				</Grid>
				</div>
					{(lastHarvestedPlant.tag === undefined) ? 
					<div></div> :
					<LastHarvested lastHarvestedPlant={lastHarvestedPlant} getStrainForPlantItem={getStrainForPlantItem} getLastHarvestRecordItem={getLastHarvestRecordItem} 
					getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
					setChanges={setChanges} resetHarvestForm={resetHarvestForm}
					getPlantItem={getPlantItem} harvestType={harvestType}></LastHarvested>}	
					
					{tableVisible ?
					<div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",width:tableWidth}}>
					<div style={{display:"flex",flexDirection:"row",width:"90%",marginTop:"15px",marginBottom:"5px"}}>
					  <div style={{textAlign:"left",width:"100%",whiteSpace:"nowrap",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",
					fontSize:tableFontSizeBig}}>Harvested Plants</div>
					  <div style={{textAlign:"right",width:"100%",whiteSpace:"nowrap",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",
					fontSize:tableFontSizeBig}}>Weight</div>
					</div>
					{rows.map((row) => (
					  <div style={{display:"flex",flexDirection:"row",width:"90%",marginTop:"5px",marginBottom:"5px"}} onClick={()=>{handleClickedRow(row)}}>
						<div style={{display:"flex",flexDirection:"column",width:"100%"}}>
						  <div style={{fontWeight:"bold",textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.tag}</div>
						  <div style={{textAlign:"left",whiteSpace:"nowrap",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{row.strain}</div>
						</div>
						<div style={{textAlign:"right",width:"100%",fontWeight:"bold",fontFamily:"Arial, Helvetica, sans-serif",fontSize:tableFontSize}}>{getWeightAndUnit(row.weight,row.unit)}</div>
					  </div>
				  ))}
				  </div>
				   :
	  null}
				</Grid>
		</div>
	);
}

export default HarvestForm;
/**.
 * <TableWrapper currHarvest={currentHarvest} getHarvestRecords={getHarvestRecords} editNow={editNow} 
      currWeightChanges={currWeightChanges} setWeightChanges={setWeightChanges} 
      getRemovePlantIDDelete={getRemovePlantIDDelete} currHidePlants={currHidePlants} setHidePlants={setHidePlants}
      getPlants={getPlants}></TableWrapper>
 */
//				<Button style={{marginTop:"5px",marginBottom:"5px",marginRight:"5px"}} variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddBranch}>Add Branch</Button>
/*<Select id="search-param-select" value={searchParam} onChange={handleSearchParamSelect} style={{minWidth:"120px",marginTop:"15px"}}>
                	{searchOptionsList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select> */


				 /*

				 <Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
				<FormLabel style={{marginTop:"8px"}} component="legend">Search For Strain</FormLabel>
				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				<Select id="search-for-strain-select" value={searchStrain} onChange={handleChangeSearchForStrainSelect} style={{width:"180px"}}>
                	{searchForList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
				 {showHints ? <div class="tooltip">?
  					<span class="tooltiptext">Filter your search by strain.</span>
				</div>  : null}
				 
				</Grid>


				</Grid>
				
				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<TextField id="search-field" value={searchTag} label="Search Tag" onChange={handleSearchTag} style={{width:"180px"}}/>
				{showHints ? <div style={{marginTop:"15px"}}>
				<div class="tooltip">?
  					<span class="tooltiptext">Search for plants here. Choose "Contains" or "Ends with". Searching for three or more digits is recommended.</span>
				</div>
				</div> : null}
				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
			
				<Select id="searchTagSelect" value={currSelectedTag} onChange={handleSelectedTag} style={{width:"180px",marginTop:"15px",direction:"rtl"}}>
                	{    
                    tagList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
				 {showHints ? <div class="tooltip">?
  					<span class="tooltiptext">Search above and the most relevant option will appear here. Click to see all tags that match the search.</span>
				</div>  : null}
				 
				</Grid>

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>

				<TextField id="Weight" value={weight} onChange={handleWeight} style={{width: "100px"}}/>

				<Select id="unit-select" value={unit} onChange={handleUnitSelect} style={{width:"80px"}}>
                	{unitList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>

				 {showHints ? <div class="tooltip">?
  					<span class="tooltiptext">Enter weight and choose unit.</span>
				</div>  : null}
				
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

				<HarvestPlantButton plantRef={nextPlantRef} getHarvestRecordItem={getHarvestRecordItem} getAndResetRemovedPlantID={getAndResetRemovedPlantID} getHarvestBatchItem={getHarvestBatchItem} 
				nextPlant={nextPlant} setChanges={setChanges} resetHarvestForm={resetHarvestForm} setNewHarvestRecordID={interceptSetNewHarvestRecordID} 
				updateHBList={updateHBList} getPlantItem={getPlantItem} harvestType={harvestType} getStrainForPlantItem={getStrainForPlantItem}></HarvestPlantButton>

				</Grid>

                {(errorMessageText.length!==0) ? <ErrorMessageLabel></ErrorMessageLabel> : null}

				<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				>
				<Dictaphone searchTagFromSpeech={searchTagFromSpeech} enterWeightFromSpeech={enterWeightFromSpeech}
					nextPlantFromSpeech={nextPlantFromSpeech} voiceCommand={voiceCommand}></Dictaphone>	
					{showHints ? <div class="tooltip">?
  					<span class="tooltiptext">For voice control, say these commands. Command 1: "Search [tag]", eg. "Search 026". Command 2: "[Weight] [unit]", eg. "1.2 pounds". Command 3: "Next Plant".</span>
				</div>  : null}
					
				</Grid>
				 */



				/*
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
				    setHarvestRecords={setHarvestRecords} setPlants={setPlants} resetHarvestForm={resetHarvestForm}
				    reloadFromEditButton={reloadFromEditButton}></EditButton> : null}
				 
				 </Grid>
				*/