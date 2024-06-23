import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import CompressionPlugin from 'compression-webpack-plugin';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ 
            template: paths.html
         }),
        new DefinePlugin({
            platform: JSON.stringify(platform),
            environment: JSON.stringify(mode),
        }),

    ]
    const filename = (ext:string) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
        /** Выносит проверку типов в отдельный процесс: не нагружая сборку */
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(new MiniCssExtractPlugin({
            filename: filename('css'),
            }))
    }


    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: filename('css'),
            }))
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
            ],
        }),)

        plugins.push( new CompressionPlugin());
        plugins.push( new CompressionPlugin({
            exclude: /\.s([ac])ss$/,
          }));
    }

    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
        
    }

    return plugins;
}