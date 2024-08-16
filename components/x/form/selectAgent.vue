<template>
    <a-select 
        v-model:value="model[k]" 
        style="width: 160px" allow-clear :placeholder="$t('请选择代理')" @change="change"
        :options="agentList.map(item=>({value:item.id,label:item.name||item.id}))"
    >
      <!-- <a-select-option :value="item.id" v-for="(item,index) in agentList">{{ item.name }}</a-select-option> -->
    </a-select>
</template>

<script setup lang="ts">
let prosp = defineProps<{
    model:any,
    k:string
}>()
let agentList = useAgentList()
</script>