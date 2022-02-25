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
    subscription: [],
    tutorials: "",
    showHints: false,
    print: ""
  };

  componentDidMount() {    
  }
  
  engageReload = () => {
    if((!this.state.usersLoading) || (!this.state.plantsLoading && !this.state.harvestRecordsLoading && !this.state.harvestBatchesLoading && !this.state.dryRoomsLoading
      && !this.state.exportRecordsLoading)){
      this.forceUpdate();
    }
  }

  getSubscription = async (subId,username,staySignedIn,signIn) => {
    const response = await fetch(`/get-subscription/${subId}`);
    const json = await response.json();
    
    if(signIn){
      if(json.canceled_at === null){
        this.setState({subscription:json});
        this.getUser(username,staySignedIn);
      }else{
        this.executeLogInFailed();
      }
    }else{
      this.setState({subscription:json});
    }
  }

  getSubId = async (username,staySignedIn,signIn) => {
    const response = await fetch(`/get-subid/${username}`);
    const json = await response.json();
    if(json !== undefined){
        this.getSubscription(json,username,staySignedIn,signIn);
      }else{
        this.setState({newUsername:username,currentPage:'stripe-form'});
      }
  }

  getUsersFromDB = async (username,password,staySignedIn) => {
    if(username === "" || password === ""){
      this.executeLogInFailed();
      return;
    }

    const response = await fetch(`/api/users/${username}/${password}`);
    const text = await response.text();

    this.state.users = text;
    this.state.usersLoading = false;
    let gotResponse = false;

    if(text === "0"){
      gotResponse = true;
      this.getUser(username,staySignedIn);
      //this.getSubId(username,staySignedIn,true);
    }else if(text === "1"){
      gotResponse = true;
      this.setState({newUsername:username,currentPage:'stripe-form'});
    }else if(text === "2"){
      gotResponse = true;
      this.setState({newUsername:username,currentPage:'verification-form'});
    }
    
    if(!gotResponse){
      this.executeLogInFailed();
    }
  }

  reloadSubscription = async () => {
    this.getSubId(this.state.userID,false,false);
  }


  tryLogInFromEndSubForm = async (password) => {

    if(this.state.userID === "" || password === ""){
      this.setState({logInSuccess:false,currentPage:"end-subscription-form"});
      return;
    }
    const response = await fetch(`/api/users/${this.state.userID}/${password}`);
    const text = await response.text();

    if(text === "0" || text === "1" || text === "2"){
      this.cancelSub();
    }else{
      this.setState({logInSuccess:false,currentPage:"end-subscription-form"});
    }
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
			if(val.name === currHarvest.name){
        currHarvestID = val.id;
			}
		}

    currHarvest.id = currHarvestID;
  }

  resetAll = (currHarvest) => {
    this.setState({harvestBatchesLoading: true, plantsLoading: true, harvestRecordsLoading: true, currentHarvest: currHarvest, logInFailed: false, logInSuccess: true, 
      dryRoomsLoading: true, exportRecordsLoading: true});
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

  getUser = async (user,staySignedIn) => {
    const response = await fetch(`/api/tutorials/${user}`);
    const text = await response.text();
    let txt = text.substring(1,text.length-1);
    
    this.executeLogIn(user,staySignedIn,txt);
  }
  

  executeLogIn = (user,staySignedIn,tuts) =>{
    localStorage.setItem('user', user);
    localStorage.setItem('staySignedIn',staySignedIn);
    let currPage = localStorage.getItem("currentPage");
    
    if(currPage !== null && currPage !== undefined && currPage !== ""){
      this.setState({loggedIn:user,userID:user,currentPage:currPage,logInFailed:false,tutorials:tuts});
    }else{
      this.setState({loggedIn:user,userID:user,logInFailed:false,tutorials:tuts});
    }
    this.resetAll([]);
    this.engageReload();
  }

  executeLogInFailed = () => {
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
    return this.state.dryRooms;
  }

  getUniqueIDCount = () => {
    let exportRecords = JSON.parse(this.executeGetExportRecords());

    let uids = [];
    let x = 0;
    for(const val of exportRecords){
      if(Number(val.time)>((Number(this.state.subscription.current_period_start))*1000) && Number(val.time)<((Number(this.state.subscription.current_period_end))*1000)){
        let foundUid = false;

        for(const uid of uids){
          if(uid === val.tag){
            foundUid = true;
          }
        }
        if(!foundUid){
          x++;
          uids.push(val.tag);
        }
      }
    }
    return x;
  }

  getPossiblePlantCount = () => {
    let subscriptionType = "";

    if(JSON.stringify(this.state.subscription) !== "[]"){
      subscriptionType = this.state.subscription.items.data[0].price.lookup_key;
    }

    let possiblePlantCount = 0;
    if(subscriptionType === "basic"){
      possiblePlantCount = 2000;
    }else if(subscriptionType === "standard"){
      possiblePlantCount = 5000;
    }else if(subscriptionType === "premium"){
      possiblePlantCount = 10000;
    }
    return possiblePlantCount;
  }

  getSubscriptionType = () => {
    let subscriptionType = "";

    if(JSON.stringify(this.state.subscription) !== "[]"){
      subscriptionType = this.state.subscription.items.data[0].price.lookup_key;
    }
    return subscriptionType;
  }

  executeGetExportRecords = () => {
		let exExportRecords = JSON.parse(this.state.exportRecords);
		let ers = [];

		for(const val of exExportRecords){
			ers.push(val);
		}
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
    dryRooms:[],exportRecords:[], subscription:[], tutorials:""});
    this.forceUpdate();
  }

  getPrint = () => {
    this.attemptPrint();
  }

  attemptPrint = async () => {
    console.log("Attempt Print");
    const response = await fetch(`/api/print/users`);
    const text = await response.text();
    let txt = "Users:" + text;
    console.log("GET PRINT: " + txt);

    try{

    const response2 = await fetch(`/api/print/dr`);
    const text2 = await response2.text();
    txt = txt + "DryRooms:" + text2;
    console.log("GET PRINT 2: " + txt);

    }catch(err){

    }
    this.setState({print:txt});
    this.engageReload();
  }

  cancelSub = () => {
    this.getSubIdForCancel();
  }

  attemptLogInFromEndSubForm = (attemptedPassword) => {
    this.tryLogInFromEndSubForm(attemptedPassword);
  } 

  cancelSubscription = async (subId) => {
    const response = await fetch(`/cancel-subscription/${subId}`);
    await response.json();
    this.executeLogout();
  }

  getSubIdForCancel = async () => {
    const response = await fetch(`/get-subid/${this.state.userID}`);
    const json = await response.json();
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
    console.log("Print in App.js render: " + this.state.print);
    localStorage.setItem("currentPage","harvest-form");
    let reloaded = this.pageAccessedByReload();
    const loggedInUser = localStorage.getItem("user");

    let staySignedInLocal = false;
    if(localStorage.getItem("staySignedIn")!==null && localStorage.getItem("staySignedIn")!==undefined && localStorage.getItem("staySignedIn")!==""){
      staySignedInLocal = localStorage.getItem("staySignedIn");
    }
    let staySignedIn = false;
    if(staySignedInLocal === "true"){
      staySignedIn = true;
    }

    if (loggedInUser !== null && loggedInUser !== undefined && loggedInUser !== "" && this.state.loggedIn === "") {
      if(reloaded || staySignedIn){
        this.reloadExportRecords([]);
        this.reloadSubscription([]);
        this.setState({loggedIn:loggedInUser,userID:loggedInUser,usersLoading:false});
        this.getUser(loggedInUser,staySignedIn);
      }
    }

    if ((this.state.loggedIn !== '' && (this.state.plantsLoading || this.state.harvestRecordsLoading || 
      this.state.harvestBatchesLoading || this.state.dryRoomsLoading || this.state.exportRecordsLoading))){
      return(<div>Loading...</div>);
    }
	  let showForm;
    let currUrl = "";
    try{
      currUrl = window.location.href.toString();
    }catch(err){

    }

    let successEqualsStr = "success=";
    if(currUrl.includes("success")){
      let successStr = currUrl.substring(currUrl.indexOf(successEqualsStr)+successEqualsStr.length,currUrl.indexOf(successEqualsStr)+successEqualsStr.length+5);
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
      if(userString.includes("?")){
        userString = userString.substring(0,userString.length-1);
      }
      userFromUrl = userString;
    }

    let verCode = "";
    let verificationEqualsStr = "verCode=";
    if(currUrl.includes("verCode")){
      let verCodeString = currUrl.substring(currUrl.indexOf(verificationEqualsStr)+verificationEqualsStr.length,currUrl.indexOf(verificationEqualsStr)+verificationEqualsStr.length+8);
      verCode = verCodeString;
      if(this.state.currentPage !== 'stripe-form'){
        this.setCurrentPage('stripe-form');
      }
    }

    let linkCode = "";
    let linkEqualsStr = "linkCode=";
    if(currUrl.includes("linkCode")){
      let linkCodeString = currUrl.substring(currUrl.indexOf(linkEqualsStr)+linkEqualsStr.length,currUrl.indexOf(linkEqualsStr)+linkEqualsStr.length+8);
      linkCode = linkCodeString;
      if(this.state.currentPage !== 'reset-password-form'){
        this.setCurrentPage('reset-password-form');
      }
    }

    if (this.state.loggedIn !== '') {
	  	showForm = <div style={{margin:"auto"}}>
	    <Header setCurrentPage={this.setCurrentPage}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage} getPlants={this.getPlants} getHarvestRecords={this.getHarvestRecords} getHarvestBatches={this.getHarvestBatches}
      resetHarvestBatches={this.resetHarvestBatches} currentHarvest={this.state.currentHarvest} setNewHBID={this.setNewHBID} getCurrentHarvestID={this.getCurrentHarvestID}
      setNewHarvestRecordID={this.setNewHarvestRecordID} setNewPlantID={this.setNewPlantID} userID={this.state.userID}
      setHarvestBatches={this.setHarvestBatches} setHarvestRecords={this.setHarvestRecords} setPlants={this.setPlants} reloadPlants={this.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.reloadHarvestBatches} reloadHarvestRecords={this.reloadHarvestRecords}
      executeLogout={this.executeLogout} setFromAccountSettings={this.setFromAccountSettings} attemptLogInFromEndSubForm={this.attemptLogInFromEndSubForm}
      getDryRooms={this.getDryRooms} logInSuccess={this.state.logInSuccess} reloadDryRooms={this.reloadDryRooms} reloadExportRecords={this.reloadExportRecords}
      getUniqueIDCount={this.getUniqueIDCount} reloadSubscription={this.reloadSubscription} getPossiblePlantCount={this.getPossiblePlantCount} getSubscriptionType={this.getSubscriptionType} tutorials={this.state.tutorials}
      showHints={this.state.showHints} getPrint={this.getPrint} print={this.state.print}/>
    </div>;
    }else{
      let loginForm = false;
      if(this.state.currentPage === 'create-user-form'){
				showForm = <CreateUserForm setCurrentPage={this.setCurrentPage} setNewUsername={this.setNewUsername}></CreateUserForm>
      }else if(this.state.currentPage === 'stripe-form'){
				showForm = <StripeForm verCode={verCode} userFromUrl={userFromUrl} userFromLogin={this.state.newUsername}></StripeForm>
      }else if(this.state.currentPage === 'verification-form'){
				showForm = <VerificationForm newUsername={this.state.newUsername}></VerificationForm>
      }else if(this.state.currentPage === 'reset-password-form'){
				showForm = <ResetPasswordForm setCurrentPage={this.setCurrentPage} linkCode={linkCode} userFromUrl={userFromUrl} executeLogout={this.executeLogout} fromAccountSettings={this.state.fromAccountSettings} userID=""></ResetPasswordForm>
      }else if(this.state.currentPage === 'find-user-form'){
				showForm = <FindUserForm></FindUserForm>
      }else{
        showForm = <LogIn attemptLogin={this.attemptLogin} setCurrentPage={this.setCurrentPage} logInFailed={this.state.logInFailed}></LogIn>;
        loginForm = true;
      }
      if(!loginForm){
        showForm = (<Grid
			  	container
			  	direction="column"
  				justifyContent="center"
				  alignItems="center"
		  	  >
          <LoginHeader/>
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
