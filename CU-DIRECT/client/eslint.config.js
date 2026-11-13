import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
export default [
  js.configs.recommended,
  {files:['**/*.{js,jsx}'],languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:{...globals.browser,...globals.node,React:'readonly'}},plugins:{react},rules:{'no-unused-vars':['warn',{argsIgnorePattern:'^_',varsIgnorePattern:'^_'}]}},
  {ignores:['dist/**','node_modules/**']}
];
