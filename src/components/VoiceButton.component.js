import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import mic from '../mic.png';
import edt from '../edit.png';

class VoiceButton extends Component{
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
        return <div>
            
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  style={{width: "100%"}}>
                <img src={edt} style={{maxHeight: "60px"}}/>
            </Button>
		
        </div>
      }
}



export default VoiceButton;