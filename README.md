### 网站(zhufu250.com)源代码 网站功能 收录网站&导出书签

> 黏贴或输入网址(Enter)，自动抓取网站标题和简介，内容可修改, 支持导出为浏览器标准书签文件（可导入浏览器）

---

### 前端 web_front

> @vue/cli4 vue + SSR + Store splitting; 若后端渲染失败返回到前端渲染
> [READ.ME](https://github.com/fruit5566/vue-cli4-ssr-demo)

> SSR ( koa2 ::3000 nginx 代理)

---

### 后端 api_server

> koa2 + koa-router + mysql + nginx ( ::3001 )

> ORM: sequlize

```
├─ config  配置文件
├─ controller  路由控制层，输入、输出数据的处理、异常处理
├─ db_shema 数据库表结构，每张表对应一个文件
├─ db_model 数据库控制层，对应表的增、删、改、查
├─ libs 通用功能：微服务、爬虫等
├─ router 路由，和前端页面对应
├─ test 单元测试、功能函数测试
├─ tmp -- 临时文件，保存网站icon
└─ app.js 入口文件
```

---

### 后台管理系统 cms_front

> @vue/cli vue vuex router element-ui 前端渲染 + 路由懒加载 + RESTful API

> 模板 from [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

---

### App

> Dcloud 的 uniapp 技术栈 vue + nvue，
> 首页 nvue 原生渲染 下拉刷新，上拉加载。
> 搜索页 webview 渲染

```
├─ common
|    └── uni.css # 通用css
├─ componets  #组件
├─ pages
|    ├── index.nvue # 首页，原生渲染
|    └── search.vue # 搜索结果页，webview渲染
|    └── webview.nve # webview 外部网站，展示书签外部网页
├─ static  #数据库控制层，对应表的增、删、改、查
|    └── uni.ttf # 字体
├─ unpackage  # App打包相关
├─ release  # Android - apk包
├─ App.vue
├─ main.js
├─ manifest.json # 打包配置
├─ pages.json
└─ uni.css 内置常用样式变量

```

## ![](https://cdn.zhufu250.com/app_demo.gif)

### nginx 配置

> https 华为免费单域名证书;

```
// api.zhufu250.com nginx转发 ::3001
// www.zhufu250.com nginx转发 ::3000
// cdn.zhufu250.com 配置CDN优化如下
server {
    listen       443;
    server_name  cdn.zhufu250.com;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;

    ssl on;
    ssl_buffer_size 4k;  # 默认16k, 4k减少waiting时间
    ssl_certificate      cert/cdn.zhufu250.com.crt;
    ssl_certificate_key  cert/cdn.zhufu250.com.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers  on;

    gzip on;
    gzip_buffers 32 4K;
    gzip_comp_level 2;
    gzip_min_length 1k;
    gzip_types application/javascript text/css text/xml;
    gzip_vary on;

    location / {
        log_not_found off;
        access_log off;
        expires 7d;

        root   /root/www/web_front/dist;
        index  index.html index.htm;
    }

}

```
