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

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      console.info(speechToText);
    }
    recognition.start();

    fn(false, "-----Speech Recognizer Is Initiated-----");
  } catch (e) {
    console.log(e);
    fn(true, JSON.stringify(e));
  }
}