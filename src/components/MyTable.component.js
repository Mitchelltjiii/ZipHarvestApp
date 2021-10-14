import React, { createRef, useState } from 'react';
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


function MyTable({currHarvest,getHarvestRecords,editNow,currWeightChanges,setWeightChanges,wrapper,getRemovePlantIDDelete,currHidePlants,setHidePlants,getPlants,reset}) {

  console.log("MYTABLE STARTED");
  console.log('HarvestRecords in Table: ' + JSON.stringify(getHarvestRecords()));
  console.log("Curr Hide Plants: " + currHidePlants);
  console.log("Curr Hide Plants(STRING): " + JSON.stringify(currHidePlants));

  function HarvestBatch(name,submitted,type,date){
		this.name = name;
		this.submitted = submitted;
    this.type = type;
    this.date = date;
	}

    function weightChange(tag,newWeight,newUnit){
      this.tag = tag;
      this.newWeight = newWeight;
      this.newUnit = newUnit;
    }

    const useStyles = makeStyles({
        table: {
          minWidth: 350,
          maxWidth: 350
        },
      });

    const classes = useStyles();
    let harvestBatch = new HarvestBatch('',0,'','');
    console.log('CurrHarvest in Table: ' + JSON.stringify(currHarvest));

    if(currHarvest!==undefined){
      harvestBatch = new HarvestBatch(currHarvest.name,currHarvest.finalized,currHarvest.type,currHarvest.date);
    }

    console.log('HarvestBatch in Table: ' + JSON.stringify(harvestBatch));

    function createData(tag, strain, weight, unit) {
      return {tag, strain, weight, unit};
    }

    function getStrainFromTag(tag){
      for(let val of JSON.parse(getPlants())){
        if(val.tag == tag){
          return val.strain;
        }
      }
    }

    let rows = [];
      try{
        for(let val of JSON.parse(getHarvestRecords())) {  
          if(val.batchName == currHarvest.name){
            let hidden = false;
            for(let val2 of currHidePlants){
              console.log("VAL 2 : " + val2);
              console.log("Val.tag: " + val.tag);
              if(val2 == val.tag){
                hidden = true;
              }
            }
            if(!hidden){
              rows.push(createData(val.tag,getStrainFromTag(val.tag),val.weight,val.unit));
            }
          }
        }
      }catch(error){
  
      }

    console.log("ROWS CREATED: " + rows);
    console.log("ROWS CREATED(STRING): " + JSON.stringify(rows));


    function getCurrentWeightTag(weight){
      return "Current Weight: " + weight;
    }

    function onDDChange(tag,text){
      console.log("ON DD CHANGE -- tag: " + tag + ", Text: " + text);

      let i = 0;
      let foundIndex = -1;
      let foundRow = createData("","","","");
      for(let row of rows){
        console.log("row: " + JSON.stringify(row));
        if(row.tag == tag){
          foundIndex = i;
          foundRow = createData(row.tag,row.strain,row.weight,text);
        }
        i++;
      }
      if(foundIndex != -1){
        rows.splice(foundIndex,1,foundRow);
      }

      console.log("Rows after splice on DDChange: " + JSON.stringify(rows));

      i = 0;
      foundIndex = -1;
      for(let val of currWeightChanges) {
        console.log("VAL: " + val);
        if(val.tag == tag){
          console.log("GRABBED tag: " + tag);
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex != -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(tag,currWeightChanges[foundIndex].newWeight,text));
      }else{
        currWeightChanges.push(new weightChange(tag,'',text));
      }

      console.log("Curr Weight Changes after edit: " + JSON.stringify(currWeightChanges));

      setWeightChanges(currWeightChanges);

      console.log("Curr ROWS after edit: " + JSON.stringify(rows));

      wrapper.setState({ state: wrapper.state });
    }

    function hideHarvestRecord(tag){
        console.log("Hide Harvested Plant clicked in MyTable");

        currHidePlants.push(tag);

        console.log("Curr Hide Plants after edit: " + JSON.stringify(currHidePlants));

        setHidePlants(currHidePlants);

        let i = 0;
        let foundIndex = -1;
        for(let val of rows) {
         console.log("VAL: " + val);
         console.log("Val.tag: " + val.tag);
          if(val.tag == tag){
            console.log("GRABBED tag: " + tag);
            foundIndex = i;
          }  
         i++;
        }

        console.log("Curr ROWS before edit: " + JSON.stringify(rows));


        if(foundIndex != -1){
          rows.splice(foundIndex,1);
        }

        console.log("Curr ROWS after edit: " + JSON.stringify(rows));

        reset();
    }

    function onTFChange(tag,text){
      console.log("ON TF CHANGE -- tag: " + tag + ", Text: " + text);
      let i = 0;
      let foundIndex = -1;
      for(let val of currWeightChanges) {
        console.log("VAL: " + val);
        console.log("Val.tag: " + val.tag);
        if(val.tag == tag){
          console.log("GRABBED TAG: " + tag);
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex != -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(tag,text,currWeightChanges[foundIndex].newUnit));
      }else{
        currWeightChanges.push(new weightChange(tag,text,''));
      }

      console.log("Curr Weight Changes after edit: " + JSON.stringify(currWeightChanges));
      setWeightChanges(currWeightChanges);
    }

    const EditableTF = ({editNow, row}) => {
      if (!editNow) return null;

      let weightVal = '';

      for(let val of currWeightChanges){
        if(val.tag == row.tag){
          if(val.newWeight != ''){
            weightVal = val.newWeight;
          }
        }
      }
      
      return (
        <TableCell align="right">
          			<TextField style={{width:"140px"}} label={getCurrentWeightTag(row.weight)} defaultValue={weightVal} onChange={(event) => onTFChange(row.tag,event.target.value)} />
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
        if(val.tag == row.tag){
          if(val.newUnit != ''){
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
            </TableRow>
            ))}
            </TableBody>
      </Table>
      </TableContainer>
    );
}

export default MyTable;