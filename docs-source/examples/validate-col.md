---
lang: zh-CN
---

# 指定列验证

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
		<el-button type="primary" style="margin-top: 10px;" @click="clear">清除验证结果</el-button>
		<el-button type="primary" style="margin-top: 10px;" @click="check('price')">验证价格</el-button>
		<el-button type="primary" style="margin-top: 10px;" @click="check('stock')">验证库存</el-button>
		<el-button type="primary" style="margin-top: 10px;" @click="checkAll">验证多列（价格和库存）</el-button>
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
					tip: '库存数不能少于10',
					required: true,
					// data: 完整 sku 数据，index: 当前 sku 在 data 中的下标，callback: 验证结果回调函数
					validate: (data, index, callback) => {
						if (data[index].stock && parseInt(data[index].stock) < 10) {
							callback(new Error('库存不能小于10'))
						} else {
							callback()
						}
					}
				}
			],
			attribute: [
				{
					name: '颜色',
					item: ['黑', '金', '白']
				}
			],
			sku: []
		}
	},
	methods: {
		clear() {
			this.$refs.skuForm.clearValidate()
		},
		check(name) {
			let isError = false
			this.$refs.skuForm.validateFieldByColumns([name], errorMessage => {
				if (errorMessage) {
					isError = true
				}
			})
			if (isError) {
				// 此处可以写验证失败后的业务代码
			}
		},
		checkAll() {
			let isError = false
			this.$refs.skuForm.validateFieldByColumns(['price', 'stock'], errorMessage => {
				if (errorMessage) {
					isError = true
				}
			})
			if (isError) {
				// 此处可以写验证失败后的业务代码
			}
		}
	}
}
</script>
```
:::