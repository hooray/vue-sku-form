---
lang: zh-CN
---

# 计算列

::: demo
```vue
<template>
	<div>
		<SkuForm
			:source-attribute="sourceAttribute"
			:structure="structure"
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
			structure: [
				{
					name: 'price',
					type: 'input',
					label: '价格'
				},
				{
					name: 'stock',
					type: 'input',
					label: '库存'
				},
				{
					name: 'totalPrice',
					type: 'computed',
					label: '总价',
					tip: '总价 = 价格 * 库存，如果价格或库存为空时，则不计算',
					// data: 单条 sku 数据
					computed: data => {
						let totalPrice = ''
						if (data.price && data.stock) {
							totalPrice = (parseFloat(data.price) * parseFloat(data.stock)).toFixed(2)
							totalPrice += ' 元'
						}
						return totalPrice
					}
				}
			],
			attribute: [
				{
					name: '颜色',
					item: ['黑', '金', '白']
				},
				{
					name: '内存',
					item: ['16G']
				}
			],
			sku: [
				{
					sku: '黑;16G',
					price: 85,
					stock: 100
				},
				{
					sku: '金;16G',
					price: 85,
					stock: 50
				},
				{
					sku: '白;16G',
					price: 85,
					stock: 50
				}
			]
		}
	}
}
</script>
```
:::