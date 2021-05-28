import React from "react";
import "./styles.css";
import Header from './components/Header.component';
import Outer from './components/Outer.component';
import LogIn from './components/LogIn.component';
import { Button } from "@material-ui/core";

export default class App extends React.Component {
  state = {
    currentPage: 'harvest-form',
    loggedIn: 'x',
    harvestBatches: [],
    plants: [],
    harvestedPlants: [],
    responseFromPlants: [],
    plantsLoading: true,
    harvestedPlantsLoading: true,    
    harvestBatchesLoading: true,
    currentHarvest: []
  };
  componentDidMount() {
    /*
    axios.get("/users.json").then((response) => {
      this.setState({ users: response.data });
    });*/
    console.log("Component Did Mount - App.js");

    console.log("Before GetHarvestBatches")
    this.getHarvestBatches();
    console.log("After GetHarvestBatches")

    console.log("Before GetPlants")
    this.getPlants();
    console.log("After GetPlants")

    console.log("Before GetHarvestedPlants")
    this.getHarvestedPlants();
    console.log("After GetHarvestedPlants")
  }
/*
  getHarvestBatches = () => {
    // Get the hbs and store them in state
    fetch('/api/harvestbatches')
      .then(res => res.text())
      .then(harvestBatches => this.setState({ harvestBatches }));
  }

  getPlants = () => {
    fetch('/api/plants')
      .then(res => res.text())
      .then(plants => this.setState({ plants }));
  }
  getHarvestedPlants = () => {
    fetch('/api/harvestedplants')
      .then(res => res.text())
      .then(harvestedPlants => this.setState({ harvestedPlants }));
  }*/

  engageReload = () => {
    console.log("Engage Reload || pl: " + this.state.plantsLoading + " | hpl: " + this.state.harvestedPlantsLoading + " | hbl: " + this.state.harvestBatchesLoading);
    if(!this.state.plantsLoading && !this.state.harvestedPlantsLoading && !this.state.harvestBatchesLoading){
      console.log("Force Updated In App.js");
      this.forceUpdate();
    }
  }

  getPlants = async () => {
    console.log("In GetPlants")
    const response = await fetch('/api/plants');
    const text = await response.text();
    console.log("API GET PLANTS: " + text);
    this.state.plants = text;
    this.state.plantsLoading = false;
    console.log("Leaving GetPlants")
    this.engageReload();
  }

  getHarvestedPlants = async () => {
    console.log("In GetHarvestedPlants")
    const response = await fetch('/api/harvestedplants');
    const text = await response.text();
    console.log("API GET HARVESTEDPLANTS: " + text);
    this.state.harvestedPlants = text;
    this.state.harvestedPlantsLoading = false;
    console.log("Leaving GetHarvestedPlants")
    this.engageReload();
  }

  getHarvestBatches = async () => {
    console.log("In GetHarvestBatches")
    const response = await fetch('/api/harvestbatches');
    const text = await response.text();
    console.log("API GET HARVESTBATCHES: " + text);
    this.state.harvestBatches = text;
    this.state.harvestBatchesLoading = false;
    console.log("Leaving GetHarvestBatches")
    this.engageReload();
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

    this.setState({harvestBatchesLoading: true, currentHarvest: currHarvest});

    console.log("RESETTING Harvest Batches");

    console.log("Before getHarvestBatches");

    setTimeout(() => this.executeResetHarvestBatches(currHarvest),0); 

    this.getHarvestBatches();

    console.log("After getHarvestBatches");

   
  }

  executeResetHarvestBatches = (currHarvest) => {
    console.log("Enter executeresetharvestbatches");

    let currHarvestID = -1;

    console.log("RESET Harvest Batches");
    console.log("HarvestBatches: " + this.state.harvestBatches);
    console.log("CurrHarvest: " + JSON.stringify(currHarvest));
    console.log("CurrHarvest.name: " + currHarvest.name);

    let parsed = JSON.parse(this.state.harvestBatches);

    for(let val of parsed){
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
    this.setState({harvestBatchesLoading: true, plantsLoading: true, harvestedPlantsLoading: true, currentHarvest: currHarvest});

    console.log("RESETTING ALL");

    console.log("Before GetHarvestBatches")
    this.getHarvestBatches();
    console.log("After GetHarvestBatches")

    console.log("Before GetPlants")
    this.getPlants();
    console.log("After GetPlants")

    console.log("Before GetHarvestedPlants")
    this.getHarvestedPlants();
    console.log("After GetHarvestedPlants")
  }

  render() {

    if(this.state.plantsLoading || this.state.harvestedPlantsLoading || this.state.harvestBatchesLoading){
      return(<div>Loading...</div>);
    }

    console.log("Rendering - App.js");

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestedPlants In State: " + this.state.harvestedPlants);
    console.log("ResponseFromPlant In State: " + this.state.responseFromPlants);

    const handlePost = (event) => {
      this.doPost();
      };

	  console.log("Logged In: " + this.state.loggedIn);
	  let showForm;
    if (this.state.loggedIn != '') {
	  	showForm = <div>
	    <Header currentPageSet={this.SetCurrentPage} currentPage={this.state.currentPage}/>
      <Outer currentPage={this.state.currentPage} setCurrentPage={this.SetCurrentPage} harvestBatches={this.state.harvestBatches} harvestedPlants={this.state.harvestedPlants} plants={this.state.plants} 
      resetHarvestBatches={this.resetHarvestBatches} resetAll={this.resetAll} currentHarvest={this.state.currentHarvest}/>
    </div>;
    }else{
		showForm = <div><LogIn></LogIn></div>;
    }
    return (
      <div className="App">
			{showForm}
		</div>
    );
  }
}
