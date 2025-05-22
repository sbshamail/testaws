import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["tailwind.config.js"],
    languageOptions: {
      sourceType: "commonjs", // Allow CommonJS syntax
    },
  },
  {
    rules: {
      "no-undef": "off", // Disable 'no-undef' errors
    },
  },
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    settings: {
      "import/resolver": {
        node: true,
      },
    },
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "off",

      "no-empty-pattern": "off",
      "no-constant-binary-expression": "off",

      "import/no-unresolved": "off",
      "import/named": "off",
      "no-prototype-builtins": "off",
      "no-unused-vars": "off",
      "no-unsafe-optional-chaining": "off",
      "react/no-unknown-property": ["error", { ignore: ["jsx"] }],
      "react-hooks/rules-of-hooks": "error",
      "no-undef": "error",
      "no-implicit-globals": "error",
      "no-constant-condition": "error",
    },
  },
];
