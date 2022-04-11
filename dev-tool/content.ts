/* This file serves as an intermediary between the Chromogen package
     and background.js.  (background.js can communicate with DevTools page)
 */

// Relay messages from package to background.js (-> DevTools panel)
window.addEventListener('message', (message) => chrome.runtime.sendMessage(message.data));

// Relay messages from background.js (DevTools panel listener) to package
chrome.runtime.onMessage.addListener((message) => window.postMessage(message, '*'));
