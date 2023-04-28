<script lang="ts">
  import { onMount } from "svelte";
  import CommentTooltip from "../CommentUI/CommentTooltip.svelte";
  import { commentTooltipStore } from "src/stores/commentTooltipStore";
  import { fade } from "svelte/transition";

  let top: number;
  let left: number;

  function setPointerPosition(e) {
    left = e.clientX;
    top = e.clientY;
  }

  onMount(() => {
    document.addEventListener("mousemove", setPointerPosition);
    return () => {
      document.removeEventListener("mousemove", setPointerPosition);
    };
  });
</script>

<div class="overlay">
  {#if $commentTooltipStore.isShowing}
    <div in:fade={{ duration: 100 }} out:fade={{ duration: 200 }}>
      <CommentTooltip {top} {left} />
    </div>
  {/if}
</div>

<style>
  .overlay {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 9998;
    pointer-events: none;
  }
</style>
