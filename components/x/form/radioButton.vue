<template>
    <a-radio-group v-model:value="model[k]" >
        <a-radio-button v-for="(item) in options" :value="item.value">{{ $t(item.label )}}</a-radio-button>
    </a-radio-group>
</template>

<script setup lang="ts">
defineProps<{
    model:any,
    k:string,
    options?:any
}>()
</script>

<style scoped></style>