// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import stylisticPlugin from '@stylistic/eslint-plugin';

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023, // updated to the latest ECMAScript version
        sourceType: "module", // Use "module" as it aligns with modern ES module syntax
        project: "./tsconfig.json",
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    environment: {
      browser: true,
      es2023: true, // updated to ES2023
      mocha: true,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "import": importPlugin,
      "@stylistic": stylisticPlugin,
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off", // still allows require statements if needed
      "no-async-promise-executor": "off", // temporarily disabled for now
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
        },
      ],
      "@stylistic/semi": "warn",
      "curly": "warn",
      "eqeqeq": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-throw-literal": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/test/**", "**/ui-test/**"],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },
];
