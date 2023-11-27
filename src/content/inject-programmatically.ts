import InjectProgrammatically from "../components/InjectProgrammatically.svelte";
import { storage } from "../storage";

storage.get().then((value) => console.log("Inject programmatically", value));
new InjectProgrammatically({ target: document.body });
