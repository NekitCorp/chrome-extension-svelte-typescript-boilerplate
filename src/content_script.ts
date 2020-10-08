import type { IStorage } from "./types";

chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log(count);
});
