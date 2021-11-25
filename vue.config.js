module.exports = {
  // 部署应用包时的基本 URL7
  // publicPath : '/',
  devServer: {
    port: 8888, // 端口号，如果被占用，会自动提升1
    host: "localhost", // 主机名：127.0.0.1， 真机 0.0.0.0
    https: false, // 是否开启 https 协议
    open: true, // 启动服务器时自动打开浏览器访问
    proxy: {
      // '/dev-api': {
      [process.env.VUE_APP_BASE_API]: {
        // 组合规则 ： target/{pathRewrite}/{restPathFile}
        // 目标服务器地址，代理访问
        // target: 'http://localhost:8080',
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, // 是否开启
        pathRewrite: {
          // '^/dev-api': ''
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  lintOnSave: false, // 关闭格式检查
  outputDir: "dist", // 打包后所在目录，默认 dist
  assetsDir: "", // 静态资源打包后存放路径，（相对于outputDir指定路径），默认值 ""
  indexPath: "index.html", // index.html 主页面打包后存放的路径，默认 "index.html"
  // 打包时不会生成.map 文件，加快打包速度
  productionSourceMap: false
};
