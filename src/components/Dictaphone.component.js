import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Dictaphone = ({searchTagFromSpeech,enterWeightFromSpeech,nextPlantFromSpeech}) => {

    const commands = [
        {
            command: "search *",
            callback: (searchText) => {
              console.log("Search: " + searchText);
              let fixedSearch = searchText;
              while(fixedSearch.includes(" to ")){
                console.log("SearchText before *to* Fix: " + fixedSearch);
                fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" to ")) + "2" + fixedSearch.substring(fixedSearch.indexOf(" to ")+4);
                console.log("SearchText after * to * Fix: " + fixedSearch);
              }
      
              while(fixedSearch.includes(" ")){
                console.log("SearchText before space Fix: " + fixedSearch);
                fixedSearch = fixedSearch.substring(0,fixedSearch.indexOf(" ")) + fixedSearch.substring(fixedSearch.indexOf(" ")+1);
                console.log("SearchText after space Fix: " + fixedSearch);
              }
              console.log("SearchText after final Fix: " + fixedSearch);
              searchTagFromSpeech(searchText);
            },
          },
          {
              command: "weight *",
              callback: (weight) => {
                console.log("Weight: " + weight);
                enterWeightFromSpeech(weight,-1);
              },
          },
          {
              command: "wait *",
              callback: (weight) => {
                console.log("Weight: " + weight);
                enterWeightFromSpeech(weight,-1);
              },
          },
          {
              command: "* lb",
              callback: (weight) => {
                console.log("Weight: " + weight);
                enterWeightFromSpeech(weight,0);
              },
          },
          {
              command: "* G",
              callback: (weight) => {
                console.log("Weight: " + weight);
                enterWeightFromSpeech(weight,1);
              },
          },
          {
            command: "* g",
            callback: (weight) => {
              console.log("Weight: " + weight);
              enterWeightFromSpeech(weight,1);
            },
          },  
          {
              command: "Next *",
              callback: () => {
                console.log("Next Plant Commanded");
                nextPlantFromSpeech();
              },
          },
      ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  
  const handleStartSpeechRecognition = () => {
    if(!listening){
      SpeechRecognition.startListening();
    console.log("Handle Start Speech Recog")
    console.log("Listening: " + listening);
    let x = 0;
    while(listening && x<1000){
        console.log("Listening... x: " + x)
        setTimeout('',100);
        x++;
    }
    console.log("Done Listening");
    }
  }

  return (
    <div>
      <button onClick={handleStartSpeechRecognition}>Voice</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;

//      <p>Microphone: {listening ? 'on' : 'off'}</p>


/*<button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      
      {
          command: "search *",
          callback: (searchText) => {
            console.log("Search: " + searchText);
            searchTagFromSpeech(searchText);
          },
        },
        {
            command: "weight *",
            callback: (weight) => {
              console.log("Weight: " + weight);
              enterWeightFromSpeech(weight,-1);
            },
        },
        {
            command: "wait *",
            callback: (weight) => {
              console.log("Weight: " + weight);
              enterWeightFromSpeech(weight,-1);
            },
        },
        {
            command: "* lb",
            callback: (weight) => {
              console.log("Weight: " + weight);
              enterWeightFromSpeech(weight,0);
            },
        },
        {
            command: "* G",
            callback: (weight) => {
              console.log("Weight: " + weight);
              enterWeightFromSpeech(weight,1);
            },
        },
        {
            command: "Next Plant",
            callback: () => {
              console.log("Next Plant Commanded");
              nextPlantFromSpeech();
            },
        },
        {
            command: "Next Plan",
            callback: () => {
              console.log("Next Plant Commanded");
              nextPlantFromSpeech();
            },
        },*/