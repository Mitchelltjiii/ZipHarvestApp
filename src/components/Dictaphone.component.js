import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceButton from './VoiceButton.component';


const Dictaphone = ({searchTagFromSpeech,enterWeightFromSpeech,nextPlantFromSpeech,browser}) => {

    const commands = [
        {
            command: "search *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browser==="safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "* is *",
            callback: (searchText,searchText2) => {
              searchTagFromSpeech(searchText,searchText2);
              if(browser==="safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "Certs *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browser==="safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
            command: "Easter *",
            callback: (searchText) => {
              searchTagFromSpeech(searchText,"");
              if(browser==="safari"){
                SpeechRecognition.stopListening();
              }
            },
          },
          {
              command: "weight *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
                if(browser==="safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "wait *",
              callback: (weight) => {
                enterWeightFromSpeech(weight,-1);
                if(browser==="safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "* lb",
              callback: (weight) => {
                enterWeightFromSpeech(weight,0);
                if(browser==="safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
              command: "* G",
              callback: (weight) => {
                enterWeightFromSpeech(weight,1);
                if(browser==="safari"){
                  SpeechRecognition.stopListening();
                }
              },
          },
          {
            command: "* g",
            callback: (weight) => {
              enterWeightFromSpeech(weight,1);
              if(browser==="safari"){
                SpeechRecognition.stopListening();
              }
            },
          },   
          {
              command: "Next *",
              callback: () => {
                nextPlantFromSpeech();
                if(browser==="safari"){
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
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function startListeningFromVoiceButton(){
    if(browser==="safari"){
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