<template>
    <!-- {{ form }} -->
    <a-form
        ref="formRef"
        :model="form"
        :layout="props.layout"
        :label-col="props.labelCol"
        :wrapper-col="props.wrapperCol"
        @finish="submit"
    >

       <FormItemList :labels="labels"></FormItemList>
       <a-form-item v-if="props.submit" :wrapper-col="{ span: props.wrapperCol, offset: props.labelCol }">
            <div class="flex justify-center">
                <a-button :loading="loading" type="primary" html-type="submit">保存</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>

<script setup lang="tsx">
import { AFormItem, ARow, ACol, AButton, CopyOutlined } from '#components';
import type { DefineComponent } from 'vue';


const componentMap: Record<string, any> = {
    text:defineComponent({
        props:['model','k'],
        setup(props){
            return ()=><span>{props.model[props.k]}</span>
        }
    }),
    textCopy:defineComponent({
        props:['model','k'],
        setup(props){
            return ()=><div>
                {props.model[props.k]}
                <AButton class="ml-[10px]" onClick={()=>copyMs(props.model[props.k])}> <CopyOutlined /></AButton>
            </div>
        }
    }),
    img:defineComponent({
        props:['model','k'],
        setup(props){
            return ()=><img src={s3(props.model[props.k])} style="max-width:100%;"></img>
        }
    }),
    input:defineAsyncComponent(()=>import('./form/input.vue')),
    inputNumber:defineAsyncComponent(()=>import('./form/inputNumber.vue')),
    textarea:defineAsyncComponent(()=>import('./form/textarea.vue')),
    button:defineAsyncComponent(()=>import('./form/button.vue')),
    select:defineAsyncComponent(()=>import('./form/select.vue')),
    switch:defineAsyncComponent(()=>import('./form/switch.vue')),
    timeRange:defineAsyncComponent(()=>import('./form/timeRange.vue')),
    search:defineAsyncComponent(()=>import('./form/search.vue')),
    reset:defineAsyncComponent(()=>import('./form/reset.vue')),
    exportExcel:defineAsyncComponent(()=>import('./form/exportExcel.vue')),
    viewImg:defineAsyncComponent(()=>import('./form/viewImg.vue')),
    radio:defineAsyncComponent(()=>import('./form/radio.vue')),
    radioButton:defineAsyncComponent(()=>import('./form/radioButton.vue')),
    selectCountry:defineAsyncComponent(()=>import('./form/selectCountry.vue')),
    selectCurrency:defineAsyncComponent(()=>import('./form/selectCurrency.vue')),
    checkbox:defineAsyncComponent(()=>import('./form/checkbox.vue')),
    selectAgent:defineAsyncComponent(()=>import('./form/selectAgent.vue')),
}

//label
export type LabelType={
    label?:string,
    key?:string|Array<string>,
    default?:any|Array<any>,
    is?:keyof typeof componentMap|Array<LabelType>|((form:any)=>{})|DefineComponent,
    payload?:any,
    formItemPayload?:any,
    subDir?:string,
    help?:string,
    show?:()=>boolean,
    rules?:Array<{
        required:boolean
    }>
}


//form
export type FormType = {
    layout?:'horizontal'|'vertical'|'inline',
    labels:Array<LabelType>|((form:any)=>Array<LabelType>),
    submit?:(form:any)=>void,
    init?:(form:any)=>void,
    initData?:any,
    labelCol?:any,
    wrapperCol?:any,
    keys?:Array<string>,
    components?:Record<string,any> //附加
}

let props = withDefaults(defineProps<FormType>(),{
    layout:'horizontal',
})
let emits = defineEmits(['update:form','submit','submitComplete'])

if(props.components!=null){
    Object.keys(props.components).forEach(key=>{
        componentMap[key] = props.components[key]
    })
}

let resetForm =ref(null)

