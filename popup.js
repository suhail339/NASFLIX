function runSwitchjs() {
    chrome.tabs.executeScript({
      file: 'switch.js'
    });
  }