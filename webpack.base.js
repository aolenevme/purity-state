module.exports = {
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ["cache-loader", "babel-loader"]
            }
        ]
    }
};
