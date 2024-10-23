<script lang="ts">
    import { count } from "../storage";
    import Options from "./Options.svelte";
</script>

<div class="fixed w-80 top-4 left-4 bg-white border border-indigo-600 p-4">
    <Options {count} />
</div>
