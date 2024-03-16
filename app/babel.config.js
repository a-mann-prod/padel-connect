module.exports = function (api) {
  api.cache(true);

  const platform = 'web'

  const webPlugins = platform === 'web' ? [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "regenerator": true
      }
    ]
  ] : [];

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ...webPlugins
    ]
  };
};
