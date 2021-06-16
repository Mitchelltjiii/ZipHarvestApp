import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HarvestBatch from './HarvestBatchesForm.component';
import Button from '@material-ui/core/Button';
import ExportButton from './ExportButton.component';


function HBTable({getHarvestBatches,getHarvestRecords,getPlants}) {

    console.log("ENTER HBTABLE, HBLIST: " + getHarvestBatches());

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
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
        if(val.batchName == batchName){
          plantCount++;
          let str = "";
          for(let val2 of parsedPlants){
            if(val2.tag == val.tag){
              str = val2.strain;
            }
          }
          if(strain == ""){
            strain = str;
          }else if(str != strain){
            strain = "Multi-Harvest";
          }
        }
      }
      console.log("Strain of " + batchName + ": " + strain);
    }

    const rows = [];

    for(let val of JSON.parse(getHarvestBatches())) {
      checkPlantList(val.name);
      if(strain == ""){
        strain = "N/A";
      }

      rows.push(createData(val.name,plantCount,strain,val.date));
    }
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Strain</TableCell>
            <TableCell align="right"># Plants</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Export</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.strain}</TableCell>
              <TableCell align="right">{row.plants}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right" style={{ width: "170px"}}>
                    <ExportButton row={row}></ExportButton>
                  </TableCell>
            </TableRow>
            ))}
            </TableBody>
        
      </Table>
      </TableContainer>
    );
  }

export default HBTable;