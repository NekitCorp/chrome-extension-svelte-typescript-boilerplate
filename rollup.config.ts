import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function createConfig(
    filename: string,
    options: { svelte?: boolean; css?: boolean }
): RollupOptions {
    return {
        input: `src/${filename}.ts`,
        output: {
            format: "iife",
            file: `public/build/${filename}.js`,
        },
        plugins: [
            options.svelte &&
                svelte({
                    compilerOptions: {
                        // enable run-time checks when not in production
                        dev: !production,
                    },
                    preprocess: sveltePreprocess(),
                }),

            // we'll extract any component CSS out into
            // a separate file - better for performance
            options.css && css({ output: `${filename}.css` }),

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
            // `rollup-plugin-terser` do not support rollup 3
            // https://github.com/TrySound/rollup-plugin-terser/issues/119
            // production && terser(),
        ],
    };
}

export default [
    createConfig("options", { svelte: true, css: true }),
    createConfig("popup", { svelte: true, css: true }),
    createConfig("background", {}),
    createConfig("content_script", { svelte: true, css: true }),
];
