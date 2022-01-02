import React from 'react';
import {isMobile} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';

function TutorialForm() {

    let formWidth = "800px";
    let formHeight = "3000px";
    let margR = "80px";
    let margL = "80px";
    let fontSize = "20px";
    let smallFontSize = "12px";

    if(isMobile){
     margR = "10px";
     margL = "10px";
     fontSize = "12px";
     smallFontSize = "8px"
     formWidth = "100%";
     formHeight = "2300px";
    }

    const TutorialText = () => {	  
		return (
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{marginRight:margR,marginLeft:margL,marginTop:"40px"}}
        >
            <div style={{textAlign:"left",fontSize:fontSize}}><b>Welcome to ZipHarvest!</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>ZipHarvest lets you record your Metrc harvest data using voice control. ZipHarvest is intended to work on mobile devices with only one hand needed, allowing you to manipulate plants with the other.</div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>There are three simple steps: import your data, harvest, and export your data for upload to Metrc.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Download Data from Metrc</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Flowering plants from Metrc must be imported into ZipHarvest in order to harvest. Download a CSV file of the plants you’d like to select from by going to the flowering plants section of your Metrc account. If you open the file, the headers of the CSV file should be “Tag, Strain, Location, Hold, Group, Group Type, Group Date, Phase Date, Harvested.”</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Import Data into ZipHarvest</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Go to the Manage Plants section in ZipHarvest via the main menu. Click the import button at the top of the screen and then select choose files. Select as many files as you’d like and click upload.  You should see the plants you selected appear in the table below. These plants will be available for harvest now. If you would like to remove any plants from your available list, select them and then click the delete button.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Dry Rooms</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Go to the Manage Dry Rooms section in ZipHarvest via the main menu. Click the Add Dry Room button at the top of the screen and then simply type the name of your first dry room exactly as it appears in Metrc. Any discrepancy will be rejected by Metrc upon upload. When you click the Add Dry Room button again it should appear in the table below. You may delete dry rooms by selecting them and clicking the Delete button. When it is time to export harvest batches to Metrc, you will choose which dry room each batch came from and the data will be applied in the exported file.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Harvesting</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Select Harvest Now from the main menu. Then create your first harvest batch.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Harvest Batches</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Harvest Batches are defined by Metrc as:</div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:smallFontSize}}>“Each harvest in Metrc is assigned to a "harvest batch," which is a single day's harvest activity. Licensees may choose whether or not to delineate harvest batches by strain or other criteria. However, harvested plants can only be grouped under the same harvest batch if they share an identical:
