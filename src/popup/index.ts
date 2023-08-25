import Options from "../components/Options.svelte";
import { storage } from "../storage";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

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
