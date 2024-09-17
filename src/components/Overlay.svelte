<script lang="ts">
    import { count } from "../storage";
    import Options from "./Options.svelte";
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
