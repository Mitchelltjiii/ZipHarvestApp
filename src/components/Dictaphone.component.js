import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


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
    SpeechRecognition.startListening();
    console.log("Handle Start Speech Recog")
    console.log("Listening: " + listening);
    while(listening){
        console.log("Listening...")
        setTimeout('',100);

    }
    console.log("Done Listening");
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
      <button onClick={resetTranscript}>Reset</button>*/