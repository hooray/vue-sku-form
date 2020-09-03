<template>
    <div>
        <SkuForm
            ref="skuForm"
            :source-attribute="sourceAttribute"
            :structure="structure"
            :attribute.sync="attribute"
            :sku.sync="sku"
            async
        />
        <el-button type="primary" :loading="loading" style="margin-top: 10px;" @click="load">模拟数据加载</el-button>
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
            loading: false,
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
                    label: '库存'
                }
            ],
            attribute: [],
            sku: []
        }
    },
    methods: {
        load() {
            this.loading = true
            setTimeout(() => {
                this.attribute = [
                    {
                        name: '颜色',
                        item: ['黑', '金']
                    },
                    {
                        name: '内存',
                        item: ['64G']
                    }
                ]
                setTimeout(() => {
                    this.sku = [
                        {
                            sku: '黑;64G',
                            originalprice: 100,
                            price: 80,
                            stock: 100
                        },
                        {
                            sku: '金;64G',
                            originalprice: 100,
                            price: 85,
                            stock: 50
                        }
                    ]
                    // 切记，必须在 attribute、sku 数据都加载后再执行 init() 方法
                    this.$refs.skuForm.init()
                    this.loading = false
                }, 300)
            }, 300)
        }
    }
}
</script>