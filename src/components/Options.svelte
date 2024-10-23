<script lang="ts">
    import { type Writable } from "svelte/store";

    interface Props {
        count: Writable<number>;
    }

    let { count }: Props = $props();
</script>

<div class="container">
    <p>Current count: <b>{$count}</b></p>
    <div>
        <button onclick={() => ($count -= 1)}>-</button>
        <button onclick={() => ($count += 1)}>+</button>
    </div>
</div>

<style>
    .container {
        min-width: 250px;
    }

    button {
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        background-color: #2ecc71;
        color: #ecf0f1;
        transition: background-color 0.3s;
        padding: 5px 10px;
        border: none;
    }

    button:hover,
    button:focus {
        background-color: #27ae60;
    }
</style>
