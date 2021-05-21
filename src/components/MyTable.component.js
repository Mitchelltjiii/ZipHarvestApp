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


function MyTable({currHarvest,harvestedPlants,editNow,currWeightChanges,setWeightChanges,wrapper,getRemovePlantIDDelete,currHidePlants,setHidePlants}) {

  console.log('HARVESTEDPLANTS in Table: ' + harvestedPlants);

  function HarvestBatch(itemID,name,finalized,plantList,type,date){
		this.itemID = itemID;
		this.name = name;
		this.finalized = finalized;
		this.plantList = plantList;
    this.type = type;
    this.date = date;
	}

    function weightChange(uid,newWeight,newUnit){
      this.uid = uid;
      this.newWeight = newWeight;
      this.newUnit = newUnit;
    }

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const classes = useStyles();
    let harvestBatch = new HarvestBatch('','','','{}','','');
    console.log('CurrHarvest in Table: ' + JSON.stringify(currHarvest));

    if(currHarvest!==undefined){
      harvestBatch = new HarvestBatch(currHarvest.itemID,currHarvest.name,currHarvest.finalized,currHarvest.plantList,currHarvest.type,currHarvest.date);
    }

    console.log('HarvestBatch in Table: ' + JSON.stringify(harvestBatch));

    function createData(uid, tag, strain, weight, unit) {
      return { uid, tag, strain, weight, unit};
    }

    let rows = [];
    let parsedPlantsList = [];
    
    if(harvestBatch.name != ''){
      let unparsedPlantList = harvestBatch.plantList.substring(1,harvestBatch.plantList.length-1);
      parsedPlantsList = unparsedPlantList.split(',');
    }

    console.log("parsedPlantslist: " + JSON.stringify(parsedPlantsList));

      try{
        for(let val of harvestedPlants) {  
          if(parsedPlantsList.includes(val.uid) && !currHidePlants.includes(val.uid)){
            rows.push(createData(val.uid,val.tag,val.strain,val.weight,val.unit));
          }
        }
      }catch(error){
  
      }


    function getCurrentWeightTag(weight){
      return "Current Weight: " + weight;
    }

    function onDDChange(uid,text){
      console.log("ON DD CHANGE -- uid: " + uid + ", Text: " + text);

      let i = 0;
      let foundIndex = -1;
      let foundRow = createData("","","","","");
      for(let row of rows){
        console.log("row: " + JSON.stringify(row));
        if(row.uid == uid){
          foundIndex = i;
          foundRow = createData(row.uid,row.tag,row.strain,row.weight,text);
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
        console.log("Val.uid: " + val.uid);
        if(val.uid == uid){
          console.log("GRABBED UID: " + uid);
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex != -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(uid,currWeightChanges[foundIndex].newWeight,text));
      }else{
        currWeightChanges.push(new weightChange(uid,'',text));
      }

      console.log("Curr Weight Changes after edit: " + JSON.stringify(currWeightChanges));

      setWeightChanges(currWeightChanges);

      console.log("Curr ROWS after edit: " + JSON.stringify(rows));

      wrapper.setState({ state: wrapper.state });

      /*
      let i = 0;
      let foundIndex = -1;
      for(let val of currWeightChanges) {
        console.log("VAL: " + val);
        console.log("Val.uid: " + val.uid);
        if(val.uid == uid){
          console.log("GRABBED UID: " + uid);
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex != -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(uid,text));
      }else{
        currWeightChanges.push(new weightChange(uid,text));
      }

      console.log("Curr Weight Changes after edit: " + JSON.stringify(currWeightChanges));
      setWeightChanges(currWeightChanges);
      */
    }

    function hideHarvestedPlant(uid){
        console.log("Hide Harvested Plant clicked in MyTable");

        currHidePlants.push(uid);

        console.log("Curr Hide Plants after edit: " + JSON.stringify(currHidePlants));

        setHidePlants(currHidePlants);

        let i = 0;
        let foundIndex = -1;
        for(let val of rows) {
         console.log("VAL: " + val);
         console.log("Val.uid: " + val.uid);
          if(val.uid == uid){
            console.log("GRABBED UID: " + uid);
            foundIndex = i;
          }  
         i++;
        }

        console.log("Curr ROWS before edit: " + JSON.stringify(rows));


        if(foundIndex != -1){
          rows.splice(foundIndex,1);
        }

        console.log("Curr ROWS after edit: " + JSON.stringify(rows));

        wrapper.setState({ state: wrapper.state });

    }

    function onTFChange(uid,text){
      console.log("ON TF CHANGE -- uid: " + uid + ", Text: " + text);
      let i = 0;
      let foundIndex = -1;
      for(let val of currWeightChanges) {
        console.log("VAL: " + val);
        console.log("Val.uid: " + val.uid);
        if(val.uid == uid){
          console.log("GRABBED UID: " + uid);
          foundIndex = i;
        }
        i++;
      }

      if(foundIndex != -1){
        currWeightChanges.splice(foundIndex,1,new weightChange(uid,text,currWeightChanges[foundIndex].newUnit));
      }else{
        currWeightChanges.push(new weightChange(uid,text,''));
      }

      console.log("Curr Weight Changes after edit: " + JSON.stringify(currWeightChanges));
      setWeightChanges(currWeightChanges);
    }

    const EditableTF = ({editNow, row}) => {
      if (!editNow) return null;

      let weightVal = '';

      for(let val of currWeightChanges){
        if(val.uid == row.uid){
          if(val.newWeight != ''){
            weightVal = val.newWeight;
          }
        }
      }
      
      return (
        <TableCell align="right">
          			<TextField label={getCurrentWeightTag(row.weight)} defaultValue={weightVal} onChange={(event) => onTFChange(row.uid,event.target.value)} />
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
        if(val.uid == row.uid){
          if(val.newUnit != ''){
            unitVal = val.newUnit;
          }
        }
      }
      
      return (
        <TableCell align="right">
                <Select value={unitVal} onChange={(event) => onDDChange(row.uid,event.target.value)} style={{minWidth: 80}}>
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
            {editNow ? <TableCell align="left" style={{ width: "170px"}}>Delete</TableCell> : null}
            <TableCell align="left">Tag</TableCell>
            					<TableCell align="right">Strain</TableCell>
            					<TableCell align="right">Weight</TableCell>
            					<TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.uid}>
              {editNow 
              ? 			
                  <TableCell align="left" style={{ width: "170px"}}>
                      <div>Delete Button</div>
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

//<DeleteButton editNow={editNow} row={row} getRemovePlantIDDelete={getRemovePlantIDDelete} wrapper={wrapper} hideHarvestedPlant={hideHarvestedPlant}></DeleteButton>


/*<TableBody>
            {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            ))}
            </TableBody>

            <TableBody>
            {newArray.map((row) => (
            <TableRow key={row.tag}>
              <TableCell component="th" scope="row">
                {row.tag}
              </TableCell>
              <TableCell>{row.strain}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
            ))}
            </TableBody>


<TableBody>
                            {Array.from(plants.plantList).map((tag) => (
                            <TableRow key={tag}>
                            <TableCell component="th" scope="row">{plants.get(tag).tag}</TableCell>
                            <TableCell>{plants.get(tag).name}</TableCell>
                            <TableCell>{plants.get(tag).weight}</TableCell>
                            <TableCell>{plants.get(tag).unit}</TableCell>
                            <TableCell>{plants.get(tag).date}</TableCell>
                            </TableRow>
                        ))}
        </TableBody>*/