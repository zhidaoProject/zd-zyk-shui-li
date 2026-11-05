<!--
 * @Author: JIANG
 * @Date: 2024-12-13 10:32:26
 * @LastEditTime: 2026-11-03 08:57:46
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\views\search.vue
 * 
-->
<template>
    <div class="wrap">
        <div class="professional-banner"></div>
        <div class="main-container">
            <div class="search-bar">
                <div class="tabs">
                    <div
                        class="tabs-item"
                        :class="{'is-active': currentType == 1}"
                        @click="tabsChange(1)"
                    >
                        最热课程
                    </div>
                    <div
                        class="tabs-item"
                        :class="{'is-active': currentType == 2}"
                        @click="tabsChange(2)"
                    >
                        最热微课
                    </div>
                    <div
                        class="tabs-item"
                        :class="{'is-active': currentType == 3}"
                        @click="tabsChange(3)"
                    >
                        最新素材
                    </div>
                </div>
                <div class="search-input">
                    <el-input
                        class="input"
                        v-model="params.courseName"
                        @clear="search"
                        clearable
                    ></el-input>
                    <div class="search-btn" @click="search">搜索</div>
                </div>
            </div>
            <div class="content-list">
                <div
                    class="course-item"
                    @click="goDetail(item)"
                    v-for="(item,index) in list"
                    :key="index"
                >
                    <div class="course-img-box">
                        <img
                            v-show="currentType == 1"
                            class="course-img"
                            :src="item.imageUrl"
                            alt=""
                        />
                        <img v-show="currentType != 1" class="course-img" :src="item.murl" alt="" />
                    </div>
                    <div class="course-name ellipsis">
                        {{ item.name }}
                    </div>
                    <div class="course-tips ellipsis">{{ item.schoolName }}</div>
                    <div class="course-bottom">
                        <div v-show="currentType == 1">
                            <span class="iconfont icon-jiaoshi"></span>
                            {{item.userName}}
                        </div>
                        <div class="" v-show="currentType != 1">
                            <div>
                                <span class="iconfont icon-zu"></span>
                                <span>{{item.fileSizeStr}}</span>
                            </div>
                            <div>
                                <span class="iconfont icon-yanjing1"></span>
                                <span>{{item.view}}</span>
                            </div>
                        </div>
                        <!--  <div>
                                <span class="iconfont icon-yanjing"></span>
                                {{ item.peopleNumber}}
                            </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="page-bottom">
            <el-config-provider :locale="zhCn">
                <el-pagination
                    v-model:current-page="params.pageNum"
                    v-model:page-size="params.pageSize"
                    background
                    layout="prev, pager, next, jumper"
                    :total="total"
                    @size-change="getList"
                    @current-change="getList"
                />
            </el-config-provider>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {ref, onMounted} from "vue"
import { HomeApi } from '@/assets/api/home';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ProfessionalApi } from '@/assets/api/professionalApi';
const professionalApi = new ProfessionalApi();

const homeApi = new HomeApi();
const route = useRoute()

const total = ref(0)
const params = ref<any>({
	pageNum: 1,
	pageSize: 16,
	courseName: ''
})
const list = ref<any>([])

const currentType = ref(1)
const tabsChange = (type: number) => {
	params.value.pageNum = 1
	currentType.value = type
	getList()
}

// 搜索
const search = () => {
	params.value.pageNum = 1
	getList()
}

// 列表
const getList = () => {
	if (currentType.value == 1) {
		getCourseList()
	} else {
		getMaterialList()
	}
}

// 课程列表
const getCourseList = () => {
    homeApi.getCourseList(params.value).then((res) => {
        if (res.code == 200) {
            list.value = res.rows
			total.value = res.total
        }
    })
}

// 素材列表
const getMaterialList = () => {
    professionalApi.getResourceList({
		pageNum: params.value.pageNum,
		pageSize: params.value.pageSize,
		mediaType: currentType.value == 2 ? '微课类' : '',
		keyWord: params.value.courseName,
		sort: 2,
		column: 1
	}).then((res) => {
		if (res.code == 200) {
			total.value = res.total;
			list.value = res.rows
			console.log(list.value);
		}

    });
};

