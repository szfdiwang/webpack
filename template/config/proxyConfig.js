module.exports = {
  proxy: {
    '/apis': {
      target: 'http://192.168.12.31:8092/', // 接口域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/apis': '' //需要rewrite的,
      }
    }
  }
}
