module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@view': './src/view',
            '@svg': './src/components/svg',
            '@service': './src/service',
            '@utils': './src/utils',
            '@controller': './src/controller',
            '@assets': './src/assets',
            '@interfaces': './src/domain/interfaces',
            '@domain': './src/domain',
            '@types': './src/domain/types',
            '@configs': './src/configs',
            '@stores': './src/stores',
            '@app': './src/app',
            '@context': './src/context',
          },
        },
      ],
    ],
  };
};
