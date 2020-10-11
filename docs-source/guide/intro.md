---
lang: zh-CN
---

# 组件说明

## Props

| 参数                                  | 说明                             | 类型    | 默认值                                                                                             |
| :------------------------------------ | :------------------------------- | :------ | :------------------------------------------------------------------------------------------------- |
| [source-attribute](#source-attribute) | SKU可选属性                      | array   | []                                                                                                 |
| [structure](#structure)               | 表单结构                         | array   | [{ name: 'price', type: 'input', label: '价格' }, { name: 'stock', type: 'input', label: '库存' }] |
| [attribute](#attribute)               | SKU已选属性，支持 `.sync` 修饰符 | array   | []                                                                                                 |
| sku                                   | SKU数据，支持 `.sync` 修饰符     | array   | []                                                                                                 |
| separator                             | SKU字段分隔符                    | string  | ;                                                                                                  |
| emptySku                              | 无属性SKU名称                    | string  |                                                                                                    |
| disabled                              | 是否显示SKU选择栏                | boolean | false                                                                                              |
| theme                                 | SKU选择栏主题风格，可选1或2      | int     | 1                                                                                                  |
| async                                 | 是否开启异步加载                 | boolean | false                                                                                              |

### source-attribute

| 名称 | 说明       | 类型   | 可选值 |
| :--- | :--------- | :----- | :----- |
| name | 属性名称   | string |        |
| item | 属性可选项 | array  |        |


```js
// 例子
[
	{ name: '颜色', item: ['黑', '金', '白'] },
	{ name: '内存', item: ['16G', '32G'] },
	{ name: '运营商', item: ['电信', '移动', '联通'] }
]
```

### structure

| 名称         | 说明                                                            | 类型     | 默认值 | 可选值      |
| :----------- | :-------------------------------------------------------------- | :------- | :----- | :---------- |
| name         | SKU数据里的属性                                                 | string   |        |             |
| type         | 表单展示形式，默认为输入框，当设置为 slot 时，为自定义插槽      | string   | input  | input, slot |
| skuProperty  | 当 type 设置为 slot 时，可选择是否插槽数据是否记录到 sku 数据里 | boolean  | true   |             |
| defaultValue | 默认值                                                          | any      |        |             |
| label        | 表头名称                                                        | string   |        |             |
| tip          | 鼠标悬停提示                                                    | string   |        |             |
| batch        | 是否开启批量设置                                                | boolean  | true   |             |
| required     | 是否必填                                                        | boolean  | false  |             |
| validate     | 自定义校验回调方法                                              | function | false  |             |

```js
// 例子
[
	{
		name: 'code',
		type: 'input',
		label: '商品唯一编码',
		required: true,
		batch: false
	},
	{
		name: 'originalprice',
		type: 'input',
		label: '成本价'
	},
	{
		name: 'price',
		type: 'input',
		label: '销售价'
	},
	{
		name: 'stock',
		type: 'input',
		defaultValue: 10,
		label: '库存',
		tip: '库存数不能少于10',
		validate: (data, index, callback) => {
			if (parseInt(data[index].stock) < 10) {
				callback(new Error('库存不能小于10'))
			}
			callback()
		}
	}
]
```

### attribute

| 名称 | 说明       | 类型   | 可选值 |
| :--- | :--------- | :----- | :----- |
| name | 属性名称   | string |        |
| item | 属性已选项 | array  |        |


```js
// 例子
[
	{ name: '颜色', item: ['黑', '红'] },
	{ name: '运营商', item: ['电信'] }
]
// 需要注意 attribute 的属性名称需要 source-attribute 里存在，但 attribute 的属性已选项则没有限制
// 例如下面的例子则是错误示范
[
	{ name: '尺码', item: ['L', 'M'] },
	{ name: '运营商', item: ['电信'] }
]
```

## Methods

| 方法名        | 说明                                                                                      |
| :------------ | :---------------------------------------------------------------------------------------- |
| init          | 初始化方法，如果数据是异步载入，需要在获取到数据后手动进行SKU表单的初始化                 |
| validate      | SKU表单验证方法，参数为一个回调函数                                                       |
| validateField | SKU表单验证指定列方法，第一个参数为列名（structure 里的属性名），第二个参数为一个回调函数 |
| clearValidate | 清除SKU表单验证结果                                                                       |
