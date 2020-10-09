import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function createConfig(filename, { sveltePlugin, clear }) {
    return {
        input: `src/${filename}.ts`,
        output: {
            sourcemap: !production,
            format: "iife",
            file: `public/build/${filename}.js`,
        },
        plugins: [
            clear && del({ targets: "public/build/*" }),

            sveltePlugin &&
                svelte({
                    // enable run-time checks when not in production
                    dev: !production,
                    // we'll extract any component CSS out into
                    // a separate file - better for performance
                    css: css => {
                        css.write(`${filename}.css`, !production);
                    },
                    preprocess: sveltePreprocess(),
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
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }),

            // If we're building for production (npm run build
            // instead of npm run dev), minify
            production && terser(),
        ],
        watch: {
            clearScreen: false,
        },
    };
}

export default [
    createConfig("options", { sveltePlugin: true, clear: true }),
    createConfig("popup", { sveltePlugin: true, clear: false }),
    createConfig("background", { sveltePlugin: false, clear: false }),
    createConfig("content_script", { sveltePlugin: false, clear: false }),
];
