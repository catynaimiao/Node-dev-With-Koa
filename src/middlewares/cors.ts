const config = {
  origin: function (ctx) {
    //设置允许来自指定域名请求
    const whiteList = ["localhost:3000","127.0.0.1"]; //可跨域白名单

    let url = ctx.header.host;
    if (whiteList.includes(url)) {
      return url; //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }
    
    return "http://localhost::3000"; //默认允许本地请求3000端口可跨域
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
  allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
  exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
};

export default config;
