import React from "react";
import axios from "axios";
import "./styles.css";

import Header from './components/Header.component';
import Outer from './components/Outer.component';
import LogIn from './components/LogIn.component';

export default class App extends React.Component {
  state = {
    currentPage: 'harvest-form',
    loggedIn: 'x'
  };
  componentDidMount() {
    /*
    axios.get("/users.json").then((response) => {
      this.setState({ users: response.data });
    });*/
    //<Outer  currentPage={this.state.currentPage} setCurrentPage={SetCurrentPage}/>
  }

  render() {

	  const SetCurrentPage = (currentPage) => {
		
	  	this.state.currentPage = (currentPage);
	  }

	  console.log("Logged In: " + this.state.loggedIn);
	  let showForm;
    if (this.state.loggedIn != '') {
	  	showForm = <div>
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
