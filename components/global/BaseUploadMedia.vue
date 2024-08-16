<template>
    <label class=" w-[72px] h-[72px] rounded-[4px] border border-dashed border-[#777] flex items-center justify-center overflow-hidden">
        <template v-if="isLoading">
            <sync-outlined spin />
        </template>
        <template v-else>
            <img v-if="model!==''" class="max-w-full max-h-full" :src="props.baseUrl+model"  alt="">
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5z"></path></svg>
            <input type="file" style="display: none;" @change="changeFile">
        </template>
    </label>
</template>

<script setup lang="ts">

const props = defineProps<{
    baseUrl:string, //基础地址
    upload:(filename:string,file:any)=>string //上传方法
}>()

let model = defineModel()
let isLoading = ref(false)

const changeFile = async (e)=>{
    let file = e.target.files[0]
    let name = generateName(file)
    let url
    try{
        isLoading.value= true
        url = await props.upload(name,file)
    }finally{
        isLoading.value =false
    }
    model.value=url
}

 const generateName = (file: File):string => {
    let objectKey
    const date = globalRandomWord(false, 35, 39)
    if (file) {
        if (file.type) {
            const type = file.type.split('/')[1]
            const method = file.type.split('/')[0]
            objectKey = `${method}/${date}.${type}`
        } else if (file.name) {
            const type = file.name.split('.')[1]
            objectKey = `${type}/${date}.${type}`
        }
    }
    return objectKey
}

 const globalRandomWord = (randomFlag: boolean, min: number, max: number) => {
    let str = ''
    let range = min
    const arr = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min// 任意长度
    }
    for (let i = 0; i < range; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
    }
    return str
}

</script>

<style scoped></style>