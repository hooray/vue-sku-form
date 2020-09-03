---
lang: zh-CN
---

# 前台应用实现

::: tip 提示
如果想了解 SKU 组合查询算法的实现思路，请移步《[电商平台商品 SKU 组合查询算法实现](https://hooray.github.io/posts/8b2bd6f8/)》
:::

假设我们有一组已经配置好的 SKU 数据，如下：

::: demo
```vue
<template>
	<div>
		<SkuForm
			:source-attribute="sourceAttribute"
			:structure="structure"
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
				},
				{
					name: '运营商',
					item: ['电信', '移动', '联通']
				}
			],
			structure: [
				{
					name: 'price',
					type: 'text',
					label: '价格'
				},
				{
					name: 'stock',
					type: 'text',
					label: '库存'
				}
			],
			attribute: [
				{
					name: '颜色',
					item: ['黑', '金', '白']
				},
				{
					name: '内存',
					item: ['16G', '32G']
				},
				{
					name: '运营商',
					item: ['电信', '移动', '联通']
				}
			],
			sku: [
				{ sku: '黑;16G;电信', price: 100, stock: 10 },
				{ sku: '黑;16G;移动', price: 101, stock: 11 },
				{ sku: '黑;16G;联通', price: 102, stock: 0 },
				{ sku: '黑;32G;电信', price: 103, stock: 13},
				{ sku: '黑;32G;移动', price: 104, stock: 14},
				{ sku: '黑;32G;联通', price: 105, stock: 0},
				{ sku: '金;16G;电信', price: 106, stock: 16},
				{ sku: '金;16G;移动', price: 107, stock: 17},
				{ sku: '金;16G;联通', price: 108, stock: 18},
				{ sku: '金;32G;电信', price: 109, stock: 0},
				{ sku: '金;32G;移动', price: 110, stock: 20},
				{ sku: '金;32G;联通', price: 111, stock: 21},
				{ sku: '白;16G;电信', price: 112, stock: 0},
				{ sku: '白;16G;移动', price: 113, stock: 23},
				{ sku: '白;16G;联通', price: 114, stock: 24},
				{ sku: '白;32G;电信', price: 115, stock: 0},
				{ sku: '白;32G;移动', price: 116, stock: 26},
				{ sku: '白;32G;联通', price: 117, stock: 27}
			]
		}
	}
}
</script>
```
:::

对于前台来说，只需要用到 attribute 和 sku 数据，当然需要对这两组数组进行加工处理下：

::: demo
```vue
<template>
	<el-row type="flex" class="sku-info">
		<el-col v-for="(attr, index) in process_attribute" :key="index">
			<h3>{{ attr.name }}</h3>
			<el-button-group>
				<el-button v-for="(item, index2) in attr.item" :key="index2" :type="item.actived ? 'primary' : ''" :disabled="item.disabled" @click="skuClick(index, index2)">{{ item.name }}</el-button>
			</el-button-group>
		</el-col>
	</el-row>
	<div style="margin-top: 20px;">
		库存：
		<span>{{ stock }}</span>
	</div>
	<div style="margin-bottom: 20px;">
		价格：
		<span v-if="minprice == maxprice">{{ minprice }}</span>
		<span v-else>{{ minprice }} - {{ maxprice }}</span>
	</div>
	<el-button type="primary" @click="submit">购买</el-button>
	<el-row type="flex" :gutter="20">
		<el-col>
			<el-divider content-position="left">加工处理过的 attribute 数据</el-divider>
			<pre><code>{{ process_attribute }}</code></pre>
		</el-col>
		<el-col>
			<el-divider content-position="left">加工处理过的 sku 数据</el-divider>
			<pre><code>{{ process_sku }}</code></pre>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data() {
		return {
			attribute: [
				{
					name: '颜色',
					item: ['黑', '金', '白']
				},
				{
					name: '内存',
					item: ['16G', '32G']
				},
				{
					name: '运营商',
					item: ['电信', '移动', '联通']
				}
			],
			sku: [
				{ sku: '黑;16G;电信', price: 100, stock: 10 },
				{ sku: '黑;16G;移动', price: 101, stock: 11 },
				{ sku: '黑;16G;联通', price: 102, stock: 0 },
				{ sku: '黑;32G;电信', price: 103, stock: 13},
				{ sku: '黑;32G;移动', price: 104, stock: 14},
				{ sku: '黑;32G;联通', price: 105, stock: 0},
				{ sku: '金;16G;电信', price: 106, stock: 16},
				{ sku: '金;16G;移动', price: 107, stock: 17},
				{ sku: '金;16G;联通', price: 108, stock: 18},
				{ sku: '金;32G;电信', price: 109, stock: 0},
				{ sku: '金;32G;移动', price: 110, stock: 20},
				{ sku: '金;32G;联通', price: 111, stock: 21},
				{ sku: '白;16G;电信', price: 112, stock: 0},
				{ sku: '白;16G;移动', price: 113, stock: 23},
				{ sku: '白;16G;联通', price: 114, stock: 24},
				{ sku: '白;32G;电信', price: 115, stock: 0},
				{ sku: '白;32G;移动', price: 116, stock: 26},
				{ sku: '白;32G;联通', price: 117, stock: 27}
			],
			process_attribute: [],
			process_sku: [],
			// 当前选中 sku 的库存及价格区间
			stock: '',
			minprice: '',
			maxprice: ''
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			// 对 attribute 数据进行加工，并存入 process_attribute 中
			this.attribute.map(attr => {
				let temp = {
					name: attr.name
				}
				temp.item = attr.item.map(item => {
					return {
						name: item,
						actived: false,
						disabled: false
					}
				})
				this.process_attribute.push(temp)
			})
			// 对 sku 数据进行加工，并存入 process_sku 中
			this.sku.map(v => {
				var combArr = this.arrayCombine(v.sku.split(';'))
				for (var j = 0; j < combArr.length; j++) {
					var key = combArr[j].join(';')
					if (this.process_sku[key]) {
						// 库存累加，价格添加进数组
						this.process_sku[key].stock += v.stock
						this.process_sku[key].prices.push(v.price)
					} else {
						this.process_sku[key] = {
							stock: v.stock,
							prices: [v.price]
						}
					}
				}
			})
			// 更新数据视图
			this.process_sku = Object.assign({}, this.process_sku)
			this.skuCheck()
		},
		arrayCombine(targetArr) {
			var resultArr = []
			for (var n = 0; n <= targetArr.length; n++) {
				var flagArrs = this.getFlagArrs(targetArr.length, n)
				while (flagArrs.length) {
					var flagArr = flagArrs.shift()
					var combArr = Array(targetArr.length)
					for (var i = 0; i < targetArr.length; i++) {
						if (flagArr[i]) {
							combArr[i] = targetArr[i]
						}
					}
					resultArr.push(combArr)
				}
			}
			return resultArr
		},
		getFlagArrs(m, n) {
			var flagArrs = [],
				flagArr = [],
				isEnd = false
			for (var i = 0; i < m; i++) {
				flagArr[i] = i < n ? 1 : 0
			}
			flagArrs.push(flagArr.concat())
			// 当n不等于0并且m大于n的时候进入
			if (n && m > n) {
				while (!isEnd) {
					var leftCnt = 0
					for (var i = 0; i < m - 1; i++) {
						if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
							for (var j = 0; j < i; j++) {
								flagArr[j] = j < leftCnt ? 1 : 0
							}
							flagArr[i] = 0
							flagArr[i + 1] = 1
							var aTmp = flagArr.concat()
							flagArrs.push(aTmp)
							if (aTmp.slice(-n).join('').indexOf('0') == -1) {
								isEnd = true
							}
							break
						}
						flagArr[i] == 1 && leftCnt++
					}
				}
			}
			return flagArrs
		},
		skuClick(key1, key2) {
			if (!this.process_attribute[key1].item[key2].disabled) {
				this.process_attribute[key1].item.map((item, index) => {
					item.actived = index == key2 ? !item.actived : false
				})
				this.skuCheck()
				this.getStockPrice()
			}
		},
		skuCheck() {
			let sku = []
			this.process_attribute.map(attr => {
				let name = ''
				attr.item.map(item => {
					if (item.actived) {
						name = item.name
					}
				})
				sku.push(name)
			})
			this.stock = this.process_sku[sku.join(';')].stock
			this.minprice = Math.min.apply(Math, this.process_sku[sku.join(';')].prices)
			this.maxprice = Math.max.apply(Math, this.process_sku[sku.join(';')].prices)
		},
		getStockPrice() {
			this.process_attribute.map(attr => {
				attr.item.map(item => {
					item.disabled = false
				})
			})
			let count = 0
			let i = 0
			this.process_attribute.map((attr, index) => {
				let flag = false
				attr.item.map(item => {
					if (item.actived) {
						flag = true
					}
				})
				if (!flag) {
					count += 1
					i = index
				}
			})
			// 当只有一组规格没选时
			if (count == 1) {
				this.process_attribute[i].item.map(item => {
					let sku = []
					let text = item.name
					this.process_attribute.map((attr, index) => {
						if (index != i) {
							attr.item.map(item2 => {
								if (item2.actived) {
									sku.push(item2.name)
								}
							})
						} else {
							sku.push(text)
						}
					})
					if (this.process_sku[sku.join(';')].stock == 0) {
						item.disabled = true
					}
				})
			}
			// 当所有规格都有选时
			if (count == 0) {
				this.process_attribute.map((attr, index) => {
					let i = index
					this.process_attribute[index].item.map(item => {
						if (!item.actived) {
							let sku = []
							let text = item.name
							this.process_attribute.map((list, index) => {
								if (index != i) {
									list.item.map(item2 => {
										if (item2.actived) {
											sku.push(item2.name)
										}
									})
								} else {
									sku.push(text)
								}
							})
							if (this.process_sku[sku.join(';')].stock == 0) {
								item.disabled = true
							}
						}
					})
				})
			}
		},
		submit() {
			let sku = []
			let isSelectSKU = this.process_attribute.every(attr => {
				let filter = attr.item.filter(v => v.actived)
				if (filter.length != 0) {
					sku.push(filter[0].name)
				}
				return filter.length != 0
			})
			if (isSelectSKU) {
				this.$message.success(`当前SKU为：${sku.join(';')}`)
			} else {
				this.$message.warning('请选择完整商品属性')
			}
		}
	}
}
</script>
```
:::