## Version：v0.5
```
本项目特点是，主菜单在头部，初始化是五个主菜单（可以配置），之后菜单则是下拉形式展示。
左侧是该主菜单的自子菜单；选择过的菜单会在标签条中显示，可以更快的进入你上一步的菜单中。

```
## Introduction
```
a simple 'vue iview webpack' admin template
simple build
simple develop
simple change
simple give you
```

## Install
```bush
// install dependencies
yarn install
or
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build) ,and access
```bush
npm run build
```

server {
        listen 80  default_server;
        listen [::]:80 default_server;
        charset UTF-8;

        proxy_set_header        Host            $host;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        root /httx/run/iview;

        index index.html;

        location / {
           try_files $uri $uri/ @rewrites;
        }

        location @rewrites {
           rewrite ^(.+)$ /index.html last;
        }

        location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
           expires max;
           add_header Pragma public;
           add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        }

  }
```


## 文件结构
```shell
.
├── dist    build 目录
└── src
      ├── api    http调用接口
    ├── assets    图片文件
      ├── components    组件
    ├── router    路由表
     ├── store    全局数据存储
    ├── styles    样式文件
      ├── utils     公共方法
    └── views    视图组件
        ├── dashboard  用户自己展示界面
        ├── layout    模板框架
        └── login     登录
 └── static   引入第三方目录
```


## Display
### login展示
- 默认是登录名和密码是：admin/123456

![](readme_static/login.png)




### 登录接口传值：
![](readme_static/login-post.png)

### 登录接口返回的值：
![](readme_static/login-accept.png)

### 菜单权限传值：
![](readme_static/menu_accept.png)


### 菜单列表获取：
![](readme_static/menus_list.png)


### 列表传值及效果图：
![](readme_static/get_list.png)
![](readme_static/list.png)

### 列表效果：
![](readme_static/table.png)
![](readme_static/pagination.png)









- vue实现1.登录调接口获取列表数据进行分页查询，2.搜索框查询，3.将table内的数据导出至excel内4.调用接口时携带Authorization:用户登录后后端返回的token，用户可1.登录2.退出登录3.获取列表数据4.查询5.分页6.导出列表7.权限认证：不同的权限用户可获取不同的后端返回的菜单8.将后端返回的链式菜单转换成树状9.将一级菜单显示至顶部2.一级对应的二级菜单显示至左侧，顶部有路引