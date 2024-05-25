import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export const includePaths = ['**/*.integration.test.?(c|m)[jt]s?(x)'];

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: includePaths,
  },
}));