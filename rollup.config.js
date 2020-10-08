import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function svelteConfig(filename) {
    return {
        input: `src/${filename}.ts`,
        output: {
            sourcemap: true,
            format: "iife",
            name: "app",
            file: `public/build/${filename}.js`,
        },
        plugins: [
            svelte({
                // enable run-time checks when not in production
                dev: !production,
                // we'll extract any component CSS out into
                // a separate file - better for performance
                css: (css) => {
                    css.write(`${filename}.css`);
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

function commonConfig(filename) {
    return {
        input: `src/${filename}.ts`,
        output: {
            sourcemap: true,
            format: "iife",
            file: `public/build/${filename}.js`,
        },
        plugins: [
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }),
        ],
    };
}

export default [
    svelteConfig("options"),
    svelteConfig("popup"),
    commonConfig("background"),
    commonConfig("content_script"),
];
