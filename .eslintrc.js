module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        commonjs: true,
        es6: true,
        jest: true,
    },
    extends: [
       "eslint:recommended",
       "plugin:prettier/recommended",
       "plugin:@typescript-eslint/eslint-recommended",
       "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        "ecmaVersion": 2018,
    },
    plugins: ["prettier", "@typescript-eslint"],
    rules:{
        "prettier/prettier": "error",
        'eol-last':2,
    }
};
