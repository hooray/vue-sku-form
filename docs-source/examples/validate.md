---
lang: zh-CN
---

# 自定义验证

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
					label: '价格'
				},
				{
					name: 'stock',
					type: 'input',
					label: '库存',
					tip: '库存数不能少于10',
					required: true,
					// data: 完整 sku 数据，index: 当前 sku 在 data 中的下标，callback: 验证结果回调函数
					validate: (data, index, callback) => {
						console.log(data[index].stock ? true : false);
						if (data[index].stock && parseInt(data[index].stock) < 10) {
							callback(new Error('库存不能小于10'))
						}
						callback()
					}
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