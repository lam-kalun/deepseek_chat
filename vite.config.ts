import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv
  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        dts: path.resolve(process.cwd(), 'typings/app/auto-imports.d.ts'),
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: path.resolve(process.cwd(), 'typings/app/components.d.ts'),
        directoryAsNamespace: true,
      }),
    ],
  }
})
