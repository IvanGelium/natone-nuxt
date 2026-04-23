// import withNuxt from './.nuxt/eslint.config.mjs';
// import eslint from '@eslint/js'; 9.13.0
// import perfectionist from 'eslint-plugin-perfectionist'; 3.9.1
// import pluginVue from 'eslint-plugin-vue'; 9.29.1
// import tseslint from 'typescript-eslint'; 8.11.0
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; 5.2.1
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: [
    'openapi/**',
    'reports/**',
  ],
})

// export default withNuxt(
//   antfu(),
// {
//   rules: {
//     'vue/multi-word-component-names': 'off',
//   },
// },
// {
//   ignores: [
//     '**/*.d.ts',
//     '**/*.d.ts.map',
//     '**/*.spec.ts',
//     '**/*.spec.tsx',
//     '**/*.spec.js',
//     '**/*.spec.jsx',
//     '**/*.test.ts',
//     '**/*.test.tsx',
//     '**/*.test.js',
//     '**/*.test.jsx',
//   ],
// },
// eslintPluginPrettierRecommended,
// );
