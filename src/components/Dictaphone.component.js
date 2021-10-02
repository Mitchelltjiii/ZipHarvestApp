import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceButton from './VoiceButton.component';


const Dictaphone = ({searchTagFromSpeech,enterWeightFromSpeech,nextPlantFromSpeech}) => {

    const commands = [
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

  function startListeningFromVoiceButton(){
    console.log("Start Listening From Voice Button");
    SpeechRecognition.startListening();
  }

  return (
    <div>
      <VoiceButton startListeningFromVoiceButton={startListeningFromVoiceButton}></VoiceButton>
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