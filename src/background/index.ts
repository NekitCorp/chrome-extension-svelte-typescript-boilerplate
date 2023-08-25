import { storage } from "../storage";

chrome.runtime.onInstalled.addListener(() => {
    storage.get().then(console.log);
});

// NOTE: If you want to toggle the side panel from the extension's action button,
// you can use the following code:
// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
//    .catch((error) => console.error(error));
