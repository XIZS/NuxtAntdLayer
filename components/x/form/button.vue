<template>
    <a-button 
        v-bind="bind">{{'添加'}}
    </a-button>
</template>

<script setup lang="ts">
// const {t:$t} = useI18n()

let props = defineProps<{
    bind:any,
    label:string
}>()

</script>

<style scoped></style>