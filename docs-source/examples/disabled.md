---
lang: zh-CN
---

# 禁用SKU可选属性配置

::: demo
```vue
<template>
	<div>
		<SkuForm
			:source-attribute="sourceAttribute"
			:attribute.sync="attribute"
			:sku.sync="sku"
			:disabled="true"
		/>
		<el-row type="flex" :gutter="20">
			<el-col>
				<el-divider content-position="left">attribute 数据</el-divider>
				<pre><code>{{ attribute }}</code></pre>
			</el-col>
			<el-col>
				<el-divider content-position="left">sku 数据</el-divider>
				<pre><code>{{ sku }}</code></pre>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sourceAttribute: [
				{
					name: '颜色',
					item: ['黑', '金', '白']
				},
				{
					name: '内存',
					item: ['16G', '32G']
				}
			],
			attribute: [
				{
					name: '颜色',
					item: ['黑']
				},
				{
					name: '内存',
					item: ['16G', '32G']
				}
			],
			sku: [
				{
					sku: '黑;16G',
					price: 80,
					stock: 100
				},
				{
					sku: '黑;32G',
					price: 80,
					stock: 100
				}
			]
		}
	}
}
</script>
```
:::