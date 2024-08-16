<template>
    <a-switch v-model:checked="model[k]" v-bind="props.bind" ></a-switch>
</template>

<script setup lang="ts">
let props = defineProps<{
    model:any,
    k:string,
    bind:any
}>()

console.log(props)
</script>

<style scoped></style>