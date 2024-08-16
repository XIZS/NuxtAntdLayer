<template>
  <div class=""></div>
</template>

<script setup lang="ts">
import { LabelType } from './form.vue';


export const XFormTableType = {
    form:{
        labels:Array<LabelType>
    },
    table:{
        columns:[
            {title:'',dataIndex:''},
        ]
    }
} 

let props = defineProps({
    
})
</script>

<style scoped></style>