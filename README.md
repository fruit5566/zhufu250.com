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
koa2 + mysql
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
|--tmp -- 临时文件，保存网站icon
|-- app.js 入口文件
```

##### PS
```
puppeteer 先安装chrome内核浏览器
gm 图片处理需先安装 GraphicsMagick
```
