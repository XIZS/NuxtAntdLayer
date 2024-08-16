import { h, ref } from 'vue';
import { AButton, ACard, ATabPane, ATabs } from '#components'; // 根据你的实际路径调整

type TabsType = {
    tabs: any[],
    defaultTab?: string,
    slots?: any
}

export const Tabs = (params: TabsType) => {
    let key = ref(params.defaultTab);
    return h(ATabs, {
        'onUpdate:activeKey': (newKey: string) => key.value = newKey
    }, {
        ...params.slots,
        default: () => params.tabs.map(item => h(ATabPane, { key: item.tab, tab: item.tab }, item.content))
    });
}

export const Button = (content: string, params?: any) => {
    return h(AButton, params, content);
}

export const Card = (content: any) => {
    return h(ACard, null, content);
}

export const customCom = (fn: () => any) => {
    return fn();
}