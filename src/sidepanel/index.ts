import Options from "../components/Options.svelte";
import { storage } from "../storage";

// Side panel
// https://developer.chrome.com/docs/extensions/reference/sidePanel/

function render() {
    const target = document.getElementById("app");

    if (target) {
        storage.get().then(({ count }) => {
            new Options({
                target,
                props: { count },
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", render);
