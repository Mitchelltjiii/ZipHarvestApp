import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SelectDeleteAllButton extends Component{
    handleClick() {
      console.log("SelectDeleteAllButton handle click");
      this.props.toggleDeleteAllSelected();
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
        let checked = this.props.getDeleteAllSelected();
        console.log("Select Delete All Button Checked: " + JSON.stringify(checked));
        return <div>
            {checked ? <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{height: "20px", width: "20px", backgroundColor: "#A9A9A9", borderWidth: 1, borderColor: "#A9A9A9"}}></Button>
            :<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{height: "20px", width: "20px", borderRadius: 10, borderWidth: 1, borderColor: "#A9A9A9"}}></Button>
            }
                </div>
      }
}



export default SelectDeleteAllButton;