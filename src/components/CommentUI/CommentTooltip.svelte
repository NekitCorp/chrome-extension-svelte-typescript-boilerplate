<script lang="ts">
  import { commentTooltipStore } from "src/stores/commentTooltipStore";
  export let top: number = 0;
  export let left: number = 0;
</script>

<div
  class="comment-tooltip"
  style={`top: ${top - 60}px; left: ${left - 290}px`}
>
  <b>{$commentTooltipStore.reason}</b>
  <span>{$commentTooltipStore.explanation}</span>
</div>

<style>
  .comment-tooltip {
    position: fixed;
    width: 260px;
    bottom: 10px;
    right: 8px;
    background: linear-gradient(
      109.93deg,
      rgba(60, 215, 187, 0.32) -2.26%,
      rgba(116, 8, 223, 0.3) 114.4%
    );
    backdrop-filter: blur(10px);
    padding: 12px;
    border-radius: 10px 10px 0 10px;
    height: fit-content;
    z-index: 9999;
    color: white;

    /* experimental styles */
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.2);
  }
</style>
