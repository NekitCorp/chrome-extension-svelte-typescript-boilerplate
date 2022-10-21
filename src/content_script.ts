import type { IStorage } from "./types";
import Overlay from "./components/Overlay.svelte";

chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log(count);
});

new Overlay({ target: document.body });
