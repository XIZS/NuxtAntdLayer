import { createVNode, render } from 'vue';
import {Modal} from "#components"

type UseModalParamsType = {
    title:string,
    width:string,
    content: any,
    onOk:()=>void
}
type UseModalReturnType = {
    control:{
        clear:()=>void
    }
}
export const useModal = (params:UseModalParamsType):UseModalReturnType=>{
    let container = document.createDocumentFragment()
    let control = {clear:()=>{}}
    const vnode = createVNode(Modal,{...params,control,onCancel:()=>{
        render(null,container)
    }})
    vnode.appContext = useNuxtApp().vueApp._context
    render(vnode,container)
    return {control}
}
