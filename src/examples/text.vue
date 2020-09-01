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
                    type: 'text',
                    label: '价格'
                },
                {
                    name: 'stock',
                    type: 'input',
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