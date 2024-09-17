import { get } from "svelte/store";
import Overlay from "../components/Overlay.svelte";
import { count } from "../storage";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

// Some JS on the page
console.log(`CONTENT: ${get(count)}`);

// Some svelte component on the page
new Overlay({ target: document.body });
