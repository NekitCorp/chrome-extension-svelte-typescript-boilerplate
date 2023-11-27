import InjectWithStaticDeclarations from "../components/InjectWithStaticDeclarations.svelte";
import { storage } from "../storage";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then((value) => console.log("Inject with static declarations", value));

// Some svelte component on the page
new InjectWithStaticDeclarations({ target: document.body });
