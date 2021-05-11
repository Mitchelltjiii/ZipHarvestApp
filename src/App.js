import React from "react";
import axios from "axios";
import "./styles.css";

import Header from './componentsNew/Header.component';
import Outer from './componentsNew/Outer.component';
import LogIn from './componentsNew/LogIn.component';

export default class App extends React.Component {
  state = {
    currentPage: 'harvest-form',
    loggedIn: 'x'
  };
  componentDidMount() {
    axios.get("/users.json").then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {

	  const SetCurrentPage = (currentPage) => {
		
	  	this.state.currentPage = (currentPage);
	  }

	  console.log("Logged In: " + loggedIn);
	  let showForm;
    if (loggedIn != '') {
	  	showForm = <div>
	    <Header currentPageSet={SetCurrentPage} currentPage={currentPage}/>
	    <Outer currentPage={currentPage} setCurrentPage={SetCurrentPage} plantMap={plantMap}/>
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
