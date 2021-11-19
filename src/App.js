import React from "react";
import "./styles.css";
import Header from './components/Header.component';
import Outer from './components/Outer.component';
import LogIn from './components/LogIn.component';
import StripeForm from "./components/StripeForm";
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
    dryRooms: [],
    exportRecords: [],
    plantsLoading: true,
    harvestRecordsLoading: true,    
    harvestBatchesLoading: true,
    dryRoomsLoading: true,
    exportRecordsLoading: true,
    currentHarvest: [],
    users: [],
    usersLoading: true,
    userID: "",
    newUsername: "",
    logInFailed: false,
    fromAccountSettings: false,
    logInSuccess: true,
    resetPasswordLogInFailed: false,
    subscription: []
  };

  componentDidMount() {
  }
  
  engageReload = () => {
    if((!this.state.usersLoading) || (!this.state.plantsLoading && !this.state.harvestRecordsLoading && !this.state.harvestBatchesLoading || !this.state.dryRoomsLoading
      || !this.state.exportRecordsLoading)){
      console.log("Force Updated In App.js");
      this.forceUpdate();
    }
  }

  getSubscription = async (subId,username,staySignedIn,signIn) => {
    console.log("Try to get subscription");
    const response = await fetch(`/get-subscription/${subId}`);
    const json = await response.json();
    try{
      console.log("sub json: " + json);
    }catch(err){
  
    }
    try{
      console.log("sub json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }

    if(signIn){
      if(json.canceled_at === null){
        this.setState({subscription:json});
        this.executeLogIn(username,staySignedIn);
      }else{
        console.log("Sub cancelled.");
        this.executeLogInFailed();
      }
    }else{
      this.setState({subscription:json});
    }
  }

  getSubId = async (username,staySignedIn,signIn) => {
    console.log("Try to get subid");
    const response = await fetch(`/get-subid/${username}`);
    const json = await response.json();
    try{
      console.log("subid json: " + json);
    }catch(err){
    }
    if(json !== undefined){
        this.getSubscription(json,username,staySignedIn,signIn);
      }else{
        this.setState({newUsername:username,currentPage:'stripe-form'});
      }
  }

  getUsersFromDB = async (username,password,staySignedIn) => {
    console.log("Get users from DB");
    if(username === "" || password === ""){
      this.executeLogInFailed();
      return;
    }
    const response = await fetch(`/api/users/${username}/${password}`);
    const text = await response.text();
    /*const responseTwo = await fetch(`/create-customer`);
    const json = await responseTwo.json();*/

    console.log("Fetched password attempt");

    this.state.users = text;
    this.state.usersLoading = false;
    console.log("Try Login Response: " + text);
    let gotResponse = false;
    console.log("Got Response A: " + gotResponse);
    let fuck = text;
    console.log("Fuck: " + fuck);

    if(text === "0"){
      console.log("Text === 0");
      gotResponse = true;
      this.getSubId(username,staySignedIn,true);
    }else if(text === "1"){
      gotResponse = true;
      console.log("Text === 1");
      this.setState({newUsername:username,currentPage:'stripe-form'});
    }else if(text === "2"){
      //go to ver 
      gotResponse = true;
      console.log("Text === 2");
      this.setState({newUsername:username,currentPage:'verification-form'});
    }else{
      console.log("ELSE");
    }
    console.log("After tree");

    console.log("Got Response: " + gotResponse);
    
    if(!gotResponse){
      console.log("Not Got Response");
      this.executeLogInFailed();
    }
    console.log("Text === over");
  }

  reloadSubscription = async() => {
    this.getSubId(this.state.userID,staySignedIn,false);
  }

  tryLogInFromEndSubForm = async (password) => {
    console.log("Try Login From end sub form");
    console.log("this.state.userID: " + this.state.userID)

    if(this.state.userID === "" || password === ""){
      this.setState({logInSuccess:false,currentPage:"end-subscription-form"});
      return;
    }
    const response = await fetch(`/api/users/${this.state.userID}/${password}`);
    const text = await response.text();
    /*const responseTwo = await fetch(`/create-customer`);
    const json = await responseTwo.json();*/

    console.log("Fetched password attempt");

    console.log("Try Login Response: " + text);
    let gotResponse = false;
    console.log("Got Response A: " + gotResponse);

    if(text === "0" || text === "1" || text === "2"){
      console.log("Text === 0,1 or 2");
      this.cancelSub();
    }else{
      console.log("ELSE");
      this.setState({logInSuccess:false,currentPage:"end-subscription-form"});
    }
    console.log("After tree");

    console.log("Got Response: " + gotResponse);
    
    console.log("Text === over");
  }

  getPlantsFromDB = async (reload) => {
    if(this.state.userID === "" && localStorage.getItem("user")===""){
      return;
    }
    let userForFetch = this.state.userID;
    if(localStorage.getItem("user")!==null && localStorage.getItem("user")!==undefined && localStorage.getItem("user")!==""){
      userForFetch = localStorage.getItem("user");
    }
    const response = await fetch(`/api/pl/${userForFetch}`);
    const text = await response.text();
    this.state.plants = text;
    this.state.plantsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getDryRoomsFromDB = async (reload) => {
    if(this.state.userID === "" && localStorage.getItem("user")===""){
      return;
    }
    let userForFetch = this.state.userID;
    if(localStorage.getItem("user")!==null && localStorage.getItem("user")!==undefined && localStorage.getItem("user")!==""){
      userForFetch = localStorage.getItem("user");
    }
    const response = await fetch(`/api/dr/${userForFetch}`);
    const text = await response.text();
    this.state.dryRooms = text;
    this.state.dryRoomsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getExportRecordsFromDB = async (reload) => {
    if(this.state.userID === "" && localStorage.getItem("user")===""){
      return;
    }
    let userForFetch = this.state.userID;
    if(localStorage.getItem("user")!==null && localStorage.getItem("user")!==undefined && localStorage.getItem("user")!==""){
      userForFetch = localStorage.getItem("user");
    }
    const response = await fetch(`/api/er/${userForFetch}`);
    const text = await response.text();
    this.state.exportRecords = text;
    this.state.exportRecordsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getHarvestRecordsFromDB = async (reload) => {
    if(this.state.userID === "" && localStorage.getItem("user")===""){
      return;
    }
    let userForFetch = this.state.userID;
    if(localStorage.getItem("user")!==null && localStorage.getItem("user")!==undefined && localStorage.getItem("user")!==""){
      userForFetch = localStorage.getItem("user");
    }
    const response = await fetch(`/api/hr/${userForFetch}`);
    const text = await response.text();
    this.state.harvestRecords = text;
    this.state.harvestRecordsLoading = false;
    if(reload){
      this.engageReload();
    }
  }

  getHarvestBatchesFromDB = async () => {
    console.log("This.state.userID: " + this.state.userID);
    if(this.state.userID === "" && localStorage.getItem("user")===""){
      return;
    }
    let userForFetch = this.state.userID;
    if(localStorage.getItem("user")!==null && localStorage.getItem("user")!==undefined && localStorage.getItem("user")!==""){
      userForFetch = localStorage.getItem("user");
    }
    const response = await fetch(`/api/hb/${userForFetch}`);
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
    localStorage.setItem("currentPage",currPage);
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
    this.setState({harvestBatchesLoading: true, plantsLoading: true, harvestRecordsLoading: true, currentHarvest: currHarvest, logInFailed: false, logInSuccess: true, 
      dryRoomsLoading: true, exportRecordsLoading: true});
    console.log("Reset all");
    this.getHarvestBatchesFromDB();
    this.getPlantsFromDB(true);
    this.getHarvestRecordsFromDB(true);
    this.getDryRoomsFromDB(true);
    this.getExportRecordsFromDB(true);


    this.forceUpdate();
  }

  reloadPlants = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    this.getPlantsFromDB(true);
  }

  reloadDryRooms = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    this.getDryRoomsFromDB(true);
  }

  reloadExportRecords = (currHarvest) => {
    this.setState({currentHarvest: currHarvest});

    this.getExportRecordsFromDB(true);
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
    return "";
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

  setFromAccountSettings = (from) => {
		
    this.setState({fromAccountSettings: from});
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

  executeLogIn = (user,staySignedIn) =>{
    console.log("set user in localstorage: " + user);
    console.log("set staysignedin in localstorage: " + staySignedIn);
    localStorage.setItem('user', user);
    localStorage.setItem('staySignedIn',staySignedIn);
    let currPage = localStorage.getItem("currentPage");
    if(currPage !== null && currPage !== undefined && currPage !== ""){
      this.setState({loggedIn:user,userID:user,currentPage:currPage,logInFailed:false});
    }else{
      this.setState({loggedIn:user,userID:user,logInFailed:false});
    }
    this.resetAll([]);
    this.engageReload();
  }

  executeLogInFailed = () => {
    console.log("Execute log in failed");
    this.setState({logInFailed:true});
    this.forceUpdate();
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

  getDryRooms = () => {
    console.log("Get Dryrooms: " + this.state.dryRooms);
    return this.state.dryRooms;
  }

  getExportRecords = () => {
    return this.state.exportRecords;
  }

  getUniqueIDCount = (timeOne,timeTwo) => {
    /*
    console.log("Get Unique ID count");
    console.log("TimeOne: " + timeOne);
    console.log("TimeTwo: " + timeTwo);
    let exportRecords = JSON.parse(this.executeGetExportRecords());

    let uids = [];
    let x = 0;
    for(const val of exportRecords){
      console.log("UID count Val: " + JSON.stringify(val));
      if(Number(val.time)>((Number(timeOne))*1000) && Number(val.time)<((Number(timeTwo))*1000)){
        console.log("x++");
        let foundUid = false;
        console.log("Search for uid");

        for(const uid of uids){
          console.log("uid val : + " + uid);
          if(uid === val.tag){
            console.log("Found uid");
            foundUid = true;
          }
        }
        if(!foundUid){
          x++;
          console.log("Push: " + val.tag);
          uids.push(val.tag);
        }
      }
    }
    return x;
    */
    console.log("Get Unique ID count");
    let uids = [];
    let x = 0;
    for(const val of this.state.exportRecords){
      console.log("UID count Val: " + JSON.stringify(val));
      if(Number(val.time)>((Number(this.state.subscription.current_time_start))*1000) && Number(val.time)<((Number(this.state.subscription.current_time_end))*1000)){
        console.log("x++");
        let foundUid = false;
        console.log("Search for uid");

        for(const uid of uids){
          console.log("uid val : + " + uid);
          if(uid === val.tag){
            console.log("Found uid");
            foundUid = true;
          }
        }
        if(!foundUid){
          x++;
          console.log("Push: " + val.tag);
          uids.push(val.tag);
        }
      }
    }
    return x;
  }

  
  executeGetExportRecords = () => {
		let exExportRecords = JSON.parse(this.getExportRecords());
		let ers = [];
		console.log("execute Get ers");

		for(const val of exExportRecords){
			console.log("Val: " + JSON.stringify(val));
			ers.push(val);
		}
		console.log("Execute get ers done: " + JSON.stringify(ers));
		return JSON.stringify(ers);
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

  setDryRooms = (dryRoomMapFromChild) => {
    this.setState({dryRooms:dryRoomMapFromChild});
  }

  setExportRecords = (exportRecordsMapFromChild) => {
    this.setState({exportRecords:exportRecordsMapFromChild});
  }

  setUsers = (usersMapFromChild) => {
    this.setState({users:usersMapFromChild});
  }


  executeLogout = () => {
    localStorage.clear();
    this.setState({loggedIn:'',currentPage:'harvest-form',harvestBatches:[],plants:[],harvestRecords:[],
    plantsLoading:true,harvestBatchesLoading:true,harvestRecordsLoading:true,currentHarvest:[],userID:'',
    dryRooms:[],exportRecords:[], subscription:[]});
    this.forceUpdate();
  }

  cancelSub = () => {
    console.log("In Cancel SUb");
    console.log("Logged IN: " + this.state.loggedIn);
    this.getSubIdForCancel();
  }

  attemptLogInFromEndSubForm = (attemptedPassword) => {
    this.tryLogInFromEndSubForm(attemptedPassword);
  } 

  cancelSubscription = async (subId) => {
    console.log("Try to get subscription");
    const response = await fetch(`/cancel-subscription/${subId}`);
    const json = await response.json();
    try{
      console.log("sub json: " + json);
    }catch(err){
  
    }
    try{
      console.log("sub json(STRING): " + JSON.stringify(json));
    }catch(err){
      
    }

    console.log("Sub cancelled yeahh");
    this.executeLogout();
  }

  getSubIdForCancel = async () => {
    console.log("Try to get subid");
    console.log("Logged IN: " + this.state.loggedIn);
    console.log("UserID: " + this.state.userID);
    const response = await fetch(`/get-subid/${this.state.userID}`);
    const json = await response.json();
    try{
      console.log("subid json: " + json);
    }catch(err){
  
    }
    if(json !== undefined){
        this.cancelSubscription(json);
      }else{
      }
  }

  attemptLogin = (username,password,staySignedIn) => {
    this.getUsersFromDB(username,password,staySignedIn);
  }

  setNewUsername = (newUser) => {
    this.setState({newUsername:newUser});
  }

  pageAccessedByReload = () => {
    return (window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload'));
      }
  render() {
    localStorage.setItem("currentPage","harvest-form");
    console.log("Page accessed by reload?");
    let reloaded = this.pageAccessedByReload();
    console.log("Reloaded: " + reloaded);
    console.log("render app.js")
    const loggedInUser = localStorage.getItem("user");
    console.log("Loggin in user: " + loggedInUser);
    console.log("this.state.loggedin: " + this.state.loggedIn);

    let staySignedInLocal = false;
    if(localStorage.getItem("staySignedIn")!==null && localStorage.getItem("staySignedIn")!==undefined && localStorage.getItem("staySignedIn")!==""){
      staySignedInLocal = localStorage.getItem("staySignedIn");
    }
    let staySignedIn = false;
    if(staySignedInLocal === "true"){
      staySignedIn = true;
    }
    console.log("Deciding staysignedin: " + staySignedIn);
    console.log("Deciding reloaded: " + reloaded);

    if (loggedInUser !== null && loggedInUser !== undefined && loggedInUser !== "" && this.state.loggedIn === "") {
      if(reloaded){
        console.log("**RELOADED");
      }else{
        console.log("**NOT RELOADED");
      }
      if(staySignedIn){
        console.log("**STAY SIGNED IN LOCAL");
      }else{
        console.log("**NOT STAY SIGNED IN LOCAL");
      }

      if(reloaded || staySignedIn){
        console.log("***Found User: " + loggedInUser);

        this.setState({loggedIn:loggedInUser,userID:loggedInUser,usersLoading:false});
        console.log("Stay signed in**: " + staySignedIn);
        this.executeLogIn(loggedInUser,staySignedIn);
      }
    }

    if ((this.state.loggedIn !== '' && (this.state.plantsLoading || this.state.harvestRecordsLoading || 
      this.state.harvestBatchesLoading || this.state.dryRoomsLoading || this.state.exportRecordsLoading))){
      return(<div>Loading...</div>);
    }

    console.log("Rendering - App.js");

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestRecords In State: " + this.state.harvestRecords);
    console.log("ResponseFromPlant In State: " + this.state.responseFromPlants);
    console.log("CurrentHarvest(STRING): " + JSON.stringify(this.state.currentHarvest));
    console.log("DryRooms In State: " + this.state.dryRooms);
    console.log("ExportRecords In State: " + this.state.exportRecords);

	  console.log("Logged In: " + this.state.loggedIn);
    console.log("Log in Failed: " + this.state.logInFailed);
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
    console.log("Link Code In App.js: " + linkCode);

    if (this.state.loggedIn !== '') {
	  	showForm = <div style={{margin:"auto"}}>
	    <Header setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage} executeLogout={this.executeLogout}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage} getPlants={this.getPlants} getHarvestRecords={this.getHarvestRecords} getHarvestBatches={this.getHarvestBatches}
      resetHarvestBatches={this.resetHarvestBatches} currentHarvest={this.state.currentHarvest} setNewHBID={this.setNewHBID} getCurrentHarvestID={this.getCurrentHarvestID}
      setNewHarvestRecordID={this.setNewHarvestRecordID} setNewPlantID={this.setNewPlantID} userID={this.state.userID}
      setHarvestBatches={this.setHarvestBatches} setHarvestRecords={this.setHarvestRecords} setPlants={this.setPlants} reloadPlants={this.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.reloadHarvestBatches} reloadHarvestRecords={this.reloadHarvestRecords}
      verCode={verCode} userFromUrl={userFromUrl} linkCode={linkCode} executeLogout={this.executeLogout} setFromAccountSettings={this.setFromAccountSettings} attemptLogInFromEndSubForm={this.attemptLogInFromEndSubForm}
      getDryRooms={this.getDryRooms} getExportRecords={this.getExportRecords} logInSuccess={this.state.logInSuccess} reloadDryRooms={this.reloadDryRooms} reloadExportRecords={this.reloadExportRecords}
      getUniqueIDCount={this.getUniqueIDCount} reloadSubscription={this.reloadSubscription}/>
    </div>;
    }else{
      let loginForm = false;
      if(this.state.currentPage === 'create-user-form'){
				showForm = <CreateUserForm setCurrentPage={this.setCurrentPage} setNewUsername={this.setNewUsername}></CreateUserForm>
      }else if(this.state.currentPage === 'stripe-form'){
				showForm = <StripeForm verCode={verCode} userFromUrl={userFromUrl} userFromLogin={this.state.newUsername}></StripeForm>
      }else if(this.state.currentPage === 'verification-form'){
				showForm = <VerificationForm setCurrentPage={this.setCurrentPage} newUsername={this.state.newUsername}></VerificationForm>
      }else if(this.state.currentPage === 'reset-password-form'){
				showForm = <ResetPasswordForm setCurrentPage={this.setCurrentPage} linkCode={linkCode} userFromUrl={userFromUrl} executeLogout={this.executeLogout} fromAccountSettings={this.state.fromAccountSettings} userID=""></ResetPasswordForm>
      }else if(this.state.currentPage === 'find-user-form'){
				showForm = <FindUserForm setCurrentPage={this.setCurrentPage}></FindUserForm>
      }else{
        showForm = <LogIn getUsers={this.getUsers} executeLogIn={this.executeLogIn} reloadUsers={this.reloadUsers} getUsersLoading={this.getUsersLoading} setUsers={this.setUsers} attemptLogin={this.attemptLogin}
        setCurrentPage={this.setCurrentPage} logInFailed={this.state.logInFailed}></LogIn>;
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
    return (<div style={{position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <div style={{width:"100%",height:"100%"}}>
               {showForm}
              </div>
            </div>);
  }
}
