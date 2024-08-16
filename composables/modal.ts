
import { createVNode, render as vueRender } from "vue";
import { Modal as AntModal } from "ant-design-vue";
import {Drawer} from 'ant-design-vue'

/**
 * @param {import("vue").DefineComponent} content
 * @param {import("vue").Prop} props
 * @param {Omit<import("ant-design-vue").ModalProps, 'visible'>} config
 */
// export default function modal(com) {
    // let vnode = createVNode(com,{},'ssssssss')
    // let container = document.createElement('div')

    // document.body.appendChild(container)

    // vueRender(vnode,container)
// }


export const popupDrawer = ()=>{
    // const container = document.createDocumentFragment();
    const container = document.createElement('div');

    document.body.appendChild(container)
    const vnode = createVNode(defineComponent({
        setup(){
            return h('div',{},'aaaaaa')
        }
    }))

    vueRender(vnode,container)
}
