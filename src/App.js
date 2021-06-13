import React from "react";
import "./styles.css";
import Header from './components/Header.component';
import Outer from './components/Outer.component';
import LogIn from './components/LogIn.component';
import { Button } from "@material-ui/core";

export default class App extends React.Component {
  state = {
    currentPage: 'harvest-form',
    loggedIn: '',
    harvestBatches: [],
    plants: [],
    harvestRecords: [],
    responseFromPlants: [],
    plantsLoading: true,
    harvestRecordsLoading: true,    
    harvestBatchesLoading: true,
    currentHarvest: [],
    users: [],
    usersLoading: true,
    userID: ""
  };
  componentDidMount() {
    /*
    axios.get("/users.json").then((response) => {
      this.setState({ users: response.data });
    });*/
    console.log("Component Did Mount - App.js");

    console.log("Before Get Users");
    this.getUsersFromDB(true);
    console.log("After Get Users");

    console.log("Before GetHarvestBatches")
    this.getHarvestBatchesFromDB();
    console.log("After GetHarvestBatches")

    console.log("Before GetPlants")
    this.getPlantsFromDB(true);
    console.log("After GetPlants")

    console.log("Before GetHarvestRecords")
    this.getHarvestRecordsFromDB(true);
    console.log("After GetHarvestRecords")
  }

  engageReload = () => {
    console.log("Engage Reload || pl: " + this.state.plantsLoading + " | hpl: " + this.state.harvestRecordsLoading + " | hbl: " + this.state.harvestBatchesLoading);
    if(!this.state.usersLoading || !this.state.plantsLoading && !this.state.harvestRecordsLoading && !this.state.harvestBatchesLoading){
      console.log("Force Updated In App.js");
      this.forceUpdate();
    }
  }

  getUsersFromDB = async (reload) => {
    console.log("In GetUsers FROM DB")
    const response = await fetch('/api/users');
    const text = await response.text();
    console.log("API GET USERS: " + text);
    this.state.users = text;
    this.state.usersLoading = false;
    console.log("Leaving GetUsers FROM DB")
    if(reload){
      this.engageReload();
    }
  }

  getPlantsFromDB = async (reload) => {
    console.log("In GetPlants")
    const response = await fetch('/api/pl');
    const text = await response.text();
    console.log("API GET PLANTS: " + text);
    this.state.plants = text;
    this.state.plantsLoading = false;
    console.log("Leaving GetPlants")
    if(reload){
      this.engageReload();
    }
  }

  getHarvestRecordsFromDB = async (reload) => {
    console.log("In GetHarvestRecords")
    const response = await fetch('/api/hr');
    const text = await response.text();
    console.log("API GET HARVESRECORDS: " + text);
    this.state.harvestRecords = text;
    this.state.harvestRecordsLoading = false;
    console.log("Leaving GetHarvestRecords")
    if(reload){
      this.engageReload();
    }
  }

  getHarvestBatchesFromDB = async () => {
    console.log("In GetHarvestBatches")
    if(this.state.userID == ""){
      console.log("State.userID is empty");
      return;
    }
    const response = await fetch(`/api/hb/${this.state.userID}`);
    const text = await response.text();
    console.log("API GET HARVESTBATCHES: " + text);
    this.state.harvestBatches = text;
    this.state.harvestBatchesLoading = false;
    console.log("Leaving GetHarvestBatches")
    this.engageReload();
  }

  getHarvestBatchesForReset = async (currHarvest) => {
    console.log("In GetHarvestBatchesFORRESET")
    const response = await fetch('/api/harvestbatches');
    const text = await response.text();
    console.log("API GET HARVESTBATCHES: " + text);
    this.state.harvestBatches = text;
    this.state.harvestBatchesLoading = false;
    console.log("Leaving GetHarvestBatchesFORRESET");
    this.executeResetHarvestBatches(currHarvest);
  }


  SetCurrentPage = (currentPage) => {
		
    console.log("Set Current Page: " + currentPage);
    this.state.currentPage = (currentPage);
    this.forceUpdate();
  }

