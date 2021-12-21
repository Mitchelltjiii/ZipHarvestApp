import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteButton from './DeleteButton.component';
import {isMobile} from 'react-device-detect';

function MyTable({currHarvest,getHarvestRecords,editNow,currWeightChanges,setWeightChanges,wrapper,getRemovePlantIDDelete,currHidePlants,setHidePlants,getPlants,reset}) {
    function weightChange(tag,newWeight,newUnit){
      this.tag = tag;
      this.newWeight = newWeight;
      this.newUnit = newUnit;
    }

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

    function createData(tag, strain, weight, unit, wasteWeight, wasteUnit) {
      return {tag, strain, weight, unit, wasteWeight, wasteUnit};
    }

    function getStrainFromTag(tag){
      for(let val of JSON.parse(getPlants())){
        if(val.tag === tag){
          return val.strain;
        }
      }
    }

    let rows = [];
      try{
        for(let val of JSON.parse(getHarvestRecords())) {  
          if(val.batchName === currHarvest.name){
            let hidden = false;
            for(let val2 of currHidePlants){
              if(val2 === val.tag){
                hidden = true;
              }
            }
            if(!hidden){
              rows.push(createData(val.tag,getStrainFromTag(val.tag),val.weight,val.unit,val.wasteWeight,val.wasteUnit));
            }
          }
        }
      }catch(error){
  
      }



    function getCurrentWeightTag(weight){
      return "Weight: " + weight;
    }

    function onDDChange(tag,text){
      let i = 0;
      let foundIndex = -1;
      let foundRow = createData("","","","");
      for(let row of rows){
        if(row.tag === tag){
          foundIndex = i;
          foundRow = createData(row.tag,row.strain,row.weight,text,row.wasteWeight,row.wasteUnit);
        }
        i++;
      }
      if(foundIndex !== -1){
        rows.splice(foundIndex,1,foundRow);
      }

      i = 0;
      foundIndex = -1;
      for(let val of currWeightChanges) {
        if(val.tag === tag){
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex !== -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(tag,currWeightChanges[foundIndex].newWeight,text));
      }else{
        currWeightChanges.push(new weightChange(tag,'',text));
      }

      setWeightChanges(currWeightChanges);

      wrapper.setState({ state: wrapper.state });
    }

    function hideHarvestRecord(tag){
        currHidePlants.push(tag);

        setHidePlants(currHidePlants);

        let i = 0;
        let foundIndex = -1;
        for(let val of rows) {
          if(val.tag === tag){
            foundIndex = i;
          }  
         i++;
        }

        if(foundIndex !== -1){
          rows.splice(foundIndex,1);
        }

        reset();
    }

    function onTFChange(tag,text){
      let i = 0;
      let foundIndex = -1;
      for(let val of currWeightChanges) {
        if(val.tag === tag){
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex !== -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(tag,text,currWeightChanges[foundIndex].newUnit));
      }else{
        currWeightChanges.push(new weightChange(tag,text,''));
      }

      setWeightChanges(currWeightChanges);
    }

    const EditableTF = ({editNow, row}) => {
      if (!editNow) return null;

      let weightVal = '';

      for(let val of currWeightChanges){
        if(val.tag === row.tag){
          if(val.newWeight !== ''){
            weightVal = val.newWeight;
          }
        }
      }
      
      return (
        <TableCell align="right">
          			<TextField style={{width:"90px"}} label={getCurrentWeightTag(row.weight)} defaultValue={weightVal} onChange={(event) => onTFChange(row.tag,event.target.value)} />
        </TableCell>
      );
    };

    const NonEditableTF = ({editNow, row}) => {
      if (editNow) return null;
      
      return (
        <TableCell align="right">{row.weight}</TableCell>
      );
    };

    const EditableDD = ({editNow, row}) => {
      if (!editNow) return null;

      let unitList = ["lbs","g"];

      let unitVal = row.unit;

      for(let val of currWeightChanges){
        if(val.tag === row.tag){
          if(val.newUnit !== ''){
            unitVal = val.newUnit;
          }
        }
      }
      
      return (
        <TableCell align="right">
                <Select value={unitVal} onChange={(event) => onDDChange(row.tag,event.target.value)} style={{minWidth: 80}}>
                	{unitList.map((name, index) => (
            			<MenuItem key={index} value={name}>
             	 		{name}
            			</MenuItem>
          			))}
             	</Select>
        </TableCell>
      );
    };

    const NonEditableDD = ({editNow, row}) => {
      if (editNow) return null;
      
      return (
        <TableCell align="right">{row.unit}</TableCell>
      );
    };
    
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {editNow ? <TableCell align="left">Delete</TableCell> : null}
                      <TableCell align="left">Tag</TableCell>
            					<TableCell align="right">Strain</TableCell>
            					<TableCell align="right">Weight</TableCell>
            					<TableCell align="right">Unit</TableCell>
                      <TableCell align="right">WasteWeight</TableCell>
            					<TableCell align="right">WasteUnit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.tag}>
              {editNow 
              ? 			
                  <TableCell align="left">
                    <DeleteButton editNow={editNow} row={row} getRemovePlantIDDelete={getRemovePlantIDDelete} wrapper={wrapper} hideHarvestRecord={hideHarvestRecord}></DeleteButton>
                  </TableCell>
              : null
              }
              
              <TableCell align="left" component="th" scope="row">
                {row.tag}
              </TableCell>
              <TableCell align="right">{row.strain}</TableCell>
              <EditableTF editNow={editNow} row={row}></EditableTF>
              <NonEditableTF editNow={editNow} row={row}></NonEditableTF>
              <EditableDD editNow={editNow} row={row}></EditableDD>
              <NonEditableDD editNow={editNow} row={row}></NonEditableDD>
              <TableCell align="right">{row.wasteWeight}</TableCell>
              <TableCell align="right">{row.wasteUnit}</TableCell>
            </TableRow>
            ))}
            </TableBody>
      </Table>
      </TableContainer>
    );
}

export default MyTable;