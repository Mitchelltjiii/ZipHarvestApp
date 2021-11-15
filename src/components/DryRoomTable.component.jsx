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
import SelectDeleteDryRoomButton from './SelectDeleteDryRoomButton.component';
import {isMobile} from 'react-device-detect';

function DryRoomTable({dryRooms,toggleDeleteAllSelected,getDeleteAllSelected,toggleDeleteDryRoomSelected,getDeleteDryRoomSelected}) {

    console.log("ENTER Dryroomtable, dryrooms: " + dryRooms);

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

    function createData(dryRoomName) {
      return {dryRoomName};
    }

    const rows = [];

    for(const val of dryRooms) {
        rows.push(createData(val.name));
    }
       
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>
            <SelectDeleteAllButton toggleDeleteAllSelected={toggleDeleteAllSelected} getDeleteAllSelected={getDeleteAllSelected}></SelectDeleteAllButton>
            </TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                  <SelectDeleteDryRoomButton toggleDeleteDryRoomSelected={toggleDeleteDryRoomSelected} getDeleteDryRoomSelected={getDeleteDryRoomSelected} dryRoomId={row.id}></SelectDeleteDryRoomButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
            ))}
            </TableBody>
        
      </Table>
      </TableContainer>
    );
  }

export default DryRoomTable;