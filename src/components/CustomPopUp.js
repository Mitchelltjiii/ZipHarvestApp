import React from 'react';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';


export default () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
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
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </Button>
        </div>
      </div>
      </div>
    )}
  </Popup>
);