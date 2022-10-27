import { storage } from "../storage";

chrome.runtime.onInstalled.addListener(() => {
    storage.get().then(console.log);
});
