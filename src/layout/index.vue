<!--
 * @Author: ZHAO
 * @Date: 2024-01-12 16:39:21
 * @LastEditTime: 2026-11-03 08:52:35
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\layout\index.vue
 * 
-->
<template>
    <div class="header">
        <div class="header-left">
            <img class="hearer-logo" :src="logo ? logo : '/src/assets/images/logo.png'" />
            <!-- <img class="hearer-logo" src="/src/assets/images/logo.png" /> -->
            <div class="hearer-title">
                <div class="title" @click="goPage(`/home`)">土木工程检测技术教学资源库</div>
                <div class="tips">
                    Teaching Resource Library for Civil Engineering Testing Technology
                </div>
            </div>
        </div>
        <div class="header-right">
            <div class="hearer-user flex" v-if="token">
                <el-image class="user-img" :src="userInfo.avatar ? userInfo.avatar : ''" />
                <div class="name" @click="toNext">{{ userInfo.nickName }}</div>
                <el-divider direction="vertical" />
                <div class="name" @click="logout">退出</div>
            </div>
            <div v-else class="hearer-user flex">
                <!-- <img class="user-img" :src="sculpture" /> -->
                <el-icon class="icon" @click="goLogin">
                    <User />
                </el-icon>
                <div class="login name" @click="goLogin">登录</div>
                <el-divider direction="vertical" />
                <div class="name" @click="goRegister">注册</div>
            </div>
            <el-icon class="menu-toggle" @click="drawerVisible = true">
                <Menu />
            </el-icon>
        </div>
    </div>
    <div class="tab-list">
        <ul type="none">
            <li
                :class="{ 'nav-is-active': defaultPath == item.path }"
                v-for="item in menuList"
                :key="item.path"
            >
                <div v-if="item.children && item.children.length > 0">
                    <div class="nav-title" @click="turnToPage(item.path)">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="popup-box" :class="getPopupClassName(item.name)">
                        <div
                            class="popup-item"
                            :class="{ 'popup-is-active': defaultFullPath == i.path }"
                            v-for="i in item.children"
                            @click="turnToPage(i.path)"
                        >
                            <span>{{ i.name }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="nav-title" @click="turnToPage(item.path)">
                    <span>{{ item.name }}</span>
                </div>
            </li>
        </ul>
        <!-- <el-menu
            :default-active="defaultActive"
            popper-class="layout-menu-popper"
            class="el-menu-popper-demo"
            mode="horizontal"
            :popper-offset="0"
            @select="select"
        >
            <template v-for="(item, index) of menuList" :key="index">
                <el-sub-menu
                    :index="item.path"
                    v-if="item.children && item.children.length > 0"
                    :data-content="item.name"
                >
                    <template #title>
                        <div @click="turnToPage(item.path)">
                            {{ item.name }}
                        </div>
                    </template>
                    <el-menu-item
                        v-for="(chil, chilIndex) of item.children"
                        :key="chilIndex"
                        :index="chil.path"
                        >{{ chil.name }}</el-menu-item
                    >
                </el-sub-menu>
                <el-menu-item
                    v-else
                    :index="item.path"
                    :data-content="item.name"
                    >{{ item.name }}</el-menu-item
                >
            </template>
        </el-menu> -->
    </div>
    <el-drawer
        v-model="drawerVisible"
        direction="rtl"
        size="70%"
        :with-header="false"
        class="mobile-drawer"
    >
        <div class="drawer-logo">
            <img
                class="drawer-logo-img"
                :src="logo ? logo : '/src/assets/images/logo.png'"
            />
        </div>
        <el-menu
            :default-active="defaultFullPath"
            class="mobile-menu"
            @select="handleDrawerSelect"
        >
            <template v-for="(item, index) of menuList" :key="index">
                <el-sub-menu
                    :index="item.path"
                    v-if="item.children && item.children.length > 0"
                >
                    <template #title>
                        <span
                            class="drawer-submenu-title"
                            :class="{
                                'drawer-submenu-active': String(defaultFullPath).startsWith(
                                    item.path
                                )
                            }"
                            @click.stop="handleDrawerTop(item)"
                            >{{ item.name }}</span
                        >
                    </template>
                    <el-menu-item
                        v-for="(chil, chilIndex) of item.children"
                        :key="chilIndex"
                        :index="chil.path"
                        class="drawer-tag-item"
                        ><span class="drawer-tag-text" v-html="chil.name"></span></el-menu-item
                    >
                </el-sub-menu>
                <el-menu-item v-else :index="item.path" class="drawer-simple-item">{{
                    item.name
                }}</el-menu-item>
            </template>
        </el-menu>
    </el-drawer>
    <router-view></router-view>
    <div class="footer">
        <div class="footer-inner">
            <div class="top">
                <div class="footer-left">
                    <a :href="item.url" target="_blank" class="ve-link" v-for="item in linksList">
                        {{ item.name }}
                    </a>
                </div>
                <div class="footer-right">
                    <h3 class="footer-logo">高等教育出版社</h3>
                    <div class="footer-text">
                        <p>
                            <a
                                href="https://www.icve.com.cn/portal_new/apply/apply.html"
                                target="_blank"
                                class="ve-link"
                                >开通项目申请表</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=1"
                                target="_blank"
                                class="ve-link"
                                >平台简介</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=2"
                                target="_blank"
                                class="ve-link"
                                >知识产权</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=3"
                                target="_blank"
                                class="ve-link"
                                >免责声明</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=4"
                                target="_blank"
                                class="ve-link"
                                >意见反馈</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=5"
                                target="_blank"
                                class="ve-link"
                                >联系我们</a
                            >
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/policy.html"
                                target="_blank"
                                class="ve-link"
                            >
                                隐私政策
                            </a>
                            <a href="https://help.icve.com.cn/jjxx" target="_blank" class="ve-link">
                                疫情防控在线教学方案
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <a
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010202007836"
                >
                    <p>京公网安备 11010202007836号</p>
                </a>
                <span>Copyright©2014-2019 高等教育出版社</span>
                <a href="http://beian.miit.gov.cn" class="copyright-ICP"> 京ICP备12020869号-19 </a>
                <div style="display: inline-block; vertical-align: middle">
                    <span>技术支持:</span>
                    <a href="javascript:;"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
