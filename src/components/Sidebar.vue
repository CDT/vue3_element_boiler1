<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index ">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { mainRoutes } from '../router'

// 菜单过滤，无权限的菜单过滤掉
const filterMenu = items => {
    // 获取角色
    let role = localStorage.getItem('ms_role')
    // 遍历每个菜单
    items.forEach( (item, index, arr) => {
        // 斜杠开头的是路径，需要验证
        if (item.index.startsWith('/')) {
            // 找到路径匹配的路由
            let route = mainRoutes.filter(route => route.path == item.index)[0]
            // 检查路由权限是否包含角色，如果不包含就移除菜单项
            if (route.meta && route.meta.permission && !route.meta.permission.includes(role)) {
                arr.splice(index, 1)
            }
        }
        // 如果有子菜单，也进行过滤
        if (item.subs) {
            filterMenu(item.subs)
        }
    })
}

export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-cascades",
                index: "99",
                title: "其他",
                subs: [
                    {                        
                        index: "/table",
                        title: "基础表格",
                    },
                    {
                        index: "/tabs",
                        title: "tab选项卡",
                    },
                    {
                        index: "3",
                        title: "表单相关",
                        subs: [
                            {
                                index: "/form",
                                title: "基本表单",
                            },
                            {
                                index: "/upload",
                                title: "文件上传",
                            },
                            {
                                index: "/editor",
                                title: "富文本编辑器",
                            }
                        ],
                    },
                    {
                        icon: "el-icon-lx-emoji",
                        index: "/icon",
                        title: "自定义图标",
                    },
                    {
                        icon: "el-icon-pie-chart",
                        index: "/charts",
                        title: "schart图表",
                    },
                    {
                        icon: "el-icon-lx-global",
                        index: "/i18n",
                        title: "国际化功能",
                    },
                    {
                        icon: "el-icon-lx-warn",
                        index: "7",
                        title: "错误处理",
                        subs: [
                            {
                                index: "/permission",
                                title: "权限测试",
                            },
                            {
                                index: "/404",
                                title: "404页面",
                            },
                        ],
                    },
                    {
                        icon: "el-icon-lx-redpacket_fill",
                        index: "/donate",
                        title: "支持作者",
                    },
                ]
            }            
        ];

        filterMenu(items)        

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
