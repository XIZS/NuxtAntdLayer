<template>
    <a-select v-model:value="model[k]" style="width: 160px" allow-clear :placeholder="$t('请选择国家')" @change="change">
       <a-select-option :value="item.code" v-for="(item,index) in list">{{ $t(item.name) }}</a-select-option>
    </a-select>
 </template>
 
 <script setup lang="ts">
 let props = defineProps<{
    model:any,
    k:string
 }>()
 let list = useState('countryList',()=>{
    let list = ref([])
    getConfigData({country:'',key:'countryAreaList',tenant_id:'',type:1,}).then(res=>{
        list.value = res
        console.log(res)
    })
    return list
 })
 </script>