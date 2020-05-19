#### 网站(zhufu250.com)源代码 网站功能 收录网站&导出书签

```
黏贴或输入网址(Enter)，自动抓取网站标题和简介，内容可修改
```
#### 前端 front
```
vue + axios + polyfill
```
#### 后端 server
```
koa2 + mysql + nginx
ORM: sequlize
```
```
|-- config  配置文件
|-- controller  路由控制层，输入、输出数据的处理、异常处理
|-- db_shema 数据库表结构，每张表对应一个文件
|-- db_model 数据库控制层，对应表的增、删、改、查
|-- libs 通用功能：微服务、爬虫等
|-- router 路由，和前端页面对应
|-- test 单元测试、功能函数测试
|-- tmp -- 临时文件，保存网站icon
|-- app.js 入口文件
```

#### NOTICE
```
puppeteer 安装chrome内核浏览器
gm 图片处理安装 GraphicsMagick
```


#### TODO
>* 前端 改单文件.vue + webpack
>* 首屏服务端渲染 SSR
>* CMS后台系统开发，书签的审核、导出、删除等
>* GitHub 钩子自动发布系统
