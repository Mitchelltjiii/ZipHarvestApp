import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class RemoveUploadQueueItemButton extends Component{
    removePlant() {
      console.log("Enter removePlant");

      this.props.removeUploadQueueButton(this.props.name);
    }

    async handleClick(event) {
        event.preventDefault();
        
        this.removePlant();
        this.setState(this.state);
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
        return <div style={{width: "170px"}}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{width: "120px"}}>X</Button>
        </div>
      }
}



export default RemoveUploadQueueItemButton;