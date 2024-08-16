<template>
    <img :src="useRuntimeConfig().public.supabaseImageUrl+props.record[props.k]" style="height:32px" alt="">
</template>

<script setup lang="ts">
const props = defineProps<{
    record:any,
    k:string
}>()
</script>

<style scoped></style>