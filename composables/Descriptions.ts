import { ADescriptions, ADescriptionsItem } from "#components"

type DescriptionsType = {
    columns?:number,
    bordered?:boolean,
    items:Array<{
        label:string,
        content:string,
        span?:number
    }>
}

export const Descriptions = (params:DescriptionsType)=>{
    return h(ADescriptions,params,params.items.map(item=>{
        return  h(ADescriptionsItem,item,{default:()=>item.content})
    }))
}