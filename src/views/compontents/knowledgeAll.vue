<!--
 * @Author: ZHAO
 * @Date: 2024-10-15 17:44:22
 * @LastEditTime: 2026-11-17 18:08:55
 * @LastEditors: ZHAO
 * @Description: 产业图谱
 * @FilePath: \zd-zyk-shandong-jiaotongd:\work\zhidao\zyk-model\packages\common\src\components\knowledgeAll.vue
 * 
-->
<template>
    <div class="knowledge-graph-box">
        <!-- 顶部导航标签 -->
        <div class="nav-tabs">
            <div
                class="tab-item"
                :class="{ 'active': currentTab.name === tab.name, }"
                v-for="tab in tabs"
                :key="tab.name"
                @click="tabHandle(tab)"
            >
                {{ tab.name }}
            </div>
        </div>
        <div class="main-content" ref="mainContentRef">
            <div class="graph-scale-box">
                <iframe class="graph-content" :style="scaleStyle" :src="currentTab.computed" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, onBeforeUnmount } from 'vue';
const props = defineProps({
    projectGroupName: {
        type: String,
        default: ''
    }
})
const tabs = computed(() => [
    {
        name: '产业图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/industryGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}`,
    },
    {
        name: '能力图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/abilityGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}`,
    },
    {
        name: '专业群图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/professionGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}&projectGroupName=${props.projectGroupName}`,
    },
    {
        name: '证书图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/certificateGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}`,
    },
    {
        name: '比赛图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/competitionGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}`,
    },
    {
        name: '课程图谱',
        count: 0,
        computed: `https://zyk.icve.com.cn/icve-graph/courseGraph?zoomValue=1&projectId=${import.meta.env.VITE_APP_PROJECTID}`,
    },
]);
const currentTab = ref(tabs.value[0]);
const tabHandle = (tab) => {
    currentTab.value = tab;
}

const BASE_WIDTH = 1600;
const BASE_HEIGHT = 1000;
const scaleSize = ref(1);
const mainContentRef = ref<HTMLElement | null>(null);

const updateScale = () => {
    const isMobile = window.innerWidth <= 600;
    if (!isMobile) {
        scaleSize.value = 1;
        return;
    }
    const box = mainContentRef.value;
    if (!box) return;
    const availW = box.clientWidth;
    const availH = window.innerHeight * 0.6;
    // 取宽、高方向缩放比例的较小值，保证 iframe 内容（BASE_WIDTH×BASE_HEIGHT，即
    // 1600×1000，满足宽度>1500px、高度>900px 的要求）等比完整可见，
    // 不会因取较大值而在高度方向溢出被裁切。
    scaleSize.value = Math.min(availW / BASE_WIDTH, availH / BASE_HEIGHT);
};

const scaleStyle = computed(() => {
    if (scaleSize.value === 1) return {};
    return {
        width: BASE_WIDTH + 'px',
        height: BASE_HEIGHT + 'px',
        zoom: scaleSize.value,
    };
});

onMounted(() => {
    nextTick(updateScale);
    window.addEventListener('resize', updateScale);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScale);
});
</script>

<style scoped lang="scss">
.knowledge-graph-box {
    width: 1600px;
    margin: 60px auto;
    height: 100%;

    .little-title {
        font-size: 40px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 1;
        color: rgba(0, 0, 0, 1);
        text-align: center;
        margin-bottom: 60px;
    }

    .nav-tabs {
        height: 60px;
        display: flex;
        position: relative;

        .tab-item {
            width: 300px;
            height: 60px;
            text-align: center;
            margin-left: -40px;
            cursor: pointer;
            background: url(https://cdn-zyk.icve.com.cn/static/img/union.36388a0b.png) no-repeat;
            background-size: cover;
            color: #333;
            line-height: 60px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            font-family: Alibaba PuHuiTi;
            font-weight: 700;
            font-size: 24px;

            &:first-of-type {
                position: absolute;
                left: 65px;
                top: 0;
                z-index: 6;
            }

            &:nth-of-type(2) {
                position: absolute;
                left: 255px;
                top: 0;
                z-index: 5;
                padding-left: 15px;
            }

            &:nth-of-type(3) {
                position: absolute;
                left: 455px;
                top: 0;
                z-index: 4;
                padding-left: 15px;
            }

            &:nth-of-type(4) {
                position: absolute;
                left: 655px;
                top: 0;
                z-index: 3;
                padding-left: 15px;
            }

            &:nth-of-type(5) {
                position: absolute;
                left: 855px;
                top: 0;
                z-index: 2;
                padding-left: 15px;
            }

            &:nth-of-type(6) {
                position: absolute;
                left: 1035px;
                top: 0;
                z-index: 1;
                padding-left: 15px;
            }
        }

        .active {
            top: 2px !important;
            background: url(https://cdn-zyk.icve.com.cn/static/img/activeMenu.c6fccfb3.png) no-repeat;
            background-size: 100% 58px;
            color: #fff;
        }
    }

    .main-content {
        width: 1600px;
        height:1000px;
        margin: 0 !important;
        border: none;
        background: linear-gradient(45deg, #0c0713, #c55bf4);
        padding: 20px;
        border-radius: 30px 30px 30px 30px;
    }
}

.graph-content {
    width: 100%;
    height: 100%;
}

.graph-scale-box {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}
:deep(.industryContent) {
    background: #fff;
}

// ============ M 端（<1600px）：容器适配 + tabs 改为不重叠胶囊样式 ============
@media (max-width: 750px) {
    .knowledge-graph-box {
        width: 100%;
        margin: 24px auto;
        padding: 0 12px;
        box-sizing: border-box;
    }

    .little-title {
        font-size: 24px;
        margin-bottom: 22px;
    }

    .main-content {
        width: 100% !important;
        height: max-content !important;
        min-height: 420px;
        padding: 8px;
        border-radius: 12px;
        box-sizing: border-box;
    }

    .knowledge-graph-box .nav-tabs {
        height: auto;
        display: flex;
        flex-wrap: nowrap;
        gap: 10px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        margin-bottom: 16px;
        padding-bottom: 10px;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        .tab-item {
            flex: 0 0 auto;
            height: 44px;
            line-height: 44px;
            margin: 0;
            padding: 0 18px;
            position: static !important;
            left: auto !important;
            top: 0 !important;
            width: auto !important;
            text-align: center;
            cursor: pointer;
            border-radius: 22px;
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
            color: #666;
            font-family: Alibaba PuHuiTi;
            font-weight: 700;
            font-size: 16px;
            white-space: nowrap;
            transition: all 0.2s;
        }

        .active {
            top: 0 !important;
            background: linear-gradient(180deg, #c55bf4, #7a2bd2);
            color: #fff;
            box-shadow: 0 4px 12px rgba(123, 43, 210, 0.35);
        }
    }
}
</style>