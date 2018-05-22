import { Configuration } from "webpack";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as path from "path";

const config: Configuration = {
    entry: "./dist/src/index.js",
    devtool: "inline-source-map",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist/build")
    },
    mode: "development",
    node: {
        fs: "empty"
    },
    resolve: {
      extensions: [ ".js" ]
    },
    plugins: [
        new CleanWebpackPlugin( ("dist/build"), { allowExternal: true } ),
    ]
};

module.exports = config;