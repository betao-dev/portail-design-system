module.exports = {
  publicPath:
    process.env.npm_lifecycle_event === 'build-demo'
      ? '/portail-design-system/'
      : '/',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    // add replacement loader(s)
    svgRule
      .test(/\.(svg)$/)
      .use('svg-inline-loader')
      .loader('svg-inline-loader');
  }
};
