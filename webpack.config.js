var path = require('path');
// just for static server
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000,
    // http2: true,
  }
};