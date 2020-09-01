---
lang: zh-CN
---

# 快速上手

::: tip 使用注意
因为 vue-sku-form 基于 ElementUI 开发，安装使用前确保项目中已正确安装 ElementUI
:::

```bash
# 推荐使用 yarn 进行安装
yarn add vue-sku-form
# 或者使用 npm 也无伤大雅
npm install vue-sku-form
```

安装完成后，在 `main.js` 中增加以下内容：

```js
import SkuForm from 'vue-sku-form'
Vue.use(SkuForm)
```

然后在页面中就可以使用 `<SkuForm />` 组件了，就像下面这个例子一样：

::: demo
```vue
<template>
    <SkuForm />
</template>
```
:::