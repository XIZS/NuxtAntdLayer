<template>
    <a-radio-group v-model:value="model[k]" :options="options"  button-style="solid">

    </a-radio-group>
</template>

<script setup lang="ts">
let props= defineProps<{
    model:any,
    options:any,
    k:string
}>()

const {t:$t} = useI18n()
let options = computed(()=>{
    if(typeof props.options[0]=='string'){
        return props.options.map((item:string)=>$t(item||''))
    }else{
        return props.options.map((item:any)=>({label:$t(item.label||''),value:item.value}))
    }
})
console.log(props)
</script>

<style scoped></style>