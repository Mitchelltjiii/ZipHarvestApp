import React, { Component } from "react";
import Button from '@material-ui/core/Button';

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
        return <div>
            {checked ? <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{height: "20px", width: "20px", minWidth: "20px", backgroundColor: "#A9A9A9"}} ></Button>
            :<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{height: "20px", width: "20px", minWidth: "20px"}}></Button>
            }
                </div>
      }
}



export default SelectDeletePlantButton;