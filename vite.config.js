// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/

// eslint-disable-next-line import/no-extraneous-dependencies
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    // eslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
