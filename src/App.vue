<template>
    <div>
        <router-link v-for="(item, index) in examples" :key="index" :to="item.path">{{ item.meta.title }}</router-link>
        <div style="padding: 10px;">
            <router-view />
        </div>
    </div>
</template>

<script>
import examples from './router/example'

export default {
    data() {
        return {
            examples: examples
        }
    }
}
</script>

<style scoped>
a {
    padding-right: 10px;
}
.router-link-active {
    font-weight: bold;
}
</style>