const { proxy } = getCurrentInstance();
const sculpture = computed(() => useUserStore().sculpture);
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const drawerVisible = ref(false);
import { LoginApi } from '@/assets/api/login';
const loginApi = new LoginApi();
import { clearAllCoolies, COOKIE_TOKEN_KEY } from '@/utils/cookie';
import { passLogin, getUserInfo, logoutApi, getLink } from '@/assets/api/common';
import Cookies from 'js-cookie';
import { ztreeAll } from '@/assets/api/common';

import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();
const defaultPath = computed(() => {
    const { meta, fullPath, path } = route;
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});
const defaultFullPath = computed(() => {
    const { meta, fullPath } = route;
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return fullPath;
});

const menuList = ref([
    { path: '/home', name: '首页' },
    {
        path: '/professional',
        name: '专业园地',
        children: [
            { path: '/professional?index=0', name: '专业介绍' },
            { path: '/professional?index=1', name: '专业标准' },
            { path: '/professional?index=2', name: '行业标准' },
            // { path: '/professional?index=3', name: '职业标准' },
            { path: '/professional?index=3', name: '人培方案' },
            { path: '/professional?index=4', name: '课程标准' },
            // { path: '/professional?index=6', name: '优秀教学案例' }
        ]
    },
    // {
    //     path: '/industry',
    //     name: '行业园地',
    //     children: [
    //         { path: '/industry?index=0', name: '行业信息' },
    //         { path: '/industry?index=1', name: '行业标准' },
    //         { path: '/industry?index=2', name: '就业信息' },
    //         { path: '/industry?index=3', name: '企业文化' },
    //         { path: '/industry?index=4', name: '行业新技术' }
    //     ]
    // },
    {
        path: '/course',
        name: '课程中心',
        children: [
            { path: '/course?index=0', name: '专业基础课' },
            { path: '/course?index=1', name: '专业核心课' },
            { path: '/course?index=2', name: '专业拓展课' },
            { path: '/course?index=3', name: '实习实训课' }
        ]
    },
    { path: '/sourceMaterial', name: '素材中心' },
    {
        path: '/trainingCenter',
        name: '培训中心',
        children: [
            // { path: '/trainingCenter?index=0', name: '行业岗位培训' },
            // { path: '/trainingCenter?index=1', name: '创新创业培训' },
            // { path: '/trainingCenter?index=2', name: '赛证融通培训' },
            // { path: '/trainingCenter?index=3', name: '虚拟仿真培训' }
           /*  { path: '/trainingCenter?index=0', name: '城市体检' },
            { path: '/trainingCenter?index=1', name: '试验检测员' },
            { path: '/trainingCenter?index=2', name: '无损检测员' } */
            { path: '/trainingCenter?index=0', name: '城市体检' },
            { path: '/trainingCenter?index=1', name: '材料检测' },
            { path: '/trainingCenter?index=2', name: '钢结构检测' },
            { path: '/trainingCenter?index=3', name: '地基桩基检测' },
            { path: '/trainingCenter?index=4', name: '砌体结构检测' },
            { path: '/trainingCenter?index=5', name: '混凝土结构检测' },
        ]
    },
    {
        path: '/industry',
        name: '特色资源中心',
        children: [
            // { path: '/industry?index=0', name: '产教融合' },
            // { path: '/industry?index=1', name: '城市体检' },
            { path: '/industry?index=0', name: '数字教材' },
            { path: '/industry?index=1', name: '学生案例' },
            { path: '/industry?index=2', name: '教学案例' }
        ]
    },
    {
        path: '/internationalExchange',
        name: '国际交流与合作',
        children: [
            { path: '/internationalExchange?index=0', name: '职教出海案例' },
            { path: '/internationalExchange?index=1', name: '国际交流资源' }
        ]
    },

    {
        path: '/popularization',
        name: '虚拟仿真实训库',
        children: [
            // { path: '/popularization?index=0', name: '课程试题库' },
            // { path: '/popularization?index=1', name: '职业技能试题库' },
            // { path: '/popularization?index=2', name: '技能竞赛试题库' },
            // { path: '/popularization?index=3', name: '1+X证书测试题库' }
            { path: '/popularization?index=0', name: '专业基础项目' },
            { path: '/popularization?index=1', name: '专业核心项目' }
        ]
    },
    {
        path: '/research',
        name: '课程思政案例库',
        children: [
            { path: '/research?index=0', name: '思政课程' },
            { path: '/research?index=1', name: '思政案例' }
        ]
    },
    {
        path: '/knowledge',
        name: '知识图谱',
    },
]);

