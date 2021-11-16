import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import TextField from '@material-ui/core/TextField';
import DryRoomTable from './DryRoomTable.component';

function ManageDryRoomsForm({getDryRooms, refreshOuter, reloadDryRooms}) {
    const [adding,setAdding] = React.useState(false);
	const [selectedToDelete,setSelectedToDelete] = React.useState([]);
	const [newDryRoomName,setNewDryRoomName] = React.useState("");
	let removeList = selectedToDelete;

	let dryRooms = JSON.parse(executeGetDryRooms());

	function executeGetDryRooms(){
		let exDryRooms = JSON.parse(getDryRooms());
		let drs = [];
		console.log("execute Get dryrooms With Search");

		for(const val of exDryRooms){
			console.log("Val: " + JSON.stringify(val));
			drs.push(val);
		}
		console.log("Execute get drs done: " + JSON.stringify(drs));
		return JSON.stringify(drs);
	}

	const toggleDeleteAllSelected = () => {		
		if(getDeleteAllSelected()){
			console.log("selectedToDelete.length == currPlants.length");
			setSelectedToDelete([]);
		}else{
			console.log("selectedToDelete.length != currPlants.length");
			let newSelectedToDelete = [];
			for (const val of dryRooms) {
				newSelectedToDelete.push(val.id);
			}
			console.log("SelectedToDelete: " + newSelectedToDelete);
		    console.log("SelectedToDelete(STRING): " + JSON.stringify(newSelectedToDelete));
			setSelectedToDelete(newSelectedToDelete);
		}

		console.log("SelectedToDelete: " + selectedToDelete);
		console.log("SelectedToDelete(STRING): " + JSON.stringify(selectedToDelete));
	}

	const toggleDeleteDryRoomSelected = (id) => {
		console.log("Toggle Delete Dry Room Selected id: " + id);
		let foundIndex = -1;
		let i = 0;
		for(const val of removeList){
			console.log("Removelist Val: " + val);
			if(id === val){
				console.log("Tag === Val");
				foundIndex = i;
			}
			i++;
		}

		console.log("Found Index: " + JSON.stringify(foundIndex));

		if(foundIndex !== -1){
			removeList.splice(foundIndex,1);
		}else{
			removeList.push(id);
		}

		console.log("RemoveList After ToggleDeletePlantSelected: " + JSON.stringify(removeList));
		setSelectedToDelete(removeList);
		refreshOuter();
	}

	const getDeleteDryRoomSelected = (id) => {
		console.log("Get Delete Dry Room Selected id: " + id);
		for(const val of removeList){
			console.log("Removelist Val: " + val);
			if(id === val){
				console.log("id === Val");
				return true;
			}
		}
		console.log("No id Match");

		return false;
	}

	const getDeleteAllSelected = () => {
		if(removeList.length===0){
			return false;
		}
		console.log("Remove List Length: " + removeList.length);
		console.log("CurrDryRooms Length: " + JSON.parse(getDryRooms()).length);
		console.log("GetDeleteAllSelected: " + JSON.stringify(removeList.length === JSON.parse(getDryRooms()).length));
		
		let x = 0;
		for(const val of JSON.parse(getDryRooms())){
			x++;
		}
		return (removeList.length === x);
	}

    const handleGetReady = () => {
		console.log("Handle Get Ready")
		setAdding(true);
       	 refreshOuter();
	  	}

	const handleCancel = () => {
		console.log("Handle Cancel")
		setAdding(false);
        refreshOuter();
	  }

	const handleAddDryRoom = () => {
		console.log("Handle Add Dry Room")
		addDryRoom();
		setAdding(false);
        refreshOuter();
	  }

	const addDryRoom = async() => {
        console.log("Engage add Dry Room");
        
        let parent = this;
        fetch('/dr', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(plantItem),
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log("Dry Room Added");
		  reloadDryRooms();    
		  refreshOuter();
        });
        
        console.log("Exit update plant")
      }  

	const handleNewDryRoomName = (event) => {
        setNewDryRoomName(event.target.value);
    };

	const handleDeleteDryRooms = () => {
		console.log("HandleDeleteDryRooms");
		for(const val of removeList){
			console.log("Removelist Val: " + val);
		}
	}

	const deleteDryRoom = async(id) => {
		console.log("DeleteDryRoom id: " + id );
	}



    const ImportTab = () => {
        return(
            <div>
                {adding
                ? <div>
					<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
					>
						<TextField id="NewDryRoomName" value={newDryRoomName} onChange={handleNewDryRoomName} label="Dry Room Name" variant="outlined"></TextField>
						<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					>
						<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAddDryRoom}>Add Dry Room</Button>
						<Button style={{marginLeft:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleCancel}>Cancel</Button>
					</Grid>
					</Grid>

					</div>
                : <div>
					<Grid
					container
					direction="row"
  					justify="center"
					alignItems="center"
					>
						<Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleGetReady}>Add Dry Room</Button>
						<Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleDeleteDryRooms}>Delete</Button>

					</Grid>
					</div>
			    }
				</div>
        )
    }

	return (
		<div id="manage-dry-rooms-form">
			<Grid
				container
				direction="row"
  				justify="center"
				alignItems="center"
			>
                <div className="full tr">
			    <Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
				>
				<ImportTab></ImportTab>

                <div>
				<DryRoomTable dryRooms={dryRooms} toggleDeleteAllSelected={toggleDeleteAllSelected} getDeleteAllSelected={getDeleteAllSelected} 
					toggleDeleteDryRoomSelected={toggleDeleteDryRoomSelected} getDeleteDryRoomSelected={getDeleteDryRoomSelected}></DryRoomTable>
                </div>
				</Grid>		  
		  </div>
			</Grid>
		</div>
	);
}

//			


export default ManageDryRoomsForm;


//<RemoveFromAvailablePlants getPlants={getPlants} removeList={removeList} setPlants={setPlants} setRemoveList={setSelectedToDelete}
//setImporting={setImporting} setNewPlantID={setNewPlantID} userID={userID} refreshOuter={refreshOuter} reloadPlants={reloadPlants}></RemoveFromAvailablePlants>
					