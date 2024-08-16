import { ADrawer, XForm } from "#components"
import type { FormType } from "../components/x/form.vue"
import type { TableType } from "../components/x/table.vue"
import XTable from '../components/x/table.vue'
import { XDrawer } from "#components"
import type { DrawerType } from "../components/x/Drawer.vue"
import {createVNode} from 'vue'


export type DefineTableType = TableType|((formLabels:Array<any>)=>TableType)
type DefineFormType = FormType|((formLabels:Array<any>)=>FormType)


type DefineXTableResultType = {
    com:VNode,
    control:{
        reload:(re?:boolean)=>void
    }
}
export const defineXTable = (params:DefineTableType):DefineXTableResultType=>{
    let control: any = {}
    let selectedRecords = []
    let selectedKeys = params.selectedKeys??[]
    
    return {
        com: createVNode(XTable, { ...params, control, selectedRecords, selectedKeys }),
        control,
        selectedRecords, 
        selectedKeys
    }
}


export const defineXForm = (params:FormType)=>{

    return h(XForm,{...params})
}

export type DrawerParamsType = {
    
}

export const defineDrawer = (params:DrawerType):{com:any,control:{clear:()=>void}}=>{
    let control:any ={}
    return {
        com:h(XDrawer,params),
        control:control
    }
}
