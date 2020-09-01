<template>
    <div>
        <SkuForm
            :source-attribute="sourceAttribute"
            :attribute.sync="attribute"
            :sku.sync="sku"
            separator="__"
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
            attribute: [
                {
                    name: '颜色',
                    item: ['黑']
                },
                {
                    name: '内存',
                    item: ['16G']
                }
            ],
            sku: [
                {
                    sku: '黑__16G',
                    price: 80,
                    stock: 100
                }
            ]
        }
    }
}
</script>