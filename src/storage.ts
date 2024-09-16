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
    let storeValues: T[] = [];
    let chromeValues: T[] = [];

    function watchStore() {
        store.subscribe((value) => {
            // Prevent circular updates
            if (chromeValues && value === chromeValues[0]) {
                chromeValues.shift();
                return;
            }

            storeValues.push(value);
            chrome.storage.sync.set({ [key]: value });
        });
    }

    function watchChrome() {
        chrome.storage.sync.onChanged.addListener((changes) => {
            if (!(Object.hasOwn(changes, key))) return;

            const value = changes[key].newValue as T;
            console.log(`watchChrome got ${value}`);
            if (storeValues && value === storeValues[0]) {
                storeValues.shift();
                return;
            }

            chromeValues.push(value);
            store.set(value);
        });
    }

    // Initialize the store with the value from Chrome storage
    chrome.storage.sync.get(key).then((result) => {
        let value = Object.hasOwn(result, key) ? result[key] : initialValue;
        if (!Object.hasOwn(result, key)) {
            console.log(`Persistent store: couldn't find key [${key}] in chrome storage. Default to initial value [${initialValue}]`)
        }
        chromeValues.push(value);
        store.set(value);
        watchStore();
        watchChrome();
    });

    return store;
}

export const count = persistentStore("count", 10);
