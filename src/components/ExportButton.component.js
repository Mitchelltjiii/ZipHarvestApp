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
        
        function createData(tag,weight,unit,dryroom,hbname,date){
            let blank = "";
            return {tag, weight, unit, dryroom, hbname, blank, date};
        }

        let data = []; 
        let newData = "";

        for(let val of JSON.parse(this.props.getHarvestRecords())){
            data.push(createData(val.tag,val.weight,val.unit,"Dry Room #1",val.batchName,val.date));
            newData += val.tag + "," + val.weight + "," + val.unit + ",Dry Room #1," + val.batchName + ",," + val.date + "\n";
        }   

        console.log("New Data: " + newData);
        
        return <div style={{width: "170px"}}>
            <CSVLink data={newData}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSubmit}  style={{width: "120px"}}>Export</Button>            
            </CSVLink>
        </div>;
      }
}
 



export default ExportButton;