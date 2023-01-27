import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExportButton from './ExportButton.component';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';


function HBTable({getHarvestBatches,getHarvestRecords,getPlants,userID,reloadExportRecords,getUniqueIDCount,getDryRooms}) {
    let tableWidth = 600;
    
    if(isMobile){
      tableWidth = 340;
    }
    const useStyles = makeStyles({
        table: {
          minWidth: tableWidth,
          maxWidth: tableWidth
        },
      });
    

    const classes = useStyles();
    let plantCount = 0;
    let strain = "";
    let tWeight = 0;
    const gramsInAPound = 453.592;


    function createData(hbid, plants, strain, date, totalWeight, name) {
      return { hbid, plants, strain, date, totalWeight, name};
    }

    function checkPlantList(hbid) {
      plantCount = 0;
      strain = "";
      tWeight = 0;
      let plants = getPlants();
      let parsedPlants = [];
      try{
        parsedPlants = JSON.parse(plants);
      }catch(mm){
      }

      for(let val of JSON.parse(getHarvestRecords())){
        if(val.batchName === hbid){
          plantCount++;
          if(val.unit === "g"){
            tWeight += val.weight;
          }else{
            let gramsWeight = Math.round((val.weight*gramsInAPound)*100)/100;
            tWeight += gramsWeight;
          }
          let str = "";
          for(let val2 of parsedPlants){
            if(val2.tag === val.tag){
              str = val2.strain;
            }
          }
          if(strain === ""){
            strain = str;
          }else if(str !== strain){
            strain = "Multi-Harvest";
          }
        }
      }
    }

    function fixDate(date){
      if(date.substring(3,4) === "0"){
        date = date.substring(0,3) + date.substring(4);
      }
      if(date.substring(0,1) === "0"){
        date = date.substring(1);
      }
      return date;
    }

    const rows = [];

    for(let val of JSON.parse(getHarvestBatches())) {
      checkPlantList(val.hbid);
      if(strain === ""){
        strain = "N/A";
      }

      rows.push(createData(val.hbid,plantCount,strain,fixDate(val.date),Math.round(tWeight),val.name));
    }

    let emptyMessageWidth = "500px";
  let emptyMessageFontSize = "17px";

  if(isMobile){
    emptyMessageWidth = "340px";
    emptyMessageFontSize = "15px";
  }

    let newRows = [];
    let foundX = -1;
    let x = 0;
    let latestDate = new Date();
    let parsedRows = [];
    while(JSON.stringify(rows) !== "" && JSON.stringify(rows) !== "[]"){
      x = 0;
      foundX = -1;
      latestDate = new Date(0);
      for(let val of rows){
        if(new Date(val.date)>latestDate){
          foundX = x;
          latestDate = new Date(val.date);
        }
        x++;
      }
      let newRow = JSON.stringify(rows.splice(foundX,1));
      newRows.push(newRow.substring(1,newRow.length-1));
      parsedRows = JSON.parse("[" + newRows + "]");
    }
    
       
    if(parsedRows.length > 0){    
      return(
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Harvest Batch</TableCell>
              <TableCell align="center"></TableCell>            
              <TableCell align="center" style={{marginRight:"2px"}}><Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                  <div>Export</div>
                  </Grid>
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
              {parsedRows.map((row) => (
              <TableRow key={row.hbid}>
                <TableCell component="th" scope="row">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                  <div style={{fontWeight:"bold"}}>{row.name}</div>
                  <div>Strain: {row.strain}</div>
                  </Grid>
                  
                </TableCell>
                <TableCell align="center"><Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                  {row.plants === 1 ? <div style={{fontWeight:"bold"}}>{row.plants} Plant</div>
                  : <div style={{fontWeight:"bold"}}>{row.plants} Plants</div>}
                  <div>{row.date}</div>
                  <div style={{flexWrap:"nowrap"}}>{row.totalWeight} g</div>
                  </Grid></TableCell>
                <TableCell align="center">
                  <ExportButton row={row} getHarvestRecords={getHarvestRecords} getHarvestBatches={getHarvestBatches} userID={userID} reloadExportRecords={reloadExportRecords} getUniqueIDCount={getUniqueIDCount} getDryRooms={getDryRooms}></ExportButton> 
                    </TableCell>
              </TableRow>
              ))}
              </TableBody>
          
        </Table>
        </TableContainer>
      );
    }else{
      return(
        <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:emptyMessageWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				<div style={{margin:"5px",textAlign:"center",fontSize:emptyMessageFontSize}}>Harvest Batches will appear here after you create them in the Harvest Now section. See tutorial for more info.</div>
				</Grid>
      );
    }
  }

export default HBTable;