  doPost = () => {
    console.log("Handle Post");

    let plantItem = {
      strain: 'JOHNNY',
      tag: '666'
      };    
    console.log("PLANT ITEM: " + JSON.stringify(plantItem));
//method: (plantItem.id) ? 'PUT' : 'POST',

    fetch('/posttest', {
      method: (plantItem.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantItem)
    })
    .then(res => res.text())
    .then(responseFromPlants => this.setState({ responseFromPlants }));
  }

  resetHarvestBatches = (currHarvest) => {
    console.log("RESET HARVEST BATCHES-CurrHarvest: " + currHarvest);
    console.log("RESET HARVEST BATCHES-CurrHarvest: " + JSON.stringify(currHarvest));

    setTimeout(() =>  this.getHarvestBatchesForReset(currHarvest),0); 

    this.setState({harvestBatchesLoading: true, currentHarvest: currHarvest});
  }

  executeResetHarvestBatches = (currHarvest) => {
    console.log("Enter executeresetharvestbatches");

    setTimeout(() => this.engageReload(),0); 

    let currHarvestID = -1;

    console.log("RESET Harvest Batches");
    console.log("HarvestBatches: " + this.state.harvestBatches);
    console.log("CurrHarvest: " + JSON.stringify(currHarvest));
    console.log("CurrHarvest.name: " + currHarvest.name);

    let parsedHarvestBatches = JSON.parse(this.state.harvestBatches);

    for(let val of parsedHarvestBatches){
			console.log("Val: " + JSON.stringify(val));
      console.log("Val.name: " + val.name);
			if(val.name == currHarvest.name){
				console.log("Found HarvestBatch: " + val.name);
        currHarvestID = val.id;
			}
		}

    currHarvest.id = currHarvestID;
  }

  resetAll = (currHarvest) => {
    this.setState({harvestBatchesLoading: true, plantsLoading: true, harvestRecordsLoading: true, currentHarvest: currHarvest});

    console.log("RESETTING ALL");

    console.log("Before Get Users");
    this.getUsersFromDB(true);
    console.log("After Get Users");

    console.log("Before GetHarvestBatches")
    this.getHarvestBatchesFromDB();
    console.log("After GetHarvestBatches")

    console.log("Before GetPlants")
    this.getPlantsFromDB(true);
    console.log("After GetPlants")

    console.log("Before GetHarvestRecords")
    this.getHarvestRecordsFromDB(true);
    console.log("After GetHarvestRecords")

    this.forceUpdate();
  }

