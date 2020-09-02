<template>
    <div>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="tabSwitch">
            <el-tab-pane label="基础功能" name="ExampleBasic">
                <ExampleBasic />
            </el-tab-pane>
            <el-tab-pane label="自定义SKU(连接符)" name="ExampleSeparator">
                <ExampleSeparator />
            </el-tab-pane>
            <el-tab-pane label="禁用SKU可选属性配置" name="ExampleDisabled">
                <ExampleDisabled />
            </el-tab-pane>
            <el-tab-pane label="自定义表格" name="ExampleCustomize">
                <ExampleCustomize />
            </el-tab-pane>
            <el-tab-pane label="数据还原" name="ExampleRecovery">
                <ExampleRecovery />
            </el-tab-pane>
            <el-tab-pane label="批量设置" name="ExampleBatch">
                <ExampleBatch />
            </el-tab-pane>
            <el-tab-pane label="展示列" name="ExampleText">
                <ExampleText />
            </el-tab-pane>
            <el-tab-pane label="计算列" name="ExampleComputed">
                <ExampleComputed />
            </el-tab-pane>
            <el-tab-pane label="必填验证" name="ExampleRequired">
                <ExampleRequired />
            </el-tab-pane>
            <el-tab-pane label="自定义验证" name="ExampleValidate">
                <ExampleValidate />
            </el-tab-pane>
            <el-tab-pane label="异步验证" name="ExampleAsyncValidate">
                <ExampleAsyncValidate />
            </el-tab-pane>
            <el-tab-pane label="指定列验证" name="ExampleValidateCol">
                <ExampleValidateCol />
            </el-tab-pane>
            <el-tab-pane label="异步加载" name="ExampleAsyncRecovery">
                <ExampleAsyncRecovery />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ExampleBasic from './examples/basic'
import ExampleSeparator from './examples/separator'
import ExampleDisabled from './examples/disabled'
import ExampleCustomize from './examples/customize'
import ExampleRecovery from './examples/recovery'
import ExampleBatch from './examples/batch'
import ExampleText from './examples/text'
import ExampleComputed from './examples/computed'
import ExampleRequired from './examples/required'
import ExampleValidate from './examples/validate'
import ExampleAsyncValidate from './examples/async-validate'
import ExampleValidateCol from './examples/validate-col'
import ExampleAsyncRecovery from './examples/async-recovery'

export default {
    components: {
        ExampleBasic,
        ExampleSeparator,
        ExampleDisabled,
        ExampleCustomize,
        ExampleRecovery,
        ExampleBatch,
        ExampleText,
        ExampleComputed,
        ExampleRequired,
        ExampleValidate,
        ExampleAsyncValidate,
        ExampleValidateCol,
        ExampleAsyncRecovery
    },
    data() {
        return {
            activeName: 'ExampleBasic'
        }
    },
    mounted() {
        this.activeName = location.hash.slice(1)
    },
    methods: {
        tabSwitch(tab) {
            location.href = `#${tab.name}`
        }
    }
}
</script>