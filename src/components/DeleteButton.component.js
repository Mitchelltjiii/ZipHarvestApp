import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class DeleteButton extends Component{
    deletePlant() {
      console.log("Enter deletePlant");

      this.props.hideHarvestedPlant(this.props.row.tag);
    }

    async handleGetReady(event) {
        event.preventDefault();
        
        this.state.readyToDelete = !this.state.readyToDelete;
        console.log("Ready To Delete: " + this.state.readyToDelete);

        this.setState(this.state);
    }

    async handleCancel(event) {
        event.preventDefault();
        
        this.state.readyToDelete = false;
        console.log("Ready To Delete: " + this.state.readyToDelete);

        this.setState(this.state);
    }
    
    constructor(props) {
        super(props);
        this.state = {
          harvestedPlantItem: this.emptyHarvestedPlant,
          readyToDelete: false,
          bgColors: { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#E7F8E2",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42"}
        };
        this.handleGetReady = this.handleGetReady.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deletePlant = this.deletePlant.bind(this);
    }
    
    

    render() {  
        const ConfirmDelete = ({parent}) => {          
            return (
              <div className="full tr" style={{width: "170px"}}>

                  <Grid
                        container
                        direction="row"
                          justify="center"
                        alignItems="center"
                    >

                        <div className="full tr" style={{width: "75px",height: "35px", verticalAlign: "middle"}}>
                          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleCancel}>Cancel</Button>
                        </div>

                        <div className="full tr" style={{width: "5px",height: "30px"}}></div>
                        
                        <div className="full tr" style={{width: "75px",height: "35px", verticalAlign: "middle"}}>
                          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.deletePlant}>Delete</Button>                        
                        </div>
                        
                    </Grid>
                            
              </div>
            );
          };

        return <div style={{width: "170px"}}>
            {this.state.readyToDelete
            ? <ConfirmDelete parent={this}></ConfirmDelete>	
            : <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleGetReady}  style={{width: "120px"}}>Remove</Button>
            }

        </div>
      }
}



export default DeleteButton;