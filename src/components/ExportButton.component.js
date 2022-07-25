import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { CSVLink } from "react-csv";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
            subscription: [],
            choosingDryRoom: false,
            selectedDR: ""
        };
    }

    render() {  
        let parent = this;
        let busyCreatingExportRecords = [];
        let drOptionsList = [];

        for(let val of JSON.parse(this.props.getDryRooms())) {
          if(!drOptionsList.includes(val.name)){
            drOptionsList.push(val.name);
          }
        }
      
        const handleSelectDR = (e) => {
          parent.setState({selectedDR:e.target.value});
        };

        const handleClickExport = () => {
            clickExport();
        }

        function clickExport(){
            //getSubId();
            parent.setState({choosingDryRoom:true});
            parent.forceUpdate();
        }

        const handleNext = () => {
          clickNext();
        }

      function clickNext(){
        if(parent.state.selectedDR !== ""){
          parent.setState({choosingUnit:true,choosingDryRoom:false});
          parent.forceUpdate();
        }
      }

        async function getSubId(){
            const response = await fetch(`/get-subid/${parent.props.userID}`);
            const json = await response.json();
            if(json !== undefined){
                getSubscription(json);
              }
          }
          
          async function getSubscription(subId){
            const response = await fetch(`/get-subscription/${subId}`);
            const json = await response.json();
            getUIDCount(json);
          }

          async function getUIDCount(sub){
            let uidCount = parent.props.getUniqueIDCount();

            let subscriptionType = sub.items.data[0].price.lookup_key;
          
            let possiblePlantCount = 0;
            if(subscriptionType === "basic"){
              possiblePlantCount = 625;
            }else if(subscriptionType === "standard"){
              possiblePlantCount = 1250;
            }else if(subscriptionType === "premium"){
              possiblePlantCount = 2500;
            }else if(subscriptionType === "deluxe"){
              possiblePlantCount = 5000;
            }
            
            if(uidCount <= possiblePlantCount){
              parent.setState({choosingDryRoom:true,subscription:sub});
            }else{
            }
            parent.forceUpdate();
          }
        const handleExport = () => {
            exp();
        }

        function exp(){
          //if(parent.props.userID.includes("Mitchell")){
            commitExportRecords();
          //}
            parent.setState({choosingUnit:false});
            parent.forceUpdate();
        }

        function commitExportRecords(){
            for(const val of exportRecordsData){
                busyCreatingExportRecords.push(val);
            }

            for(const val of exportRecordsData){
                createExportRecord(val);
            }

            let timeLimit = 3000;
		    let x = 0;

            while(JSON.stringify(busyCreatingExportRecords) !== "[]" && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }
        }
        const createExportRecord = async(tag) => {
            let time = JSON.stringify((new Date()).getTime());

            const response = fetch(`/er/${tag}/${time}/${parent.props.userID}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
            });
      
            try{
              await response.text();
            }catch(err){
            } 
      
            for( var i = 0; i < busyCreatingExportRecords.length; i++){ 
              if (busyCreatingExportRecords[i] === tag) { 
                busyCreatingExportRecords.splice(i, 1); 
              }
            }
            parent.props.reloadExportRecords("");
          }

        function getHBDate(batchName){
            for(let val of JSON.parse(parent.props.getHarvestBatches())){
                if(val.name === batchName){
                    let parsedDate = new Date(val.date);
                    var dd = String(parsedDate.getDate()).padStart(2, '0');
                    var mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = parsedDate.getFullYear();
                
                    let today = yyyy + '-' + mm + '-' + dd;
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
                gramsData += String(val.tag) + "," + gramsWeight + ",Grams," + parent.state.selectedDR + "," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
                poundsData += String(val.tag) + "," + poundsWeight + ",Pounds," + parent.state.selectedDR + "," + val.batchName + ",," + getHBDate(val.batchName) + "\n";
                exportRecordsData.push(val.tag);
            }
        } 
              
        let fileName = this.props.row.name;
        fileName = fileName.replace(" ","_");
        fileName = fileName.replace("/",".") + ".csv";

        return <div>
            {this.state.choosingUnit ? (
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
              </Grid>
              ) : this.state.choosingDryRoom ? (
                <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              wrap="nowrap"
              >
                
				          <Select id="choose-dryroom-select" value={parent.state.selectedDR} onChange={handleSelectDR} style={{minWidth:"100px"}}>
                	  {drOptionsList.map((name, index) => (
            			  <MenuItem key={index} value={name}>
             	 		  {name}
            			</MenuItem>
          			))}
             	</Select>
              <Button aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleNext}>Next</Button>            
              </Grid>
			) : <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true"  style={{fontSize:14}} onClick={handleClickExport}>Export</Button>            
    }
    </div>
  }
}
 



export default ExportButton;