<template>
    <div>
        <a-modal :width="width" :title="props.title" v-model:open="show" class="">
            <slot name="content" :key="randomKey">
                no content
            </slot>
        </a-modal>
        <div @click="show=true">
            <slot >
                
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">

let props = defineProps<{
    title:string,
    width:string,
}>()

let randomKey = ref(Math.random())
let show = watchRef(false,(nv)=>{
    if(!nv){
        setTimeout(() => {
            randomKey.value = Math.random()
        }, 800);
    }
})

provide('drawer-show',show)
</script>

<style scoped></style>