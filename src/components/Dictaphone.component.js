import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartSpeechRecognition = () => {
    SpeechRecognition.startListening();
    console.log("Handle Start Speech Recog")
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