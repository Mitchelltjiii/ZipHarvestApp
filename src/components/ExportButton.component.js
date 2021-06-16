import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CSVLink } from "react-csv";

class ExportButton extends Component{

    handleSubmit() {
      console.log("Enter deletePlant");

      //this.props.hideHarvestRecord(this.props.row.tag);
    }

    
    
    constructor(props) {
        super(props);
        this.state = {
          bgColors: { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42"}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {    
        let data = [
            { tag: "tag", weight: "weight", unit: "unit", dryroom: "dryroom", hbname: "hbname", unknown: "", date: "date" }
          ]; 

        let headers = [
            { label: "First Name", key: "firstname" },
            { label: "Last Name", key: "lastname" },
            { label: "Email", key: "email" }
          ];    
        
        return <div style={{width: "170px"}}>
            <CSVLink data={data}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}  style={{width: "120px"}}>Export</Button>            
            </CSVLink>;
        </div>;
      }
}
//            



export default ExportButton;