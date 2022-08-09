const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelLoader = {
  test: /\.js$/, // procurar por arquivos js
  exclude: /(node_modules)/, // excluir busca dentro da informada
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"], // utilizar o preset padrão
      targets: {
        browsers: ["last 2 versions", "not ie 11"], // suporte para as duas ultimas versões de browsers, menos ie 11
      },
    },
  },
};

const cssLoader = {
  test: /\.css$/i,
  include: path.resolve(__dirname, "src"),
  use: ["style-loader", "css-loader", "postcss-loader"],
};

module.exports = {
  entry: "./src/index.js", // arquivo de entrada
  output: {
    path: path.resolve(__dirname, "dist"), // pasta de saída
    filename: "bundle.js", // nome do arquivo de saída
  },
  devServer: { static: "./dist" }, // pasta de saída
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ], // array de plugins
  module: {
    rules: [babelLoader, cssLoader],
  }, // objeto de configuração do módulo
};
