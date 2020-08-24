const path = require("path");
const merge = require("webpack-merge");

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

        devServer: {
            contentBase: path.join(__dirname, "public"),
            compress: true,
            historyApiFallback: true,
            port: 3000
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
        }
    };
}

module.exports = () => merge(baseConfig, config());
