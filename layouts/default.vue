<template>
  <a-layout style="height: 100vh;overflow: scroll">
    <a-layout-sider class="bg-red !sticky !top-0" v-model:collapsed="collapsed" collapsible>
      <div class="bg-red">
          BeCo
      </div>
      <LayoutMenu></LayoutMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="sticky top-0 z-10" style="background: #fff; padding: 0;box-shadow: 0 3px 3px rgba(0,0,0,0.05);" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <slot>
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                Bill is a cat.
            </div>
        </slot>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);


const props = defineProps<{menu:any[]}>()

console.log(props)


</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
