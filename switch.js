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
          var el = findElements('a',transcript.trim());
          
          if(el.length > 0){
            var firstElement = el[0];
            console.log(typeof(firstElement));
            console.log(firstElement);
            simulateClick(firstElement,function(err, msg){
              if (!err) {
                console.log("---navigation made:" + msg);
              }
              else {
                console.log("---navigation error:" + msg);
              }
            });
          }
          //finalTranscript += transcript;
        } else {
         console.log("-------running--------");
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

var findElements = function(tag, text) {
  var elements = document.getElementsByTagName(tag);
  var found = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].innerHTML === text) {
      found.push(elements[i]);
    }
  }
  
  return found;
}

var simulateClick = function (elem, fn) {
  console.log("-----click simulation-----");
  // Create our event (with options)
  try {  
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
    fn(false,"Success");
  } catch (e) {
    fn(true,e);
  }
};