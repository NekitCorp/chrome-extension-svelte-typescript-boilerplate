<script lang="ts">
    import { storage } from "../storage";

    export let count: number;
    let successMessage: string | null = null;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    function save() {
        storage.set({ count }).then(() => {
            successMessage = "Options saved!";

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }
</script>

<div class="min-w-[250px] p-2">
    <p>Current count: <b>{count}</b></p>
    <div>
        <button
            class="rounded-sm shadow-sm bg-teal-300 hover:bg-teal-400 focus:bg-teal-400 text-sky-900 transition-colors px-2.5 py-1.5 border-none"
            on:click={decrement}
        >
            -
        </button>
        <button
            class="rounded-sm shadow-sm bg-teal-300 hover:bg-teal-400 focus:bg-teal-400 text-sky-900 transition-colors px-2.5 py-1.5 border-none"
            on:click={increment}
        >
            +
        </button>
        <button
            class="rounded-sm shadow-sm bg-teal-300 hover:bg-teal-400 focus:bg-teal-400 text-sky-900 transition-colors px-2.5 py-1.5 border-none"
            on:click={save}
        >
            Save
        </button>
        {#if successMessage}<span class="text-green-400 font-bold">{successMessage}</span>{/if}
    </div>
</div>
