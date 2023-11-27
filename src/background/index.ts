// `?script` – ?
// https://dev.to/jacksteamdev/advanced-config-for-rpce-3966#dynamic-content-scripts
//
// CRXJS uses a unique import query to designate that an import points to a content script.
// When an import name ends with the query ?script, the default export is the output filename
// of the content script. You can then use this filename with the Chrome Scripting API
// to execute that content script and profit from Vite HMR.
import injectProgrammatically from "../content/inject-programmatically?script";
import injectWithDynamicDeclarations from "../content/inject-with-dynamic-declarations?script";
import { storage } from "../storage";

// Background service workers
// https://developer.chrome.com/docs/extensions/mv3/service_workers/

chrome.runtime.onInstalled.addListener(() => {
    storage.get().then(console.log);
});

// NOTE: If you want to toggle the side panel from the extension's action button,
// you can use the following code:
// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
//    .catch((error) => console.error(error));

// Inject programmatically
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#programmatic
chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [injectProgrammatically],
        });
    }
});

// Inject with dynamic declarations
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#dynamic-declarative
chrome.scripting
    .registerContentScripts([
        {
            id: "session-script",
            js: [injectWithDynamicDeclarations],
            persistAcrossSessions: false,
            matches: ["https://*/*"],
            runAt: "document_start",
        },
    ])
    .then(() => console.log("registration complete"))
    .catch((err) => console.warn("unexpected error", err));
