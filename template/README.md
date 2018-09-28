# {{ name }}

> {{ description }}

## Build Setup

``` bash 命令
# 安装依赖
npm install

# 开发环境  localhost:8099
npm run dev

# 常规打包已经被我禁用build for production with minification
npm run build

# 打包非生产环境
npm run build:sit

#打包生产环境
npm run build:prod

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
