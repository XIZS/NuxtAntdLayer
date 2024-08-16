<template>
    <a-button type="primary" @click="search" >{{('搜索')}}</a-button>
</template>

<script setup lang="ts">

let a = inject('form-search',()=>{})
const search = ()=>{
    a()
}
</script>

<style scoped></style>