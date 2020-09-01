---
lang: zh-CN
---

# 基础功能

::: demo
```vue
<template>
	<div>
		<SkuForm
			:source-attribute="sourceAttribute"
			:attribute.sync="attribute"
			:sku.sync="sku"
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
			attribute: [],
			sku: []
		}
	}
}
</script>
```
:::