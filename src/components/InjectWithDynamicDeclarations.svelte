<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";

    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<div class="overlay">
    <h1>Inject with dynamic declarations</h1>
    <p>{count}</p>
</div>

<style>
    .overlay {
        position: fixed;
        width: 300px;
        top: 200px;
        left: 16px;
        background-color: yellow;
        border: 1px solid black;
        padding: 16px;
    }
</style>
