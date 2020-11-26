module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb/rules/react',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier', // 禁用与Prettier 冲突的规则
    'prettier/@typescript-eslint', // 针对添加的插件 弃用对应的格式化规则
    'prettier/react', // eslint-config-airbnb 启用 eslint-plugin-react 规则，故在prettier 修改
  ],
  globals: {
    // true表示允许被重写
    // false表示不允许被重写
    __SERVER_ENV__: false,
    __LOCAL__: false,
    __IS_PROD__: false,
    __VERSION__: false,
    __PROJECT_NAME__: false,
  },
  plugins: ['prettier'],
  settings: {
    // 使用eslint-import-resolver-typescript来解析路径，解决设置ts别名后
    // 报Unable to resolve path to module的问题
    'import/resolver': {
      typescript: {}, // 这会加载根目录下的tsconfig.json供eslint使用
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', '.tsx'] },
    ],
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    'no-console': 0,
    'react/jsx-props-no-spreading': 1,
    // 下边两行规则原因是使用ts的可选调用语法，如`someFunction?.()`时，会报
    // ‘no-unused-expressions’错误
    'no-unused-expressions': [0, { extensions: ['.js', '.jsx'] }],
    '@typescript-eslint/no-unused-expressions': [
      0,
      { expressions: ['.ts', '.tsx'] },
    ],
    // 使用ts的规则
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // 引入文件不需要加扩展名
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
