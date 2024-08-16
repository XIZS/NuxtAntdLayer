import { createVNode, render } from 'vue';
import {Drawer} from "#components"

type UseDrawerParamsType = {
    title:string,
    width:string,
    content:any
}
type UseDrawerReturnType = {
    control:{
        clear:()=>void
    }
}
export const useDrawer = (params:UseDrawerParamsType):UseDrawerReturnType=>{
    let container = document.createDocumentFragment()
    let control = {clear:()=>{}}
    const vnode = createVNode(Drawer,{...params,control,onCancel:()=>{
        render(null,container)
    }})
    vnode.appContext = useNuxtApp().vueApp._context
    render(vnode,container)
    return {control}
}
