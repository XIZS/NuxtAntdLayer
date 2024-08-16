<template>
    <!-- <img :src="useRuntimeConfig().public.supabaseImageUrl+props.record[props.k]" style="height:32px" alt=""> -->
    <!-- {{  options}} -->
    <a-tag>{{ options.find(item=>item.v==record[k]).k }}</a-tag>
</template>

<script setup lang="ts">
const props = defineProps<{
    record:any,
    k:string,
    options:Array<Record<string,string|number>>
}>()
</script>

<style scoped></style>