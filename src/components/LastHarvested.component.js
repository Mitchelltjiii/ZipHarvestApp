import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class LastHarvested extends Component{
    handleClick(event) {
        event.preventDefault();
        console.log("Click");
        
        this.props.startListeningFromVoiceButton();
    }
    
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
        this.handleClick = this.handleClick.bind(this);
    }

    render() {  

        let lastHarvestedPlant = this.props.getLastHarvested();
        console.log("Last Harvested Plant**: " + JSON.stringify(lastHarvestedPlant));
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
                            <div style={{fontSize:"24px"}}><b>Strain</b></div>
                            <div>Tag</div>
				        </Grid>
                        <div style={{width:"50%",fontSize:"22px"}}><div><b>Weight</b></div></div>
				    </Grid>
            
        </div>
      }
}



export default LastHarvested;