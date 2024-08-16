<template>
    <div>
        <a-drawer :width="width" :title="props.title" v-model:open="show" class="">
            {{ show }}
            <slot name="content" :key="randomKey">
                <component :is="props.content" v-bind="{...props.pipes}"></component>
                {{ show }} <button @click="show=false">cancel</button>
            </slot>
        </a-drawer>
        <div @click="()=>show=true">
            <slot >
                
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">

export type DrawerType = {
    title:string,
    width:string,
    content:any,
    control?:any,
    pipes?:any
}
let props = defineProps<DrawerType>()

let randomKey = ref(Math.random())
// let show = watchRef(false,(nv)=>{
//     if(!nv){
//         setTimeout(() => {
//             randomKey.value = Math.random()
//         }, 800);
//     }
// })
let show = ref(true)
// props.control?.clear=()=>{
//     show.value=false
//     setInterval(() => {
//         console.log(show.value)
        
//     }, 1000);
//     return show
// }

setTimeout(() => {
    show.value=false
}, 5000);
provide('drawer-show',show);

</script>

<style scoped></style>