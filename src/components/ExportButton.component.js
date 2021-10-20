import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { CSVLink } from "react-csv";
import Grid from '@material-ui/core/Grid';

class ExportButton extends Component{    
    constructor(props) {
        super(props);
        this.state = {
          bgColors: { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42"},
            choosingUnit: false
        };
    }

    render() {  
        function handleClickExport() {
            setState({choosingUnit:true});
        }
    
        function handleExport() {
            setState({choosingUnit:false});
        }

        let parent = this;
        function getHBDate(batchName){
            console.log("Get Date");
            for(let val of JSON.parse(parent.props.getHarvestBatches())){
                console.log("Val: " + JSON.stringify(val));
                if(val.name === batchName){
                    let parsedDate = new Date(val.date);
                    var dd = String(parsedDate.getDate()).padStart(2, '0');
                    var mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = parsedDate.getFullYear();
                
                    let today = yyyy + '-' + mm + '-' + dd;
                    console.log("Today Str: " + today.toString());
                    return today.toString();
                }
            }
        }


        let gramsData = ""; 
        let poundsData = ""; 

        for(let val of JSON.parse(this.props.getHarvestRecords())){
            if(val.batchName === this.props.row.name){
                gramsData += String(val.tag) + "," + val.weight + "," + val.unit + ",Dry Room #1," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
                poundsData += String(val.tag) + "," + val.weight + "," + val.unit + ",Dry Room #1," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
            }
        } 
              
        let fileName = this.props.row.name;
        fileName = fileName.replace(" ","_");
        fileName = "ZipHarvest_" + fileName.replace("/",".") + ".csv";

        console.log("ChoosingUnit: " + this.state.choosingUnit);

        return <div>
            {this.state.choosingUnit ?
            <Grid
            container
            direction="row"
              justifyContent="center"
            alignItems="center"
            >
                <CSVLink data={gramsData} style={{textDecoration:"none"}} filename={fileName} uFEFF={false}>
                <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleExport}>Grams</Button>            
                </CSVLink>
                <CSVLink data={poundsData} style={{textDecoration:"none"}} filename={fileName} uFEFF={false}>
                <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleExport}>Pounds</Button>            
                </CSVLink>
            </Grid> :
                <Button aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleClickExport}>Export</Button>            
            }
        </div>;
      }
}
 



export default ExportButton;