<template>
    <div>
        <ViewImg :src="model[k]"></ViewImg>
    </div>
</template>

<script setup lang="tsx">

let props = defineProps<{
    model:any,
    k:string
}>()

</script>

<style scoped>
    .pre{
       
       
        color:#aaa;
    }
</style>