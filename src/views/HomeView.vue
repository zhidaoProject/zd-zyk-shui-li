<!--
 * @Author: ZHAO
 * @Date: 2024-10-14 10:11:10
 * @LastEditTime: 2026-11-03 08:54:04
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\views\HomeView.vue
 * 
-->
<template>
    <div class="homePage">
        <el-carousel class="banner-box">
            <el-carousel-item
                class="banner-item"
                v-for="item in projectInfo?.projectBanners"
                :key="item.id"
            >
                <el-image class="banner-img" fit="cover" :src="item.imageUrl"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="search-box">
        <el-input
            v-model="searchKey"
            class="search-input"
            placeholder="请输入关键词搜索课、微课、素材"
            @keyup.enter="toSearch"
        ></el-input>
        <el-icon class="icon" @click="toSearch">
            <Search />
        </el-icon>
    </div>
    <div class="wrap1">
        <div class="test-user">
            <div class="user-item" @click="toOption('course', '0')">
                <img src="@/assets/images/home/user1.png" alt="" />
                <div class="item-box">学生用户</div>
            </div>
            <div class="user-item" @click="toOption('course', '0')">
                <img src="@/assets/images/home/user2.png" alt="" />
                <div class="item-box">教师用户</div>
            </div>
            <div class="user-item" @click="toOption('sourceMaterial')">
                <img src="@/assets/images/home/user3.png" alt="" />
                <div class="item-box">社会用户</div>
            </div>
            <div class="user-item" @click="toOption('trainingCenter', '0')">
                <img src="@/assets/images/home/user4.png" alt="" />
                <div class="item-box">企业用户</div>
            </div>
        </div>
        <div class="little-title">
            <div class="line-l"></div>
            <div class="title-box">资源库简介</div>
            <div class="line-r"></div>
        </div>
        <div class="intro">
            <img class="data-img" loading="lazy" src="@/assets/images/home/home-data.png" />
            <div class="text-box">
                <div class="data-text" v-html="data.text"></div>
                <!-- <div class="view" @click="goPage('/projectInfo')">查看详情>></div> -->
            </div>
        </div>
        <div class="data-statistics">
            <div class="statistics-item">
                <div class="icon-box">
                    <i class="iconfont icon-wodekecheng"></i>
                </div>

                <div>
                    <span>课程统计</span>
                    <span>{{ statistics.courseNumber }}</span>
                </div>
            </div>
            <div class="statistics-item">
                <div class="icon-box">
                    <i class="iconfont icon-wodekecheng"></i>
                </div>
                <div>
                    <span>微课统计</span>
                    <span>{{ statistics.smallCourse }}</span>
                </div>
            </div>
            <div class="statistics-item">
                <div class="icon-box">
                    <i class="iconfont icon-wodekecheng"></i>
                </div>
                <div>
                    <span>素材统计</span>
                    <span>{{ statistics.resourceNumber }}</span>
                </div>
            </div>
            <div class="statistics-item">
                <div class="icon-box">
                    <i class="iconfont icon-wodekecheng"></i>
                </div>
                <div>
                    <span>用户统计</span>
                    <span>{{ statistics.userNumber }}</span>
                </div>
            </div>
        </div>
        <div class="data-statistics-box">
            <div class="data-wrap">
                <div class="little-title">
                    <div class="line-l"></div>
                    <div class="title-box">行业资讯</div>
                    <div class="line-r"></div>
                </div>
                <div class="news">
                    <div
                        v-for="item in newsList"
                        :key="item.Id"
                        class="nes-item"
                        @click="toNext(item.linkUrl)"
                    >
                        <div class="block"></div>
                        <div class="content">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="talent-training-program">
            <div class="left" v-html="constructState.trainingProgram"></div>
            <div class="right">
                <img src="@/assets/images/home/tag1.png" alt="" loading="lazy" />
                <div class="btn" @click="toOption('professional', '4')">查看更多</div>
            </div>
        </div>
        <div class="little-title">
            <div class="line-l"></div>
            <div class="title-box">课程中心</div>
            <div class="line-r"></div>
        </div>
        <div class="course-list">
            <div
                class="course-item"
                v-for="item in data.courseList"
                :key="item.id"
                @click="toNext(`https://zyk.icve.com.cn/courseDetailed?id=${item.id}`)"
            >
                <div class="img-item-box">
                    <img :src="item.imageUrl" alt="" loading="lazy" />
                </div>
                <div class="text-box">
                    <div>{{ item.name }}</div>
                    <div>{{ item.schoolName }}</div>
                    <div>
                        <div>
                            <i class="iconfont icon-jiaoshi"></i>
                            <span>{{ item.userName }}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-yanjing"></i>
                            <span>{{ item.pageView }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="more-btn" @click="toOption('course', '0')">查看更多</div>
    </div>
    <div class="politics-box">
        <div class="more-btn t1" @click="toOption('research', '0')">查看更多</div>
    </div>
    <div class="question-bank">
        <div class="little-title">
            <div class="line-l"></div>
            <div class="title-box">评测考核试题库</div>
            <div class="line-r"></div>
        </div>
        <div class="question-bank-box">
            <div
                class="question-bank-item"
                :class="{ 'is-active': qusetionBankIndex == 1 }"
                @mouseenter="handleMouseenter(1)"
                @click="toOption('popularization', '0')"
            >
                <div class="item-text-box">
                    <img
                        src="@/assets/images/home/question-bank-title1.png"
                        alt=""
                        loading="lazy"
                    />
                    <i class="iconfont icon-kecheng"></i>
                </div>
            </div>
            <div
                class="question-bank-item"
                :class="{ 'is-active': qusetionBankIndex == 2 }"
                @mouseenter="handleMouseenter(2)"
                @click="toOption('popularization', '1')"
            >
                <div class="item-text-box">
                    <img
                        src="@/assets/images/home/question-bank-title2.png"
                        alt=""
                        loading="lazy"
                    />
                    <i class="iconfont icon-kecheng"></i>
                </div>
            </div>
            <div
                class="question-bank-item"
                :class="{ 'is-active': qusetionBankIndex == 3 }"
                @mouseenter="handleMouseenter(3)"
                @click="toOption('popularization', '2')"
            >
                <div class="item-text-box">
                    <img
                        src="@/assets/images/home/question-bank-title3.png"
                        alt=""
                        loading="lazy"
                    />
                    <i class="iconfont icon-kecheng"></i>
                </div>
            </div>
            <div
                class="question-bank-item"
                :class="{ 'is-active': qusetionBankIndex == 4 }"
                @mouseenter="handleMouseenter(4)"
                @click="toOption('popularization', '3')"
            >
                <div class="item-text-box">
                    <img
                        src="@/assets/images/home/question-bank-title4.png"
                        alt=""
                        loading="lazy"
                    />
                    <i class="iconfont icon-kecheng"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="vr">
        <div class="more-btn"  @click="toNext('https://strs.icve.com.cn/blueroomDetail?info=eyJpZCI6IjQyNmEyNzUzZGQzZTQ3OTBiNmYzYzQ2MGEzMDY4MmJlIiwiaXNGb2N1cyI6ZmFsc2V9')">查看更多</div>
    </div>
    <div class="atlas">
        <div class="little-title">
            <div class="line-l"></div>
            <div class="title-box">知识图谱</div>
            <div class="line-r"></div>
        </div>
        <div class="atlas-content">
            <div
                class="atlas-item"
                @click="toNext('https://specialty3d.zhihuishu.com/home/1843599388807663616')"
            >
                <div class="title-box">
                    <div class="">地基基础工程检测</div>
                    <div class="">专业核心课程</div>
                </div>
            </div>
            <div
                class="atlas-item"
                @click="toNext('https://specialty3d.zhihuishu.com/home/1843599388807663616')"
            >
                <div class="title-box">
                    <div class="">钢结构工程检测</div>
                    <div class="">专业核心课程</div>
                </div>
            </div>
            <div
                class="atlas-item"
                @click="toNext('https://specialty3d.zhihuishu.com/home/1843599388807663616')"
            >
                <div class="title-box">
                    <div class="">建筑材料与检测</div>
                    <div class="">专业核心课程</div>
                </div>
            </div>
            <div
                class="atlas-item"
                @click="toNext('https://specialty3d.zhihuishu.com/home/1843599388807663616')"
            >
                <div class="title-box">
                    <div class="">高性能混凝土试验与检测</div>
                    <div class="">专业核心课程</div>
                </div>
            </div>
        </div>
    </div>

    <div class="team-box">
        <div class="little-title">
            <div class="line-l"></div>
            <div class="title-box">参建团队</div>
            <div class="line-r"></div>
        </div>
        <div class="team-wrap">
            <div class="team-content">
                <div class="team-tag1"></div>
                <div class="school-box">
                    <div
                        class="school-item"
                        v-for="item in projectInfo?.projectGroupInfo?.presidingUnitName"
                    >
                        {{ item }}
                    </div>
                </div>
                <div class="team-tag2"></div>
                <div class="unit-box">
                    <div
                        class="school-item"
                        v-for="item in projectInfo?.projectGroupInfo?.joinUnit"
                    >
                        <!-- <div v-html="item"></div> -->
                        {{ item }}
                    </div>
                </div>
                  <div class="team-tag3"></div>
                <div class="unit-box">
                    <div
                        class="school-item"
                        v-for="item in projectInfo?.companyList"
                    >
                        <!-- <div v-html="item"></div> -->
                        {{ item.unitName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
import {getNewsList} from "@/assets/api/common"
const { proxy } = getCurrentInstance();
import { useRouter } from 'vue-router';
import { HomeApi } from '@/assets/api/home';
import {ElMessage} from "element-plus"
const router = useRouter();
const homeApi = new HomeApi();
let data = reactive<any>({
    text: "",
    courseList: []
});
let statistics = ref({
    userNumber: 0,
    courseNumber: 0,
    courseInfoNumber: 0,
    resourceNumber: 0,
    smallCourse: 0
});

const constructState = reactive({
    type: 2,
    trainingProgram: ''
})

const toNext = (url: any) => {
    window.open(url, '_blank', 'noreferrer');
};
// 轮播图
const projectInfo = ref<any>();
const gatProjectInfo = () => {
    homeApi.projectInfo().then((res) => {
        // res.data.projectGroupInfo.joinUnit = res.data.projectGroupInfo.joinUnit.split(',').map((item: any) => {
        //     item = item.replace("(", '<br/>(')
        //     return item
        // });
        res.data.projectGroupInfo.joinUnit = res.data.projectGroupInfo.joinUnit.split(',')

        res.data.projectGroupInfo.presidingUnitName =
            res.data.projectGroupInfo.presidingUnitName.split(',');
        projectInfo.value = res.data;
        console.log(projectInfo.value,"------projectInfo");
        
    });
};

const getCourseList = () => {
    homeApi.getCourseList({
        pageNum: 1,
        pageSize: 8,
        courseType: '学历课程'
    }).then((res) => {
        if (res.code == 200) {
            data.courseList = res.rows
        }
    })
}

const toOption = (url: string, index?: string) => {
    if (index) {
        router.push(`/${url}?index=${index}`);
        proxy.bus.emit(`${url}Reload`, index);
    } else {
        router.push(`/${url}`);
    }

};

const qusetionBankIndex = ref(1)
const timer = ref<any>(null)
const handleMouseenter = (index: any) => {
    if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
    }
    timer.value = setTimeout(() => {
        qusetionBankIndex.value = index
    }, 100)
}

const searchKey = ref('')
const toSearch = () => {
    if (!searchKey.value) {
        ElMessage({
            type: 'error',
            message: "请输入搜索内容"
        })
        return
    }
    router.push({
        path: '/search',
        query: {
            key: searchKey.value
        }
    })
}

const newsList = ref()


onMounted(() => {
    getCourseList()
    homeApi.projectGroupInfo().then((res) => {
        constructState.trainingProgram = res.data?.projectMajor[0]?.trainingProgram
        data.text = res.data.projectGroupInfo.introduce;
    });
    homeApi.statisticsAllInfo().then((res) => {
        statistics.value = res.data;
    });
    gatProjectInfo();
    getNewsList({typeId:'cdb62bab5c204cb0b3017a4bb4befb72'}).then((res) => {
        console.log(JSON.parse(res.newslist).obj, '====reererere');
        newsList.value = JSON.parse(res.newslist).obj

    })

});
</script>
<style scoped lang="scss">
.homePage {
    .banner-box {
        width: 100%;
        height: 533px;
        margin-top: -70px;

        .banner-item {
            height: 533px;

            .banner-img {
                background-color: aqua;
                width: 100%;
                height: 100%;
            }
        }

        :deep(.el-carousel__arrow) {
            background-color: rgba($color: #000000, $alpha: 0.5);
            top: 250px;
            width: 50px;
            height: 50px;

            i {
                font-size: 20px;
            }

            &:hover {
                background-color: #000000;
            }
        }
    }
}

.search-box {
    position: sticky;
    top: 0;
    width: 752px;
    height: 72px;
    border-radius: 217px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.25);
    margin: -36px auto 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .search-input {
        width: 680px;
        height: 60px;

        :deep(.el-input__wrapper) {
            box-shadow: none;
            padding: 0;
        }
    }

    .icon {
        font-size: 30px;
        color: #2E90FA;
        cursor: pointer;
    }
}

.wrap1 {
    height: 2156px;
    background-image: url('@/assets/images/home/wrap1-bg.png');
    background-size: 100% 100%;
    padding-bottom: 26px;
    position: relative;

    .test-user {
        width: 1320px;
        height: 112px;
        // background-image: url('@/assets/images/home/fourUser.png');
        background-size: 100% 100%;
        margin: 37px auto 20px;
        display: flex;
        justify-content: space-evenly;
        position: relative;

        .user-item{
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
                // width: 76px;
                height: 110px;
                margin-right: 20px;
            }
            .item-box{
                width: 104px;
                height: 28px;
                opacity: 1;
                border-radius: 16px;
                background: rgba(46, 144, 250, 0.1);
                box-shadow: 0px 0px 4px  rgba(0, 0, 0, 0.25);
                color: rgba(46, 144, 250, 1);
                font-weight: bold;
                text-align: center;
                line-height: 28px;
                &::before{
                    content: '';
                    width: 9px;
                    height: 9px;
                    opacity: 1;
                    background: rgba(46, 144, 250, 1);
                    display: inline-block;
                    border-radius: 50%;
                    margin-right: 6px;
                }
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 1320px;
            height: 7px;
            opacity: 1;
            border-radius: 225px;
            background: rgba(21, 112, 239, 1);
        }
    }

    .intro {
        margin: 50px auto 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1320px;

        .data-img {
            width: 514px;
            height: 306px;
            margin-right: 38px;
        }

        .text-box {
            position: relative;
            height: 362px;
            width: 683px;
            // padding-top: 20px;

            .data-text {
                padding-right: 20px;
                height: 362px;
                font-size: 20px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: 40px;
                color: rgba(0, 0, 0, 1);
                text-align: left;
                overflow: auto;

            }

            .view {
                width: 167px;
                height: 40px;
                background-color: #0A7860;
                color: #fff;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                margin: 20px auto 0;
                cursor: pointer;
            }
        }
    }

    .data-statistics {
        width: 1226px;
        height: 125px;
        font-family: YouSheBiaoTiYuan;
        font-style: italic;
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        margin: auto;

        .statistics-item {
            display: flex;
            align-items: center;

            .icon-box {
                font-size: 30px;
                width: 49px;
                height: 49px;
                border-radius: 50%;
                background-color: #1570EF;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    color: #fff;
                    font-size: 30px;
                }
            }
        }
    }

    .data-statistics-box {
        width: 1320px;
        height: 322px;
        background-image: url('@/assets/images/home/data-bg.png');
        background-repeat: no-repeat;
        background-position: right 0;
        background-size: 561px 321px;
        margin: auto;

        .data-wrap {
            width: 715px;
            height: 322px;

            .news{
                padding-left: 20px;
                height: 260px;
                overflow-y: scroll;
                .nes-item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    cursor: pointer;
                    .block{
                        margin-right: 10px;
                        width: 9px;
                        height: 9px;
                        transform: rotate(-45deg);
                        background: rgba(255, 255, 255, 0.47);
                        border: 1px solid rgba(21, 112, 239, 0.54);
                        box-shadow: 0px 0px 4px  rgba(33, 144, 255, 0.59);
                        filter: blur(8rpx);
                    }
                    .content{
                        font-size: 20px;
                        width: 650px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &:hover {
                            color: rgba(21, 112, 239, 1);
                        }
                    }
                }
            }
        }
    }

    .course-list {
        width: 1320px;
        display: flex;
        flex-wrap: wrap;
        margin: 26px auto 42px;
        gap: 20px 14px;

        .course-item {
            width: 319px;
            height: 274px;
            background-color: #fff;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
            cursor: pointer;

            .img-item-box {
                width: 319px;
                height: 180px;
                overflow: hidden;

                &:hover img {
                    transform: scale(1.2);
                }

                img {
                    width: 319px;
                    height: 180px;
                    object-fit: cover;
                    transition: .5s;
                }
            }

            .text-box {
                height: 95px;
                padding: 9px;

                >:nth-child(3) {
                    display: flex;
                    justify-content: space-between;

                    >div {
                        i {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }

    .talent-training-program {
        width: 1320px;
        height: 236px;
        padding: 37px 0px 37px 58px;
        background-color: #1570EF;
        display: flex;
        align-items: center;
        margin: 18px auto 0;
        box-shadow: 0px 0px 10px  rgba(0, 0, 0, 0.25);

        .left {
            width: 808px;
            height: 162px;
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            text-indent: 1em;
            vertical-align: top;
            display: inline-flex;
            flex-wrap: wrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
        }

        .right {
            img {
                margin-bottom: 25px;
            }

            .btn {
                width: 110px;
                height: 34px;
                border-radius: 16px;
                background: #EAF3FE;
                box-shadow: 0px 0px 4px  rgba(0, 0, 0, 0.25);
                text-align: center;
                line-height: 34px;
                color: #2E90FA;
                font-size: 20px;
                font-weight: bold;
                margin: auto;
                cursor: pointer;
            }
        }
    }











    .home-data-list {
        display: flex;
        justify-content: center;
        gap: 140px;
        margin-bottom: 30px;

        .list-item {
            display: flex;
            align-items: center;

            .item-img {
                width: 55px;
                height: 55px;
                margin-right: 20px;
            }

            .item-text {
                font-size: 20px;
                font-weight: bold;

                .text-tips {
                    font-size: 20px;
                    font-weight: bold;
                    color: #0A7860;
                }
            }
        }
    }

    .user-text-box {
        width: 1320px;
        height: 290px;
        margin: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .25);
        display: flex;

        .content-box {
            width: 1008px;
            height: 290px;
            flex-shrink: 0;
            padding: 176px 61px 15px 229px;
            position: relative;
            background-size: 100% 100%;
            background-repeat: no-repeat;

            >h4 {
                font-size: 14px;
                color: #fff;
                font-weight: 500;
                text-shadow: 0px 2px 2px #000000;
                display: flex;
                align-items: center;

                .round {
                    width: 11px;
                    height: 11px;
                    background-color: #0A7860;
                    border: #fff 2px solid;
                    border-radius: 50%;
                    margin-right: 9px;
                }
            }

            .text {
                color: #fff;
                text-indent: 2em;
                text-shadow: 0px 2px 2px #000000;
            }

            .see-btn {
                width: 97px;
                height: 25px;
                border: 1px solid #fff;
                color: #fff;
                text-align: center;
                background-color: #0A7860;
                font-size: 14px;
                position: absolute;
                right: 69px;
                bottom: 15px;
                cursor: pointer;
            }
        }

        .tab-box {
            flex-shrink: 0;
            padding: 81px 25px;
            font-size: 25px;
            color: #0A7860;

            .tab-item {
                height: 75px;
                line-height: 75px;
                cursor: pointer;

                >span {
                    font-weight: bold;
                }

                >i {
                    font-size: 26px;
                    margin-right: 22px;
                }
            }

            .active {
                background-color: #0A7860;
                color: #fff;
                padding: 0 45px;
                margin-left: -61px;
                box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.25);
                border-radius: 7px;
                position: relative;
                z-index: 999;
            }
        }
    }

}

.politics-box {
    background-image: url("@/assets/images/home/bg1.png");
    background-size: 100% 100%;
    height: 278px;
    position: relative;

    .t1 {
        background-color: #FFEBEB;
        color: #AB090E;
        position: absolute;
        top: 172px;
        left: 658px;
    }
}

.question-bank {
    height: 568px;
    background-image: url('@/assets/images/home/bg2.png');
    background-size: 100% 100%;
    padding-top: 32px;

    .question-bank-box {
        width: 1320px;
        height: 419px;
        margin: auto;
        display: flex;
        align-items: center;

        .question-bank-item {
            width: 185px;
            height: 100%;
            transition: 0.5s;

            .item-text-box {
                padding: 35px 0 0 20px;
                transition: .5s;

                img {
                    width: 150px;
                    height: 26px;
                    margin-right: 24px;
                    transition: .5s;
                }

                i {
                    color: rgba(255, 255, 255, 1);
                    text-shadow: 0px 0px 5px rgba(0, 61, 145, 1);
                    font-size: 37px;
                    display: block;
                    margin-left: 55px;
                    transition: .5s;
                }
            }

        }

        @for $i from 1 through 4 {
            > :nth-child(#{$i}) {
                background: url('@/assets/images/home/question-bank-bg#{$i}.png') no-repeat center;
                background-size: 740px 419px;
                object-fit: cover;
            }
        }

        .is-active {
            height: 100%;
            width: 740px;

            .item-text-box {
                padding: 36px 56px;
                display: flex;
                align-items: center;

                img {
                    width: 168px;
                    height: 36px;
                    margin-right: 24px;
                }

                i {
                    color: rgba(255, 255, 255, 1);
                    text-shadow: 0px 0px 5px rgba(0, 61, 145, 1);
                    font-size: 37px;
                    margin-left: 0px;
                }
            }
        }
    }
}

.vr {
    height: 278px;
    background-image: url('@/assets/images/home/vrBg.png');
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 32px;

    .more-btn {
        background-color: #EAF3FE;
        position: absolute;
        top: 172px;
        left: 658px;
    }
}

.atlas {
    margin-bottom: 10px;

    .atlas-content {
        width: 1320px;
        margin: auto;
        display: flex;
        gap: 15px;

        .atlas-item {
            width: 319px;
            height: 433px;
            position: relative;
            margin-bottom: 159px;
            transition: .5s;
            cursor: pointer;

            .title-box {
                height: 146px;
                border-radius: 27px;
                background: linear-gradient(180deg, #2786FC 10%, transparent 100%);
                padding: 20px 0 0 40px;

                >:nth-child(1) {
                    font-size: 30px;
                    font-weight: bold;
                    color: #ffffff;
                    width: 240px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                >:nth-child(2) {
                    font-size: 20px;
                    color: #fff;

                }
            }
        }

        .atlas-item:hover {
            transform: translate(0px, -10px);

            &::after {
                transform: translate(0px, 20px);
            }
        }

        @for $i from 1 through 4 {
            > :nth-child(#{$i}) {
                background-image: url('@/assets/images/home/atlas#{$i}.png');
                background-size: 100% 100%;

                &::after {
                    content: '';
                    display: block;
                    width: 319px;
                    height: 159px;
                    background-image: url('@/assets/images/home/inverted#{$i}.png');
                    background-size: 100% 100%;
                    position: absolute;
                    bottom: -159px;
                    transition: .5s;
                }
            }
        }
    }
}

// 建设团队
.team-box {
    background-image: url('@/assets/images/home/teamBg.png');
    background-repeat: no-repeat;
    background-color: #6fb6ff;
    background-size: 100%;
    margin-top: 7px;

    .little-title {
        .line-l {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
        }

        .title-box {
            color: #fff;
            text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
        }

        .line-r {
            background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
            box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
        }
    }

    .team-wrap {
        width: 1320px;
        margin: auto;

        .team-content {
            margin-top: 20px;

            .team-tag1 {
                background-image: url("@/assets/images/home/teamTag1.png");
                background-size: 100% 100%;
                width: 393px;
                height: 45px;
                margin-bottom: 54px;
            }

            .team-tag2 {
                background-image: url("@/assets/images/home/teamTag2.png");
                background-size: 100% 100%;
                width: 393px;
                height: 45px;
                margin-bottom: 54px;
            }

            .team-tag3 {
                background-image: url("@/assets/images/home/teamTag3.png");
                background-size: 100% 100%;
                width: 393px;
                height: 45px;
                margin-bottom: 54px;
            }
            .school-box,
            .unit-box {
                display: flex;
                flex-wrap: wrap;
                font-size: 20px;

                .school-item {
                    width: 33.3%;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    padding: 0 10px;
                    margin-bottom: 30px;
                    color: #fff;
                    font-size: 22px;
                    text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
                    text-align: center;
                }
            }
        }
    }
}

.little-title {
    font-family: YouSheBiaoTiYuan;
    display: flex;
    justify-content: center;
    align-items: center;

    .line-l {
        width: 82px;
        height: 5px;
        background: linear-gradient(90deg, #FFFFFF 0%, #1570EF 100%);
        border-radius: 65px;
    }

    .title-box {
        font-style: italic;
        font-size: 40px;
        color: #1D75F0;
        margin: 0 10px;
    }

    .line-r {
        width: 82px;
        height: 5px;
        background: linear-gradient(90deg, #1570EF 0%, #FFFFFF 100%);
        border-radius: 65px;
    }
}






.more-btn {
    cursor: pointer;
    width: 110px;
    height: 34px;
    opacity: 1;
    border-radius: 16px;
    background: rgba(46, 144, 250, 0.1);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    line-height: 34px;
    margin: auto;
    font-size: 20px;
    color: #2E90FA;
    font-weight: 700;
}

@media (max-width: 600px) {
    .homePage {
        .banner-box {
            height: 220px;
            margin-top: 0;

            .banner-item {
                height: 220px;
            }

            :deep(.el-carousel__arrow) {
                top: 90px;
                width: 34px;
                height: 34px;
            }
        }
    }

    .search-box {
        width: calc(100% - 24px);
        height: 48px;
        padding-left: 14px;
        box-sizing: border-box;
        margin-top: -10px;

        .search-input {
            width: 82%;
            height: 42px;
        }

        .icon {
            font-size: 22px;
            margin-right: 12px;
        }
    }

    .wrap1 {
        height: auto;
        background-size: cover;
        background-position: center;

        .test-user {
            width: 100%;
            height: auto;
            padding: 18px 8px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px;

            .user-item {
                img {
                    height: 56px;
                }

                .item-box {
                    width: 84px;
                }
            }

            &::after {
                width: 90%;
                left: 5%;
            }
        }

        .intro {
            width: 100%;
            flex-direction: column;
            padding: 0 16px;
            box-sizing: border-box;

            .data-img {
                width: 100%;
                height: auto;
                margin: 0 0 16px;
            }

            .text-box {
                width: 100%;
                height: auto;

                .data-text {
                    height: auto;
                    font-size: 16px;
                    line-height: 30px;
                }
            }
        }

        .data-statistics {
            width: 100%;
            height: auto;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px 30px;
            font-size: 22px;

            .statistics-item {
                .icon-box {
                    width: 36px;
                    height: 36px;

                    i {
                        font-size: 22px;
                    }
                }
            }
        }

        .data-statistics-box {
            width: 100%;
            height: auto;
            min-height: 260px;
            background-size: cover;
            background-position: center;

            .data-wrap {
                width: 100%;
                height: auto;

                .news {
                    height: 220px;

                    .nes-item .content {
                        width: 100%;
                        font-size: 16px;
                    }
                }
            }
        }

        .course-list {
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
            gap: 12px;

            .course-item {
                width: calc(50% - 6px);
                height: auto;

                .img-item-box {
                    width: 100%;
                    height: auto;

                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }

        .talent-training-program {
            width: 100%;
            height: auto;
            flex-direction: column;
            padding: 20px 16px;
            box-sizing: border-box;
            justify-content: flex-start;

            .left {
                width: 100%;
                height: auto;
                font-size: 16px;
                line-height: 28px;
                -webkit-line-clamp: unset;
            }

            .right {
                margin-top: 12px;
            }
        }
    }

    .politics-box {
        height: 160px;

        .t1 {
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .question-bank {
        height: auto;
        padding: 24px 0;

        .question-bank-box {
            width: 100%;
            height: 300px;

            .question-bank-item {
                width: 25%;

                .item-text-box {
                    padding: 20px 0 0 8px;

                    img {
                        width: 96%;
                        height: auto;
                        margin-right: 0;
                    }

                    i {
                        font-size: 22px;
                        margin-left: 18px;
                    }
                }
            }

            .is-active {
                width: 40%;

                .item-text-box {
                    padding: 12px;
                    display: block;

                    img {
                        width: 100%;
                        height: auto;
                        margin: 0;
                    }

                    i {
                        font-size: 22px;
                        margin: 8px 0 0 8px;
                    }
                }
            }
        }
    }

    .vr {
        height: 160px;

        .more-btn {
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .atlas {
        .atlas-content {
            width: 100%;
            flex-wrap: wrap;
            padding: 0 16px;
            box-sizing: border-box;
            gap: 10px;

            .atlas-item {
                width: calc(50% - 5px);
                height: 190px;
                margin-bottom: 20px;

                .title-box {
                    height: 86px;
                    padding: 14px 0 0 16px;

                    > :nth-child(1) {
                        font-size: 20px;
                        width: 100%;
                    }

                    > :nth-child(2) {
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .team-box {
        .team-wrap {
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;

            .team-content {
                .team-tag1,
                .team-tag2,
                .team-tag3 {
                    width: 100%;
                    height: 34px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: left center;
                    margin-bottom: 24px;
                }

                .school-box,
                .unit-box {
                    .school-item {
                        width: 100%;
                        font-size: 16px;
                    }
                }
            }
        }
    }

    .little-title {
        .title-box {
            font-size: 26px;
        }

        .line-l,
        .line-r {
            width: 46px;
        }
    }
}

::-webkit-scrollbar {
    width: 7px;
    /* 设置滚动条的宽度 */
    margin-right: 500px;
}

::-webkit-scrollbar-track {
    background: #cccccc;
    /* 设置轨道的背景颜色 */
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: #1570EF;
    border-radius: 5px;
}

/* Firefox浏览器的滚动条滑块样式 */
scrollbar-thumb {
    background-color: #1570EF;
    border-radius: 5px;
}

scrollbar {
    width: 7px;
}

scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
}

:deep(strong) {
    padding-left: 2em;
    font-weight: bold;
}
</style>