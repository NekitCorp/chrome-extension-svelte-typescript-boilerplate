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

    function watchStore() {
        store.subscribe((value) => {
            // Prevent circular updates
            if (isUpdatingFromChrome) return;
            isUpdatingFromStore = true;
            chrome.storage.sync.set({ [key]: value }).then(() => {
                isUpdatingFromStore = false;
            });
        });
    }

    function watchChrome() {
        chrome.storage.onChanged.addListener((changes, namespace) => {
            // Prevent circular updates
            if (isUpdatingFromStore || namespace !== 'sync' || !(Object.hasOwn(changes, key))) return;
            isUpdatingFromChrome = true;
            store.set(changes[key].newValue);
            isUpdatingFromChrome = false;
        });
    }

    // Initialize the store with the value from Chrome storage
    chrome.storage.sync.get(key).then((result) => {
        let value = Object.hasOwn(result, key) ? result[key] : initialValue;
        if (!(Object.hasOwn(result, key))) {
            console.log(`Persistent store: couldn't find key [${key}] in chrome storage. Default to initial value [${initialValue}]`)
        }
        store.set(value);
        watchStore();
        watchChrome();
    });

    return store;
}

export const count = persistentStore("count", 10);
