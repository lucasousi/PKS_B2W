const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {
  override,
  addPostcssPlugins,
  addWebpackAlias,
} = require('customize-cra');

module.exports = override(
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),
  addWebpackAlias({
    ['@src']: path.resolve(__dirname, './src'),
    ['@styles']: path.resolve(__dirname, './src/styles'),
  })
);

module.exports.webpack = (config) => {
  // Remove guard against importing modules outside of `src`.
  // Needed for workspace projects.
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin)
  );

  // Add support for importing workspace projects.
  config.resolve.plugins.push(
    new TsConfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json'),
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      mainFields: ['module', 'main'],
    })
  );

  // Replace include option for babel loader with exclude
  // so babel will handle workspace projects as well.
  config.module.rules.forEach((r) => {
    if (r.oneOf) {
      const babelLoader = r.oneOf.find(
        (rr) => rr.loader.indexOf('babel-loader') !== -1
      );
      babelLoader.exclude = /node_modules/;
      delete babelLoader.include;
    }
  });

  return config;
};

module.exports.paths = (paths) => {
  // Rewrite dist folder to where Nx expects it to be.
  paths.appBuild = path.resolve(__dirname, '../../dist/apps/aquamons-store');
  return paths;
};
module.exports.jest = (config) => {
  config.resolver = '@nrwl/jest/plugins/resolver';
  return config;
};