  reloadPlants = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    console.log("RELOAD PLANTS");
    console.log("Before GetPlants");
    this.getPlantsFromDB(false);
    console.log("After GetPlants");
  }

  reloadUsers = () => {
    console.log("RELOAD USERS");
    console.log("Before GetUsersFromDB");
    setTimeout(() => {return this.state.users;},0); 
    this.getUsersFromDB(false);
    console.log("After GetUsersFromDB");
  }

  reloadPlantsAndHarvestRecords = (currHarvest) => {
    this.setState({currentHarvest: currHarvest, plantsLoading: true, harvestRecordsLoading: true});

    console.log("RELOAD PLANTS AND HARVEST RECORDS");
    console.log("Before GetPlants");
    this.getPlantsFromDB(true);
    console.log("After GetPlants");

    console.log("Before GetHarvestRecordsFROMDB");
    this.getHarvestRecordsFromDB(true);
    console.log("After GetHarvestRecordsFROMDB");
  }

  setNewHBID = (newID,hb) => {
    console.log("SET NEW HB ID");
		
      console.log("NEW HB: " + hb);
      console.log("NEW HB(STRING): " + JSON.stringify(hb));
      hb.id = newID;
      console.log("NEW HB ID: " + hb.id);
      console.log("NEW HB ID(STRING): " + JSON.stringify(hb.id));
      console.log("NEW HB(STRING): " + JSON.stringify(hb));

      let tempHarvestBatches = this.state.harvestBatches;
      console.log("TempHarvestBatches: " + tempHarvestBatches);
			tempHarvestBatches = tempHarvestBatches.substring(0,tempHarvestBatches.length-1) + "," + JSON.stringify(hb) + "]";
      console.log("TempHarvestBatches ADDED");
      console.log("TempHarvestBatches: " + tempHarvestBatches);

      this.setState({harvestBatches: tempHarvestBatches});

		  console.log("Harvest Batches Map AFTER SET NEW HB ID(STRINGIFIED): " + JSON.stringify(this.state.harvestBatches));
	}

  getCurrentHarvestID = (hbName) => {
    console.log("Get Current Harvest ID - HBName: " + hbName);
    let parsedHB = JSON.parse(this.state.harvestBatches);

    for(const val of parsedHB){
      console.log("Val(String): " + JSON.stringify(val));
      console.log("Val.name: " + val.name);
      if(val.name == hbName){
        console.log("Found harvestbatch! ID - " + val.id);
        return val.id;
      }
    }
  }

  setNewHarvestRecordID = (newID,hr) => {
    console.log("SET NEW HR ID");
		
      console.log("NEW HR: " + hr);
      console.log("NEW HR(STRING): " + JSON.stringify(hr));
      hr.id = newID;
      console.log("NEW HR ID: " + hr.id);
      console.log("NEW HR ID(STRING): " + JSON.stringify(hr.id));
      console.log("NEW HR(STRING): " + JSON.stringify(hr));

      let tempHarvestRecords = this.state.harvestRecords;
      console.log("TempHarvestRecord: " + tempHarvestRecords);
      if(tempHarvestRecords == "[]"){
        tempHarvestRecords = "[" + JSON.stringify(hr) + "]";
      }else{
        tempHarvestRecords = tempHarvestRecords.substring(0,tempHarvestRecords.length-1) + "," + JSON.stringify(hr) + "]";
      }
      console.log("TempHarvestRecords ADDED");
      console.log("TempHarvestRecords: " + tempHarvestRecords);

      this.setState({harvestRecords: tempHarvestRecords});

		  console.log("Harvest Record Map AFTER SET NEW HP ID(STRINGIFIED): " + JSON.stringify(this.state.harvestRecords));
	}

  setNewPlantID = (newID,plant) => {
    console.log("SET NEW PLANT ID");
		
      console.log("NEW PLANT: " + plant);
      console.log("NEW PLANT(STRING): " + JSON.stringify(plant));
      plant.id = newID;
      console.log("NEW PLANT ID: " + plant.id);
      console.log("NEW PLANT ID(STRING): " + JSON.stringify(plant.id));
      console.log("NEW PLANT(STRING): " + JSON.stringify(plant));

      let tempPlants = this.state.plants;
      console.log("TempPlants: " + tempPlants);
			tempPlants = tempPlants.substring(0,tempPlants.length-1) + "," + JSON.stringify(plant) + "]";
      console.log("Tempplants ADDED");
      console.log("TempPlants: " + tempPlants);

      this.setState({plants: tempPlants});

		  console.log("Plants Map AFTER SET NEW PLANT ID(STRINGIFIED): " + JSON.stringify(this.state.plants));
	}

  executeLogIn = (user, userID) =>{
    this.state.loggedIn=user;
    this.state.userID=userID;
    this.engageReload();
  }

  setAll = (plants,harvestRecords,harvestBatches) => {
    this.state.plants = plants;
    this.state.harvestRecords = harvestRecords;
    this.state.harvestBatches = harvestBatches;
    console.log("Set all!");
    console.log("$$$$$$$$$$$$");
    console.log("Plants: " + plants);
    console.log("Plants(STRING): " + JSON.stringify(plants));
    console.log("HarvestRecords: " + harvestRecords);
    console.log("HarvestRecords(STRING): " + JSON.stringify(harvestRecords));
    console.log("HarvestBatches: " + harvestBatches);
    console.log("HarvestBatches(STRING): " + JSON.stringify(harvestBatches));
    console.log("STATE.Plants(STRING): " + JSON.stringify(this.state.plants));
    console.log("STATE.HarvestRecords(STRING): " + JSON.stringify(this.state.harvestRecords));
    console.log("STATE.HarvestBatches(STRING): " + JSON.stringify(this.state.harvestBatches));
  }

  getPlants = () => {
    console.log("In App.js - Get Plants: " + this.state.plants);
    return this.state.plants;
  }

  getHarvestRecords = () => {
    console.log("In App.js - Get HarvestRecords: " + this.state.harvestRecords);
    return this.state.harvestRecords;
  }

  getHarvestBatches = () => {
    console.log("In App.js - Get HarvestBatches: " + this.state.harvestBatches);
    return this.state.harvestBatches;
  }

  getUsers = () => {
    console.log("In App.js - Get Users: " + this.state.users);
    console.log("In App.js - Get Users(STRING): " + JSON.stringify(this.state.users));

    if(JSON.stringify(this.state.users) == ""){
      console.log("Users is empty");
      this.usersLoading=true;
      this.getUsersFromDB(true);
    }else{
      console.log("Users is not empty");
    }
    console.log("Return state.users");
    return this.state.users;
  }

  setHarvestBatches = (harvestBatchesFromChild) => {
    console.log("SET HARVEST BATCHES - HB from child: " + harvestBatchesFromChild);
    this.state.harvestBatches = harvestBatchesFromChild;
    console.log("SET HARVEST BATCHES - state.hbMap after transfer: " + this.state.harvestBatches);
  }

  setPlants = (plantMapFromChild) => {
    console.log("SET PLANT MAP - PlantMap from child: " + plantMapFromChild);
    this.state.plant = plantMapFromChild;
    console.log("SET PLANTS - Plants after transfer: " + this.state.plants);
  }

  setHarvestRecords = (harvestRecordsMapFromChild) => {
    console.log("SET HARVESTRECORDS MAP - HarvestRecordsMap from child: " + harvestRecordsMapFromChild);
    this.state.harvestRecords = harvestRecordsMapFromChild;
    console.log("SET HARVESTRECORDS - HarvestRecords after transfer: " + this.state.harvestRecords);
  }

  render() {

    if(this.state.usersLoading || this.state.plantsLoading || this.state.harvestRecordsLoading || this.state.harvestBatchesLoading){
      return(<div>Loading...</div>);
    }

    console.log("Rendering - App.js");

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestRecords In State: " + this.state.harvestRecords);
    console.log("ResponseFromPlant In State: " + this.state.responseFromPlants);
    console.log("CurrentHarvest(STRING): " + JSON.stringify(this.state.currentHarvest));

	  console.log("Logged In: " + this.state.loggedIn);
	  let showForm;
    if (this.state.loggedIn != '') {
	  	showForm = <div>
	    <Header currentPageSet={this.SetCurrentPage} currentPage={this.state.currentPage}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.SetCurrentPage} getPlants={this.getPlants} getHarvestRecords={this.getHarvestRecords} getHarvestBatches={this.getHarvestBatches}
      resetHarvestBatches={this.resetHarvestBatches} resetAll={this.resetAll} currentHarvest={this.state.currentHarvest} setNewHBID={this.setNewHBID} getCurrentHarvestID={this.getCurrentHarvestID}
      setNewHarvestRecordID={this.setNewHarvestRecordID} setNewPlantID={this.setNewPlantID} userID={this.state.userID} setAll={this.setAll}
      setHarvestBatches={this.setHarvestBatches} setHarvestRecords={this.setHarvestRecords} setPlants={this.setPlants} reloadPlants={this.reloadPlants} reloadPlantsAndHarvestRecords={this.reloadPlantsAndHarvestRecords}/>
    </div>;
    }else{
		showForm = <div><LogIn getUsers={this.getUsers} executeLogIn={this.executeLogIn} reloadUsers={this.reloadUsers}></LogIn></div>;
    }
    return (
      <div className="App">
			{showForm}
		</div>
    );
  }
}
