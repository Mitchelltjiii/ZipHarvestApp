import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SelectDeleteAllButton from './SelectDeleteAllButton.component';


function PlantTable({getPlants}) {

    console.log("ENTER PlantTable, Plants: " + getPlants());

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    

    const classes = useStyles();

    function createData(tag, strain) {
      return { tag, strain};
    }

    const rows = [];

    for(let val of JSON.parse(getPlants())) {
      rows.push(createData(val.tag,val.strain));
    }
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left" style={{ width: "170px"}}>
                    <SelectDeleteAllButton deleteAllSelected={this.props.deleteAllSelected} setDeleteAllSelected={this.props.setDeleteAllSelected}></SelectDeleteAllButton>
            </TableCell>
            <TableCell >Tag</TableCell>
            <TableCell align="right">Strain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.tag}>
              <TableCell align="left" style={{ width: "170px"}}>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.tag}
              </TableCell>
              <TableCell align="right">{row.strain}</TableCell>
            </TableRow>
            ))}
            </TableBody>
        
      </Table>
      </TableContainer>
    );
  }

export default PlantTable;