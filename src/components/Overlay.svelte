<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";
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
        width: 300px;
        top: 16px;
        left: 16px;
        background-color: white;
        border: 1px solid black;
        padding: 16px;
    }
</style>
