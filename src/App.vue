<template>
    <div>
        <el-tabs v-model="activeName" tab-position="left">
            <el-tab-pane label="基础功能" name="demo1">
                <SkuForm :source-attribute="demo1.sourceAttribute" :attribute.sync="demo1.attribute" :sku.sync="demo1.sku" />
                <el-button type="primary" @click="log(demo1)">查看数据</el-button>
            </el-tab-pane>
            <el-tab-pane label="自定义表格" name="demo2">
                <SkuForm :source-attribute="demo2.sourceAttribute" :attribute.sync="demo2.attribute" :sku.sync="demo2.sku" :structure="demo2.structure" />
                <el-button type="primary" @click="log(demo2)">查看数据</el-button>
            </el-tab-pane>
            <el-tab-pane label="表格数据复原" name="demo3">
                <SkuForm :source-attribute="demo3.sourceAttribute" :attribute.sync="demo3.attribute" :sku.sync="demo3.sku" :structure="demo3.structure" :disabled="demo3.disabled" />
                <el-button type="primary" @click="log(demo3)">查看数据</el-button>
                <el-button @click="demo3.disabled = !demo3.disabled">只读/编辑模式切换</el-button>
            </el-tab-pane>
            <el-tab-pane label="隐藏批量设置" name="demo4">
                <SkuForm :source-attribute="demo4.sourceAttribute" :attribute.sync="demo4.attribute" :sku.sync="demo4.sku" :structure="demo4.structure" />
                <el-button type="primary" @click="log(demo4)">查看数据</el-button>
            </el-tab-pane>
            <el-tab-pane label="展示列" name="demo5">
                <SkuForm :source-attribute="demo5.sourceAttribute" :attribute.sync="demo5.attribute" :sku.sync="demo5.sku" :structure="demo5.structure" disabled />
                <el-button type="primary" @click="log(demo5)">查看数据</el-button>
            </el-tab-pane>
            <el-tab-pane label="计算列" name="demo6">
                <SkuForm :source-attribute="demo6.sourceAttribute" :attribute.sync="demo6.attribute" :sku.sync="demo6.sku" :structure="demo6.structure" />
                <el-button type="primary" @click="log(demo6)">查看数据</el-button>
            </el-tab-pane>
            <el-tab-pane label="必填验证" name="demo7">
                <SkuForm ref="demo7" :source-attribute="demo7.sourceAttribute" :attribute.sync="demo7.attribute" :sku.sync="demo7.sku" :structure="demo7.structure" />
                <el-button type="primary" @click="log(demo7)">查看数据</el-button>
                <el-button type="primary" @click="check('demo7')">校验</el-button>
            </el-tab-pane>
            <el-tab-pane label="自定义验证" name="demo8">
                <SkuForm ref="demo8" :source-attribute="demo8.sourceAttribute" :attribute.sync="demo8.attribute" :sku.sync="demo8.sku" :structure="demo8.structure" />
                <el-button type="primary" @click="log(demo8)">查看数据</el-button>
                <el-button type="primary" @click="check('demo8')">校验</el-button>
            </el-tab-pane>
            <el-tab-pane label="异步验证" name="demo9">
                <SkuForm ref="demo9" :source-attribute="demo9.sourceAttribute" :attribute.sync="demo9.attribute" :sku.sync="demo9.sku" :structure="demo9.structure" />
                <el-button type="primary" @click="log(demo9)">查看数据</el-button>
                <el-button type="primary" @click="check('demo9')">校验</el-button>
            </el-tab-pane>
            <el-tab-pane label="异步加载" name="demo10">
                <SkuForm ref="demo10" :source-attribute="demo10.sourceAttribute" :attribute.sync="demo10.attribute" :sku.sync="demo10.sku" :structure="demo10.structure" />
                <el-button type="primary" :loading="demo10.loading" @click="load(1)">加载数据1</el-button>
                <el-button type="primary" :loading="demo10.loading" @click="load(2)">加载数据2</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'demo1',
            demo1: {
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
                attribute: [],
                sku: []
            },
            demo2: {
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
                attribute: [],
                sku: [],
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
                    }
                ]
            },
            demo3: {
                disabled: false,
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
                        item: ['黑', '金']
                    },
                    {
                        name: '内存',
                        item: ['16G']
                    }
                ],
                sku: [
                    {
                        sku: '黑;16G',
                        originalprice: 100,
                        price: 80,
                        stock: 100
                    },
                    {
                        sku: '金;16G',
                        originalprice: 100,
                        price: 85,
                        stock: 50
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
                    }
                ]
            },
            demo4: {
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
                        originalprice: 100,
                        price: 80,
                        stock: 100
                    },
                    {
                        sku: '金;16G',
                        originalprice: 100,
                        price: 85,
                        stock: 50
                    },
                    {
                        sku: '白;16G',
                        originalprice: 100,
                        price: 85,
                        stock: 50
                    }
                ],
                structure: [
                    {
                        name: 'originalprice',
                        type: 'input',
                        label: '原价',
                        batch: false
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
                    }
                ]
            },
            demo5: {
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
                        item: ['黑', '金']
                    },
                    {
                        name: '内存',
                        item: ['16G']
                    }
                ],
                sku: [
                    {
                        sku: '黑;16G',
                        originalprice: 100,
                        price: 80,
                        stock: 100
                    },
                    {
                        sku: '金;16G',
                        originalprice: 100,
                        price: 85,
                        stock: 50
                    }
                ],
                structure: [
                    {
                        name: 'originalprice',
                        type: 'text',
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
                    }
                ]
            },
            demo6: {
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
                attribute: [],
                sku: [
                    {
                        sku: '',
                        originalprice: 100,
                        price: 120
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
                        name: 'profit',
                        type: 'computed',
                        label: '利润',
                        tip: '利润 = 销售价 - 成本价，如果销售价或成本价为空时，利润则为 0',
                        // data: 单条 sku 数据
                        computed: data => {
                            let profit = 0
                            if (data.price && data.originalprice) {
                                profit = (parseFloat(data.price) - parseFloat(data.originalprice)).toFixed(2)
                            }
                            return profit + ' 元'
                        }
                    }
                ]
            },
            demo7: {
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
                attribute: [],
                sku: [],
                structure: [
                    {
                        name: 'originalprice',
                        type: 'input',
                        label: '原价',
                        required: true
                    },
                    {
                        name: 'price',
                        type: 'input',
                        label: '现价',
                        required: true
                    },
                    {
                        name: 'stock',
                        type: 'input',
                        label: '库存',
                        required: true
                    }
                ]
            },
            demo8: {
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
                attribute: [],
                sku: [],
                structure: [
                    {
                        name: 'originalprice',
                        type: 'input',
                        label: '成本价'
                    },
                    {
                        name: 'price',
                        type: 'input',
                        label: '销售价',
                        tip: '销售价不能低于成本价',
                        // data: 完整 sku 数据，index: 当前 sku 在 data 中的下标，callback: 验证结果回调函数
                        validate: (data, index, callback) => {
                            if (parseFloat(data[index].price) < parseFloat(data[index].originalprice)) {
                                callback(new Error('销售价不能低于成本价'))
                            }
                            callback()
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
                    }
                ]
            },
            demo9: {
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
                attribute: [],
                sku: [],
                structure: [
                    {
                        name: 'code',
                        type: 'input',
                        label: '商品唯一编码',
                        tip: '模拟异步操作，如果输入123则会提示编码已存在',
                        required: true,
                        validate: (data, index, callback) => {
                            setTimeout(() => {
                                if (data[index].code == '123') {
                                    callback(new Error('商品唯一编码已存在'))
                                }
                                callback()
                            }, 2000)
                        }
                    },
                    {
                        name: 'stock',
                        type: 'input',
                        label: '库存'
                    }
                ]
            },
            demo10: {
                loading: false,
                sourceAttribute: [],
                attribute: [],
                sku: [],
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
                ]
            }
        }
    },
    methods: {
        log(data) {
            this.$message('请打开开发者工具查看输出数据')
            console.log(data)
        },
        check(ref) {
            this.$refs[ref].validate(valid => {
                if (valid) {
                    this.$message.success('验证通过')
                } else {
                    this.$message.warning('验证失败')
                }
            })
        },
        load(type) {
            this.demo10.loading = true
            // 模拟异步加载
            switch (type) {
                case 1:
                    setTimeout(() => {
                        this.demo10.sourceAttribute = []
                        setTimeout(() => {
                            this.demo10.attribute = []
                            setTimeout(() => {
                                this.demo10.sku = [
                                    {
                                        sku: '',
                                        originalprice: 100,
                                        price: 85,
                                        stock: 50
                                    }
                                ]
                                // 切记，必须在 sourceAttribute、attribute、sku 三组数据都加载后再执行 init() 方法
                                this.$refs['demo10'].init()
                                this.demo10.loading = false
                            }, 300)
                        }, 300)
                    }, 300)
                    break
                case 2:
                    setTimeout(() => {
                        this.demo10.sourceAttribute = [
                            {
                                name: '颜色',
                                item: ['黑', '金', '白']
                            },
                            {
                                name: '内存',
                                item: ['16G', '32G']
                            }
                        ]
                        setTimeout(() => {
                            this.demo10.attribute = [
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
                                this.demo10.sku = [
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
                                // 切记，必须在 sourceAttribute、attribute、sku 三组数据都加载后再执行 init() 方法
                                this.$refs['demo10'].init()
                                this.demo10.loading = false
                            }, 300)
                        }, 300)
                    }, 300)
                    break
            }
        }
    }
}
</script>