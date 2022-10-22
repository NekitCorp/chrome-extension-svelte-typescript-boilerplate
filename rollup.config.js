import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import {
    chromeExtension,
    simpleReloader,
} from "rollup-plugin-chrome-extension";
import del from "rollup-plugin-delete";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
export default {
    input: "src/manifest.json",
    output: {
        dir: "dist",
        format: "esm",
    },
    plugins: [
        del({ targets: "dist/*" }),
        // always put chromeExtension() before other plugins
        chromeExtension(),
        simpleReloader(),
        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
            preprocess: sveltePreprocess(),
            emitCss: false,
        }),
        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        typescript(),
    ],
};
