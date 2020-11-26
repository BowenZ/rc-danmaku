// const browserlist = [
//   '>= 1%',
//   'last 1 major version',
//   'not dead',
//   'Chrome >= 41',
//   'Firefox >= 38',
//   'Edge >= 12',
//   'Explorer >= 10',
//   'iOS >= 9',
//   'Safari >= 9',
//   'Android >= 4.4',
//   'Opera >= 30',
// ];

module.exports = (api) => {
  const env = api.env();
  console.log('====babel env====', env);
  let dev = false;
  let modules;

  switch (env) {
    case 'docs':
    case 'test':
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
      modules = false;
      break;
    case 'cjs':
    default:
      modules = 'commonjs';
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules,
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          // 若将@babel/preset-env的useBuiltIns选项值设置为 usage，同时把node_modules从babel-loader中exclude，会导致babel 无法检测到nodes_modules中所需要的polyfill。"useBuiltIns: usage" for node_modules without transpiling #9419，在未支持该issue提到的内容之前，请将useBuiltIns设置为entry，或者不要把node_modules从babel-loader中exclude。
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          // This will need to change once we upgrade to corejs@3
          corejs: 3,
          // loose: true,
          ignoreBrowserslistConfig: true,
          shippedProposals: true,
          include: ['proposal-object-rest-spread'],
          // targets: {
          //   browsers: browserlist,
          // },
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        '@babel/preset-react',
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          // development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/proposal-class-properties',
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: !modules,
        },
      ],
    ],
  };
};