const getPopupClassName = (name: string) => {
    switch (name) {
        case '课程中心':
            return 'short-popup1';
        case '特色资源中心':
        case '产教融合中心':
            return 'short-popup2';
        case '国际交流与合作':
            return 'short-popup3';
    }
};

const logout = async () => {
    logoutApi(token.value).then((res: any) => {
        if (res.code == 200) {
            (document.cookie =
                'token=;expires=Thu,01 Jan 1970 00:00:00 UTC;domain=.icve.com.cn;path=/;'),
                localStorage.clear();
            userInfo.value = undefined;
            token.value = '';
        }
    });
};
function goLogin() {
    window.open(
        `https://sso.icve.com.cn/sso/auth?mode=simple&source=14&redirect=${window.location.href}`,
        'noreferrer',
        'noopener'
    );
}
const goRegister = () => {
    window.open(
        `https://sso.icve.com.cn/sso/register?mode=simple&source=14&redirect=${window.location.href}`,
        'noreferrer',
        'noopener'
    );
};

const urlenmu = ['/home', '/sourceMaterial'];
function turnToPage(path: string) {
    if( path == '/knowledge'){
        window.open('https://specialty3d.zhihuishu.com/home/1843599388807663616', '_blank', 'noreferrer');
        return;
    }
    if (!path.includes('index') && !urlenmu.includes(path)) {
        path = path + '?index=0';
    } else {
    }
    select(path);
    // router.push(path);
}
// 移动端：抽屉点击带分类子项跳转（复用 turnToPage 的 ?index=0 / knowledge 逻辑）
const handleDrawerSelect = (MenuSelectEvent: any) => {
    drawerVisible.value = false;
    turnToPage(MenuSelectEvent);
};
// 移动端：点击带子菜单的顶级菜单名直接进页面（不展开），点箭头才展开 tags
const handleDrawerTop = (item: any) => {
    drawerVisible.value = false;
    turnToPage(item.path);
};
// 页面跳转
function select(MenuSelectEvent: any) {
    const { path } = route;
    let data = MenuSelectEvent.split('?');
    router.push(MenuSelectEvent);
    if (data[0] == path) {
        let page = path.slice(1);
        let index = data[1].slice(6);
        proxy.bus.emit(page + 'Reload', Number(index));
    }
}

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const userInfo = ref<any>(undefined);
const token = ref();
const toNext = () => {
    window.open('https://zyk.icve.com.cn/icve-admin/index', '_blank', 'noreferrer');
};
const logo = ref();

