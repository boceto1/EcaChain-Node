module.exports = {
    env: {
        commonjs: true,
        es6: true,
        jest: true,
    },
    extends: [
       "eslint:recommended",
       "plugin:prettier/recommended",
    ],
    parserOptions: {
        "ecmaVersion": 2018,
    },
    plugins: ["prettier"],
    rules:{
        "prettier/prettier": "error",
        'eol-last':2,
    }
};