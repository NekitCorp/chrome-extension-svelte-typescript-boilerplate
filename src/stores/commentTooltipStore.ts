import { writable } from "svelte/store";

interface TooltipData {
  isShowing: boolean;
  reason: string;
  explanation: string;
}

//stores data to show in the comment tooltip
export const commentTooltipStore = writable(<TooltipData>{
  reason: "Harmful:",
  explanation: "This comment is harmful because it is a personal attack.",
});
