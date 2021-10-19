import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SelectDeleteAllButton from './SelectDeleteAllButton.component';
import SelectDeletePlantButton from './SelectDeletePlantButton.component';
import {isMobile} from 'react-device-detect';

function PlantTable({plantsWithSearch,toggleDeleteAllSelected,getDeleteAllSelected,toggleDeletePlantSelected,getDeletePlantSelected}) {

    console.log("ENTER PlantTable, Plants with search: " + plantsWithSearch);

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

    function createData(tag, strain) {
      return { tag, strain};
    }

    const rows = [];

    for(const val of JSON.parse(plantsWithSearch)) {
      if(val.active === 0){
        rows.push(createData(val.tag,val.strain));
      }
    }
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>
            <SelectDeleteAllButton toggleDeleteAllSelected={toggleDeleteAllSelected} getDeleteAllSelected={getDeleteAllSelected}></SelectDeleteAllButton>
            </TableCell>
            <TableCell>Tag</TableCell>
            <TableCell align="right">Strain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.tag}>
              <TableCell>
                  <SelectDeletePlantButton toggleDeletePlantSelected={toggleDeletePlantSelected} getDeletePlantSelected={getDeletePlantSelected} tag={row.tag}></SelectDeletePlantButton>
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