import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RemoveUploadQueueItemButton from './RemoveUploadQueueItemButton';
import TextField from '@material-ui/core/TextField';
import DryRoomTable from './DryRoomTable.component';

function ManageDryRoomsForm({getDryRooms, refreshOuter, reloadDryRooms,userID}) {
    const [adding,setAdding] = React.useState(false);
	const [selectedToDelete,setSelectedToDelete] = React.useState([]);
	const [newDryRoomName,setNewDryRoomName] = React.useState("");
	let busyDeletingDryRooms = [];
	let removeList = selectedToDelete;

	let dryRooms = JSON.parse(executeGetDryRooms());

	function executeGetDryRooms(){
		let exDryRooms = JSON.parse(getDryRooms());
		let drs = [];

		for(const val of exDryRooms){
			drs.push(val);
		}
		return JSON.stringify(drs);
	}

	const toggleDeleteAllSelected = () => {		
		if(getDeleteAllSelected()){
			setSelectedToDelete([]);
		}else{
			let newSelectedToDelete = [];
			for (const val of dryRooms) {
				newSelectedToDelete.push(val.id);
			}
			setSelectedToDelete(newSelectedToDelete);
		}
	}

	const toggleDeleteDryRoomSelected = (id) => {
		let foundIndex = -1;
		let i = 0;
		for(const val of removeList){
			if(id === val){
				foundIndex = i;
			}
			i++;
		}

		if(foundIndex !== -1){
			removeList.splice(foundIndex,1);
		}else{
			removeList.push(id);
		}

		setSelectedToDelete(removeList);
		refreshOuter();
	}

	const getDeleteDryRoomSelected = (id) => {
		for(const val of removeList){
			if(id === val){
				return true;
			}
		}

		return false;
	}

	const getDeleteAllSelected = () => {
		if(removeList.length===0){
			return false;
		}
		
		let x = 0;
		for(const val of JSON.parse(getDryRooms())){
			x++;
		}
		return (removeList.length === x);
	}

    const handleGetReady = () => {
		setAdding(true);
       	 refreshOuter();
	  	}

	const handleCancel = () => {
		setAdding(false);
		setNewDryRoomName("");
        refreshOuter();
	  }

	const handleAddDryRoom = () => {
		getDryRoomItem();
	  }

	  const getDryRoomItem = () => {
		let dryRoom = {
			name: '',
			userID: ''
		  };

		dryRoom.name = newDryRoomName;
		dryRoom.userID = userID;

		addDryRoom(dryRoom);
	}
	const addDryRoom = async(dryRoomItem) => {        
        let parent = this;
        fetch('/dr', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dryRoomItem),
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
		  setAdding(false);
		  setNewDryRoomName("");
		  reloadDryRooms();    
          refreshOuter();
        });
	}  

	const handleNewDryRoomName = (event) => {
        setNewDryRoomName(event.target.value);
    };

	const handleDeleteDryRooms = () => {
		for(const val of removeList){
			busyDeletingDryRooms.push(val.id);
		}
		for(const val of removeList){
			deleteDryRoom(val);
		}

		let timeLimit = 3000;
		let x = 0;

        while(JSON.stringify(busyDeletingDryRooms) !== "[]" && x<timeLimit){
                  setTimeout(null,200);
                  x++;
                }

		reloadDryRooms();
		refreshOuter();
	}

	const deleteDryRoom = async(dryRoomID) => {
		const response = fetch(`/dr/${dryRoomID}`, {
		method: 'DELETE',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}
		});
  
		try{
		  await response.text();
		}catch(err){
		} 
  
		for( var i = 0; i < busyDeletingDryRooms.length; i++){ 
		  if (busyDeletingDryRooms[i] === dryRoomID) { 
			busyDeletingDryRooms.splice(i, 1); 
		  }
		}
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
				<div>
                {adding
                ? <div>
					<Grid
					container
					direction="column"
  					justify="center"
					alignItems="center"
					>
						<TextField style={{marginBottom:"5px"}} id="NewDryRoomName" value={newDryRoomName} onChange={handleNewDryRoomName} label="Dry Room Name" variant="outlined"></TextField>
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
						<Button style={{marginLeft:"10px"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleDeleteDryRooms}>Delete</Button>
					</Grid>
					</div>
			    }
				</div>

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
					