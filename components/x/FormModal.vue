<template>
    <div class="inline">
        <a-modal @ok="submit" :width="width" :title="props.title" v-model:open="show" class="">
            <XForm ref="xform" v-bind="props.form"></XForm>
        </a-modal>
        <div @click="show=true">
            <slot >
                
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormType, LabelType } from './form.vue' 

let props = defineProps<{
    title:string,
    width:string,
    form:FormType
}>()

let randomKey = ref(Math.random())
let xform = ref(null)
let show = watchRef(false,(nv)=>{
    if(!nv){
        setTimeout(() => {
            randomKey.value = Math.random()
        }, 800);
    }
})

const submit = async ()=>{
    await xform.value?.submit()
    show.value = false
}

provide('drawer-show',show)
</script>

<style scoped></style>