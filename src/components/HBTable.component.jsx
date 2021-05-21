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


function HBTable({harvestBatches,harvestedPlants}) {

    console.log("ENTER HBTABLE, HBLIST: " + harvestBatches);

    function HarvestBatch(itemID,name,finalized,plantList,type,date){
		this.itemID = itemID;
		this.name = name;
		this.finalized = finalized;
		this.plantList = plantList;
        this.type = type;
        this.date = date;
	}

    function HarvestedPlant(itemID,strain,tag,weight,unit){
		this.itemID = itemID;
		this.strain = strain;
		this.tag = tag;
		this.weight = weight;
		this.unit = unit;
	}

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    

    const classes = useStyles();

    function createData(name, plants) {
      return { name, plants};
    }

    const rows = [];

    for(let val of harvestBatches) {
      rows.push(createData(val.name,val.plantList));
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