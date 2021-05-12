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
    harvestedPlants: []
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
    fetch('/api/plants')
      .then(res => res.text())
      .then(plants => this.setState({ plants }));
  }

  getHarvestedPlants = () => {
    fetch('/api/harvestedplants')
      .then(res => res.text())
      .then(harvestedPlants => this.setState({ harvestedPlants }));
  }

  handlePost = () => {
    console.log("Handle Post");

    let plantItem = this.getPlantItem();
    console.log("PLANT ITEM: " + JSON.stringify(plantItem));

    fetch('/api/plant', {
      method: (plantItem.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantItem),
    });
  }

  getPlantItem(){
		console.log("Enter getPlantitem")

		let plant = {
			strain: 'JOHNNY',
			tag: '666'
		  };
		return plant;
	}

  render() {

    console.log("Harvest Batches In State: " + this.state.harvestBatches);
    console.log("Plants In State: " + this.state.plants);
    console.log("HarvestedPlants In State: " + this.state.harvestedPlants);


	  const SetCurrentPage = (currentPage) => {
		
	  	this.state.currentPage = (currentPage);
	  }

	  console.log("Logged In: " + this.state.loggedIn);
	  let showForm;
    if (this.state.loggedIn != '') {
	  	showForm = <div>
	    <Header currentPageSet={SetCurrentPage} currentPage={this.state.currentPage}/>
	    <Button onClick={handlePost}>Post</Button>
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