const linksList = ref();
onMounted(() => {

    getLink().then((res: any) => {
        linksList.value = res.list
    })

    homeApi.projectInfo().then((res) => {
        logo.value = res.data.projectGroupInfo.projectLogo;
    });
    userInfo.value = JSON.parse(localStorage.getItem('userInfo') as string);

    let cookieToken = getCookie('token');
    if (!cookieToken) {
        return;
    }
    passLogin({
        token: cookieToken
    }).then((res: any) => {
        if (res.code !== 200) {
            return;
        }
        token.value = res.data.access_token;
        // localStorage.setItem("token", res.data.access_token)
        useUserStore().setToken(res.data.access_token);
        getUserInfo(res.data.access_token).then((res: any) => {
            localStorage.setItem('userInfo', JSON.stringify(res.user));
            userInfo.value = res.user;
        });
    });
});
</script>
<style scoped lang="scss">
.header {
    height: 85px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1291px;
    margin: auto;

    .header-left {
        display: flex;
        align-items: center;
        margin-right: 270px;

        .hearer-logo {
            width: 62px;
            height: 62px;
            margin-right: 7px;
        }

        .hearer-title {
            width: 642px;
            font-family: 'SourceHanSerifCN-Bold';
            padding-top: 8px;

            .title {
                font-size: 25px;
                font-weight: 400;
                line-height: 24px;
                font-weight: bold;
                letter-spacing: 8px;
                margin-bottom: 5px;
            }

            .tips {
                font-size: 12px;
                font-weight: 400;
                font-weight: bold;
            }
        }
    }

    .header-right {
        flex-shrink: 0;

        .hearer-user {
            display: flex;
            align-items: center;
            color: #555555;

            .user-img {
                background: #237ff0;
                margin-right: 8px;
                width: 32px;
                border-radius: 28px;
                height: 32px;
            }
            .icon {
                font-size: 20px;
            }

            .name {
                font-family: 'SourceHanSansCN-Bold';
                font-size: 16px;
                cursor: pointer;
            }

            .el-divider--vertical {
                border-left: 1px #3d3d3d solid;
            }

            .login {
                margin-left: 5px;
            }
        }

        .menu-toggle {
            display: none;
            font-size: 26px;
            color: #333;
            cursor: pointer;
            margin-left: 16px;
        }
    }
}

.tab-list {
    width: 100%;
    height: 70px;
    // display: flex;
    // align-items: flex-end;
    background-color: rgba($color: #fff, $alpha: 0.3);
    position: relative;
    z-index: 999;

    ul {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
            height: 70px;
            line-height: 70px;
            font-size: 18px;
            cursor: pointer;
            position: relative;

            .nav-title {
                font-weight: bold;
                padding: 0 14px;
                span {
                    font-weight: bold;
                    padding: 3px 10px;
                    border-radius: 30px;
                }
            }
            .nav-title:hover {
                // span {
                    font-weight: bold;
                    color: #fff;
                    background-color: #2e90fa;
                // }
            }
            .nav-title:hover + .popup-box {
                transform: scaleY(1) translate(-50%) !important;
            }
            .popup-box:hover {
                transform: scaleY(1) translate(-50%) !important;
            }
            .popup-box {
                min-width: 140px;
                left: 50%;
                transform-origin: 50% 0%;
                transform: scaleY(0) translate(-50%);
                display: inline-block;
                white-space: nowrap;
                position: absolute;
                background: #fff;
                backdrop-filter: blur(5px);
                transition: 0.3s;
                .popup-item {
                    text-align: center;
                    font-size: 14px;
                    line-height: 40px;
                    span {
                        padding: 3px 8px;
                        border-radius: 30px;
                    }
                }
                .popup-item:hover {
                    background-color: #2e90fa;
                    color: #fff;
                }
                .popup-is-active {
                    background-color: #2e90fa;
                    color: #fff;
                }
            }
            .short-popup1 {
                min-width: 120px !important;
            }
            .short-popup2 {
                min-width: 160px !important;
            }
            .short-popup3 {
                min-width: 175px !important;
            }
        }
    }
    .nav-is-active {
        .nav-title {
            color: #fff;
            background-color: #2e90fa;
        }
    }
}

