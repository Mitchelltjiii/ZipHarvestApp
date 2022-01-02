import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceButton from './VoiceButton.component';


const Dictaphone = ({searchTagFromSpeech,enterWeightFromSpeech,nextPlantFromSpeech}) => {

    const commands = [
        {
            command: "search *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText);
            },
          },
          {
            command: "Certs *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText);
            },
          },
          {
            command: "Easter *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText);
            },
          },
          {
              command: "weight *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
              },
          },
          {
              command: "wait *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
              },
          },
          {
              command: "* lb",
              callback: (weight) => {
                enterWeightFromSpeech(weight,0);
              },
          },
          {
              command: "* G",
              callback: (weight) => {
                enterWeightFromSpeech(weight,1);
              },
          },
          {
            command: "* g",
            callback: (weight) => {
              enterWeightFromSpeech(weight,1);
            },
          },  
          {
              command: "Next *",
              callback: () => {
                nextPlantFromSpeech();
              },
          },
      ];

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function startListeningFromVoiceButton(){
    SpeechRecognition.startListening();
  }

  return (
    <div style={{width:"300px"}}>
      <VoiceButton startListeningFromVoiceButton={startListeningFromVoiceButton}></VoiceButton>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;