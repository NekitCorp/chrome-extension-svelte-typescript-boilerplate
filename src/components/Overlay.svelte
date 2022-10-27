<script lang="ts">
    import { storage } from "src/storage";
    import { onMount } from "svelte";
    import Options from "./Options.svelte";

    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<div class="overlay">
    <Options {count} />
</div>

<style>
    .overlay {
        position: fixed;
        top: 16px;
        left: 16px;
        background-color: white;
        border: 1px solid black;
        padding: 4px;
    }
</style>
