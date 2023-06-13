# webpack

## 简述

webpack 是一个模块化打包工具。

它默认只支持打包 JS 文件与 Json 文件。

支持打包非 JS 文件是基于 Loader 机制来实现的。

## Loader

本质上是导出函数的 JavaScript 模块。所导出的函数，可用于实现内容转换。

### 一、Loader 执行顺序

1\. 分类

* pre： 前置loader
* normal： 普通loader
* inline： 内联loader
* post： 后置loader

### 二、loader pitch

pitch 是 loader 上的一个方法，它的作用是阻断 loader 链。

```js
// loaders/simple-loader-with-pitch.js
module.exports = function (source) {
 console.log('normal excution');
 return source;
}
// loader上的pitch方法，非必须
module.exports.pitch = function() {
 console.log('pitching graph');
// todo
}
```

pitch 方法不是必须的。如果有 pitch，loader 的执行则会分为两个阶段：\`pitch\` 阶段 和 \`normal execution\` 阶段。
webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），
然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。

在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。
webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 的 normal execution。

### 三、常见 webpack loader 问题可以从一个维度角度分析

1\. js：

* 1.babel-loader (ES6转换)
* 2.vue-loadr（将vue转化为js）

2.css：

* 1.style-loader
* 2.css-loader
* 3.postcss-loader（提供css更好的兼容性）

3.图片资源：

* 1.file-loader（在 Js 代码里 import/require 一个文件时，会将该文件生成到输出目录，并且在 js 里返回该文件的地址）
* 2.url-loader
* 3.image-loader

## &#x20;Plugin

### 一、什么是插件

●扩展和定制Webpack在打包过程中的某些步骤

●插件可以在一一些关键点上被触发 将自己的逻辑融入到 Webpack 的构建流程中，实现一些额外的功能 (打包优化，资源管理，注入环境变量)

### 二、回答范例-列举题找维度

* 1.打包优化:

  * 全局

    * a. CleanWebpackPlugin:用于在每次构建前清理输出目录中的文件。
    * b. CompressionWebpackPlugin: 用于对打包后的资源文件进行gzip压缩。
  * HTML

    * a. HtmlWebpackPlugin: 用于生成HTML文件，并将打包后的资源文件自动引入。
  * CSS

    * a. MiniCssExtractPlugin:用于将CSS提取为单独的文件。
  * Javascript

    * a. DefinePlugin:用于定义环境变量。
    * b. UgliftyJsPlugin: 用于压缩JavaScript代码。
  * 图片静态资源

    * a. CopyWebpackPlugin: 用于将静态文件直接复制到输出目录中。
* 2.调试分析:

  * a. webpack-bundle-analyzer: 用于分析并可视化打包后的模块大小和依赖关系。
  * b. FriendlyErrorsWebpackPlugin: 用于友好地展示Webpack构建错误信息。
  * c. HotModuleReplacementPlugin: 用于实现热模块替换功能。

## 分包策略

将一个 bundle 文件分成多个 chunk 文件处理

### 一、分包主要能解决两个问题

* 降低页面初始代码包体积，提高首屏渲染性能
* 提高应用缓存效率

### 二、常见的分包策略有三个

* 对于多入口的项目可以根据 Entry 分包

* SPA 应用可以在根据 import() 动态引用分包，比如路由中可以使用 import)() 方法，就可以将每一个视图所依赖的模块进项分包

* 最后一种是将运行时代码单独分包，但是由于运行时代码相对体积较小，所以他的优化效不明显。

## Treeshaking&#x20;

Treeshaking的作用就是去除无用代码

在 webpack 中，TreeShaking 又叫做 usedExports 意思就是导出有用的部分, 存在于 optimization 属性中。
只需要在确保使用静态模块的前提下,开启这个功能就可以实现 Treeshaking了。

## 文件指纹（哈希）

文件指纹就是将文件内容进行哈希运算然后将结果反映到文件上。确保文件内容不同文件名也不同。

webpack 中的文件指纹策略一般分三种全局、chunk、文件粒度从大至小。

通常情况下选择文件粒度

## SourceMap

sourcemap 是编译后代码和原始代码的映射。

在生产环境，sourcemap 不能发布到线上。

通常的做法是上传到异常监控服务器用于解析线上错误信息。

## 提高打包效率

* 不重复作业: 缓存技术&#x20;
* 并行同步作业:并行处理、多线程、多进程·
* 精简作业:减少步骤、缩减范围
* 高效作业:使用高效编辑器 SWC、ESBuild

### 一、范例回答

提高构建效率可以从缓存、并行处理、减少编译范围、改用高性能编译器四个方面着手 ：

* 首先可以设置缓存，提高二次构建性能。&#x20;

* 其次应该尽量采用并行处理方式：

  * &#x20;比如使用 Tread-loader，或者在 terser-webpack-plugin 中开启并行处理功能
* 在减少编译范围方面可以：

  * 使用 noparse 跳过第三方库编译、
  * 使用exclude约束执行范围、
  * 非必要不生成SourceMap、
  * 禁止不必要的产物优化 &#x9;

* 最后还可以利用SWC、ESBuild 这种基于 Go或 Rust 实现的高效编译器提升效率

## Babel

### 范例回答

所谓 ES6 转 ES5 是指将工程代码中新语法转换为浏览器运行时环境支持的语法。
通常情况需要 Babel 和 ＠ babel/preset-env 预设一起完成。
例如在 webpack 构建的项目中 babel 通过 loader 的形式引入
配置的时候需要在 ＠babel/preset-env 预设的配置中指定运行时环境，比如浏览器的版本和 polyfii 等内容。
