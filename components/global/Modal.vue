<template>
    <a-modal 
        :width="width" 
        :title="props.title" 
        @ok="onOk"
        v-model:open="show" 
        ok-text="确认"
        cancel-text="取消"
    >
        <component :is="props.content" ></component>
    </a-modal>
</template>

<script setup lang="ts">

export type ModalType = {
    title:string,
    width:string,
    content:any,
    control: any,
    onOk:()=>{}
}
let props = defineProps<ModalType>()
let emits = defineEmits(['cancel'])

let randomKey = ref(Math.random())

let show = watchRef(()=>true,(nv)=>{
    if(!nv){
        setTimeout(() => {
            
            emits('cancel')
        }, 1000);
    }
})
const onOk = async () => {
    await props.onOk()

    show.value = false
}

props.control.clear=()=>{
    show.value=false
}

provide('drawer-show',show);

</script>

<style scoped></style>