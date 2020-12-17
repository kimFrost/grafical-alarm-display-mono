import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import Path from 'path'
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import visualizer from 'rollup-plugin-visualizer';
//import commonjs from "@rollup/plugin-commonjs";
// import analyzer from 'rollup-plugin-analyzer'
// import resolve from 'rollup-plugin-node-resolve';
//import copy from "rollup-plugin-copy";

const resolveFile = path => Path.resolve(__dirname, './', path)

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'esm', // the preferred format
            sourcemap: true
        }
    ],
    external: [
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {})
    ],
    globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        //peerDepsExternal(),
        //resolve(),
        //commonjs(),
        postcss({
            extract: false,
            writeDefinitions: true,
            use: ['sass']
        }),
        typescript({
            typescript: require('typescript')
        }),
        // typescript({
        //     tsconfig: resolveFile('./tsconfig.json')
        // }),
        //resolve(),

        visualizer(),
        //analyzer(),
        terser(), // minifies generated bundles
    ]
};