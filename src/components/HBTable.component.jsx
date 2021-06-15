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


function HBTable({getHarvestBatches,getHarvestRecords}) {

    console.log("ENTER HBTABLE, HBLIST: " + getHarvestBatches());

    function HarvestBatch(name,submitted,type,date,userID){
      this.name = name;
      this.submitted = submitted;
      this.type = type;
      this.date = date;
      this.userID = userID;
    }

  function HarvestRecord(itemID,tag,weight,unit,batchName,userID){
		this.itemID = itemID;
		this.tag = tag;
		this.weight = weight;
		this.unit = unit;
		this.batchName = batchName;
		this.userID = userID;
	}

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    

    const classes = useStyles();
    let plantCount = 0;
    let strain = "";

    function createData(name, plants) {
      return { name, plants};
    }

    function checkPlantList(batchName) {
      console.log("Check Plant List");
      plantCount = 0;
      strain = "";
      for(let val of JSON.parse(getHarvestRecords())){
        if(val.batchName == batchName){
          plantCount++;
          if(strain == ""){
            strain = val.strain;
          }else if(val.strain != strain){
            strain = "Multi-Harvest";
          }
        }
      }
      console.log("Strain of " + batchName + ": " + strain);
    }

    const rows = [];

    for(let val of JSON.parse(getHarvestBatches())) {
      checkPlantList(val.name);
      rows.push(createData(val.name,plantCount));
    }
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Plants</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.plants}</TableCell>
            </TableRow>
            ))}
            </TableBody>
        
      </Table>
      </TableContainer>
    );
  }

export default HBTable;