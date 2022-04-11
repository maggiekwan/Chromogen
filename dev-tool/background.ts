/* eslint-disable */
import type { Connections, Message } from './types/types';
/* eslint-enable */

// Listens for events from DevTools panel and content.js (package intermediary)
const connections: Connections = {};

chrome.runtime.onConnect.addListener((port) => {
  // Listen for messages from DevTools panel
  const extensionListener = (message: Message, portID) => {
    const { tabId, action } = message;
    // Initial connection – store current instance of DevTools page
    if (action === 'connectChromogen') {
      connections[tabId] = portID;
    }
    // Relay message to content.ts -> package
    chrome.tabs.sendMessage(Number(tabId), message);
  };

  // Add event listener defined above to current DevTools panel instance
  port.onMessage.addListener(extensionListener);

  // Handle disconnect
  port.onDisconnect.addListener((portID) => {
    portID.onMessage.removeListener(extensionListener);
    // remove current DevTool instance from connections
    // eslint-disable-next-line no-restricted-syntax
    for (const key in connections) {
      if (connections[key] === portID) {
        delete connections[key];
        break;
      }
    }
  });
});

// Listen for messages from Chromogen package (sent via content.js)
chrome.runtime.onMessage.addListener((message: Message, sender) => {
  const { tab } = sender;

  if (tab) {
    const tabId = `${tab.id}`;
    // Relay message to devTool instance
    if (connections[tabId]) {
      connections[tabId].postMessage({
        action: message.action,
      });
    }
  }
});