let form = watchRef(asyncRef<any>(()=>{
    let f = {}
    let labels = ADParse(props.labels,f)

    function addKey(key:string,label:LabelType){
        key.split('.').reduce((prev:any,next:any,index:number,arr:Array<any>)=>{
            if(next==arr.at(-1)){
                prev[next] = label.default??'';
            }else{
                prev[next] = prev[next]||{}
            }
            return prev[next]
        },f)
    }

    recursionEach(labels,(item:LabelType)=>{
        if(item.key){
            if(Array.isArray(item.key)){
                item.key.forEach((k:string)=>addKey(k,item))
            }else{
                addKey(item.key,item)
            }
        }
    },(item)=>{
        if(Array.isArray(item.is)){
            return item.is
        }
    })

    props.keys?.forEach(item=>{
        f[item] =''
    })
    emits('update:form',f)

    return f
},{}),(nv)=>{
    console.log(nv)
    emits('update:form',nv)
},{deep:true})

if(props.initData){
    patch(props.initData,form.value)
}else if(props.init){
    props.init(form.value)
}


let loading = ref(false)

const submit=async ()=>{
    if(loading.value)return
    loading.value=true
    try{
        await props.submit?.(form.value)
        emits('submitComplete')
    }finally{
        loading.value =false
    }
}

let labels = computed<Array<LabelType>>(()=> {
    return ADParse(props.labels,form.value).filter(item=>item.is!=null)
})

let _layout = props.layout
const FormItemList = defineComponent({
    props:{
        labels:{
            type:Array<LabelType>,
            required:true
        }
    },
    setup(p,){
        const renderSingleItem = (label:LabelType)=>{ 

            if(label.show&&!label.show()){
                return label.label
            }

            //将key转成数组
            let keys = AD2A(label.key)
            //获取这个数组种每个项的最后一个key
            let lastKeys = keys.map(item=>{
                return item.split('.').at(-1)
            })
            let keys0path = keys[0]?.split('.')||[]
            let model = keys0path.slice(0,-1).reduce((prev,next)=>{
                prev = prev[next]
                return prev
            },form.value)
            return <>
                <AFormItem 
                    label={label.label}
                    name={label.key?.split?.('.')}
                    rules={label.rules}
                    help={label.help}
                    class={{
                        '!m-0':Array.isArray(label.is), //有子元素则取消margin
                        '!mb-[8px]':_layout=='inline',
                    }}
                >
                    {
                        h(getComponent(label.is),{model,k:AD2FSA(lastKeys),keys:lastKeys,...label.payload},'')
                    }
                </AFormItem>
            </>
        }

        const renderMultipleItem = (label:LabelType)=>{
            let ls = (label.is as Array<LabelType>).filter(item=>!item.show||item.show())
            return (
                // TODO COL
                <>
                    <ARow gutter={16}>
                         {ls.map(item=>{
                            if(item.show&&!item.show()){
                                return ''
                            }
                             return <ACol span={24/ls.length}>
                                 {renderSingleItem(item)}
                             </ACol>
                         })}
                     </ARow>
                </>
            )
        }

        return ()=>(
            labels.value.map(item=>{
                if(Array.isArray(item.is)){
                    return renderMultipleItem(item)
                }
                return renderSingleItem(item)
            })

        )
    }
})


const getComponent = (com:any)=>{
    if(com==null){
        return
    }
    if(typeof com === 'function'){
        return ()=>{
            return com(form)
        }
    }
    if(typeof com ==='object'){
        return com
    }
    if(componentMap[com]==null) {
        throw new Error('com: "'+com+'" com not exits')
    }
    return  componentMap[com]
}

provide('form-search',()=>{
    emits('submit',form.value)
    props.submit?.(form.value)
})
provide('form-reset',()=>{
    console.log(resetForm)
    patch(resetForm.value,form.value);
})

defineExpose({submit})



//单数据数组返回一个string ,多数据数组返回数组
function AD2FSA(data:Array<string>){
    if(data.length==1){
        return data[0]
    }
    return data
} 
</script>

<style scoped></style>