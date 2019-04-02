function runSwitchjs() {
  chrome.tabs.executeScript({
    file: 'switch.js'
  });
}

document.getElementById('startRec').addEventListener('click', runSwitchjs);