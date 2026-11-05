<!--
 * @Author: JIANG
 * @Date: 2025-07-31 14:37:09
 * @LastEditTime: 2026-11-03 08:55:52
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\views\knowledge\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="btn-box">
            <div
                class="btn1"
                @click="toNext(`https://specialty3d.zhihuishu.com/home/1843599388807663616`)"
            >
                <div class="title">专业图谱</div>
                <div class="more">查看更多</div>
            </div>
            <div class="btn2">
                <div class="title">课程图谱</div>
                <div class="arrows-box">
                    <div class="left-arrow" @click="left">
                        <el-icon size="16px"><Back /></el-icon>
                    </div>
                    <div class="right-arrow" @click="right">
                        <el-icon size="16px"><Right /></el-icon>
                    </div>
                </div>
                <div class="tag">{{bannerList[currentIndex].name}}</div>
                <div class="content">
                    <div class="move-box" :style="{transition: isTr ? 'transform 0.5s' : 'none'}">
                        <div
                            class="item"
                            v-for="(item,index) in bannerList"
                            @click="toNext(item.url)"
                            :key="index"
                        >
                            <div class="img-box">
                                <img class="img" :src="item.img" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import content1 from "@/assets/images/knowledge/content1.png"
import content2 from "@/assets/images/knowledge/content2.png"
import content3 from "@/assets/images/knowledge/content3.png"
import content4 from "@/assets/images/knowledge/content4.png"
import { ref, nextTick } from 'vue';
const bannerList = ref([
	{
		name: '地基基础工程检测',
		img: content3,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102299345293312'
	},
	{
		name: '高性能混凝土实验与检测',
		img: content4,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102530539524096'
	},
	{
		name: '建筑材料与检测',
		img: content1,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102252767547392'
	},
	{
		name: '钢结构工程检测',
		img: content2,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102392630808576'
	},
	{
		name: '地基基础工程检测',
		img: content3,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102299345293312'
	},
	{
		name: '高性能混凝土实验与检测',
		img: content4,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102530539524096'
	},


	{
		name: '建筑材料与检测',
		img: content1,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102252767547392'
	},
	{
		name: '钢结构工程检测',
		img: content2,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102392630808576'
	},
	{
		name: '地基基础工程检测',
		img: content3,
		url: 'https://specialty3d.zhihuishu.com/courseDetail/1843599388807663616/1846102299345293312'
	},
])
const contentShow = ref(false)
const currentIndex = ref(2);
const toNext = (url: string) => {
	window.open(url, '_blank');
}
const isTr = ref(true);


const itemWidth = (document.querySelector('.item') as HTMLElement)?.offsetWidth;
const dom = document.querySelector('.item')
const marginRight =dom ? parseInt(window.getComputedStyle(dom).marginRight) : 0;
const content = document.querySelector('.move-box') as HTMLElement;

const right = async () => {
	if (currentIndex.value < 5) {
		currentIndex.value++;
		content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
	} else {
		isTr.value = false;
		currentIndex.value = 1;
		nextTick(() => {
			content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
			requestAnimationFrame(() => {
				isTr.value = true;
				currentIndex.value = 2;
				content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
			});
		})
	}
}

const left = () => {
	if (currentIndex.value == 2) {
		isTr.value = false;
		currentIndex.value = 6;
		nextTick(() => {
			content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
			requestAnimationFrame(() => {
				isTr.value = true;
				currentIndex.value = 5;
				content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
			});
		})
	} else {
		currentIndex.value--;
		content.style.transform = `translateX(-${currentIndex.value * (itemWidth + marginRight)}px)`;
	}

}
</script>

<style scoped lang="scss">

.page-box {
	background-color: rgba(234, 243, 254, 1);
	height: 1263px;
    .professional-banner {
        background-image: url('@/assets/images/banner/knowledge.jpg');
        margin-top: -70px;
    }

	.btn-box{
		margin-top: 135px;
		display: flex;
		justify-content: center;
		.btn1{
			width: 388px;
			height: 472px;
			background-image: url('@/assets/images/btn1.png');
			background-size: 100% 100%;
			margin-right: 24px;
			padding-top: 30px;
			.title{
				color: #fff;
				font-size: 40px;
				letter-spacing: 10px;
				font-style: italic;
				font-family: YouSheBiaoTiYuan;
				text-align: center;
				margin-bottom: 309px;
			}
			.more{
				width: 110px;
				height: 34px;
				border-radius: 16px;
				background-color: rgba(234, 243, 254, 1);
				border-radius: 16px;
				color: rgba(46, 144, 250, 1);
				font-size: 20px;
				text-align: center;
				line-height: 34px;
				font-weight: bold;
				margin: auto;
				cursor: pointer;
			}

		}
		.btn2{
			width: 908px;
			height: 472px;
			background-image: url('@/assets/images/btn2.png');
			background-size: 100% 100%;
			padding-left: 50px;
			padding-top: 30px;
			position: relative;
			.title{
				color: #fff;
				font-size: 40px;
				letter-spacing: 10px;
				font-style: italic;
				font-family: YouSheBiaoTiYuan;
			}
			.arrows-box{
				position: absolute;
				display: flex;
				gap: 0 12px;
				right: 64px;

				.left-arrow, .right-arrow{
					color: #fff;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					border: 1px solid rgba(255, 255, 255, 1);
					text-align: center;
					line-height: 45px;
					cursor: pointer;
				}
			}
			.tag{
				font-size: 20px;
				font-weight: 700;
				color: #fff;
			}
			.content{
				overflow: hidden;
				margin-top: 34px;
				.move-box{
					display: flex;
					transform: translateX(-610px);

					.item{
						margin-right: 45px;
						.tag{
							font-size: 20px;
							font-weight: 700;
							color: #fff;
						}
						.img-box{
							width: 260px;
							height: 260px;
							border-radius: 27px;
							border: 6px solid rgba(255, 255, 255, 0.8);
							box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.26);
							overflow: hidden;
							display: flex;
							align-items: center;
							justify-content: center;
							background-color: rgba(245, 245, 245, 1);
							.img{
								width: 110%;
								height: 110%;
								border-radius: 27px;
								object-fit: cover;
							}
						}

					}
				}
			}
		}
	}

}

@media (max-width: 600px) {
	.page-box {
		height: auto;
		padding-bottom: 40px;

		.btn-box {
			margin-top: 40px;
			flex-direction: column;
			align-items: center;
			gap: 20px;

			.btn1 {
				width: calc(100% - 32px);
				height: 280px;
				box-sizing: border-box;
				margin-right: 0;

				.title {
					font-size: 26px;
					letter-spacing: 4px;
					margin-bottom: 160px;
				}

				.more {
					font-size: 18px;
				}
			}

			.btn2 {
				width: calc(100% - 32px);
				height: 280px;
				box-sizing: border-box;
				padding-left: 20px;
				padding-top: 20px;

				.title {
					font-size: 26px;
					letter-spacing: 4px;
				}

				.arrows-box {
					right: 20px;

					.left-arrow,
					.right-arrow {
						width: 32px;
						height: 32px;
						line-height: 36px;
					}
				}

				.content {
					margin-top: 18px;

					.move-box {
						.item {
							margin-right: 20px;

							.img-box {
								width: 160px;
								height: 160px;
								border-width: 4px;
							}
						}
					}
				}
			}
		}
	}
}
</style>