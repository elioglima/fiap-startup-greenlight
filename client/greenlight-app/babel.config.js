module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            view: './src/view',
            svg: './src/components/svg',
            service: './src/service',
            utils: './src/utils',
            controller: './src/controller',
            assets: './src/assets',
            interfaces: './src/domain/interfaces',
            domain: './src/domain',
            types: './src/domain/types',
            config: './src/config',
          },
        },
      ],
    ],
  };
};
