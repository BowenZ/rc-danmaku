const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);
console.log('====targets====', targets);
console.log('====__dirname====', __dirname);

const srcRoot = path.resolve(__dirname, '../src');
const typesRoot = path.resolve(__dirname, '../types');
const distRoot = path.resolve(__dirname, '../dist');
const cjsRoot = path.resolve(__dirname, '../lib');
const esRoot = path.resolve(__dirname, '../es');

const clean = () => {
  fse.existsSync(typesRoot) && fse.removeSync(typesRoot);
  fse.existsSync(distRoot) && fse.removeSync(distRoot);
  fse.existsSync(cjsRoot) && fse.removeSync(cjsRoot);
  fse.existsSync(esRoot) && fse.removeSync(esRoot);
};

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step('generating .d.ts', () => shell(`npm run build-types`));

const copyTypes = (dest) => {
  fse.copy(typesRoot, dest);
};

const babel = (outDir, envName) =>
  shell(
    `babel ${srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`
  );

/**
 * 编译为commonjs
 */
const buildLib = step('commonjs modules', async () => {
  console.log('====run buildLib====');
  await babel(cjsRoot, 'cjs');
  await copyTypes(cjsRoot);
});

/**
 * 编译为esmodule
 */
const buildEsm = step('es modules', async () => {
  console.log('====run buildEsm====');
  await babel(esRoot, 'esm');
  await copyTypes(esRoot);
});

/**
 * 编译为单一文件
 */
const buildDist = step(
  'browser distributable',
  () =>
    new Promise((resolve, reject) => {
      console.log('====run buildDist====');
      webpack(
        [getConfig(distRoot, false), getConfig(distRoot, true)],
        async (err, stats) => {
          if (err || stats.hasErrors()) {
            reject(err || stats.toJson().errors);
            return;
          }

          resolve();
        }
      );
    })
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`)
);

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() =>
    Promise.all([
      has('lib') && buildLib(),
      has('es') && buildEsm(),
      has('dist') && buildDist(),
    ])
  )
  .catch((err) => {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
