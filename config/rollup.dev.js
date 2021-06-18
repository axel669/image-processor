import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import del from "rollup-plugin-delete"
import html from "@rollup/plugin-html"

import appInfo from "./app-info.js"
import template from "./html-template.js"

export default {
    input: "./src/main.js",
    output: {
        file: `./build/app-d${Date.now()}.js`,
        format: "iife",
    },
    plugins: [
        del({
            targets: [
                "./build/app-*.js",
                "./build/index.html"
            ]
        }),
        svelte(),
        resolve(),
        commonjs(),
        html({
            filename: "./build/index.html",
            title: appInfo.name,
            template,
        })
    ]
}
