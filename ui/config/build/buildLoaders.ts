import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };
  //   const assetSvgLoader = { test: /\.svg$/, type: 'asset/source' };
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      // isDev?'style-loader':
      MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.m\.scss$/,
            localIdentName: '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS

      'sass-loader',
    ],
  };

  //   const tsLoader = {
  //     // ts-loader умеет работать с JSX
  //     // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
  //     exclude: /node_modules/,
  //     test: /\.tsx?$/,
  //     use: [
  //       {
  //         loader: 'ts-loader',
  //         options: {
  //           transpileOnly: true,
  //           getCustomTransformers: () => ({
  //             before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //           }),
  //         },
  //       },
  //     ],
  //   };

  const babelLoader = buildBabelLoader(options);

  return [
    assetLoader,
    scssLoader,
    // tsLoader,
    babelLoader,
    {
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ['@svgr/webpack'],
    },
  ];
}
