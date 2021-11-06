import React from "react";
import "./styles.css";
import Header from './components/Header.component';
import Outer from './components/Outer.component';
import LogIn from './components/LogIn.component';
import StripeForm from "./components/StripeForm";
import ProductForm from "./components/ProductForm";
import CreateUserForm from './components/CreateUserForm.component';
import VerificationForm from './components/VerificationForm.component';
import ResetPasswordForm from './components/ResetPasswordForm.component';
import FindUserForm from './components/FindUserForm.component'
import LoginHeader from "./components/LoginHeader.component";
import Grid from '@material-ui/core/Grid';

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
    userID: "",
    subStatus: "",
    newUsername: ""
  };
  componentDidMount() {
  }
  
  engageReload = () => {
    if((!this.state.usersLoading) || (!this.state.plantsLoading && !this.state.harvestRecordsLoading && !this.state.harvestBatchesLoading)){
      console.log("Force Updated In App.js");
      this.forceUpdate();
    }
  }

  getUsersFromDB = async (username,password) => {
    const response = await fetch(`/api/users/${username}/${password}`);
    const text = await response.text();
    /*const responseTwo = await fetch(`/create-customer`);
    const json = await responseTwo.json();*/

    this.state.users = text;
    this.state.usersLoading = false;
    if(text === "0"){
      this.executeLogIn(username,text);
    }
  }

  getPlantsFromDB = async (reload) => {
    if(this.state.userID === ""){
      return;
    }
    const response = await fetch(`/api/pl/${this.state.userID}`);
    const text = await response.text();
    this.state.plants = text;
    this.state.plantsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getHarvestRecordsFromDB = async (reload) => {
    if(this.state.userID === ""){
      return;
    }
    const response = await fetch(`/api/hr/${this.state.userID}`);
    const text = await response.text();
    this.state.harvestRecords = text;
    this.state.harvestRecordsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getHarvestBatchesFromDB = async () => {
    if(this.state.userID === ""){
      return;
    }
    const response = await fetch(`/api/hb/${this.state.userID}`);
    const text = await response.text();
    this.state.harvestBatches = text;
    this.state.harvestBatchesLoading = false;
    this.engageReload();
  }

  getHarvestBatchesForReset = async (currHarvest) => {
    const response = await fetch('/api/harvestbatches');
    const text = await response.text();
    this.state.harvestBatches = text;
    this.state.harvestBatchesLoading = false;
    this.executeResetHarvestBatches(currHarvest);
  }


  setCurrentPage = (currPage) => {
    this.setState({currentPage: currPage});
    this.forceUpdate();
  }

  resetHarvestBatches = (currHarvest) => {
    setTimeout(() =>  this.getHarvestBatchesForReset(currHarvest),0); 

    this.setState({harvestBatchesLoading: true, currentHarvest: currHarvest});
  }

  executeResetHarvestBatches = (currHarvest) => {
    setTimeout(() => this.engageReload(),0); 

    let currHarvestID = -1;

    let parsedHarvestBatches = JSON.parse(this.state.harvestBatches);

    for(let val of parsedHarvestBatches){
			console.log("Val: " + JSON.stringify(val));
      console.log("Val.name: " + val.name);
			if(val.name === currHarvest.name){
				console.log("Found HarvestBatch: " + val.name);
        currHarvestID = val.id;
			}
		}

    currHarvest.id = currHarvestID;
  }

  resetAll = (currHarvest) => {
    this.setState({harvestBatchesLoading: true, plantsLoading: true, harvestRecordsLoading: true, currentHarvest: currHarvest});

    this.getUsersFromDB("","");
    this.getHarvestBatchesFromDB();
    this.getPlantsFromDB(true);
    this.getHarvestRecordsFromDB(true);

    this.forceUpdate();
  }

  reloadPlants = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    this.getPlantsFromDB(true);
  }

  reloadHarvestRecords = () => {
    this.getHarvestRecordsFromDB(true);
  }

  reloadHarvestBatches = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    this.getHarvestBatchesFromDB();
  }

  reloadUsers = () => {
    this.setState({usersLoading:true});
    return this.getUsersFromDB("","");
  }

  getUsersLoading = () => {
    return this.state.usersLoading;
  }

  reloadPlantsAndHarvestRecords = (currHarvest) => {
    this.setState({currentHarvest: currHarvest, plantsLoading: true, harvestRecordsLoading: true});

    this.getPlantsFromDB(true);

    this.getHarvestRecordsFromDB(true);
  }

  setNewHBID = (newID,hb) => {
		
      hb.id = newID;

      let tempHarvestBatches = this.state.harvestBatches;
			tempHarvestBatches = tempHarvestBatches.substring(0,tempHarvestBatches.length-1) + "," + JSON.stringify(hb) + "]";

      this.setState({harvestBatches: tempHarvestBatches});
	}

  getCurrentHarvestID = (hbName) => {
    let parsedHB = JSON.parse(this.state.harvestBatches);

    for(const val of parsedHB){
      if(val.name === hbName){
        return val.id;
      }
    }
  }

  setNewHarvestRecordID = (newID,hr) => {
      hr.id = newID;

      let tempHarvestRecords = this.state.harvestRecords;
      if(tempHarvestRecords === "[]"){
        tempHarvestRecords = "[" + JSON.stringify(hr) + "]";
      }else{
        tempHarvestRecords = tempHarvestRecords.substring(0,tempHarvestRecords.length-1) + "," + JSON.stringify(hr) + "]";
      }

      this.setState({harvestRecords: tempHarvestRecords});
	}

  setNewPlantID = (newID,plant) => {
      plant.id = newID;

      let tempPlants = this.state.plants;
			tempPlants = tempPlants.substring(0,tempPlants.length-1) + "," + JSON.stringify(plant) + "]";

      this.setState({plants: tempPlants});
	}

  executeLogIn = (user,status) =>{
    this.setState({loggedIn:user,userID:user,subStatus:status});
    this.resetAll([]);
    this.engageReload();
  }

  setAll = (pl,hr,hb) => {
    this.setState({plants:pl,harvestRecords:hr,harvestBatches:hb});
  }

  getPlants = () => {
    return this.state.plants;
  }

  getHarvestRecords = () => {
    return this.state.harvestRecords;
  }

  getHarvestBatches = () => {
    return this.state.harvestBatches;
  }

  getUsers = () => {
    return this.state.users;
  }

  setHarvestBatches = (harvestBatchesFromChild) => {
    this.setState({harvestBatches:harvestBatchesFromChild});
  }

  setPlants = (plantMapFromChild) => {
    this.setState({plants:plantMapFromChild});
  }

  setHarvestRecords = (harvestRecordsMapFromChild) => {
    this.setState({harvestRecords:harvestRecordsMapFromChild});
  }

  setUsers = (usersMapFromChild) => {
    this.setState({users:usersMapFromChild});
  }


  executeLogout = () => {
    this.setState({loggedIn:'',currentPage:'harvest-form',harvestBatches:[],plants:[],harvestRecords:[],
    plantsLoading:true,harvestBatchesLoading:true,harvestRecordsLoading:true,currentHarvest:[],userID:''});
    this.forceUpdate();
  }

  attemptLogin = (username,password) => {
    this.getUsersFromDB(username,password);
  }

  setNewUsername = (newUser) => {
    this.setState({newUsername:newUser});
  }

  render() {
    if ((this.state.loggedIn !== '' && (this.state.plantsLoading || this.state.harvestRecordsLoading || this.state.harvestBatchesLoading))){
      return(<div>Loading...</div>);
    }

    console.log("Rendering - App.js");

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestRecords In State: " + this.state.harvestRecords);
    console.log("ResponseFromPlant In State: " + this.state.responseFromPlants);
    console.log("CurrentHarvest(STRING): " + JSON.stringify(this.state.currentHarvest));

	  console.log("Logged In: " + this.state.loggedIn);
    console.log("Sub Status in App.js: " + this.state.subStatus);
	  let showForm;
    console.log("CurrentPage: " + this.state.currentPage);
    console.log("-*-*-*");
    let currUrl = "";
    try{
      currUrl = window.location.href.toString();
    }catch(err){

    }

    console.log("Curr URL: " + currUrl);

    let successEqualsStr = "success=";
    if(currUrl.includes("success")){
      let successStr = currUrl.substring(currUrl.indexOf(successEqualsStr)+successEqualsStr.length,currUrl.indexOf(successEqualsStr)+successEqualsStr.length+5);
      console.log("Success Str: " + successStr);
      if(successStr.includes("true")){
        if(this.state.currentPage !== 'stripe-form'){
          this.setCurrentPage('stripe-form');
        }
      }
    }

    
    

    let userFromUrl = "";
    let userEqualsStr = "username=";
    if(currUrl.includes("username")){
      let userString = currUrl.substring(currUrl.indexOf(userEqualsStr)+userEqualsStr.length);
      console.log("User Str: " + userString);
      userFromUrl = userString;
    }

    let verCode = "";
    let verificationEqualsStr = "verCode=";
    if(currUrl.includes("verCode")){
      let verCodeString = currUrl.substring(currUrl.indexOf(verificationEqualsStr)+verificationEqualsStr.length,currUrl.indexOf(verificationEqualsStr)+verificationEqualsStr.length+8);
      console.log("VerCode Str: " + verCodeString);
      verCode = verCodeString;
      if(this.state.currentPage !== 'stripe-form'){
        this.setCurrentPage('stripe-form');
      }
    }

    let linkCode = "";
    let linkEqualsStr = "linkCode=";
    if(currUrl.includes("linkCode")){
      
      let linkCodeString = currUrl.substring(currUrl.indexOf(linkEqualsStr)+linkEqualsStr.length,currUrl.indexOf(linkEqualsStr)+linkEqualsStr.length+8);
      console.log("LinkCode Str: " + linkCodeString);
      linkCode = linkCodeString;
      if(this.state.currentPage !== 'reset-password-form'){
        this.setCurrentPage('reset-password-form');
      }
    }

    if (this.state.loggedIn !== '') {
	  	showForm = <div style={{margin:"auto"}}>
	    <Header setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage} executeLogout={this.executeLogout}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage} getPlants={this.getPlants} getHarvestRecords={this.getHarvestRecords} getHarvestBatches={this.getHarvestBatches}
      resetHarvestBatches={this.resetHarvestBatches} resetAll={this.resetAll} currentHarvest={this.state.currentHarvest} setNewHBID={this.setNewHBID} getCurrentHarvestID={this.getCurrentHarvestID}
      setNewHarvestRecordID={this.setNewHarvestRecordID} setNewPlantID={this.setNewPlantID} userID={this.state.userID} setAll={this.setAll}
      setHarvestBatches={this.setHarvestBatches} setHarvestRecords={this.setHarvestRecords} setPlants={this.setPlants} reloadPlants={this.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.reloadHarvestBatches} reloadHarvestRecords={this.reloadHarvestRecords}
      verCode={verCode} userFromUrl={userFromUrl} linkCode={linkCode} executeLogout={this.executeLogout}/>
    </div>;
    }else{
      let loginForm = false;
      if(this.state.currentPage === 'create-user-form'){
				showForm = <CreateUserForm setCurrentPage={this.setCurrentPage} setNewUsername={this.setNewUsername}></CreateUserForm>
      }else if(this.state.currentPage === 'stripe-form'){
				showForm = <StripeForm verCode={verCode} userFromUrl={userFromUrl}></StripeForm>
      }else if(this.state.currentPage === 'verification-form'){
				showForm = <VerificationForm setCurrentPage={this.setCurrentPage} newUsername={this.state.newUsername}></VerificationForm>
      }else if(this.state.currentPage === 'reset-password-form'){
				showForm = <ResetPasswordForm setCurrentPage={this.setCurrentPage} linkCode={linkCode} userFromUrl={userFromUrl} executeLogout={this.executeLogout}></ResetPasswordForm>
      }else if(this.state.currentPage === 'find-user-form'){
				showForm = <FindUserForm setCurrentPage={this.setCurrentPage}></FindUserForm>
      }else{
        showForm = <div><LogIn getUsers={this.getUsers} executeLogIn={this.executeLogIn} reloadUsers={this.reloadUsers} getUsersLoading={this.getUsersLoading} setUsers={this.setUsers} attemptLogin={this.attemptLogin} setCurrentPage={this.setCurrentPage}></LogIn></div>;
        loginForm = true;
      }
      if(!loginForm){
        showForm = (<Grid
			  	container
			  	direction="column"
  				justifyContent="center"
				  alignItems="center"
		  	  >
          <LoginHeader setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage} executeLogout={this.executeLogout}/>
          {showForm}
          </Grid>)
      } 
    }
    return (<div>{showForm}</div>);
  }
}