const goDetail = (item: any) => {
	if (currentType.value == 1) {
		window.open(`https://zyk.icve.com.cn/courseDetailed?id=${item.id}`, '_blank', 'noreferrer');
	} else {
		window.open(`https://zyk.icve.com.cn/materialDetailed?id=${item.id}`, '_blank', 'noreferrer');
	}
};


onMounted(() => {
	params.value.courseName = route.query.key
	getList()
})
</script>

<style lang="scss" scoped>
.wrap{
	padding-bottom: 20px;
	background-color: rgba(245, 245, 245, 1);
}
.professional-banner {
	background-image: url('@/assets/images/banner/search-bg.png');
	margin-top: -70px;
}
.main-container{
	width: 1320px;
	margin: auto;
	.search-bar{
		margin-bottom: 38px;
		display: flex;
		justify-content: space-between;
		.tabs{
			display: flex;
			position: relative;
			.tabs-item{
				color: #1570EF;
				font-size: 25px;
				width: 164px;
				height: 58px;
				text-align: center;
				line-height: 58px;
				cursor: pointer;
			}
			.is-active{
				background-color: #1570EF;
				color: #fff;
			}
		}
		.tabs::after{
			content: '';
			display: block;
			position: absolute;
			width: 819px;
			height: 2px;
			background: linear-gradient(90deg, #1570EF 0%, #FFFFFF 100%);
			bottom: 0;
			left: 0;
		}
		.search-input{
			width: 451px;
			height: 58px;
			border: 1px rgba(21, 112, 239, 1) solid;
			display: flex;
			.input{
				width: 322px;
				:deep(.el-input__wrapper) {
					box-shadow: none;
				}
			}
			.search-btn{
				width: 129px;
				height: 58px;
				background-color: rgba(21, 112, 239, 1);
				color: #fff;
				font-size: 25px;
				text-align: center;
				line-height: 58px;
				cursor: pointer;
			}
		}
	}
	.content-list{
		display: flex;
		flex-wrap: wrap;
		gap: 30px 27px;
		.course-item {
                width: 309px;
                background-color: #fff;
                border-radius: 0 0 5px 5px;
                padding-bottom: 4px;
				box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
                cursor: pointer;

                .course-img-box {
                    height: 174px;
                    width: 100%;
                    overflow: hidden;
                    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

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
                    padding: 17px 18px 0px;
                }
                .course-tips {
                    padding: 0px 18px ;
                    font-size: 16px;
                    font-weight: 400;
                    letter-spacing: 0px;
                    line-height: 23.17px;
                    color:  rgba(21, 112, 239, 1);
                    text-align: left;
                    margin-top: 5px;
                }
                .course-bottom {
                    margin: 7px 18px 0px;
                    padding-top: 7px;
                    border-top:2px solid  rgba(21, 112, 239, 0.45);
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
                        font-size: 20px;
                        color: rgba(21, 112, 239, 1);
                        margin-right: 9px;
                    }
					>:nth-child(2) {
						width: 100%;
						display: flex;
						justify-content: space-between;
					}
                }
            }
	}
}

@media (max-width: 600px) {
	.main-container{
		width: 100%;
		padding: 0 12px;
		box-sizing: border-box;
		.search-bar{
			flex-direction: column;
			gap: 16px;
			margin-bottom: 20px;
			.tabs{
				width: 100%;
				.tabs-item{
					font-size: 18px;
					flex: 1;
					width: auto;
					height: 50px;
					line-height: 50px;
				}
			}
			.tabs::after{
				width: 100%;
			}
			.search-input{
				width: 100%;
				box-sizing: border-box;
				.input{
					flex: 1;
					width: auto;
				}
				.search-btn{
					font-size: 18px;
					width: 90px;
				}
			}
		}
		.content-list{
			gap: 12px;
			.course-item{
				width: calc(50% - 6px);
			}
		}
	}
}
</style>