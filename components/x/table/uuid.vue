<template>
    <div class="text-nowrap">
        {{record[k].split('-')[0]}}...
        <a-button size="small" @click="copyContent">
            <CopyOutlined />
        </a-button>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const props = defineProps<{
    record:any,
    k:string
}>()

const copyContent = ()=>{
    copy(props.record[props.k])
    ms('复制成功')
}

// let time = dayjs(props.record[props.k]).format('YYYY-MM-DD HH:mm:ss')||'-'
// if(time=='Invalid Date'){
//     time='-'
// }
</script>

<style scoped></style>