const path = require('path');
const getLocalIdent = require('css-loader/lib/getLocalIdent');

const excludeLessPaths = [path.resolve(__dirname, '../client/main.less')];

module.exports = async ({ config, mode }) => {
  // Less support
  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          getLocalIdent: (
            loaderContext,
            localIdentName,
            localName,
            options,
          ) => {
            return excludeLessPaths.indexOf(loaderContext.resourcePath) >= 0
              ? localName
              : getLocalIdent(
                  loaderContext,
                  localIdentName,
                  localName,
                  options,
                );
          },
        },
      },
      { loader: 'less-loader', options: { javascriptEnabled: true } },
    ],
    include: path.resolve(__dirname, '../'),
  });

  config.module.resolve.modules.push;

  // Return the altered config
  return config;
};
