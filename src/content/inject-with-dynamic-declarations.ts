import InjectWithDynamicDeclarations from "../components/InjectWithDynamicDeclarations.svelte";
import { storage } from "../storage";

storage.get().then((value) => console.log("Inject with dynamic declarations", value));
new InjectWithDynamicDeclarations({ target: document.body });
