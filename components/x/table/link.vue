<template>
    <!-- <img :src="useRuntimeConfig().public.supabaseImageUrl+props.record[props.k]" style="height:32px" alt=""> -->
    <div>
        <template  v-if="record[k]">
            <a :href="record[k]" target="_blank" class="underline text-blue-500" >{{ record[k]?.slice(0,20) }}...</a>
            <a-button size="small" @click="copyMs(record[k])" class="ml-[10px]">
                <CopyOutlined />
            </a-button>
        </template>
        <div v-else>未设置</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    record:any,
    k:string
}>()

 
</script>

<style scoped></style>