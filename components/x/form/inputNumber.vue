<template>
    <a-input-number 
        :placeholder="$t('请输入{content}',{content:label})" 
        v-model:value="model[k]"
        v-bind="bind">
    </a-input-number>
</template>

<script setup lang="ts">
let props = defineProps<{
    model:any,
    k:string|Array<string>
    bind:any,
    label:string
}>()

</script>

<style scoped></style>