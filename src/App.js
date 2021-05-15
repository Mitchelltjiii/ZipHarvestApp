import React from "react";
import axios from "axios";
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
    responseFromPlants: []
  };
  componentDidMount() {
    /*
    axios.get("/users.json").then((response) => {
      this.setState({ users: response.data });
    });*/
    //<Outer  currentPage={this.state.currentPage} setCurrentPage={SetCurrentPage}/>
    this.getHarvestBatches();
    this.getPlants();
    this.getHarvestedPlants();
  }

  getHarvestBatches = () => {
    // Get the hbs and store them in state
    fetch('/api/harvestbatches')
      .then(res => res.text())
      .then(harvestBatches => this.setState({ harvestBatches }));
  }

  getPlants = () => {
    fetch('api/plants')
      .then(res => res.text())
      .then(plants => this.setState({ plants }));
  }

  getHarvestedPlants = () => {
    fetch('/api/harvestedplants')
      .then(res => res.text())
      .then(harvestedPlants => this.setState({ harvestedPlants }));
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

  render() {

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestedPlants In State: " + this.state.harvestedPlants);
    console.log("ResponseFromPlant In State: " + this.state.responseFromPlants);


	  const SetCurrentPage = (currentPage) => {
		
	  	this.state.currentPage = (currentPage);
	  }

    const handlePost = (event) => {
      this.doPost();
      };

	  console.log("Logged In: " + this.state.loggedIn);
	  let showForm;
    if (this.state.loggedIn != '') {
	  	showForm = <div>
        <div>Button Below?</div>
        	    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handlePost}>Post</Button>

	    <Header currentPageSet={SetCurrentPage} currentPage={this.state.currentPage}/>
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
