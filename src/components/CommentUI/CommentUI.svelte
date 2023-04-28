<script lang="ts">
  import { getOpenAiClassification } from "src/utils/apiHelper";
  import { resetStore } from "src/stores/resetStore";
  import TooltipIcon from "src/assets/icons/icons/TooltipIcon.svelte";
  import { commentTooltipStore } from "src/stores/commentTooltipStore";

  export let textWrapper;

  let selfRef: HTMLElement;
  let isBlurred = true;
  const textContent = textWrapper?.textContent;

  $: isBlurred
    ? (textWrapper.style.filter = "blur(5px)")
    : (textWrapper.style.filter = "unset");

  let response = null

  $:  getOpenAiClassification(textContent).then((res) => {
    res.is_harmful == 'Yes' ? (isBlurred = true) : (isBlurred = false);
    response = res
    return res
  })

  $: $resetStore === true && selfRef?.parentNode?.removeChild(selfRef); //selfdestruct
</script>

<div bind:this={selfRef} class="main-wrapper">
  <div
    class="tooltip-icon-wrapper"
    on:mouseenter={() => {
      if(response){
        $commentTooltipStore.isShowing = true;
        $commentTooltipStore.reason = response?.category.join(', ');
        $commentTooltipStore.explanation = response?.description;
      }
    }}
    on:mouseleave={() => {
      $commentTooltipStore.isShowing = false;
      $commentTooltipStore.reason = "";
      $commentTooltipStore.explanation = "";
    }}
  >
    <TooltipIcon />
  </div>
  {#if response == null}
    <p>Loading...</p>
  {:else if response.description}
    <p>{response?.emoji || ""}</p>
  {:else}
    <p>{"Something went wrong."}</p>
  {/if}
  <button
    on:click={() => {
      isBlurred = !isBlurred;
    }}
    class="test-class"
    >{isBlurred ? "Show" : "Hide"}
  </button>
</div>

<style lang="scss">
  .main-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: var(--gla33wall-comment-ui-color);
    align-items: center;
    gap: 10px;
    padding-top: 8px;
  }
  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    background: var(--gla33wall-comment-ui-bg);
    border: 1px solid var(--gla33wall-comment-ui-color);
    border-radius: 8px;
    font-size: 12px;
    width: 50px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tooltip-icon-wrapper {
    font-size: 10px;
    width: 10px;
    height: 10px;
    position: relative;
    transition: 100ms;

    @media (hover: hover) {
      &:hover {
        scale: 1.4;
      }
    }
  }
</style>
