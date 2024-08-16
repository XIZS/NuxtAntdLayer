<template>
    <a-input 
        :placeholder="'请输入{content}'" 
        v-model:value="model[k]"
        v-bind="bind">
    </a-input>
</template>

<script setup lang="ts">
let props = defineProps<{
    model:any,
    k:string
    bind:any,
    label:string
}>()

</script>

<style scoped></style>