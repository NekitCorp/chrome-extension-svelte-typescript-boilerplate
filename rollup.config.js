import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function createConfig(filename, useSvelte = false) {
    return {
        input: `src/${filename}.ts`,
        output: {
            format: "iife",
            file: `public/build/${filename}.js`,
        },
        plugins: [
            useSvelte &&
                svelte({
                    // enable run-time checks when not in production
                    dev: !production,
                    // we'll extract any component CSS out into
                    // a separate file - better for performance
                    css: css => {
                        css.write(`${filename}.css`, false);
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
            typescript(),

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
    createConfig("options", true),
    createConfig("popup", true),
    createConfig("background"),
    createConfig("content_script"),
];
