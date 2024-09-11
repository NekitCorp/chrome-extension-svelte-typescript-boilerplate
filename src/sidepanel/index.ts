import Options from "../components/Options.svelte";
import { count } from "../storage";

// Side panel
// https://developer.chrome.com/docs/extensions/reference/sidePanel/

function render() {
    const target = document.getElementById("app");

    if (target) {
        new Options({
            target,
            props: { count },
        });
    }
}

document.addEventListener("DOMContentLoaded", render);
