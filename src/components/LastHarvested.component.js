import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class LastHarvested extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          bgColors: { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42"}
        };
    }

    render() {  

        console.log("Last Harvested Plant**: " + JSON.stringify(this.props.lastHarvestedPlant));
        let tag = "";    
        try{
            tag = this.props.lastHarvestedPlant.tag.substring(this.props.lastHarvestedPlant.tag.length-5);
            console.log("Success 1");
        }catch(err){

        }
        return <div>
            <Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
				    >
                        <Grid
					    container
					    direction="column"
  					    justify="center"
					    align="center"
                        style={{width:"50%"}}
                        minWidth="120px"
				        >
                            <div style={{fontSize:"16px",overflow:"hidden",whiteSpace:"nowrap"}}><b>{this.props.getStrainForPlantItem(this.props.lastHarvestedPlant.tag)}</b></div>
                            <div style={{fontSize:"14px",overflow:"hidden",whiteSpace:"nowrap"}}>{tag}</div>
				        </Grid>
                        <div style={{width:"50%",fontSize:"16px",overflow:"hidden",whiteSpace:"nowrap",minWidth:"120px"}}><div><b>{this.props.lastHarvestedPlant.weight + " " + this.props.lastHarvestedPlant.unit}</b></div></div>
				    </Grid>
            
        </div>
      }
}



export default LastHarvested;