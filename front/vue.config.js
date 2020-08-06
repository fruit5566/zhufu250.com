module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      entry: './src/pages/index/index.js',
      template: './public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    search: {
      entry: './src/pages/search/search.js',
      template: './public/index.html',
      filename: 'search.html',
      title: '搜索页',
      chunks: ['chunk-vendors', 'chunk-common', 'search'],
    },
  },
};
