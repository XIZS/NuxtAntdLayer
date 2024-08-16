<template>
    <div>
        <slot name="head" :table="table" ></slot>
        <div class="mb-[10px]">
            <template v-if="props.form">
                <XForm
                    v-bind="props.form"
                    layout="inline"
                    v-model:form="formData"
                    @submit="()=>{pagination.current=1;load({})}"
                ></XForm>
            </template>
        </div>
        <!-- {{rowSelection.selectedRecords}} -->
        <a-table
            bordered
            :columns="columns"
            :data-source="dataSource||[]"
            :loading="loading"
            :scroll="{x:true}"
            :rowKey="props.rowKey"
            :pagination="pagination"
            :row-selection="showSelect?rowSelection:null "
        >
            <template #headerCell="{title,column}:any" >
                <div class="flex mx-auto justify-center">
                    <span style="white-space: nowrap" >
                        {{ (title) }}
                    </span>
                    <span v-if="column.tip!=null" class="ml-1">
                        <a-popover >
                            <template #content>
                                {{ (column.tip) }}
                            </template>
                            <InfoCircleOutlined style="color:rgb(21, 107, 255)" />
                        </a-popover>
                    </span>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="tsx">
import type { FormType, LabelType } from './form.vue' 

export type ColumnType= {
    label:string, //title
    key?:string, //dataIndex
    is?:string|(({record}:any)=>{}),
    formItemPayload?:any,
    payload?: any,
    fixed?: string | boolean,
}


export type TableType = {
    form?:FormType&{
        labels:LabelType
    },
    control?:any,
    columns:Array<ColumnType>|((table:any)=>Array<ColumnType>),
    data:Ref<Array<any>>|Array<any>|((params:string)=>Promise<never[] | null>|(never[]|null)),
    pagination?: any,
    showSelect: boolean,
    rowKey?:(row:any,index?:number)=>any,
    rowSelection:any,
    selectedKeys: any,
    selectedRecords:any
}

const customComponents:any= {
    'image':defineAsyncComponent(()=>import('./table/image.vue')),
    'time':defineAsyncComponent(()=>import('./table/time.vue')),
    'select':defineAsyncComponent(()=>import('./table/select.vue')),
    'switch':defineAsyncComponent(()=>import('./table/switch.vue')),
    'uuid':defineAsyncComponent(()=>import('./table/uuid.vue')),
    'link':defineAsyncComponent(()=>import('./table/link.vue')),
}

let props = defineProps<TableType>()
let formData = ref({}) //form数据
let pagination = reactive(props.pagination??{
    total:0,
    current:1,
    pageSize:10,
    showQuickJumper:true,
    size:'default',
    showSizeChanger:true,
    showTotal:(total:number, range:number) => (`共${Math.ceil(total/pagination.pageSize)}页,${total}条数据`),
    onChange:  (page: number, pageSize: number) => {
        pagination.current = page
        pagination.pageSize = pageSize||10
        load({})
    }
})

let rowSelection = reactive({
    ...props.rowSelection,
    selectedKeys: ref(props.selectedKeys??[]),
    selectedRecords:ref(props.selectedRecords??[]),
    onSelect: (record: any, selected: boolean) => {
        if (props.rowKey == null) {
            throw new Error('please add rowKey function in table')
        }
        let index = rowSelection.selectedKeys?.indexOf(props.rowKey?.(record))
        console.log(props.rowKey(record))
        if (!selected && index >= 0) {
            rowSelection.selectedKeys.splice(index,1)
            rowSelection.selectedRecords.splice(index,1)
        } else if (selected && index < 0) {
            rowSelection.selectedKeys.push(props.rowKey?.(record))
            rowSelection.selectedRecords.push(record)
        }
    },
    onSelectAll: (selected: boolean, records: Array<any>) => {
        if (props.rowKey == null) {
            throw new Error('please add rowKey function in table')
        }
        if (selected) {
            let newList = records.filter((item:any)=>item!=null&&!rowSelection.selectedKeys?.includes(props.rowKey?.(item)))
            rowSelection.selectedKeys.push(...newList.map((item: any) => props.rowKey?.(item)))
            rowSelection.selectedRecords.push(...newList)
        } else {
            let nowKeys = dataSource.value.map(item=>props.rowKey?.(item))
            console.log(nowKeys)
            nowKeys.forEach(item => {
                let i = rowSelection.selectedKeys.indexOf(item)
                if (i >= 0) {
                    rowSelection.selectedKeys.splice(i,1)
                    rowSelection.selectedRecords.splice(i,1)
                }
            })
        }
    }
})


const table = {
    reload:(reset:boolean=true)=>{
        if(reset){
            pagination.current=1
        }
        load({})
    }
}
patch(table,props.control,true)

//转换columns为ATable可用的columns
const columns = ADParse(props.columns,table).map(item=>{
    let column:any =  {
        title:item.label,
        dataIndex: item.key,
        fixed:item.fixed
    }

    if(item.is&&typeof item.is == 'string'){
        let customComponent = customComponents[item.is]
        column.customRender = (data:any)=>{
            return h(customComponent,{...data,table,k:item.key,...item.payload})
        }
    }
    if(item.is&&typeof item.is=='function'){
        column.customRender = (data:any)=>item.is({...data,table})
    }
    return column
})

//具体table数据
const dataSource:Ref<Array<any>> = isRef(props.data)?props.data: ref([])

//获取load加载方法与loading状态(ref)
const {run:load,loading} = loadingRun(async (params:any)=>{
    await nextTick()
    if(Array.isArray(props.data))return 
    params = {...params,...formData.value,page:pagination.current,pageSize:pagination.pageSize}
    console.log(params)
    let res = await props.data?.(params)
    console.log(res)
    if(Array.isArray(res)){
        dataSource.value = res
        //TODO
    }else{
        let {data,page,pageSize,total} = res
        dataSource.value = data
        pagination.current=page||pagination.current
        // pagination.pageSize=+pageSize
        pagination.total=+total
        console.log(pagination)
    }
})


onMounted(async ()=>{
    await nextTick()
    load({})
})


provide('table',table)
</script> 
<style scoped></style>