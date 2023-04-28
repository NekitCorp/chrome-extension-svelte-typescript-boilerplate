<script>
  import { getOpenAiClassification } from "src/content";
  import { resetStore } from "src/stores/resetStore";
  import TooltipIcon from "src/assets/icons/icons/TooltipIcon.svelte";
  import CommentTooltip from "./CommentTooltip.svelte";

  export let textWrapper;

  let self;
  let isBlurred = true;

  $: isBlurred
    ? (textWrapper.style.filter = "blur(5px)")
    : (textWrapper.style.filter = "unset");

  let response = getOpenAiClassification("test").then((res) => {
    res.isHarmful ? (isBlurred = true) : (isBlurred = false);
    return res;
  });

  $: $resetStore === true && self?.parentNode?.removeChild(self); //selfdestruct
</script>

<div bind:this={self} class="main-wrapper">
  {#await response}
    <p>Loading...</p>
  {:then value}
    <p>{value.description}</p>
  {:catch error}
    <p>{error.message}</p>
  {/await}
  <button
    on:click={() => {
      isBlurred = !isBlurred;
    }}
    class="test-class"
    >{isBlurred ? "Show" : "Hide"}
  </button>
  <div class="tooltip-icon-wrapper">
    <CommentTooltip />
    <TooltipIcon />
  </div>
</div>

<style>
  .main-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: white;
    align-items: center;
    gap: 10px;
  }
  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid white;
    border-radius: 8px;
    font-size: 12px;
    width: 50px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tooltip-icon-wrapper {
    width: 10px;
    height: 10px;
    position: relative;
  }
</style>
