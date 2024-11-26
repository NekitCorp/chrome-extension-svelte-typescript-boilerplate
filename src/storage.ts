import { writable, type Updater, type Writable } from "svelte/store";

/**
 * Creates a persistent Svelte store backed by Chrome's sync storage.
 * @template T The type of the store's value
 * @param key The key to use in Chrome's storage
 * @param initialValue The initial value of the store
 * @returns A writable Svelte store
 */
export function persistentStore<T>(key: string, initialValue: T): Writable<T> {
    const store = writable<T>(initialValue);

    function updateChromeStorage(value: T): void {
        chrome.storage.sync.set({ [key]: value });
    }

    function watchChromeStorage() {
        chrome.storage.sync.onChanged.addListener((changes) => {
            if (Object.hasOwn(changes, key)) {
                store.set(changes[key].newValue);
            }
        });
    }

    function initStoreFromChromeStorage() {
        chrome.storage.sync.get(key).then((result) => {
            if (Object.hasOwn(result, key)) {
                store.set(result[key]);
            }
        });
    }

    initStoreFromChromeStorage();
    watchChromeStorage();

    return {
        set(this: void, value: T): void {
            store.set(value);
            updateChromeStorage(value);
        },
        update(this: void, updater: Updater<T>): void {
            return store.update((prev: T): T => {
                const value = updater(prev);
                updateChromeStorage(value);
                return value;
            });
        },
        subscribe: store.subscribe,
    };
}

export const count = persistentStore("count", 10);
