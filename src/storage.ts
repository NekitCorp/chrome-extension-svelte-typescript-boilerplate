import { writable, type Writable } from 'svelte/store';

/**
 * Creates a persistent Svelte store backed by Chrome's sync storage.
 * @template T The type of the store's value
 * @param key The key to use in Chrome's storage
 * @param initialValue The initial value of the store
 * @returns A writable Svelte store
 */
export function persistentStore<T>(key: string, initialValue: T): Writable<T> {
    const store = writable(initialValue);
    let isUpdatingFromChrome = false;
    let isUpdatingFromStore = false;
    const debug = true;

    function watchStore() {
        if (debug) console.log("STORE subscribe");
        store.subscribe((value) => {
            if (debug) console.log(`[${String(!isUpdatingFromChrome).toUpperCase()}] svelte => chrome ${value}`);
            // Prevent circular updates
            if (isUpdatingFromChrome) return;

            isUpdatingFromStore = true;
            chrome.storage.sync.set({ [key]: value }).then(() => {
                isUpdatingFromStore = false;
            });
            if (debug) console.log(`[END]  svelte => chrome ${value}`);
        });
    }

    function watchChrome() {
        if (debug) console.log("CHROME subscribe");
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (debug) console.log(`[${String(!isUpdatingFromStore).toUpperCase()}] chrome => svelte ${changes[key].newValue}`);

            // Prevent circular updates
            if (isUpdatingFromStore || namespace !== 'sync' || !(Object.hasOwn(changes, key))) return;
            isUpdatingFromChrome = true;
            store.set(changes[key].newValue);
            isUpdatingFromChrome = false;

            if (debug) console.log(`[END]  chrome => svelte ${changes[key].newValue}`);
        });
    }

    // Initialize the store with the value from Chrome storage
    chrome.storage.sync.get(key).then((result) => {
        let value = Object.hasOwn(result, key) ? result[key] : initialValue;
        if (!(Object.hasOwn(result, key))) {
            console.log(`Persistent store: couldn't find key [${key}] in chrome storage. Default to initial value [${initialValue}]`)
        }
        if (debug) console.log(`[START] storage.sync.get => ${Object.hasOwn(result, key)}: ${value}`);
        store.set(value);
        watchStore();
        watchChrome();
        if (debug) console.log(`[END]   storage.sync.get => ${Object.hasOwn(result, key)}: ${value}`);
    });

    return store;
}

export const count = persistentStore("count", 10);
