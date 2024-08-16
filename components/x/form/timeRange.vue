<template>
    <a-range-picker
        v-model:value="times"
        :value-format="props.valueFormat"
        :show-time="props.showTime"
    ></a-range-picker>
</template>


<script setup lang="ts">
import dayjs from 'dayjs'

let props = withDefaults(defineProps<{
    model:any,
    k:string,
    keys:string[],
    valueFormat?:string,
    showTime?:boolean
}>(),{
    valueFormat:'YYYY-MM-DD HH:mm:ss',
    showTime:true
})

let emits = defineEmits(['update:begin','update:end'])

let times = ref([])

if(props.model[props.keys[0]]){
    times.value = [
        dayjs(props.model[props.keys[0]]),
        dayjs(props.model[props.keys[1]])
    ]
}

watch(times,(nv)=>{
    console.log(nv)
    if(nv!=null){
        props.model[props.keys[0]]=nv[0]
        props.model[props.keys[1]]=nv[1]
    }else{
        props.model[props.keys[0]]=''
        props.model[props.keys[1]]=''
    }
},{deep:true})


</script>