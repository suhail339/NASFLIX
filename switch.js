console.log("-----NAS FLIX LOADED-----");
var prepareMyDash = setTimeout(function () {
  console.log("-----prepare-----");
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  if ('SpeechRecognition' in window) {
    console.log("window.SpeechRecognition:" + window.SpeechRecognition);
    triggerSpeechRecognizer(function (err, msg) {
      if (!err) {
        console.log("---Success:" + msg);
      }
      else {
        console.log("---Error:" + msg);
      }
    });
  } else {
    console.log("---SpeechRecognition Not In Window---");
  }
}, 10);

function triggerSpeechRecognizer(fn) {
  console.log("------speech recognizer is being triggered------");
  try {
    const recognition = new window.SpeechRecognition();
    let finalTranscript = '';
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          console.log("---"+transcript+"---");
          //finalTranscript += transcript;
        } else {
          //interimTranscript += transcript;
        }
      }
      //console.log(finalTranscript);
      //console.log(interimTranscript);
    }
    recognition.start();

    fn(false, "-----Speech Recognizer Is Initiated-----");
  } catch (e) {
    console.log(e);
    fn(true, JSON.stringify(e));
  }
}