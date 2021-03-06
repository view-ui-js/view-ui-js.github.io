module.exports = {
  publicPath: "/",
  lintOnSave: false,
  css: {
    sourceMap: false,
    extract: true,// 样式合并
  },
  configureWebpack: {
    // devtool: false,// 调试map
    optimization: {
      // minimize: true,// 代码压缩
      splitChunks: {
        name: false
      }
    },
    output: {
      filename: 'main.js',
      chunkFilename: '[name].js'
    }
  },
  devServer: {
    port: '8080'
  },
  chainWebpack(config) {
    config.resolve.extensions.add('.md');
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        html: true,
        linkify: true,
        typographer: true,
        preventExtract: true,
        wrapper: 'div class="markdown-body"',
        use: [
          [require('markdown-it-container'), 'demo', {
            render(tokens, idx) {
              if (tokens[idx].nesting === 1) {
                let { content } = tokens[idx + 1];
                return `${content}<demo-code>`;
              } else {
                return '</demo-code>';
              }
            }
          }],
          [require('markdown-it-container'), 'warning']
        ]
      });

  },
};