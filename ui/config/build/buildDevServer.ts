import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";
import path from "path";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        static: path.join(__dirname,'dist'),
        port: options.port ?? 3000,
        open: true,
        // если раздавать статику через nginx То надо делать проксирование на Index.html
        historyApiFallback: true,
        hot: true,
    }
}