import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es' // the preferred format
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
        postcss({
            extract: false,
            writeDefinitions: true,
            use: ['sass']
        }),
        typescript({
            typescript: require('typescript'),
        }),
        terser(), // minifies generated bundles

    ]
};