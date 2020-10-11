<template>
    <div>
        <SkuForm
            :source-attribute="sourceAttribute"
            :structure="structure"
            :attribute.sync="attribute"
            :sku.sync="sku"
        >
            <template #price="slotProps">
                {{ slotProps.row.price }}
            </template>
            <template #totalPrice="slotProps">
                {{ total(slotProps.row) }}
            </template>
        </SkuForm>
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
                    type: 'slot',
                    label: '现价'
                },
                {
                    name: 'stock',
                    type: 'input',
                    label: '库存'
                },
                {
                    name: 'totalPrice',
                    type: 'slot',
                    // 如果该字段无需记录到 sku 数据里，则设置为 false
                    skuProperty: false,
                    label: '总价',
                    tip: '总价 = 价格 * 库存，如果价格或库存为空时，则不计算'
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
    },
    methods: {
        total(data) {
            let totalPrice = ''
            if (data.price && data.stock) {
                totalPrice = (parseFloat(data.price) * parseFloat(data.stock)).toFixed(2)
                totalPrice += ' 元'
            }
            return totalPrice
        }
    }
}
</script>
