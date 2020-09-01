---
lang: zh-CN
---

# 必填验证

::: demo
```vue
<template>
	<div>
		<SkuForm
			ref="skuForm"
			:source-attribute="sourceAttribute"
			:structure="structure"
			:attribute.sync="attribute"
			:sku.sync="sku"
		/>
		<el-button type="primary" @click="submit" style="margin-top: 10px;">提交</el-button>
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
					name: 'price',
					type: 'input',
					label: '价格',
					required: true
				},
				{
					name: 'stock',
					type: 'input',
					label: '库存',
					required: true
				}
			],
			attribute: [],
			sku: []
		}
	},
	methods: {
		submit() {
			this.$refs.skuForm.validate(valid => {
				if (valid) {
					this.$message.success('验证通过')
				} else {
					this.$message.warning('验证失败')
				}
			})
		}
	}
}
</script>
```
:::