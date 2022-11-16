import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceButton from './VoiceButton.component';
import { browserName, browserVersion } from "react-device-detect";


const Dictaphone = ({searchTagFromSpeech,enterWeightFromSpeech,nextPlantFromSpeech}) => {

    const commands = [
        {
            command: "search *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browserName==="Safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "* is *",
            callback: (searchText,searchText2) => {
              searchTagFromSpeech(searchText,searchText2);
              if(browserName==="Safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "Certs *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browserName==="Safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "Easter *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browserName==="Safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
              command: "weight *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
                if(browserName==="Safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "wait *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
                if(browserName==="Safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "* lb",
              callback: (weight) => {
                enterWeightFromSpeech(weight,0);
                if(browserName==="Safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "* G",
              callback: (weight) => {
                enterWeightFromSpeech(weight,1);
                if(browserName==="Safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
            command: "* g",
            callback: (weight) => {
              enterWeightFromSpeech(weight,1);
              if(browserName==="Safari"){
                SpeechRecognition.stopListening();
              }
            },
          },   
          {
              command: "Next *",
              callback: () => {
                nextPlantFromSpeech();
                if(browserName==="Safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
      ];

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Name doesn't support speech recognition.</span>;
  }

  function startListeningFromVoiceButton(){
    if(browserName==="Safari"){
      SpeechRecognition.stopListening();
    }
    SpeechRecognition.startListening();
  }

  return (
    <div style={{width:"300px"}}>
      <VoiceButton startListeningFromVoiceButton={startListeningFromVoiceButton}></VoiceButton>
      <div style={{width:"100%",textAlign:"center"}}>{transcript}</div>
    </div>
  );
};
export default Dictaphone;