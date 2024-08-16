<template>
    <a-button @click="exportExcel" type="primary">{{$t('导出')}}</a-button>
</template>

<script setup lang="ts">

let a = inject('form-exportExcel',()=>{})
const exportExcel = ()=>{
    a()
}
</script>

<style scoped></style>