.footer {
    width: 100%;
    font-size: 14px;
    background: black;
    overflow: hidden;
}

.top {
    display: flex;
    padding: 0 200px 20px;
}

.footer-inner {
    padding-top: 25px;
    margin: 0 auto;
    width: 100%;
    min-height: 175px;

    a {
        color: #969696;
        margin: 0 5px 0 5px;
        display: inline-block;
        text-decoration: none;
    }

    a:hover {
        color: #fff;
        text-decoration: none;
        background: none;
    }

    h3 {
        margin: 45px 200px;
        display: inline-block;
        font-size: 0;
        width: 230px;
        height: 50px;
        background: url("https://qun.icve.com.cn/portalproject/9tk7anmyrbcwaexr1n9tg/sta_page/img/layout_long_logo.5606b99c.5606b99c.png") no-repeat;
    }

    .footer-left {
        width: 40%;

        .ve-link {
            display: inline-block;
            width: 45%;
            height: 36px;
            line-height: 36px;
            margin: 0;
            margin-right: 1em;
        }
    }

    .footer-right {
        width: 60%;
        padding-top: 50px;
    }

    .footer-copyright {
        font-size: 12px;
        color: #969696;
        text-align: center;
        border-top: 1px solid #323232;
        clear: left;
        padding: 18px 0;

        p {
            display: inline-block;
            line-height: 1.25;
            margin: 0 40px 0;
        }
    }

    .copyright-ICP {
        vertical-align: middle;
    }

    .footer-text {
        padding-right: 6px;
        color: #fff;
        padding-top: 5px;
        text-align: center;
        min-height: 70px;
        overflow: hidden;

        p {
            margin: 0 auto;
            line-height: 30px;
            text-align: left;
        }
    }
}

@media (max-width: 600px) {
    .header {
        width: 100%;
        height: 60px;
        padding: 0 12px;
        box-sizing: border-box;

        .header-left {
            margin-right: 0;

            .hearer-logo {
                width: 40px;
                height: 40px;
                margin-right: 8px;
            }

            .hearer-title {
                width: auto;
                padding-top: 0;

                .title {
                    font-size: 18px;
                    line-height: 22px;
                    letter-spacing: 2px;
                }

                .tips {
                    display: none;
                }
            }
        }

        .header-right {
            .hearer-user {
                display: none;
            }

            .menu-toggle {
                display: block;
                font-size: 24px;
            }
        }
    }

    .tab-list {
        display: none;
    }

    .top {
        flex-direction: column;
        padding: 0 16px 20px;
    }

    .footer-inner {
        .footer-left,
        .footer-right {
            width: 100%;
        }

        .footer-left .ve-link {
            width: 50%;
            margin-right: 0;
        }

        .footer-right {
            padding-top: 20px;
        }

        .footer-copyright {
            padding: 18px 16px;

            p {
                display: block;
                margin: 0 0 8px;
            }
        }
    }
}
</style>

<style lang="scss">
.mobile-drawer .el-drawer__body {
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.mobile-drawer .drawer-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 0 16px;
    border-bottom: 1px solid #eee;
}

.mobile-drawer .drawer-logo-img {
    width: 60px;
    height: 60px;
    object-fit: contain;
}

.mobile-drawer .mobile-menu {
    flex: 1;
    border-right: none;
    padding-bottom: 24px;

    .el-menu-item,
    .el-sub-menu__title {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        color: #333;

        &.is-active {
            color: #2e90fa;
            font-weight: bold;
        }
    }

    .drawer-submenu-title {
        font-weight: normal;

        &.drawer-submenu-active {
            color: #2e90fa;
            font-weight: bold;
        }
    }

    .drawer-tag-item {
        height: 44px;
        line-height: 44px;
        margin: 8px 14px;
        padding: 0 16px;
        border-radius: 22px;
        background: #f5f7fc;

        .drawer-tag-text {
            font-size: 15px;
        }

        &.is-active {
            background: #2e90fa;
            color: #fff;
        }
    }

    .drawer-simple-item {
        &.is-active {
            color: #2e90fa;
            font-weight: bold;
        }
    }
}
</style>