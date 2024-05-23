const TerserPlugin = require('terser-webpack-plugin');

module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
    minimizer: [
      // 只在production打包模式下使用
      new TerserPlugin({
        // 关闭License文件单独打包
        extractComments: false,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            // 解决Safari 10 中的"Cannot declare a let variable twice"问题
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // 打开原因：若使用默认配置，emoji表情和正则表达式可能不能正确压缩
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
          sourceMap: false,
        },
      }),
    ],
  },
  entry: './src/index.ts',
  output: {
    path: distRoot,
    filename: optimize ? 'rc-danmaku.min.js' : 'rc-danmaku.js',
    library: 'rc-danmaku',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: `dist-${optimize ? 'prod' : 'dev'}`,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
});
