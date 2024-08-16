import { ATabs } from "#components"

export type TabType = {
    name:string,
    key:string,
    content:()=>any|any[]|any
}

export type DefineTabsParams = {
    tabs:Array<>
} 

export const defineTabs = (params:DefineTabsParams)=>{

    return h(ATabs)
}

export const defineTab = (tab:TabType) =>{
    return 
}