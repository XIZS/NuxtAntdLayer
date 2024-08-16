<template>
    <a-switch disabled :checked="record[k]" @change="change"></a-switch>
</template>

<script setup lang="ts">
const props = defineProps<{
    record:any,
    k:string,
    options:Array<Record<string,string|number>>
}>()

</script>

<style scoped></style>