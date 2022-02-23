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
import Grid from '@material-ui/core/Grid';

function PlantTable({plantsWithSearch,toggleDeleteAllSelected,getDeleteAllSelected,toggleDeletePlantSelected,getDeletePlantSelected}) {

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

      let emptyMessageWidth = "500px";
  let emptyMessageFontSize = "17px";

  if(isMobile){
    emptyMessageWidth = "340px";
    emptyMessageFontSize = "15px";
  }

    

    const classes = useStyles();

    function createData(tag, strain) {
      if(tag.length>5){
        tag = tag.substring(tag.length-5);
      }
      return { tag, strain};
    }

    const rows = [];

    for(const val of JSON.parse(plantsWithSearch)) {
      if(val.active === 0){
        rows.push(createData(val.tag,val.strain));
      }
    }
       
    if(rows.length > 0){    
      return(
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>
              <SelectDeleteAllButton toggleDeleteAllSelected={toggleDeleteAllSelected} getDeleteAllSelected={getDeleteAllSelected}></SelectDeleteAllButton>
              </TableCell>
              <TableCell style={{flexWrap:"nowrap"}}>Tag (Last 5)</TableCell>
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
    }else{
      return(
        <Grid
				container
				direction="column"
  				justify="center"
				alignItems="center"
				style={{width:emptyMessageWidth,borderColor:"#90ee90",marginLeft:"10px",marginRight:"10px",marginTop:"10px",marginBottom:"10px",borderRadius:"5px",border: "1px solid #90ee90",paddingRight:"5px",paddingBottom:"5px"}}
			>
				<div style={{margin:"5px",textAlign:"center",fontSize:emptyMessageFontSize}}>Click Import File to get started. See tutorial for more info.</div>
				</Grid>
        );
    }
  }

export default PlantTable;