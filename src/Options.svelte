<script lang="ts">
    import type { IStorage } from "./types";

    export let count: number;
    let success = false;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    function save() {
        const storage: IStorage = {
            count,
        };

        chrome.storage.sync.set(storage, () => {
            success = true;

            setTimeout(() => {
                success = false;
            }, 1500);
        });
    }
</script>

<style>
    button {
        background: transparent;
        border: 1px solid blue;
        cursor: pointer;
    }

    button:hover {
        background-color: #eee;
    }
</style>

<main>
    <button on:click={decrement}> - </button>
    <div>Current count {count}!</div>
    <button on:click={increment}> + </button>
    <button on:click={save}>Save</button>
    {#if success}
        <div>Options saved!</div>
    {/if}
</main>
