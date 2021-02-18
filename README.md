# 项目说明文档

## 总览

[vue-typescript-admin-template](http://armour.github.io/vue-typescript-admin-template) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue), [typescript](https://www.typescriptlang.org/) 和 [element-ui](https://github.com/ElemeFE/element)实现。原始的 Javascript 版本的代码是由 [PanJiaChen](https://github.com/PanJiaChen) 开发维护的 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)， 十分感谢大佬对开源社区做出的贡献 :)

如果你想从一个十分简单的基础模版开始，而不是直接使用这个功能丰富的集成方案的话，你可以看一看本项目的 [minimal](https://github.com/Armour/vue-typescript-admin-template/tree/minimal) 分支.

## 线上文档

[文档](https://armour.github.io/vue-typescript-admin-docs/zh)

## 线上地址

[示例](https://armour.github.io/vue-typescript-admin-template)

## 相关项目

[Armour/vue-typescript-admin-mock-server](https://github.com/armour/vue-typescript-admin-mock-server) (mock server for this project)

[Armour/vue-typescript-admin-docs](https://github.com/armour/vue-typescript-admin-docs) (documentation source for this project)

Javascript 版本:

[PanJiaChen/vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) (a vue2.0 minimal admin template)

[PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) (full features supported vue admin)

[PanJiaChen/electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin) (a vue electron admin project)

## 功能

```txt
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - Dev / Stage / Prod

- 全局功能
  - 国际化多语言
  - 动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(支持右键操作)
  - 粘贴板
  - Svg 图标
  - 搜索
  - 全屏
  - 设置
  - Mock 数据 / Mock 服务器
  - 支持 PWA

- 组件
  - 编辑器
    - 富文本编辑器
    - Markdown 编辑器
    - JSON 编辑器
  - 头像上传
  - 返回顶部
  - CountTo
  - 拖放区
  - 拖拽弹窗
  - 拖拽看板
  - 拖拽列表
  - 拖拽选择
  - ECharts 图表
  - Mixin
  - 拆分窗格
  - 黏性组件

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑表格
  - 复杂表格

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel

- Zip
  - 导出zip

- PDF
  - 下载 pdf

- 控制台
- 引导页
- 综合实例
- 错误日志
- 错误页面
  - 401
  - 404
```

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [typescript](https://www.typescriptlang.org/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[faker.js](https://github.com/Marak/Faker.js)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── mock                       # mock 服务器 与 模拟数据
├── public                     # 静态资源 (会被直接复制)
│   │── favicon.ico            # favicon图标
│   │── manifest.json          # PWA 配置文件
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源 (由 webpack 处理加载)
│   ├── components             # 全局组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局过滤函数
│   ├── icons                  # svg 图标
│   ├── lang                   # 国际化
│   ├── layout                 # 全局布局
│   ├── pwa                    # PWA service worker 相关的文件
│   ├── router                 # 路由
│   ├── store                  # 全局 vuex store
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局方法
│   ├── views                  # 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.ts          # 权限管理
│   ├── settings.ts            # 设置文件
│   └── shims.d.ts             # 模块注入
├── tests                      # 测试
├── .circleci/                 # 自动化 CI 配置
├── .browserslistrc            # browserslistrc 配置文件 (用于支持 Autoprefixer)
├── .editorconfig              # 编辑相关配置
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置
├── babel.config.js            # babel-loader 配置
├── jest.config.js             # jest 单元测试配置
├── package.json               # package.json 依赖
├── postcss.config.js          # postcss 配置
├── tsconfig.json              # typescript 配置
└── vue.config.js              # vue-cli 配置
```

## 如何设置以及启动项目

### 安装依赖

```bash
yarn install
```

### 启动本地开发环境（自带热启动）

```bash
yarn serve
```

### 构建生产环境 (自带压缩)

```bash
yarn build:prod
```

### 代码格式检查以及自动修复

```bash
yarn lint
```

### 运行单元测试

```bash
yarn test:unit
```

### 自动生成 svg 组件

```bash
yarn run svg
```

### 自定义 Vue 配置

请看 [Configuration Reference](https://cli.vuejs.org/config/).

## 浏览器支持

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## 样式替换

### 和设计师确定UI规范

### 前端项目公共部分调整

#### 在 element-ui 官网主题定制方案并根据UI规范进行相关属性调整

#### 下载调整完成的方案，解压文件，在项目中使用

将 `index.css` 文件及字体文件夹保存在  `@/styles/`。
引用可在 `main.ts`中使用

```js
# main.ts

import '@/styles/index.css'

```

#### 覆盖自定义主题样式

在原有主题样式文件中，覆盖相应的属性值。

文件路径为：`src/styles/element-variables.scss`，详见文件需改。

#### 更新项目样式变量文件

为了在项目中能够统一使用UI规范定义的内容，在项目中统一定义了通用的样式变量和组件变量。

文件路径为：`src/styles/_variables.scss`，详见文件需改。

以上文件均在`/src/styles`目录下，调整项目时，可覆盖整个目录。

### 前端项目业务页面调整

#### 公共资源文件更新

需要从组件库项目中拷贝相关文件到自己的项目中进行覆盖，主要包括：

* styles文件夹：公共样式文件；
* asstes文件夹：静态资源，主要包括登录页相关的图片；
* components文件夹：公共组件库目录；
* layout文件夹：公共布局组件文件；修改 `src/layout/components/Sidebar/index.vue` 文件中 `title` 值为项目名称；
* `main.ts`文件：替换引入的样式文件；

```ts
# main.ts
# 重置element-ui主题样式
import '@/styles/element-variables.scss'
# 自定义element-ui主题样式
import '@/styles/index.css'
# 公共样式，包括重置系统样式和组件样式及公共组件布局样式
import '@/styles/common.scss'
```

* `login.vue`文件：替换整个文件，如果特殊修改可进行差异性替换。
* `404.vue`文件：替换整个文件，如果特殊修改可进行差异性替换。

### 页面文件更新

#### 列表页

***筛选***：

1. 每行显示三个字段，字段名称右对齐，字段长度限定最长为6个字；

2. 如果字段不足3个，按钮放到字段后面；

3. 如果字段超过2个不足6个，不展示展开选项；

4. 如果字段超过6个，显示展示选项，点击展开所有字段，并改为收起；

***表格***：

1. 所有单元格都左对齐；

2. 所有单元格内容部分都不折行，页头每项的文字要显示完整；

3. 单元格内容，如果能确定内容宽度的，可通过设置宽度让内容显示完整；如果不确定的要保证留有一定宽度；

4. 所有单元格内容如果不足页面最小宽度，一定要保证有一个单元格不设定宽度，让其自然收缩；

5. 操作按钮：

* 非条件显示按钮：如果超过3个按钮，列表默认显示一个按钮+更多，其他按钮在下拉选项中展示；

* 条件显示按钮：因不好控制显示个数，可直接在列表中完全显示。

6. 分页：右对齐

### 2021–02-16更新

#### `main.ts` 文件

调整样式加载顺序，解决样式覆盖问题：

最新的样式顺序为：

```ts
# main.ts

import '@/styles/element-variables.scss'
import '@/styles/index.css'
import '@/styles/common.scss'
```

#### 登录页

* 增加样式作用域，解决全局样式污染的问题；

#### 列表页

* 针对筛选项不同个数进行样式优化，适配页面展示；
* 针对弹层中表单项字数超过6个做兼容：折行并垂直居中展示（表单页同理）；

### 2021–02-18 更新

#### `common.scss` 文件

针对筛选项表单元素的最大宽度进行调整，适配到 1920px 的 分辨率屏幕。

```css
.el-input,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-date-picker,
  .el-select {
    width: 100%;
    max-width: 382px;
  }
```

#### 列表页

针对筛选项为 3 个情况下的展示适配。

```html
# table/index.vue
<div class="mod-card-body" :class="{'mod-card-body-height': filterLength > 3 && !filterExtend, 'mod-card-body-extend': filterExtend}">
```
