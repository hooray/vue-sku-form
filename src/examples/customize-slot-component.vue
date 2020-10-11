<template>
    <div>
        <SkuForm
            ref="skuForm"
            :source-attribute="sourceAttribute"
            :structure="structure"
            :attribute.sync="attribute"
            :sku.sync="sku"
        >
            <template #score="slotProps">
                <div>
                    <el-rate v-model="slotProps.row.score" />
                </div>
            </template>
            <template #image="slotProps">
                <div class="image-upload-container">
                    <el-image v-if="slotProps.row.image" :src="slotProps.row.image" :preview-src-list="[slotProps.row.image]" fit="cover" title="点击预览" />
                    <el-upload :show-file-list="false" action="http://scrm.1daas.com/api/upload/upload" :data="{token: 'TKD917339526087186'}" name="image" :before-upload="beforeUpload" :on-success="res => imageUpload(res, slotProps)" class="images-upload">
                        <el-button size="small" icon="el-icon-upload2">{{ slotProps.row.image ? '重新上传' : '上传图片' }}</el-button>
                    </el-upload>
                    <el-button v-if="slotProps.row.image" size="small" icon="el-icon-delete" @click="imageRemove(slotProps)" />
                </div>
            </template>
        </SkuForm>
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
                    name: 'score',
                    type: 'slot',
                    defaultValue: 0,
                    label: '评分'
                },
                {
                    name: 'image',
                    type: 'slot',
                    label: '图片',
                    required: true
                }
            ],
            attribute: [],
            sku: []
        }
    },
    methods: {
        beforeUpload(file) {
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
        // 图片上传
        imageUpload(res, data) {
            // 这里会返回上传结果，提取出图片地址url
            console.log(res)
            // 模拟返回数据
            let imagePath = 'http://images.lookbi.com/uploads/apply/166/e2e1b23647d67df2655d5e6bed76670c.jpg'
            data.row.image = imagePath
            this.$message.success('图片上传成功')
            this.$refs.skuForm.validateFieldByRows(data.$index, 'image', () => {})
        },
        imageRemove(data) {
            data.row.image = ''
        },
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

<style lang="scss" scoped>
/deep/ .el-upload-dragger {
    width: initial;
    height: initial;
    border: 0;
    border-radius: 0;
    background-color: initial;
    overflow: auto;
}
.image-upload-container {
    .el-image {
        vertical-align: middle;
        margin: 0 5px;
        width: 30px;
        height: 30px;
    }
    .images-upload,
    > .el-button {
        display: inline-block;
        margin: 0 5px;
        vertical-align: middle;
    }
}
</style>
