<!--
 * @Author: ZHAO
 * @Date: 2026-11-11 09:40:00
 * @LastEditTime: 2026-11-16 21:43:59
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zyk-monorepo\packages\common\src\components\floatAgent.vue
 * 
-->
<!--
 * @Description: 全局悬浮智能体图标（可拖动、松手吸附两侧、点击跳转智能体助手）
 * 使用方式：已由公共根组件 packages/common/src/App.vue 统一引入，各项目无需再单独挂载。
-->
<template>
    <div
        ref="boxRef"
        class="float-agent"
        :class="{ snapping }"
        :style="style"
        @mousedown="onDown"
        @touchstart.passive="onDown"
    >
        <img class="float-agent-logo" :src="logo" draggable="false" alt="智能体" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import aiLogo from '../../assets/images/aiLogo.png';

const props = withDefaults(
    defineProps<{
        logo?: string;
        size?: number;
        edge?: number;
    }>(),
    {
        logo: aiLogo,
        size: 96,
        edge: 42
    }
);

const boxRef = ref<HTMLElement | null>(null);

const width = props.size;
const height = props.size;
// 使用不含滚动条的可视尺寸，避免吸附右侧时被滚动条遮挡
const viewW = () => document.documentElement.clientWidth || window.innerWidth;
const viewH = () => document.documentElement.clientHeight || window.innerHeight;
const left = ref(viewW() - width - props.edge);
const top = ref(viewH() * 0.32);
const snapping = ref(false);

const style = computed(() => ({
    left: `${left.value}px`,
    top: `${top.value}px`,
    width: `${width}px`,
    height: `${height}px`
}));

let startX = 0;
let startY = 0;
let startLeft = 0;
let startTop = 0;
let dragging = false;
let moved = false;

const openAgent = () => {
    window.open(
        `https://agent.icve.com.cn/#/chart-assistant?id=${import.meta.env.VITE_APP_PROJECTID}`,
        '_blank'
    );
};

const snap = () => {
    const maxLeft = viewW() - width - props.edge;
    let newLeft = left.value + width / 2 < viewW() / 2 ? props.edge : maxLeft;
    let newTop = Math.min(Math.max(top.value, 8), viewH() - height - 8);
    snapping.value = true;
    left.value = newLeft;
    top.value = newTop;
    setTimeout(() => {
        snapping.value = false;
    }, 320);
};

const onMove = (e: any) => {
    if (!dragging) return;
    if (e.touches && e.touches.length > 0 && (Math.abs(e.touches[0].clientX - startX) > 2 || Math.abs(e.touches[0].clientY - startY) > 2)) {
        e.preventDefault();
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - startX;
    const dy = clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    const maxLeft = viewW() - width - props.edge;
    left.value = Math.min(Math.max(startLeft + dx, props.edge), maxLeft);
    top.value = Math.min(Math.max(startTop + dy, 0), viewH() - height);
};

const onUp = () => {
    if (!dragging) return;
    dragging = false;
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
    snap();
    if (!moved) openAgent();
};

const onDown = (e: any) => {
    const isTouch = e.touches && e.touches.length > 0;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    dragging = true;
    moved = false;
    startX = clientX;
    startY = clientY;
    startLeft = left.value;
    startTop = top.value;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
};

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
});
</script>

<style scoped lang="scss">
.float-agent {
    position: fixed;
    z-index: 9999;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;

    &.snapping {
        transition: left 0.3s ease, top 0.3s ease;
    }

    &:hover .float-agent-logo {
        transform: scale(1.12);
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
    }

    .float-agent-logo {
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
        transition: transform 0.3s ease, filter 0.3s ease;
    }
}
</style>