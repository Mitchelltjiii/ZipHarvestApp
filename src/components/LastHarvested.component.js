import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UndoHarvestButton from "./UndoHarvestButton.component";

class LastHarvested extends Component{
    
    handleClick(event) {
        event.preventDefault();
        this.state.undoClicked=!this.state.undoClicked;
        console.log("Undo Clicked - Now: " + this.state.undoClicked);
        this.forceUpdate();
    }

    undoHarvestedPlant(){
        console.log("Execute undo Harvest plant");
    }

    constructor(props) {
        super(props);
        this.state = {
          bgColors: { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42"},
                    undoClicked: false

        };
        this.handleClick = this.handleClick.bind(this);
        this.undoHarvestedPlant = this.undoHarvestedPlant.bind(this);
    }

    render() {  

        console.log("Last Harvested Plant**: " + JSON.stringify(this.props.lastHarvestedPlant));
        let tag = "";    
        try{
            tag = this.props.lastHarvestedPlant.tag.substring(this.props.lastHarvestedPlant.tag.length-5);
            console.log("Success 1");
        }catch(err){

        }
        return <div style={{width:"100%",maxWidth:"400px",border:"1px solid black"}}>
                        <Grid
					    container
					    direction="column"
  					    justify="center"
					    align="center"
                        minWidth="120px"
				        >
                            <div style={{fontSize:"16px",overflow:"hidden",whiteSpace:"nowrap",marginBottom:"5px",align:"left",backgroundColor: this.state.bgColors.Green}}><b>Last Harvested Plant</b></div>
                            <div style={{fontSize:"18px",overflow:"hidden",whiteSpace:"nowrap"}}>{this.props.getStrainForPlantItem(this.props.lastHarvestedPlant.tag)}</div>
                            <div style={{fontSize:"18px",overflow:"hidden",whiteSpace:"nowrap"}}>{tag}</div>
                            <div style={{fontSize:"18px",overflow:"hidden",whiteSpace:"nowrap"}}><div>{this.props.lastHarvestedPlant.weight + " " + this.props.lastHarvestedPlant.unit}</div></div>
                            {this.state.undoClicked ?
                                <div>
                                <Grid
					            container
					            direction="row"
  					            justify="center"
					            align="center"
				                >
                                <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{width: "5%",marginRight:"10px",marginTop:"5px",marginBottom:"5px",maxHeight:"30px",minWidth:"45px",maxWidth:"45px"}}>Keep</Button>
                                <UndoHarvestButton undoHarvestedPlant={this.undoHarvestedPlant} getHarvestRecordItem={this.props.getHarvestRecordItem} getAndResetRemovedPlantID={this.props.getAndResetRemovedPlantID} getHarvestBatchItem={this.props.getHarvestBatchItem} 
				                setChanges={this.props.setChanges} resetHarvestForm={this.props.resetHarvestForm} lastHarvestedPlant={this.props.lastHarvestedPlant}
				                getPlantItem={this.props.getPlantItem} harvestType={this.props.harvestType} getStrainForPlantItem={this.props.getStrainForPlantItem}></UndoHarvestButton>
				                </Grid>
                                 </div>
                            :<div>
                                <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{width: "5%",marginTop:"5px",marginBottom:"5px",maxHeight:"30px",minWidth:"45px",maxWidth:"45px"}}>Undo</Button>				    
                            </div>
                            }
                        </Grid>
            
        </div>
      }
}



export default LastHarvested;