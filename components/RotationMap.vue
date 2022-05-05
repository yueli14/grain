<template>
  <!-- 幻灯片 开始 -->
  <div v-swiper:mySwiper="swiperOption" class="container">
    <div class="swiper-wrapper">
      <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
        <a target="_blank" :href="banner.linkUrl">
          <img :src="banner.imageUrl" :alt="banner.title">
        </a>
      </div>
      <!--      <div class="swiper-slide" style="background: #040B1B;">-->
      <!--        <a target="_blank" href="/">-->
      <!--          <img src="~/assets/photo/banner/1525939573202.jpg" alt="首页banner">-->
      <!--        </a>-->
      <!--      </div>-->
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
  </div>
  <!-- 幻灯片 结束 -->

</template>


<script>
import banner from "../api/banner";

export default {
  name: "RotationMap",
  data() {
    return {
      swiperOption: {
//配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
//配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        },
        loop: true,
        effect: 'coverflow',
        speed: 1000,
        autoplay: {
          delay: 2500, //2.5秒切换一次
          pauseOnMouseEnter: true, //悬停停止切换
        }
      },
      bannerList: [],
    }
  },
  mounted() {

    this.getBanner()
  },
  methods: {
    async getBanner() {
      let r = await banner.getAllBanner()
      // console.log(r)
      if (r.data.code === 20000) {
        this.bannerList = r.data.data.bannerList
      } else {
        this.$message.warning("数据拉取失败，请重试")
      }
    }
  }
}
</script>

<style scoped>

</style>
