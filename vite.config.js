import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

const folders = ['', 'components', 'config', 'models', 'pages', 'utils']

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: folders.map(folder => ({
            find: `@${folder}`,
            replacement: path.resolve(__dirname, `src/${folder}`)
        }))
    },
    plugins: [react()]
})
