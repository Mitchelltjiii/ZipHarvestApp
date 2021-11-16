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
            choosingUnit: false,
            exportRecords: []
        };
    }

    render() {  
        let parent = this;
        let busyCreatingExportRecords = [];

        const handleClickExport = () => {
            clickExport();
        }

        function clickExport(){
            parent.setState({choosingUnit:true});
            parent.forceUpdate();
        }
    
        const handleExport = () => {
            exp();
        }

        function exp(){
            commitExportRecords();
            parent.setState({choosingUnit:false});
            parent.forceUpdate();
        }

        function commitExportRecords(){
            console.log("Commit Export Records: " + parent.state.exportRecords);
            for(const val of parent.state.exportRecords){
                console.log("ER val: " + val);
                busyCreatingExportRecords.push(val);
            }

            for(const val of parent.state.exportRecords){
                console.log("ER val: " + val);
                createExportRecord(val);
            }

            let timeLimit = 3000;
		    let x = 0;

            while(JSON.stringify(busyCreatingExportRecords) !== "[]" && x<timeLimit){
                  console.log("Set timeout");
                  setTimeout(null,200);
                  x++;
                }

                if(x===timeLimit){
                  console.log("TIMEOUT OPERATION FAILED");
                }
        }
        const createExportRecord = async(tag) => {
            console.log("Create ER: " + tag);
            let time = JSON.stringify((new Date()).getTime());
            const response = fetch(`/er/${tag}/${time}/${parent.props.userID}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
            });
      
            try{
              console.log("AWAITING RESPONSE UpdateExportRecord");
              await response.text();
              console.log("RESPONSE RECIEVED UpdateExportRecord")
            }catch(err){
              console.log("NO RESPONSE RECIEVED UpdateExportRecord")
            } 
      
            console.log("Before removing busy updating record");
            console.log("busycreating before: " + JSON.stringify(busyCreatingExportRecords)); 
            for( var i = 0; i < busyCreatingExportRecords.length; i++){ 
              if (busyCreatingExportRecords[i] === tag) { 
                busyCreatingExportRecords.splice(i, 1); 
              }
            }
            console.log("busyCreatingrecords after: " + JSON.stringify(this.state.busyCreatingExportRecords));       
            console.log("Exit create export record")
          }

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
        let exportRecordsData = [];

        const gramsInAPound = 453.592;

        for(let val of JSON.parse(this.props.getHarvestRecords())){
            if(val.batchName === this.props.row.name){
                let weight = val.weight;
                let gramsWeight = weight;
                let poundsWeight = weight;
                if(val.unit==="g"){
                    poundsWeight = Math.round((weight/gramsInAPound)*100000)/100000;
                }else{
                    gramsWeight = Math.round((weight*gramsInAPound)*100)/100;
                }
                gramsData += String(val.tag) + "," + gramsWeight + "," + "g" + ",Dry Room #1," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
                poundsData += String(val.tag) + "," + poundsWeight + "," + "lbs" + ",Dry Room #1," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
                exportRecordsData.push(val.tag);
            }
        } 
        console.log("before set State exportrecords: " + JSON.stringify(this.state.exportRecords));

        if(JSON.stringify(this.state.exportRecords) === "[]"){
            console.log("set State exportrecords: " + JSON.stringify(exportRecordsData));
            this.setState({exportRecords:exportRecordsData});            
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
            wrap="nowrap"
            >
                <CSVLink data={gramsData} style={{textDecoration:"none"}} filename={fileName} uFEFF={false}>
                <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14,marginRight:"3px"}} onClick={handleExport}>g</Button>            
                </CSVLink>
                <CSVLink data={poundsData} style={{textDecoration:"none"}} filename={fileName} uFEFF={false}>
                <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleExport}>lbs</Button>            
                </CSVLink>
            </Grid> :
                <Button aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleClickExport}>Export</Button>            
            }
        </div>;
      }
}
 



export default ExportButton;