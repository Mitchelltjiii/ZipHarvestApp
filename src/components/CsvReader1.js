import React, { Component } from 'react';
import { CSVReader, jsonToCSV } from 'react-papaparse';

const buttonRef = React.createRef();

export default class CSVReader1 extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data, file, e) => {
    console.log('---------------------------');
    console.log(JSON.stringify(data));
    console.log('---------------------------');

    const csv = jsonToCSV(data);
      
    console.log('---------------------------');
    console.log(csv);
    console.log('---------------------------');
    
    console.log("CSV SPLIT: ");
    let csvSplit = csv.split(/\r?\n/);
    let plantList = [];
    for (var i = 2; i < csvSplit.length; i++) {
        console.log(csvSplit[i]);
        let newText = csvSplit[i].substring(1);
        newText = newText.substring(0,newText.indexOf('"'));
        console.log("New text: " + newText);
        let newTextSplit = newText.split(",");
        if(newTextSplit[0] != undefined && newTextSplit[1] != undefined) {
            plantList.push(newTextSplit[0] + "," + newTextSplit[1]);
        }
    }
    console.log("Plantlist: " + JSON.stringify(plantList));

    let parent = this;

    parent.props.setPlantList(file.name,plantList);
    if (buttonRef.current) {
        buttonRef.current.removeFile(e);
    }
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
            </aside>
          )}
        </CSVReader>
      </>
    );
  }
}

/*<button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>*/
