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

| 名称     | 说明                              | 类型     | 默认值 | 可选值                       |
| :------- | :-------------------------------- | :------- | :----- | :--------------------------- |
| name     | SKU数据里的属性                   | string   |        |                              |
| type     | 表单展示形式，默认为输入框        | string   | input  | input, text, computed, image |
| label    | 表头名称                          | string   |        |                              |
| tip      | 鼠标悬停提示                      | string   |        |                              |
| batch    | 是否开启批量设置                  | boolean  | true   |                              |
| computed | 计算列回调方法，参数为单条SKU数据 | function |        |                              |
| required | 是否必填                          | boolean  | false  |                              |
| validate | 自定义校验回调方法                | function | false  |                              |
| upload   | 图片上传相关配置                  | object   |        |                              |

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
		name: 'profit',
		type: 'computed',
		label: '利润',
		tip: '利润 = 销售价 - 成本价，如果销售价或成本价为空时，利润则为 0',
		computed: data => {
			let profit = 0
			if (data.price && data.originalprice) {
				profit = (parseFloat(data.price) - parseFloat(data.originalprice)).toFixed(2)
			}
			return profit + ' 元'
		}
	},
	{
		name: 'stock',
		type: 'input',
		label: '库存',
		tip: '库存数不能少于10',
		validate: (data, index, callback) => {
			if (parseInt(data[index].stock) < 10) {
				callback(new Error('库存不能小于10'))
			}
			callback()
		}
	},
	{
		name: 'image',
		type: 'image',
		label: '图片',
		upload: {
			// 上传请求头
			headers: {},
			// 上传地址
			action: '',
			// 上传时附带的额外参数
			data: {},
			// 上传的文件字段名
			name: 'image',
			// 上传之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
			beforeUpload: file => {
				const ext = ['jpg', 'png', 'gif', 'bmp']
				const size = 2
				const fileName = file.name.split('.')
				const fileExt = fileName[fileName.length - 1]
				const isTypeOk = ext.indexOf(fileExt) >= 0
				const isSizeOk = file.size / 1024 / 1024 < size
				if (!isTypeOk) {
					this.$message.error(`上传图片只支持 ${ ext.join(' / ') } 格式！`)
				}
				if (!isSizeOk) {
					this.$message.error(`上传图片大小不能超过 ${size}MB！`)
				}
				return isTypeOk && isSizeOk
			},
			// 上传成功时的钩子，参数为上传成功后的返回数据，需要提取图片 url 并返回，用于图片展示
			onSuccess: res => {
				// 这里会返回上传结果，提取出图片地址url
				console.log(res)
				// 模拟返回数据
				return 'http://images.lookbi.com/uploads/apply/166/e2e1b23647d67df2655d5e6bed76670c.jpg'
				// return res.data.path
			}
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
