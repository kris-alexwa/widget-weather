const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    config.optimization.splitChunks = false
    config.output.filename = 'weather-widget.js'
    config.output.chunkFilename = 'weather-widget.js'
  },
  chainWebpack: config => {
    if(config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'weather-widget.css',
        chunkFilename: 'weather-widget.css'
      }])
    }
  }
});
