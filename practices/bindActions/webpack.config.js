const path = require('path');

module.exports = {
  entry: './src/store.js',
  mode:'development',
    optimization:{
        minimize:false
    },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist'
  },
};