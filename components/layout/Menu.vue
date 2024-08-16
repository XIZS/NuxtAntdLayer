<template>
    <a-menu 
        v-model:selectedKeys="selectedKeys" 
        theme="dark" 
        mode="inline"
        :items="items"
        @select="onselect"
    >
    </a-menu>
</template>

<script setup lang="ts">
import { MailOutlined,UserAddOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);

const items = ref([
    // {
    //     key:'/',
    //     icon:()=>h(MailOutlined),
    //     label:'Home',
    //     title:'Home'
    // },
    // {
    //     key:'/user',
    //     icon:()=>h(UserAddOutlined),
    //     label:'用户管理',
    //     title:'用户管理',
    //     children:[
    //         {
    //             label:'用户列表',
    //             key:'/user'
    //         },
    //         {
    //             label:'等级管理',
    //             key:'/user/level'
    //         }
    //     ]
    // },
    // {
    //     key:'/game',
    //     icon:()=>h(MailOutlined),
    //     label:'游戏管理',
    //     title:'游戏管理',
    //     children:[
    //         {
    //             label:'游戏平台',
    //             key:'/gamePlatform'
    //         },
    //         {
    //             label:'游戏列表',
    //             key:'/game'
    //         },
    //         {
    //             label:'首页标签管理',
    //             key:'/game/homeTab'
    //         }
    //     ]
    // },
    // {
    //     key:'/operation',
    //     icon:()=>h(MailOutlined),
    //     label:'运营管理',
    //     title:'运营管理',
    //     children:[
    //         {
    //             key:'/operation/interfaceConfig',
    //             label:'界面配置'
    //         },
    //         {
    //             key:'/operation/banner',
    //             label:'banner'
    //         }
    //     ]
    // }
])

const onselect = (openKeys:any)=>{
    useRouter().push(openKeys.key)
}
</script>

<style scoped></style>