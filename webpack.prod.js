const path = require("path");
const merge = require("webpack-merge");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base.js");

function config() {
    return {
        entry: "./src/index.js",

        output: {
            filename: "main.js",
            path: path.resolve(__dirname, "public"),
            publicPath: "/"
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "public", "index.html"),
                inject: true,
                hash: true
            })
        ],

        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {minimize: true}
                        }
                    ]
                }
            ]
        },

        optimization: {
            usedExports: true,
            minimize: false,
            runtimeChunk: true,
            splitChunks: {
                chunks: "all",
                minSize: 2048,
                cacheGroups: {
                    icons: {
                        test: /[\\/]icons[\\/]/
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    parallel: Math.max(1, require("os").cpus.length - 2)
                })
            ]
        }
    };
}

module.exports = () => merge(baseConfig, config());
