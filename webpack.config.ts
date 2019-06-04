import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
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
        new CleanWebpackPlugin({}),
        new CopyWebpackPlugin([{from: "package.json", to: "../package.json"}]),
        new CopyWebpackPlugin([{from: "README.md", to: "../README.md"}])
    ]
};

module.exports = config;
