<template>
    <div class="login flex justify-center items-center">
        <div class="">
            <div style="font-size:33px;font-weight: bold;margin-bottom:20px;" class="f-c-c">BeCo</div>
            <div>{{title}}</div>
            <a-form 
                :model="loginForm"
                style=" width: 360px;"
                @finish="submitLogin"
            >
            <a-form-item
                name="email"
                :rules="[{required:true,message:'请输入用户名'}]"
            >
                <a-input v-model:value="loginForm.email"  size="large" placeholder="请输入用户名">
                <template #prefix>
                    <user-outlined type="user" style="color:#4096ff;" />
                </template>
                </a-input>
            </a-form-item>
            <a-form-item
                name="password"
                :rules="[{required:true,message:'请输入密码'}]"
            >
                <a-input-password
                size="large"
                v-model:value="loginForm.password"
                placeholder="请输入密码"
                allow-clear
                >
                <template #prefix><lock-outlined style="color:#4096ff;" /></template>
                </a-input-password>
            </a-form-item>
         
            <a-form-item>
                <a-button type="primary"  html-type="submit" size="large" :loading="loading" style="width:100%;">提交</a-button>
            </a-form-item>
            </a-form>
        </div>
        <div class="footer">
            <!-- <Footer /> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserOutlined , LockOutlined } from '@ant-design/icons-vue';


const props = defineProps<{
    title?:string,
    login:(form:{email:string,password:string})=>void
}>()

// const loading= ref(false)
const {loading,run} = useLoadingRun()


let loginForm = reactive({
    email:'admin@qq.com',
    password:'111111',
})

async function submitLogin(){
   await run(()=>props.login(loginForm))
}
 

</script>

<style  scoped>
.login {
    display: flex;
    height: 100vh;
    /* background-image: url(@/assets/image/background.svg); */
    background-repeat: no-repeat; 
    background-size: 100%;
    
}

.login.banner {
    width: 550px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
}

.login.content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
}

.login.footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
}


</style>
