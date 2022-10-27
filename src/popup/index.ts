import Options from "src/components/Options.svelte";
import { storage } from "src/storage";

const target = document.getElementById("app");

function render() {
    storage.get().then(({ count }) => {
        new Options({ target, props: { count } });
    });
}

document.addEventListener("DOMContentLoaded", render);