Name of harvest batch,
Date of harvest,
Type of harvest (manicure or "regular"),
Dry Room.
Any difference in the above information will result in a new harvest batch. For example, two harvest batches named identically and from the same date but in different rooms (e.g. "Dry Room 1" versus "Dry Room 2") will result in two separate, identically named harvests.
If a harvest batch name is not assigned, Metrc will by default assign a name according to the following criteria:
Date of harvest,
Dry Room, and
Harvest type ("M" for manicure, "H" for "regular" harvest).
For example, a manicure harvest and January 1, 2018 and put into dry room 1 would be named "2018-01-01-Dry Room 1-M."
Rooms cannot be changed in Metrc after harvest; as long as weight is accurate and all other requirements are met (security, etc.) product may be moved to another room after harvest even if it differs from the harvest batch room.”
</div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>ZipHarvest makes creating and switching between harvest batches easy. Create your first harvest batch by selecting New Harvest Batch in the first drop down menu. Enter your harvest batch name in the first field. Once you select a harvest batch name, it cannot be edited. Then choose if you are harvesting today or yesterday. The date can be changed to any date after the harvest batch is created. Finally, select if this harvest batch is manicure or final harvest. You should keep all manicured plants in separate harvest batches from harvested plants, even if they are from the same strain or room.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Harvest Procedure</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>To record your harvest weights, first select what strains you will be searching from. In the dropdown menu that says “All Strains”, you may select a strain to filter your search results or leave it be to search through all strains. Then, from the dropdown menu that has “contains” selected, select if you’d like to search for any plant tag that contains your search query or ends with it. For each plant that you harvest, you will do the following actions:
Search for your plant tag in the search field. If there are any plant tags in your imported data that contain or end with your search query, they will appear in the dropdown list that’s labeled “Search Results will appear here”. You may select your desired result from the list.
Enter the weight and unit of the selected plant in the appropriate field.
Click “Next Plant”.</div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>If everything is correct, your harvested plant data should appear in the table below and all appropriate fields will reset. A pop-up should appear that should confirm your data has been accepted and allow you to undo the entry if necessary. If you are manicuring, the plant tag will remain available in your list of searchable plants. If you are harvesting fully, the plant tag will be removed from your list of searchable plants. You can add up to 150 plants into a single harvest batch.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Voice Control</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>The three main steps of harvesting can all be done with voice control. ZipHarvest is intended to work with voice control, but it is not required. To activate voice control, click the large button with a microphone symbol. Each command can be executed from this single button if you follow the correct procedure.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Voice Command: “Search (plant tag)”</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>If you say “Search 026”, ZipHarvest will enter “026” into the search field and results should appear.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Voice Command: “(weight) (unit)”</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>If you say “1.2 pounds”, ZipHarvest will enter “1.2” into the weight field and select “lbs” from the unit selector. Similarly, if you say “1600 grams”, ZipHarvest will enter “1600” into the weight field and select “g” from the unit selector.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Voice Command: “Next Plant”</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>If you say “Next Plant”, the Next Plant button will be selected.</div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>These three types of commands are all you need to start harvesting and recording your data with only one hand required.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Edit Data in the App</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>After you have recorded a plant’s weight, you may change the weight and unit or remove it from the harvest batch in the table on the Harvest Now form. Simply click the Edit button above the table, make your changes, and then click Accept Changes or Cancel.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Export data</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Go to the Harvest Batches section in ZipHarvest via the main menu. You should see any harvest batches that you’ve created in the table. Select the export button for the appropriate harvest batch. You will be prompted to select a dry room. Finally, you will be prompted to select grams or pounds. Whatever you choose, all plants from that batch will be converted to that unit in the exported file. For example, you could have a harvest batch in which each plant is recorded in grams, but if you select pounds, all weights will be converted to pounds. If you have a mix of grams and pounds in your harvest batch and you’ve selected pounds, they will still all be converted to pounds. Once you select, your exported file should begin downloading.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Interpret and Manipulate data in Csv</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>The exported csv file will have 7 columns, [Plant Tag, Weight, Unit, Dry Room, Harvest Batch Name, X, Harvest Date]. You may make any final edits in the csv file before upload, as long as you do not affect the format.</div>
            <div style={{textAlign:"left",marginTop:"20px",fontSize:fontSize}}><b>Upload to Metrc</b></div>
            <div style={{textAlign:"left",marginTop:"5px",fontSize:fontSize}}>Once you have your exported file(s), you may upload them to Metrc via the Import CSV section.</div>
            </Grid>
		);
	  };

    return(
      <div id="tutorial-form" style={{position:"absolute",top:"50px",bottom:"0px",left:"0px",right:"0px",display:'flex',alignItems: 'center',justifyContent: 'center'}}>     
      {isMobile ?
        <div style={{width:formWidth,height:formHeight,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                <TutorialText></TutorialText>
                </div>
                :
                <div style={{width:formWidth,height:formHeight,border:"1px solid #d7d7d7",borderRadius:5,margin:"auto",display:'flex',alignItems: 'center',justifyContent: 'center',marginBottom:"40px"}}>
            <TutorialText></TutorialText>
        </div>
       }
		</div>
    );
}	


export default TutorialForm;

