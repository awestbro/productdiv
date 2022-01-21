/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dist = path.resolve(__dirname, "dist");

module.exports = () => ({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new CssMinimizerPlugin({}),
    ],
  },
  mode: "production",
  entry: {
    "index.js": glob.sync("./vendor/**/*.js").concat(["./app/index.tsx"]),
    "bootstrap5-config.js":
      "./app/configurations/bootstrap5/bootstrap-5-configuration.ts",
  },
  output: {
    filename: "[name]",
    publicPath: "/",
    path: dist,
    library: {
      name: "productdiv",
      type: "umd",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".scss", ".sass"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          // {
          //   // inject CSS to page
          //   loader: 'style-loader'
          // },
          // {
          //   // translates CSS into CommonJS modules
          //   loader: 'css-loader'
          // },

          // "style-loader",
          "to-string-loader",
          "css-loader",
          {
            // Run postcss actions
            loader: "postcss-loader",
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          "sass-loader",
          // {
          //   // compiles Sass to CSS
          //   loader: 'sass-loader'
          // }
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      // {
      //   test: /\.(gif|ttf|eot|svg|woff2?)$/,
      //   use: "url-loader?name=[name].[ext]",
      // },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "static/", to: dist }],
    }),
  ],
});
