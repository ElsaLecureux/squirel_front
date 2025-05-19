module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      ["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./"
      }
    },],
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      },
    ],
    [
      'babel-plugin-dotenv-import',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
    ]
  ]
  };
};
