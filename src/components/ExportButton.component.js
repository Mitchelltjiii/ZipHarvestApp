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
        
        function getDate(batchName){
            for(let val of JSON.parse(this.props.getHarvestBatches())){
                if(val.name == batchName){
                    let parsedDate = Date.parse(val.date);
                    var dd = String(parsedDate.getDate()).padStart(2, '0');
                    var mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = parsedDate.getFullYear();
                
                    let today = yyyy + '-' + mm + '-' + dd;
                    console.log("Today Str: " + today.toString());
                    return today.toString();
                }
            }
        }

        let data = ""; 

        for(let val of JSON.parse(this.props.getHarvestRecords())){
            if(val.batchName == this.props.row.name){
                data += val.tag + "," + val.weight + "," + val.unit + ",Dry Room #1," + val.batchName + ",," + getDate(val.batchName) + "\n";
            }
        }   
        
        return <div style={{width: "170px"}}>
            <CSVLink data={data}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}  style={{width: "120px"}}>Export</Button>            
            </CSVLink>
        </div>;
      }
}
 



export default ExportButton;