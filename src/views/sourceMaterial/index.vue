<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2026-11-03 08:55:16
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\views\sourceMaterial\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="tags-box">
            <div class="tags">
                <div class="tags-title">媒体类型：</div>
                <div class="tags-list">
                    <div class="tags-item" :class="{ 'tag-active': !search.array_media }" @click="typeChange(1, '')">全部</div>
                    <div class="tags-item" :class="{ 'tag-active': search.array_media == item.id }" v-for="(item, index) in typeList.sysMediaType" :key="index" @click="typeChange(1, item.id)">{{ item.typeName }}</div>
                </div>
            </div>
            <div class="tags">
                <div class="tags-title">应用分类：</div>
                <div class="tags-list" :class="{ openBox: open }">
                    <div class="tags-item" :class="{ 'tag-active': !search.array_application }" @click="typeChange(2, '')">全部</div>
                    <div class="tags-item" :class="{ 'tag-active': search.array_application == item.id }" v-for="(item, index) in typeList.sysApplyType" :key="index" @click="typeChange(2, item.id)">{{ item.typeName }}</div>
                    <div class="open" @click="openHand()">
                        展开
                        <span class="iconfont icon-jinrujiantou"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="search">
            <div class="segmented">
                <div class="segmented-item" :class="{ 'segmented-active': search.orders == item.value }" v-for="(item, index) in options" :key="index" @click="orderHand(item.value,)">
                    {{ item.label }}
                    <i class="iconfont" :class="{ 'icon-paixushengxu': search.orders == item.value[0], 'icon-paixujiangxu': search.orders == item.value[1] }"></i>
                </div>
                <div class="switch">
                    <el-switch active-value="1" inactive-value="0" @change="searchHand" v-model="search.download" style="--el-switch-on-color: #13ce66; --el-switch-off-color: rgba(213, 215, 219, 1)" />仅下载
                </div>
            </div>
            <el-input v-model="search.docname" placeholder="按素材名称查询" clearable @clear="searchHand">
                <template #append>
                    <div class="flex" @click="searchHand">
                        <div class="iconfont icon-Rrl_s_011"></div>
                        <div>搜索</div>
                    </div>
                </template>
            </el-input>
        </div>

        <div class="course-box">
            <div class="course-item" @click="goDetail(item)" v-for="(item, index) in dataList" :key="index">
                <div class="course-img-box">
                    <img class="course-img" :src="item.file" alt />
                </div>
                <div class="course-name">{{ item.DocTitle }}</div>
                <div class="course-bottom">
                    <div>
                        <span class="iconfont icon-zu"></span>
                        {{ item.newSize }}
                    </div>
                    <div>
                        <span class="iconfont icon-yanjing"></span>
                        {{ item.ViewCount }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <el-empty v-if="!dataList||dataList.length==0" :image-size="200" /> -->
        <div class="page-bottom">
            <el-config-provider :locale="zhCn">
                <el-pagination v-model:current-page="search.page" v-model:page-size="search.pageSize" background layout="prev, pager, next, jumper" :total="total" @size-change="getList" @current-change="getList" />
            </el-config-provider>
        </div>
    </div>
</template>

<script setup lang="ts">
import { id } from 'element-plus/es/locales.mjs';
import { ref, computed, reactive, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ProfessionalApi } from '@/assets/api/professionalApi';
const professionalApi = new ProfessionalApi();
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const total = ref(100);
const dataList = ref([]);
const open = ref(false);
const options = [
    {
        label: '默认排序',
        value: ''
    },
    {
        label: '上传时间',
        value: 'CreateTime DESC' /*  ['CreateTime ASC', 'CreateTime DESC'] */
    },
    {
        label: '热度',
        value: 'ViewCount DESC' /* ['ViewCount ASC', 'ViewCount DESC'] */
    },
    {
        label: '大小',
        value: 'Size DESC' /* ['Size ASC', 'Size DESC'] */
    }
];
const search = reactive({
    array_media: '',
    array_application: '',
    orders: '',
    download: '',
    pageSize: 20,
    page: 1,
    docname: ''
});
const typeList = reactive({
    sysMediaType: [],
    sysApplyType: []
});
const openHand = () => {
    open.value = !open.value;
};

const typeChange = (type: number, id: string) => {
    if (type == 1) {
        search.array_media = id;
    } else if (type == 2) {
        search.array_application = id;
    }
    searchHand();
};
const orderHand = (order: string) => {
    if (!order && search.orders) {
        search.orders = '';
        searchHand();
    } else if (order) {
        search.orders = order;
        searchHand();
    }
};
const searchHand = () => {
    search.page = 1;
    getList();
};

const getList = () => {
    professionalApi.newmaterialMaterial(search).then((res) => {
        total.value = res.totalPageCount;
        dataList.value = JSON.parse(res.list).obj;
        console.log(dataList.value);
    });
};
const goDetail = (item: any) => {
    window.open(`https://zyk.icve.com.cn/materialDetailed?id=${item.id}`, '_blank', 'noreferrer');
};
onMounted(() => {
    professionalApi.sysMediaTypePageList().then((res) => {
        typeList.sysMediaType = res.rows;
    });
    professionalApi.sysApplyTypePageList().then((res) => {
        typeList.sysApplyType = res.rows;
    });
    getList();
});
</script>

<style scoped lang="scss">
// 引入 Element UI 的重置样式和变量文件
$--el-pagination-button-bg-color: '#fff';
$maxWidth: 1320px;

// 引入 Element UI 的主样式文件
.page-box {
    background-color: #fff !important;
    .professional-banner {
        background-image: url('@/assets/images/banner/sourceMaterial-bg.jpg');
        margin-top: -70px;
    }

    .tags-box {
        width: $maxWidth;
        margin: 13px auto;

        .tags {
            .tags-title {
                font-size: 25px;
                font-weight: 700;
                letter-spacing: 0px;
                line-height: 76px;
                color: var(--title-color);
                text-align: left;
            }

            .tags-list {
                width: 100%;
                height: 140px;
                padding: 25px 60px;
                background: var(--bg-color);
                grid-template-columns: repeat(6, calc(100% / 6));
                display: grid;
                grid-gap: 32px 0px;
                position: relative;
                overflow: hidden;

                .tags-item {
                    border-radius: 168px;
                    width: max-content;
                    height: 29px;
                    padding: 0px 15px;
                    font-size: 20px;
                    font-weight: 400;
                    letter-spacing: 0px;
                    line-height: 29px;
                    color: var(--title-color);
                    text-align: center;
                    cursor: pointer;
                }

                .tag-active {
                    background: var(--title-color);
                    color: #fff;
                }
            }
        }

        .open {
            position: absolute;
            bottom: 10px;
            right: 19px;
            width: 71px;
            height: 37px;
            opacity: 1;
            border-radius: 168px;
            background: var(--title-color);
            color: #fff;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            line-height: 35px;
            cursor: pointer;

            .iconfont {
                display: inline-block;
                font-size: 12px;
                transition: transform 0.5s !important;
                transform: rotate(90deg) !important;
            }
        }
    }

    .openBox {
        transition: height 0.5s;
        height: auto !important;

        .open {
            .iconfont {
                transform: rotate(270deg) !important;
            }
        }
    }

    .search {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: $maxWidth;
        padding: 0 10px 0px 14px;
        margin: 30px auto;

        .segmented {
            $itemheight: 58px;
            width: 819.53px;
            height: $itemheight;
            opacity: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            border-bottom: 2px solid transparent;
            border-image: linear-gradient(to right, var(--title-color), rgba(10, 120, 96, 0)) 10;

            .segmented-item {
                z-index: 99;
                width: 164px;
                height: $itemheight;
                opacity: 1;
                background: none;
                font-size: 25px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: $itemheight;
                color: rgba(93, 93, 93, 1);
                text-align: center;
                cursor: pointer;

                .iconfont {
                    font-size: 25px;
                }
            }

            .segmented-active {
                background: var(--title-color);
                color: #fff;
            }

            .switch {
                font-size: 20px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: 28.96px;
                color: rgba(56, 56, 56, 1);
                display: flex;
                align-items: center;

                .el-switch {
                    margin-left: 12px;
                    margin-right: 12px;
                }
            }
        }

        :deep(.el-input) {
            width: 451px !important;
            height: 58px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid var(--title-color);
            margin-left: 31px;

            .el-input__wrapper {
                font-size: 25px;
                font-weight: 400;
                padding: 0px 27px;
                box-shadow: none;
            }

            .el-input__suffix {
                .el-input__clear {
                    font-size: 20px;
                }
            }

            .el-input-group__append {
                box-shadow: none;
                padding: 0px !important;
                flex-shrink: 0;
                height: 58px;
                width: 129px;
                opacity: 1;
                background: var(--title-color);
                color: #fff;
                font-size: 25px;
                font-weight: 400;
                cursor: pointer;

                .iconfont {
                    font-size: 25px;
                    margin-right: 10px;
                }
            }
        }
    }
}

.course-box {
    $conwidth: 309px;
    width: $maxWidth;
    display: grid;
    grid-template-columns: repeat(4, $conwidth);
    margin: 0px auto;
    gap: 28px;

    .course-item {
        width: $conwidth;
        background-color: #fff;
        border-radius: 0 0 5px 5px;
        cursor: pointer;

        .course-img-box {
            height: 174px;
            width: 100%;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
            overflow: hidden;

            .course-img {
                height: 174px;
                width: 100%;
                object-fit: cover;
                transition: 0.5s;
            }

            &:hover .course-img {
                transform: scale(1.5);
            }
        }

        .course-name {
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 28.96px;
            color: rgba(0, 0, 0, 1);
            text-align: left;
            padding-top: 17px;
        }

        .course-bottom {
            margin-top: 6px;
            padding-top: 6px;
            border-top: 2px solid var(--bg-color);
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 24px;
            color: rgba(56, 56, 56, 1);
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .iconfont {
                font-size: 19.14px;
                color: var(--title-color);
                margin-right: 9px;
            }
        }
    }
}

.page-bottom {
    width: 100%;
    padding-bottom: 130px;
    margin-top: 65px;
}

@media (max-width: 600px) {
    .page-box {
        .tags-box {
            width: 100%;
            padding: 0 12px;
            box-sizing: border-box;

            .tags {
                .tags-title {
                    font-size: 18px;
                    line-height: 50px;
                }

                .tags-list {
                    width: 100%;
                    height: auto;
                    padding: 16px;
                    box-sizing: border-box;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    grid-template-columns: none;

                    .tags-item {
                        font-size: 16px;
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }

        .search {
            width: 100%;
            padding: 0 12px;
            box-sizing: border-box;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;

            .segmented {
                width: 100%;
                flex-wrap: wrap;

                .segmented-item {
                    width: 25%;
                    font-size: 18px;
                    height: 50px;
                    line-height: 50px;
                }
            }

            :deep(.el-input) {
                width: 100% !important;
                margin-left: 0;

                .el-input__wrapper {
                    font-size: 16px;
                    padding: 0 12px;
                }

                .el-input-group__append {
                    width: 80px;
                    font-size: 16px;
                }
            }
        }
    }

    .course-box {
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        grid-template-columns: repeat(2, calc(50% - 6px));
        gap: 12px;

        .course-item {
            width: 100%;

            .course-img-box {
                height: auto;

                .course-img {
                    height: auto;
                }
            }
        }
    }

    .page-bottom {
        padding-bottom: 40px;
        margin-top: 30px;
        overflow-x: auto;
    }
}
</style>