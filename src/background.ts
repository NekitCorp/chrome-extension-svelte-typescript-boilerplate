import type { IStorage } from "./types";

// ***IMPORTANT NOTE***
// Before Chrome 93, the service worker file must be in the root path where manifest.json is.
// https://stackoverflow.com/questions/66114920/service-worker-registration-failed-chrome-extension

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
        console.log(count);
    });
});
