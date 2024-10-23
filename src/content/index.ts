import { mount } from "svelte";
import Overlay from "../components/Overlay.svelte";
import { count } from "../storage";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

// Some JS on the page
count.subscribe(console.log);

// Some svelte component on the page
mount(Overlay, { target: document.body });
