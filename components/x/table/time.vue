<template>
    <div class="text-nowrap">{{time}}</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const props = defineProps<{
    record:any,
    k:string
}>()

let time = dayjs(props.record[props.k]).format('YYYY-MM-DD HH:mm:ss')||'-'
if(time=='Invalid Date'){
    time='-'
}
</script>

<style scoped></style>