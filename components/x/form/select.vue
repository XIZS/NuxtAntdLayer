<template>
    <!-- {{ props }} -->
    <a-select v-model:value="model[k]"  style="width:100px" :allow-clear="props.allowClear">
        <a-select-option v-for="(item) in op" :value="item?.value">{{ $t(item.label) }}</a-select-option>
    </a-select>
</template>

<script setup lang="ts">
let props = withDefaults(defineProps<{
    model:any,
    k:string,
    options:Array<any>,
    allowClear:boolean
}>(),{
    allowClear:true
})

const op = computed(()=>{
    if(props.options.value){
        return props.options.value.map(item=>({label:item.k,value:item.v}))
    }
    return props.options.map(item=>({label:item.k,value:item.v}))
})

</script>

<style scoped></style>