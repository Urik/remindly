import { defineConfig, configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';
import { includePaths as integrationTestsPaths } from './vitest.integration.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ...integrationTestsPaths],
  },
}));