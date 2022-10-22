import Overlay from "../components/Overlay.svelte";
import type { IStorage } from "../types";

// Some JS on the page
chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log(count);
});

// Some svelte component on the page
new Overlay({ target: document.body });
