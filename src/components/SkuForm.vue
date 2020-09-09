<template>
    <div class="sku-container">
        <div v-if="!disabled" class="sku-check">
            <div v-if="theme == 1" class="theme-1">
                <el-card v-for="(item, index) in myAttribute" :key="index" class="item" shadow="never">
                    <div slot="header">{{ item.name }}</div>
                    <el-checkbox v-for="(item2, index2) in item.item" :key="index2" v-model="item2.checked" :label="item2.name" size="small" />
                    <el-input v-model="item.addAttribute" size="small" placeholder="新增一个规格" class="add-attr" @keyup.enter.native="onAddAttribute(index)">
                        <el-button slot="append" size="small" icon="el-icon-plus" @click="onAddAttribute(index)">添加</el-button>
                    </el-input>
                </el-card>
            </div>
            <el-table v-else :data="myAttribute" :show-header="false" class="theme-2">
                <el-table-column prop="name" width="120" :resizable="false" />
                <el-table-column>
                    <template slot-scope="scope">
                        <el-checkbox v-for="(item2, index2) in scope.row.item" :key="index2" v-model="item2.checked" :label="item2.name" size="small" />
                    </template>
                </el-table-column>
                <el-table-column width="250">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.addAttribute" size="small" placeholder="新增一个规格" class="add-attr" @keyup.enter.native="onAddAttribute(scope.$index)">
                            <el-button slot="append" size="small" icon="el-icon-plus" @click="onAddAttribute(scope.$index)">添加</el-button>
                        </el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="sku-list">
            <el-form ref="form" :model="form" status-icon inline-message>
                <el-table :data="form.skuData" stripe border highlight-current-row>
                    <!-- 考虑到异步加载的情况，如果 attribute 数据先加载完成，则表头会立马展示，效果不理想，故使用emitAttribute 数据，该数据为计算属性，通过 myAttribute 生成，结构与 attribute 一致 -->
                    <el-table-column v-if="emitAttribute.length > 0" type="index" width="50" align="center" :resizable="false" />
                    <el-table-column v-for="(attr, index) in emitAttribute" :key="`attribute-${index}`" :label="attr.name" :prop="attr.name" width="120" align="center" :resizable="false" sortable :filters="filterItem(attr.item)" :filter-method="filterHandler" filter-placement="bottom" />
                    <el-table-column v-for="(item, index) in structure" :key="`structure-${index}`" :label="item.label" :prop="item.name" align="center" :resizable="false" min-width="120px">
                        <!-- 自定义表头 -->
                        <template slot="header">
                            <span :class="{'required_title': item.required}">
                                {{ item.label }}
                            </span>
                            <el-tooltip v-if="item.tip" effect="dark" :content="item.tip" placement="top">
                                <i class="el-icon-info" />
                            </el-tooltip>
                        </template>
                        <!-- 自定义表格内部展示 -->
                        <template slot-scope="scope">
                            <!-- 增加是 key 是为了保证异步验证不会出现 skuData 数据变化后无法验证的 bug -->
                            <el-form-item v-if="item.type == 'input'" :key="`structure-input-${index}-${scope.row.sku}`" :prop="'skuData.' + scope.$index + '.' + item.name" :rules="rules[item.name]">
                                <el-input v-model="scope.row[item.name]" :placeholder="`请输入${item.label}`" size="small" />
                            </el-form-item>
                            <span v-else-if="item.type == 'text'">{{ scope.row[item.name] }}</span>
                            <span v-else-if="item.type == 'computed'">{{ scope.row[item.name] }}</span>
                        </template>
                    </el-table-column>
                    <!-- 批量设置，当 sku 数超过 2 个时出现 -->
                    <template v-if="isBatch && form.skuData.length > 2" slot="append">
                        <el-table :data="[{}]" :show-header="false">
                            <el-table-column :width="attribute.length * 120 + 50" align="center" :resizable="false">批量设置</el-table-column>
                            <el-table-column v-for="(item, index) in structure" :key="`batch-structure-${index}`" align="center" :resizable="false" min-width="120px">
                                <el-input v-if="item.type == 'input' && item.batch != false" v-model="batch[item.name]" :placeholder="`填写一个${item.label}`" size="small" @keyup.enter.native="onBatchSet(item.name)" />
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    props: {
        /**
         * 原始规格数据
         * sourceAttribute: [
         *   { name: '颜色', item: ['黑', '金', '白'] },
         *   { name: '内存', item: ['16G', '32G'] },
         *   { name: '运营商', item: ['电信', '移动', '联通'] }
         * ]
         */
        sourceAttribute: {
            type: Array,
            default: () => []
        },
        /**
         * 已使用的规格数据，用于复原数据，支持.sync修饰符
         * attribute: [
         *   { name: '颜色', item: ['黑'] },
         *   { name: '运营商', item: ['电信', '移动', '联通'] }
         * ]
         */
        attribute: {
            type: Array,
            default: () => []
        },
        /**
         * 用于复原sku数据，支持.sync修饰符
         * sku: [
         *   { sku: '黑;电信', price: 1, stock: 1 },
         *   { sku: '黑;移动', price: 2, stock: 2 },
         *   { sku: '黑;联通', price: 3, stock: 3 }
         * ]
         */
        sku: {
            type: Array,
            default: () => []
        },
        /**
         * 表格结构，注意name字段，用于输出sku数据
         */
        structure: {
            type: Array,
            default: () => [
                { name: 'price', type: 'input', label: '价格' },
                { name: 'stock', type: 'input', label: '库存' }
            ]
        },
        // sku 字段分隔符
        separator: {
            type: String,
            default: ';'
        },
        // 无规格的 sku
        emptySku: {
            type: String,
            default: ''
        },
        // 是否显示 sku 选择栏
        disabled: {
            type: Boolean,
            default: false
        },
        // 主题风格
        theme: {
            type: Number,
            default: 1
        },
        // 是否开启异步加载
        async: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isInit: false,
            myAttribute: [],
            form: {
                skuData: []
            },
            batch: {}
        }
    },
    computed: {
        rules() {
            // 重新生成验证规则
            let rules = {}
            this.structure.forEach(v => {
                if (v.type == 'input') {
                    rules[v.name] = []
                    if (v.required) {
                        rules[v.name].push({ required: true, message: `${v.label}不能为空`, trigger: 'blur' })
                    }
                    if (v.validate) {
                        rules[v.name].push({ validator: this.customizeValidate, trigger: 'blur' })
                    }
                }
            })
            return rules
        },
        isBatch() {
            return this.structure.some(item => {
                return item.type == 'input' && item.batch != false
            })
        },
        // 将 myAttribute 数据还原会 attribute 数据的结构，用于更新 attribute
        emitAttribute() {
            let attribute = []
            this.myAttribute.forEach(v1 => {
                const obj = {
                    name: v1.name,
                    item: []
                }
                v1.item.forEach(v2 => {
                    if (v2.checked) {
                        obj.item.push(v2.name)
                    }
                })
                if (obj.item.length !== 0) {
                    attribute.push(obj)
                }
            })
            return attribute
        }
    },
    watch: {
        myAttribute: {
            handler() {
                if (!this.isInit) {
                    // 更新父组件
                    this.$emit('update:attribute', this.emitAttribute)
                }
                // 解决通过 $emit 更新后无法拿到 attribute 最新数据的问题
                this.$nextTick(() => {
                    if (this.attribute.length !== 0) {
                        this.combinationAttribute()
                    } else {
                        this.form.skuData = []
                        const obj = {
                            sku: this.emptySku
                        }
                        this.structure.forEach(v => {
                            obj[v.name] = ''
                        })
                        this.form.skuData.push(obj)
                    }
                    this.clearValidate()
                })
            },
            deep: true
        },
        'form.skuData': {
            handler(newValue, oldValue) {
                if (!this.isInit || (newValue.length == 1 && newValue[0].sku == this.emptySku)) {
                    // 如果有老数据，或者 sku 数据为空，则更新父级 sku 数据
                    if (oldValue.length || !this.sku.length) {
                        // 更新父组件
                        const arr = []
                        newValue.forEach(v1 => {
                            const obj = {
                                sku: v1.sku
                            }
                            this.structure.forEach(v2 => {
                                if (v2.type == 'computed') {
                                    v1[v2.name] = v2.computed(v1)
                                } else {
                                    obj[v2.name] = v1[v2.name] || ''
                                }
                            })
                            arr.push(obj)
                        })
                        this.$emit('update:sku', arr)
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        !this.async && this.init()
    },
    methods: {
        filterItem(item) {
            let filters = []
            item.map(v => {
                filters.push({
                    text: v,
                    value: v
                })
            })
            return filters
        },
        filterHandler(value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        init() {
            this.$nextTick(() => {
                this.isInit = true
                // 初始化 myAttribute
                let myAttribute = []
                // 根据 sourceAttribute 复原 myAttribute 的结构
                this.sourceAttribute.forEach(v => {
                    const temp = {
                        name: v.name,
                        addAttribute: '',
                        item: []
                    }
                    v.item.forEach(itemName => {
                        temp.item.push({
                            name: itemName,
                            checked: false
                        })
                    })
                    myAttribute.push(temp)
                })
                // 根据 attribute 更新 myAttribute
                this.attribute.forEach(attrVal => {
                    myAttribute.forEach(myAttrVal => {
                        if (attrVal.name === myAttrVal.name) {
                            attrVal.item.forEach(attrName => {
                                if (
                                    !myAttrVal.item.some(myAttrItem => {
                                        if (attrName === myAttrItem.name) {
                                            myAttrItem.checked = true
                                        }
                                        return attrName === myAttrItem.name
                                    })
                                ) {
                                    myAttrVal.item.push({
                                        name: attrName,
                                        checked: true
                                    })
                                }
                            })
                        }
                    })
                })
                this.myAttribute = myAttribute
                // 通过 sku 更新 skuData，但因为 skuData 是实时监听 myAttribute 变化并自动生成，而 watch 是在 methods 后执行，所以增加 setTimeout 方法，确保 skuData 生成后在执行下面的代码
                setTimeout(() => {
                    this.sku.forEach(skuItem => {
                        this.form.skuData.forEach(skuDataItem => {
                            if (skuItem.sku === skuDataItem.sku) {
                                this.structure.forEach(structureItem => {
                                    if (structureItem.type == 'computed') {
                                        skuDataItem[structureItem.name] = structureItem.computed(skuDataItem)
                                    } else {
                                        skuDataItem[structureItem.name] = skuItem[structureItem.name]
                                    }
                                })
                            }
                        })
                    })
                    this.isInit = false
                }, 0)
            })
        },
        // 根据 attribute 进行排列组合，生成 skuData 数据
        combinationAttribute(index = 0, dataTemp = []) {
            if (index === 0) {
                for (let i = 0; i < this.attribute[0].item.length; i++) {
                    const obj = {
                        sku: this.attribute[0].item[i],
                        [this.attribute[0].name]: this.attribute[0].item[i]
                    }
                    this.structure.forEach(v => {
                        obj[v.name] = ''
                    })
                    dataTemp.push(obj)
                }
            } else {
                const temp = []
                for (let i = 0; i < dataTemp.length; i++) {
                    for (let j = 0; j < this.attribute[index].item.length; j++) {
                        temp.push(JSON.parse(JSON.stringify(dataTemp[i])))
                        temp[temp.length - 1][this.attribute[index].name] = this.attribute[index].item[j]
                        temp[temp.length - 1]['sku'] = [temp[temp.length - 1]['sku'], this.attribute[index].item[j]].join(this.separator)
                    }
                }
                dataTemp = temp
            }
            if (index !== this.attribute.length - 1) {
                this.combinationAttribute(index + 1, dataTemp)
            } else {
                if (!this.isInit || this.async) {
                    // 将原有的 sku 数据和新的 sku 数据比较，相同的 sku 则把原有的 sku 数据覆盖到新的 sku 数据里
                    for (let i = 0; i < this.form.skuData.length; i++) {
                        for (let j = 0; j < dataTemp.length; j++) {
                            if (this.form.skuData[i].sku === dataTemp[j].sku) {
                                dataTemp[j] = this.form.skuData[i]
                            }
                        }
                    }
                }
                this.form.skuData = dataTemp
            }
        },
        // 新增一个规格
        onAddAttribute(index) {
            this.myAttribute[index].addAttribute = this.myAttribute[index].addAttribute.trim()
            if (this.myAttribute[index].addAttribute !== '') {
                if (!this.myAttribute[index].addAttribute.includes(this.separator)) {
                    const flag = this.myAttribute[index].item.some(item => {
                        return item.name === this.myAttribute[index].addAttribute
                    })
                    if (!flag) {
                        this.myAttribute[index].item.push({
                            name: this.myAttribute[index].addAttribute,
                            checked: true
                        })
                        this.myAttribute[index].addAttribute = ''
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请勿添加相同规格'
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: `规格里不允许出现「 ${this.separator} 」字符，请检查后重新添加`
                    })
                }
            }
        },
        onBatchSet(type) {
            if (this.batch[type] != '') {
                this.form.skuData.forEach(v => {
                    v[type] = this.batch[type]
                })
                this.batch[type] = ''
                // 批量设置完成后，触发一次当前列的验证
                this.validateField([type], () => {})
            }
        },
        // 自定义输入框验证，通过调用 structure 里的 validate 方法实现，重点是 callback 要带过去
        customizeValidate(rule, value, callback) {
            let [model, index, name] = rule.field.split('.')
            this.structure.forEach(v => {
                if (v.name == name) {
                    v.validate(this.form[model], index, callback)
                }
            })
        },
        // sku 表单验证
        validate(callback) {
            this.$refs['form'].validate(valid => {
                callback(valid)
            })
        },
        validateField(props, callback) {
            let newProps = []
            this.form.skuData.forEach((v, i) => {
                props.forEach(v => {
                    newProps.push(`skuData.${i}.${v}`)
                })
            })
            this.$refs['form'].validateField(newProps, valid => {
                callback(valid)
            })
        },
        clearValidate() {
            this.$refs['form'].clearValidate()
        }
    }
}
</script>

<style lang="scss" scoped>
.sku-container {
    /deep/ .el-card {
        margin: 10px 0;
        .el-card__header {
            line-height: initial;
            padding: 10px 20px;
        }
        .el-card__body {
            padding: 10px 20px 20px;
        }
    }
    .sku-check {
        .theme-1 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 10px;
            .item {
                width: 32%;
                &:last-child:nth-child(3n - 1) {
                    margin-right: calc(100% - 32% * 2 - 4% / 2) !important;
                }
                .add-attr {
                    width: 100%;
                    margin-top: 10px;
                }
            }
        }
        .theme-2 {
            border: 1px solid #ebeef5;
            border-bottom: 0;
            margin-bottom: 20px;
        }
    }
    .sku-name {
        text-align: right;
    }
    .batch-set {
        width: 100%;
        margin-top: 5px;
    }
    .sku-list {
        line-height: initial;
        /deep/ .el-input__inner {
            text-align: center;
        }
        /deep/ .el-table__append-wrapper {
            overflow: initial;
            .el-table {
                overflow: initial;
                .el-table__body-wrapper {
                    overflow: initial;
                }
            }
        }
        /deep/ .el-form-item {
            margin-bottom: 0;
            .el-form-item__content {
                line-height: initial;
                .el-form-item__error {
                    margin-left: 0;
                }
            }
        }
        .required_title::before {
            content: '*';
            color: #f56c6c;
        }
    }
}
</style>
