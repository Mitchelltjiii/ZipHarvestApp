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
        let unit = "lb";
        if(this.props.lastHarvestedPlant.unit==1){
            unit = "g";
        }
        return <div style={{maxWidth:"600px"}}>
            <Grid
					container
					direction="rows"
  					justify="center"
					alignItems="center"
                    
				    >
                        <Grid
					    container
					    direction="column"
  					    justify="center"
					    align="center"
                        style={{width:"50%"}}
				        >
                            <div style={{fontSize:"24px"}}><b>{this.props.lastHarvestedPlant.strain}</b></div>
                            <div>{this.props.lastHarvestedPlant.tag}</div>
				        </Grid>
                        <div style={{width:"50%",fontSize:"22px"}}><div><b>{this.props.lastHarvestedPlant.weight + " " + unit}</b></div></div>
				    </Grid>
            
        </div>
      }
}



export default LastHarvested;