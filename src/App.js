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
import ProductLanding from './components/ProductLanding.component'
import {isMobile} from 'react-device-detect';

export default class App extends React.Component {
  state = {
    currentPage: 'harvest-form',
    loggedIn: '',
    subid: '',
    firstMonthFree: false,
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
    print: "",
    usingReferalCode: "",
    myReferalCode: "",
    grantFreeMonthCode: "",
    freeMonthGrantedVisible: false,
    offer: false,
    outdoorOffer: false,
    facilityName: ""
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
        this.getUser(username,staySignedIn,subId,false,"");
      }else{
        this.setState({newUsername:username,currentPage:'stripe-form'});
      }
    }else{
      this.setState({subscription:json});
    }
  }

  pauseSubscription = async (subId) => {
    let resumeAt = (new Date()).getTime()+2678400000;
    let subid = subId;
    if(subid === ""){
      subid = this.state.subscription.id;
    }
    const response = await fetch(`/pause-subscription/${subid}/${resumeAt}`);
    const json = await response.json();
  }

  getSubId = async (username,staySignedIn,signIn) => {
    const response = await fetch(`/get-subid/${username}`);
    const json = await response.json();
    if(json !== undefined){
      this.getFacilityName(username,staySignedIn,json,false);

      /*
      if(json.length===13 || JSON.stringify(json).length===13){
        if((new Date()).getTime()-parseInt(json)>1209600000){
          this.getFacilityName(username,staySignedIn,json,true);
        }else{
          this.getFacilityName(username,staySignedIn,json,false);
        }
        console.log("A-");
        this.getFacilityName(username,staySignedIn,json,false);
      }else{
        console.log("B-");
        this.getSubscription(json,username,staySignedIn,signIn);
      }*/
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
      //if(username.includes("Mitchell")){
        this.getSubId(username,staySignedIn,true);
      /*}else{
        this.getUser(username,staySignedIn,"");
      }*/
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

  getTutorials = () => {
    return this.state.tutorials;
  }

  setTutorials = (tuts) => {
    this.setState({tutorials:tuts});
  }

  getGrantFreeMonthCode = () => {
    return this.state.grantFreeMonthCode;
  }

  setGrantFreeMonthCode = (code) => {
    this.setState({grantFreeMonthCode:code});
  }

  reloadHarvestBatches = (currHarvest) => {

    let ch = currHarvest;
    if(ch === undefined){
      ch = [];
    }
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
    console.log("rlph-app")
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

  getFacilityName = async (user,staySignedIn,subid,cleared) => {
    const response = await fetch(`/api/user-get-facility-name/${user}`);
    const json = await response.json();

    if(json.includes("outdoorx")){
      this.getUser(user,staySignedIn,subid,true,json);
    }else{
      if(cleared){
        this.setState({newUsername:user,currentPage:'stripe-form'});
      }else{
        this.getUser(user,staySignedIn,subid,false,"");
      }
    }
  }


  getUser = async (user,staySignedIn,subid,outdoorOffer,facilityName) => {
    const response = await fetch(`/api/tutorials/${user}`);
    const text = await response.text();
    let txt = text.substring(1,text.length-1);

    this.executeLogIn(user,staySignedIn,txt,subid,"","","","","");
    //this.getGrantFreeMonthCodeFromDB(user,staySignedIn,txt,subid,outdoorOffer,facilityName);
  }

  getGrantFreeMonthCodeFromDB = async (user,staySignedIn,tuts,subid,outdoorOffer,facilityName) => {
    const response = await fetch(`/api/user-get-grantFreeMonthCode/${user}`);
		  const text = await response.text();
    let txt = text.substring(1,text.length-1);
    
    this.getFirstMonthFree(user,staySignedIn,tuts,subid,txt,outdoorOffer,facilityName);
  }

  getFirstMonthFree = async (user,staySignedIn,tuts,subid,grantFreeMonthCode,outdoorOffer,facilityName) => {
    const response = await fetch(`/api/get-first-month-free/${user}`);
    const text = await response.text();
    let txt = text.substring(1,text.length-1);

    const response2 = await fetch(`/api/user-get-refCode/${user}`);
    const text2 = await response2.text();
    let txt2 = text2.substring(1,text2.length-1);
    
    this.executeLogIn(user,staySignedIn,tuts,subid,txt,txt2,grantFreeMonthCode,outdoorOffer,facilityName);
  }
  

  executeLogIn = (user,staySignedIn,tuts,subid,firstMonthFree,myReferalCode,grantFreeMonthCode,outdoorOffer,facilityName) =>{
    localStorage.setItem('user', user);
    localStorage.setItem('staySignedIn',staySignedIn);
    localStorage.setItem('subid',subid)
    let currPage = localStorage.getItem("currentPage");
    let fmf = false;
    if(firstMonthFree==="0"){
      fmf = true;
    }
     
    if(currPage !== null && currPage !== undefined && currPage !== ""){
      this.setState({loggedIn:user,subid:subid,firstMonthFree:fmf,userID:user,currentPage:currPage,logInFailed:false,tutorials:tuts,myReferalCode:myReferalCode,grantFreeMonthCode:grantFreeMonthCode,
      outdoorOffer:outdoorOffer,facilityName:facilityName});
    }else{
      this.setState({loggedIn:user,subid:subid,firstMonthFree:fmf,userID:user,logInFailed:false,tutorials:tuts,myReferalCode:myReferalCode,grantFreeMonthCode:grantFreeMonthCode,outdoorOffer:outdoorOffer,
      facilityName:facilityName});
    }
  
    this.resetAll([]);
    this.engageReload();
  }

  executeLogInFailed = () => {
    this.setState({logInFailed:true});
    this.forceUpdate();
  }

  getOutdoorOffer = () => {
    return this.state.outdoorOffer;
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
    if(this.getOutdoorOffer){
      let today = new Date();
        let oct1 = new Date("10 1 2022");
        let nov1 = new Date("11 1 2022");
        let dec1 = new Date("12 1 2022");
        if(today<oct1){
          for(const val of exportRecords){
          //Number(val.time)>today.getTime() &&
          if(Number(val.time)<oct1.getTime()){
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
        }else if(today < nov1){
          for(const val of exportRecords){
          
          if(Number(val.time)>oct1.getTime() && Number(val.time)<nov1.getTime()){
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
        }else if(today < dec1){
          for(const val of exportRecords){
          
          if(Number(val.time)>nov1.getTime() && Number(val.time)<dec1.getTime()){
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
        }
      return x;
    }else{
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
  }

  getFreeMonthGrantedVisible = () => {
    return this.state.freeMonthGrantedVisible;
  }

  setFreeMonthGrantedVisible = (vis) => {
    this.setState({freeMonthGrantedVisible:vis});
  }

  getPossiblePlantCount = () => {
    let subscriptionType = this.getSubscriptionType();

    let possiblePlantCount = 0;
    if(subscriptionType.includes("basic")){
      possiblePlantCount = "625";
    }else if(subscriptionType.includes("standard")){
      possiblePlantCount = "1250";
    }else if(subscriptionType.includes("premium")){
      possiblePlantCount = "2500";
    }else if(subscriptionType.includes("deluxe")){
      possiblePlantCount = "5000";
    }

    if(subscriptionType==="Basic Fall 2022"){
      possiblePlantCount = "625";
    }else if(subscriptionType==="Standard Fall 2022"){
      possiblePlantCount = "1250";
    }else if(subscriptionType==="Premium Fall 2022"){
      possiblePlantCount = "2500";
    }else if(subscriptionType==="Deluxe Fall 2022"){
      possiblePlantCount = "5000";
    }
    
    return possiblePlantCount;
  }

  getSubscriptionType = () => {
    let subscriptionType = "";

    let facilityName = this.state.facilityName;

    if(JSON.stringify(this.state.subscription) !== "[]"){
      subscriptionType = this.state.subscription.items.data[0].price.lookup_key;
    }else if(facilityName.includes("outdoorx")){
      if(facilityName.includes("basic")){
        subscriptionType = "Basic Fall 2022";
      }else if(facilityName.includes("standard")){
        subscriptionType = "Standard Fall 2022";
      }else if(facilityName.includes("premium")){
        subscriptionType = "Premium Fall 2022";
      }else if(facilityName.includes("deluxe")){
        subscriptionType = "Deluxe Fall 2022";
      }
    }
    return subscriptionType;
  }
  getFreeTrial = () => {
    let freeTrial = false;

    if(this.state.firstMonthFree){
      if((new Date()).getTime()-parseInt(this.state.subid)<2678400000){
        freeTrial = true;
      }
    }else{
      if((new Date()).getTime()-parseInt(this.state.subid)<1209600000){
        freeTrial = true;
      }
    }

    if(this.state.facilityName.includes("outdoorx")){
      return false;
    }else{
      return freeTrial;    
    }
  }

  getOffer = () => {
    return this.state.offer;
  }
  
  setOffer = (offer) => {
    this.setState({offer:offer});
  }

  getFreeTrialEnds = () => {
    let endTime = new Date(parseInt(this.state.subid)+1209600000);
    if(this.state.firstMonthFree){
      endTime = new Date(parseInt(this.state.subid)+2678400000);
    }

    return endTime.toLocaleString();
  }

  getReferalLink = () => {
    return "www.zipharvest.app/refcode="+this.state.myReferalCode;
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

    this.setState({loggedIn:'',subid:'',firstMonthFree:false,currentPage:'harvest-form',harvestBatches:[],plants:[],harvestRecords:[],
    plantsLoading:true,harvestBatchesLoading:true,harvestRecordsLoading:true,currentHarvest:[],userID:'',
    dryRooms:[],exportRecords:[], subscription:[], tutorials:"",usingReferalCode:"",myReferalCode:"",grantFreeMonthCode:"",offer:false,
    outdoorOffer: false, facilityName: ''});
    this.forceUpdate();
  }

  getPrint = () => {
    this.attemptPrint();
  }

  attemptPrint = async () => {
    const response = await fetch(`/api/print/users`);
    const text = await response.text();
    let txt = "Users:" + text;

    const response2 = await fetch(`/api/print/dr`);
    const text2 = await response2.text();
    txt = txt + "DryRooms:" + text2;

    const response3 = await fetch(`/api/print/er`);
    const text3 = await response3.text();
    txt = txt + "ExportRecords:" + text3;

    const response4 = await fetch(`/api/print/hb`);
    const text4 = await response4.text();
    txt = txt + "HarvestBatches:" + text4;

    const response5 = await fetch(`/api/print/hr`);
    const text5 = await response5.text();
    txt = txt + "HarvestRecords:" + text5;

    const response6 = await fetch(`/api/print/pl`);
    const text6 = await response6.text();
    txt = txt + "Plants:" + text6;

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

    this.updateUserSubId()
  }

  updateUserSubId = async () => {
    let subid = "none";
    const response = await fetch(`/user/subid/${subid}/${this.state.userID}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    });
    const json = await response.json();
    if(json !== undefined){
      this.executeLogout();
    }else{
    }
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

  logVisit = async (via) => {
    try{
      const response = await fetch(`/log-visit/${via}`);
      await response.json();
    }catch(err){
    }
  }    
   
  render() { 
    localStorage.setItem("currentPage","harvest-form");
    let reloaded = this.pageAccessedByReload();
    const loggedInUser = localStorage.getItem("user");
    const subid = localStorage.getItem("subid");

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
        this.setState({loggedIn:loggedInUser,subid:subid,firstMonthFree:false,userID:loggedInUser,usersLoading:false});
        this.getUser(loggedInUser,staySignedIn,subid,false,"");
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

    /*if(currUrl.includes("signin") && this.state.currentPage !== "signin" && this.state.currentPage !== "create-user-form"
    && this.state.currentPage !== "stripe-form" && this.state.currentPage !== "verification-form"
    && this.state.currentPage !== "reset-password-form" && this.state.currentPage !== "find-user-form"){
      this.setCurrentPage('signin');
    }*/

    let refCodeEqualsStr = "refcode=";
    if(currUrl.includes("refcode")){
      let refCodeStr = currUrl.substring(currUrl.indexOf(refCodeEqualsStr)+refCodeEqualsStr.length,currUrl.indexOf(refCodeEqualsStr)+refCodeEqualsStr.length+8);
      if(this.state.currentPage !== 'create-user-form'){
        localStorage.setItem("currentPage",'create-user-form');
        this.setState({currentPage:'create-user-form',usingReferalCode:refCodeStr});
      }
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

    let userFromUrl = "";
    let userEqualsStr = "username=";
    if(currUrl.includes("username")){
      let userString = currUrl.substring(currUrl.indexOf(userEqualsStr)+userEqualsStr.length);
      if(userString.includes("?")){
        userString = userString.substring(0,userString.length-1);
      }
      userFromUrl = userString;
    }else{
      if(currUrl.includes("#")){
        if(currUrl.includes("#a")){
          this.logVisit("Email Main Link");
          window.location.replace("https://www.zipharvest.app/");
        }
      }else{
        if(currUrl.includes("/go/")){
          this.logVisit("website");
          window.location.replace("https://www.zipharvest.app/");
        }else if(currUrl.includes("tryit")){
          this.logVisit("ig");
          window.location.replace("https://www.zipharvest.app/");
        }else if(currUrl.includes("try")){
          this.logVisit("lb");
          window.location.replace("https://www.zipharvest.app/");
        }else{
          //this.logVisit("Home");
        }
      }
    }

    let landingForm = false;
    if (this.state.loggedIn !== '' && !this.state.offer) {
	  	showForm = <div style={{margin:"auto"}}>
	    <Header setCurrentPage={this.setCurrentPage}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.setCurrentPage} getPlants={this.getPlants} getHarvestRecords={this.getHarvestRecords} getHarvestBatches={this.getHarvestBatches}
      resetHarvestBatches={this.resetHarvestBatches} currentHarvest={this.state.currentHarvest} setNewHBID={this.setNewHBID} getCurrentHarvestID={this.getCurrentHarvestID}
      setNewHarvestRecordID={this.setNewHarvestRecordID} setNewPlantID={this.setNewPlantID} userID={this.state.userID}
      setHarvestBatches={this.setHarvestBatches} setHarvestRecords={this.setHarvestRecords} setPlants={this.setPlants} reloadPlants={this.reloadPlants} 
      reloadPlantsAndHarvestRecords={this.reloadPlantsAndHarvestRecords} reloadHarvestBatches={this.reloadHarvestBatches} reloadHarvestRecords={this.reloadHarvestRecords}
      executeLogout={this.executeLogout} setFromAccountSettings={this.setFromAccountSettings} attemptLogInFromEndSubForm={this.attemptLogInFromEndSubForm}
      getDryRooms={this.getDryRooms} logInSuccess={this.state.logInSuccess} reloadDryRooms={this.reloadDryRooms} reloadExportRecords={this.reloadExportRecords}
      getUniqueIDCount={this.getUniqueIDCount} reloadSubscription={this.reloadSubscription} getPossiblePlantCount={this.getPossiblePlantCount} getSubscriptionType={this.getSubscriptionType} 
      getTutorials={this.getTutorials} setTutorials={this.setTutorials}
      showHints={this.state.showHints} getPrint={this.getPrint} print={this.state.print} getFreeTrial={this.getFreeTrial}
      getFreeTrialEnds={this.getFreeTrialEnds} getReferalLink={this.getReferalLink} getGrantFreeMonthCode={this.getGrantFreeMonthCode}
      setGrantFreeMonthCode={this.setGrantFreeMonthCode} getFreeMonthGrantedVisible={this.getFreeMonthGrantedVisible} setFreeMonthGrantedVisible={this.setFreeMonthGrantedVisible}
      setOffer={this.setOffer} setNewUsername={this.setNewUsername} getOutdoorOffer={this.getOutdoorOffer}/>
    </div>;
    }else{
      let loginForm = false;
      if(this.state.currentPage === 'create-user-form'){
				showForm = <CreateUserForm setCurrentPage={this.setCurrentPage} setNewUsername={this.setNewUsername} logVisit={this.logVisit} 
        usingReferalCode={this.state.usingReferalCode}></CreateUserForm>
      }else if(this.state.currentPage === 'stripe-form'){
				showForm = <StripeForm verCode={verCode} userFromUrl={userFromUrl} userFromLogin={this.state.newUsername} setCurrentPage={this.setCurrentPage} getOffer={this.getOffer}
        setOffer={this.setOffer} newUsername={this.state.newUsername}></StripeForm>
      }else if(this.state.currentPage === 'verification-form'){
				showForm = <VerificationForm newUsername={this.state.newUsername} setCurrentPage={this.setCurrentPage}></VerificationForm>
      }else if(this.state.currentPage === 'reset-password-form'){
				showForm = <ResetPasswordForm setCurrentPage={this.setCurrentPage} linkCode={linkCode} userFromUrl={userFromUrl} executeLogout={this.executeLogout} fromAccountSettings={this.state.fromAccountSettings} userID=""></ResetPasswordForm>
      }else if(this.state.currentPage === 'find-user-form'){
				showForm = <FindUserForm setCurrentPage={this.setCurrentPage}></FindUserForm>
      }else if(this.state.currentPage === 'signin'){
        showForm = <LogIn attemptLogin={this.attemptLogin} setCurrentPage={this.setCurrentPage} logInFailed={this.state.logInFailed}></LogIn>;
        loginForm = true;
      }else{
        showForm = <ProductLanding setCurrentPage={this.setCurrentPage} logVisit={this.logVisit}></ProductLanding>
        landingForm = true;
      }
      if(!loginForm && !landingForm){
        showForm = (<Grid
			  	container
			  	direction="column"
  				justifyContent="center"
				  alignItems="center"
		  	  >
          <LoginHeader setCurrentPage={this.setCurrentPage}></LoginHeader>
          {showForm}
          </Grid>)
      } 
    }
    if(landingForm && !isMobile){
      return showForm;
    }else{
      return (<div style={{position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
              <div style={{width:"100%",height:"100%"}}>
               {showForm}
              </div>
            </div>);
    }
    
  }
}
