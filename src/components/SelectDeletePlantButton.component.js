import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SelectDeletePlantButton extends Component{
    handleClick() {
      console.log("SelectDeletePlantButton handle click");
      this.props.toggleDeletePlantSelected(this.props.tag);
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
        let checked = this.props.getDeletePlantSelected(this.props.tag);
        console.log("Select Delete Plant Button Checked: " + JSON.stringify(checked));
        return <div>
            {checked ? <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{height: "10px", width: "10px", minWidth: "10px", backgroundColor: "#A9A9A9"}} ></Button>
            :<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{height: "10px", width: "10px", minWidth: "10px"}}></Button>
            }
                </div>
      }
}



export default SelectDeletePlantButton;