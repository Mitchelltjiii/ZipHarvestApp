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


function HBTable({getHarvestBatches,getHarvestRecords,getPlants,userID}) {
    console.log("ENTER HBTABLE, HBLIST: " + getHarvestBatches());
    let tableWidth = 600;
    
    if(isMobile){
      tableWidth = 345;
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

    function createData(name, plants, strain, date) {
      return { name, plants, strain, date};
    }

    function checkPlantList(batchName) {
      console.log("Check Plant List");
      plantCount = 0;
      strain = "";
      let plants = getPlants();
      console.log("Plants: " + plants);
      let parsedPlants = [];
      try{
        parsedPlants = JSON.parse(plants);
      }catch(mm){
        console.log("Could not parse plants");
      }

      for(let val of JSON.parse(getHarvestRecords())){
        if(val.batchName === batchName){
          plantCount++;
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
      console.log("Strain of " + batchName + ": " + strain);
    }

    const rows = [];

    for(let val of JSON.parse(getHarvestBatches())) {
      checkPlantList(val.name);
      if(strain === ""){
        strain = "N/A";
      }

      rows.push(createData(val.name,plantCount,strain,val.date));
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
      console.log("Rows: " + JSON.stringify(rows));
      for(let val of rows){
        console.log("Val: " + JSON.stringify(val));
        if(new Date(val.date)>latestDate){
          foundX = x;
          latestDate = new Date(val.date);
        }
        x++;
      }
      let newRow = JSON.stringify(rows.splice(foundX,1));
      newRows.push(newRow.substring(1,newRow.length-1));
      console.log("New Rows: " + newRows);
      parsedRows = JSON.parse("[" + newRows + "]");
    }
    
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Strain</TableCell>
            <TableCell align="left"># Plants</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="center" style={{marginRight:"2px"}}>Export</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {parsedRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.strain}</TableCell>
              <TableCell align="left">{row.plants}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="center">
                    <ExportButton row={row} getHarvestRecords={getHarvestRecords} getHarvestBatches={getHarvestBatches} userID={userID}></ExportButton>
                  </TableCell>
            </TableRow>
            ))}
            </TableBody>
        
      </Table>
      </TableContainer>
    );
  }

export default HBTable;