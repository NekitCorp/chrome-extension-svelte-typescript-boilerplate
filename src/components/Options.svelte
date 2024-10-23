<script lang="ts">
    import { type Writable } from "svelte/store";

    interface Props {
        count: Writable<number>;
    }

    let { count }: Props = $props();
</script>

<div class="min-w-[250px] p-2">
    <p>Current count: <b>{$count}</b></p>
    <div>
        <button
            class="rounded-sm shadow-sm bg-teal-300 hover:bg-teal-400 focus:bg-teal-400 text-sky-900 transition-colors px-2.5 py-1.5 border-none"
            onclick={() => ($count -= 1)}>-</button
        >
        <button
            class="rounded-sm shadow-sm bg-teal-300 hover:bg-teal-400 focus:bg-teal-400 text-sky-900 transition-colors px-2.5 py-1.5 border-none"
            onclick={() => ($count += 1)}>+</button
        >
    </div>
</div>
