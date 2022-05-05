<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet"
          href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css">
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript"
            src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"/>
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player"/>
  </div>
</template>

<script>
import vod from "../../api/vod";


export default {
  name: "_id",
  layout: 'video',//应用video布局
//   asyncData({params, error}) {
//     return vod.getAuth(params.id).then(response => {
// // console.log(response.data.data)
//       return {
//         id: params.id,
//         auth: response.data.data.auth
//       }
//     })
//   },
//   mounted() {
//     new Aliplayer({
//       id: 'J_prismPlayer',
//       vid: this.id, // 视频id
//       playauth: this.auth, // 播放凭证
//       encryptType: '1',
//       width: '100%',
//       height: '500px',
//       cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
//       qualitySort: 'asc', // 清晰度排序
//       mediaType: 'video', // 返回音频还是视频
//       autoplay: false, // 自动播放
//       isLive: false, // 直播
//       rePlay: false, // 循环播放
//       preload: true,
//       controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
//       useH5Prism: true, // 播放器类型：html5
//     }, function (player) {
//       console.log('播放器创建成功')
//     })
//   }
  data() {
    return {
      id: "",
      auth: '',
    }
  },
  watch: {
    auth() {
      this.$nextTick(() => {
        //此时就可以获取到在created赋值后的dataList了
        this.getPlayer();
      });
    }
  },
  methods: {
    async getAuth() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        vod.getAuth(this.id).then((response) => {
          if (response.data.code === 20000) {
            this.auth = response.data.data.auth
            console.log(this.auth)
          }
        }).catch(error => {
          this.$message.error(" 数据拉取失败")
        });
      } else {
        await this.$router.push({path: "/course"})
      }
    },
    async getPlayer() {
      console.log(this.id)
      console.log(this.auth)
      new Aliplayer({
        id: 'J_prismPlayer',
        vid: this.id, // 视频id
        playauth: this.auth, // 播放凭证
        encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: '100%',
        height: '500px',
        cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
        qualitySort: 'asc', // 清晰度排序
        mediaType: 'video', // 返回音频还是视频
        autoplay: false, // 自动播放
        isLive: false, // 直播
        rePlay: false, // 循环播放
        preload: true,
        controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
        useH5Prism: true, // 播放器类型：html5
      }, function(player) {
        console.log('播放器创建成功')
      })
    }
  },
  created() {
    this.getAuth()
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>
