<template>
    <a-button @click="search" >{{('重置')}}</a-button>
</template>

<script setup lang="ts">

let a = inject('form-reset',()=>{})
const search = ()=>{
    a()
}
</script>

<style scoped></style>