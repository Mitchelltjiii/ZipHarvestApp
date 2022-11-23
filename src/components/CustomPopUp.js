import React from 'react';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default () => (
  <Popup
    trigger={<Button className="button">Select</Button>}
    modal
    nested
  >
    {close => (
        <div style={{width:"100%",height:"100%",backgroundColor:"#a3a3a3"}}>

      <div className="modal">
        <Button className="close" onClick={close}>
          &times;
        </Button>
        <div className="header"> Modal Title </div>
        <div className="content">
          <div style={{display:"flex",flexDirection:"column"}}>
            <TextField id="search-field" value={this.props.searchTag} label="Searching For Tag" onChange={this.props.handleSearchTag} style={{width:"80%"}}/>
          </div>
        </div>
        <div className="actions" style={{margin:"auto"}}>
          <Button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Got it
          </Button>
        </div>
      </div>
      </div>
    )}
  </Popup>
);