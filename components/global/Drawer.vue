<template>
    <a-drawer :width="width" :title="props.title" v-model:open="show" class="">
        <component :is="props.content" ></component>
    </a-drawer>
</template>

<script setup lang="ts">

export type DrawerType = {
    title:string,
    width:string,
    content:any,
    control:any
}
let props = defineProps<DrawerType>()
let emits = defineEmits(['cancel'])

let randomKey = ref(Math.random())

let show = watchRef(()=>true,(nv)=>{
    if(!nv){
        setTimeout(() => {
            
            emits('cancel')
        }, 1000);
    }
})

props.control.clear=()=>{
    show.value=false
}

provide('drawer-show',show);

</script>

<style scoped></style>