<template>
    <div>
        <SkuForm
            ref="skuForm"
            :source-attribute="sourceAttribute"
            :structure="structure"
            :attribute.sync="attribute"
            :sku.sync="sku"
        />
        <el-button type="primary" style="margin-top: 10px;" @click="submit">提交</el-button>
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
                    name: 'originalprice',
                    type: 'input',
                    label: '原价'
                },
                {
                    name: 'price',
                    type: 'input',
                    label: '现价'
                },
                {
                    name: 'stock',
                    type: 'input',
                    label: '库存'
                },
                {
                    name: 'image',
                    type: 'image',
                    label: '图片',
                    required: true,
                    upload: {
                        headers: {},
                        action: 'http://scrm.1daas.com/api/upload/upload',
                        data: {
                            token: 'TKD917339526087186'
                        },
                        name: 'image',
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
                        onSuccess: res => {
                            // 这里会返回上传结果，提取出图片地址url
                            console.log(res)
                            // 模拟返回数据
                            return 'http://images.lookbi.com/uploads/apply/166/e2e1b23647d67df2655d5e6bed76670c.jpg'
                            // return res.data.path
                        }
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
