import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SelectDeleteAllButton extends Component{
    handleClick() {
      console.log("SelectDeleteAllButton handle click");
      this.setState({checked:!this.state.checked});
    }
    
    constructor(props) {
        super(props);
        this.state = {
          checked: false,
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
        return <div style={{width: "170px"}}>
            {this.state.checked ? <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{width: "120px"}}></Button>
            :<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{width: "120px"}} backgroundColor={this.state.bgColors.Blue}></Button>
            }
                </div>
      }
}



export default SelectDeleteAllButton;