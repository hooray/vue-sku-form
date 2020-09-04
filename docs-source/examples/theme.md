---
lang: zh-CN
---

# 主题风格

::: demo
```vue
<template>
	<div>
		<SkuForm
			:source-attribute="sourceAttribute"
			:structure="structure"
			:attribute.sync="attribute"
			:sku.sync="sku"
			:theme="theme"
		/>
		<el-button type="primary" style="margin-top: 10px;" @click="switchTheme">切换主题</el-button>
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
			structure: [
				{
					name: 'originalprice',
					type: 'input',
					label: '原价'
				},
				{
					name: 'price',
					type: 'input',
					label: '现价'
				},
				{
					name: 'stock',
					type: 'input',
					label: '库存'
				}
			],
			attribute: [],
			sku: [],
			theme: 1
		}
	},
	methods: {
		switchTheme() {
			this.theme = this.theme == 1 ? 2 : 1
		}
	}
}
</script>
```
:::