import Options from "./components/Options.svelte";
import type { IStorage } from "./types";

chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    const app = new Options({
        target: document.body,
        props: { count },
    });
});
