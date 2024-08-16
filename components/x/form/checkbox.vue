<template>
    <a-checkbox-group v-model:value="model[k]" :options="options"> </a-checkbox-group>
</template>

<script setup lang="ts">
let props = defineProps<{
    model:any,
    k:string,
    options:Array<any>
}>()

</script>

<style scoped></style>