<template>
  <div>
    <div id="aCoursesList" class="bg-fa of">
      <!-- /课程详情 开始 -->
      <section class="container">
        <section class="path-wrap txtOf hLh30">
          <a href="/" title class="c-999 fsize14">首页</a>
          \
          <a href="/course" title class="c-999 fsize14">{{ course.subjectLevelOne }}</a>
          \
          <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
        </section>
        <div>
          <article class="c-v-pic-wrap" style="height: 357px;">
            <section class="p-h-video-box" id="videoPlay">
              <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
            </section>
          </article>
          <aside class="c-attr-wrap">
            <section class="ml20 mr15">
              <h2 class="hLh30 txtOf mt15">
                <span class="c-fff fsize24">{{ course.title }}</span>
              </h2>
              <section class="c-attr-jg">
                <span class="c-fff">价格：</span>
                <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
              </section>
              <section class="c-attr-mt c-attr-undis">
                <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
              </section>
              <section class="c-attr-mt of">
<span class="ml10 vam">
<em class="icon18 scIcon"></em>
<a class="c-fff vam" title="收藏" href="#">收藏</a>
</span>
              </section>
              <section class="c-attr-mt" v-if="course.price===0">
                <a href="" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
              </section>
              <section class="c-attr-mt" v-else>
                <a href="#" @click="createOrder" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
              </section>
            </section>
          </aside>
          <aside class="thr-attr-box">
            <ol class="thr-attr-ol clearfix">
              <li>
                <p>&nbsp;</p>
                <aside>
                  <span class="c-fff f-fM">购买数</span>
                  <br>
                  <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
                </aside>
              </li>
              <li>
                <p>&nbsp;</p>
                <aside>
                  <span class="c-fff f-fM">课时数</span>
                  <br>
                  <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
                </aside>
              </li>
              <li>
                <p>&nbsp;</p>
                <aside>
                  <span class="c-fff f-fM">浏览数</span>
                  <br>
                  <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
                </aside>
              </li>
            </ol>
          </aside>
          <div class="clear"></div>
        </div>
        <!-- /课程封面介绍 -->
        <div class="mt20 c-infor-box">
          <article class="fl col-7">
            <section class="mr30">
              <div class="i-box">
                <div>
                  <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                    <a name="c-i" class="current" title="课程详情">课程详情</a>
                  </section>
                </div>
                <article class="ml10 mr10 pt20">
                  <div>
                    <h6 class="c-i-content c-infor-title">
                      <span>课程介绍</span>
                    </h6>
                    <div class="course-txt-body-wrap">
                      <section class="course-txt-body">
                        <p>
                          {{ course.description }}
                        </p>
                      </section>
                    </div>
                  </div>
                  <!-- /课程介绍 -->
                  <div class="mt50">
                    <h6 class="c-g-content c-infor-title">
                      <span>课程大纲</span>
                    </h6>
                    <section class="mt20">
                      <div class="lh-menu-wrap">
                        <menu id="lh-menu" class="lh-menu mt10 mr10">
                          <ul>
                            <!-- 文件目录 -->
                            <li class="lh-menu-stair" v-for="(item,index) in chapter" :key="index">
                              <a href="javascript: void(0)" :title="item.title"
                                 class="current-1">
                                <em class="lh-menu-i-1 icon18 mr10"></em>{{ item.title }}
                              </a>
                              <ol class="lh-menu-ol" style="display: block;">
                                <li class="lh-menu-second ml30" v-for="(video,index) in item.children" :key="index">
                                  <!--                                     新标签页打开-->
                                  <a :href="'/player/'+video.videoSourceId" target="_blank">
                                    <span class="fr">
                                    <i class="free-icon vam mr10" v-show="video.free===0">免费试听</i>
                                    </span>
                                    <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                  </a>
                                </li>
                                <!--                                <li class="lh-menu-second ml30">-->
                                <!--                                  <a href="#" title class="current-2">-->
                                <!--                                    <em class="lh-menu-i-2 icon16-->
                                <!--                                  mr5">&nbsp;</em>第二节-->
                                <!--                                  </a>-->
                                <!--                                </li>-->
                              </ol>
                            </li>
                          </ul>
                        </menu>
                      </div>
                    </section>
                  </div>
                  <!-- /课程大纲 -->
                </article>
              </div>
            </section>
          </article>
          <aside class="fl col-3">
            <div class="i-box">
              <div>
                <section class="c-infor-tabTitle c-tab-title">
                  <a title href="javascript:void(0)">主讲讲师</a>
                </section>
                <section class="stud-act-list">
                  <ul style="height: auto;">
                    <li>
                      <div class="u-face">
                        <a :href="'/teacher/'+course.teacherId">
                          <img :src="course.avatar"
                               width="50" height="50" alt>
                        </a>
                      </div>
                      <section class="hLh30 txtOf">
                        <a class="c-333 fsize16 fl" :href="'/teacher/'+course.teacherId">{{ course.teacherName }}</a>
                      </section>
                      <section class="hLh20 txtOf">
                        <span class="c-999">{{ course.intro }}</span>
                      </section>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
      <!-- /课程详情 结束 -->
      <!--    评论-->
      <div class="mt50 commentHtml">
        <div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" :src="userInfo.avatar">
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字"
                                id="commentContent"></textarea>
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
<span class="fl "><tt class="c-red commentContentmeg"
                      style="display: none;"></tt></span>
                      <input type="button" @click="addComment()" value="回复"
                             class="lh-reply-btn">
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment,index) in commentPage.records" v-bind:key="index">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg"
                         :src="comment.avatar">
                  </aside>
                  <div class="of">
      <span class="fl">
      <font class="fsize12 c-blue">
       {{ comment.nickname }}</font>
      <font class="fsize12 c-999 ml5">评论：</font></span>
                  </div>
                  <div class="noter-txt mt5">
                    <p>{{ comment.content }}</p>
                  </div>
                  <div class="of mt5">
<span class="fr"><font class="fsize12 c-999
ml5">{{ comment.gmtCreate }}</font></span>
                  </div>
                </li>
              </ul>
            </section>
          </section>
          <!-- 公共分页 开始 -->
          <div>
            <div class="paging">
              <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
              <el-pagination
                background
                :page-size="size"
                :current-page="current"
                layout="prev, pager, next"
                @current-change="getList"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <!-- 公共分页 结束 -->
        </div>
      </div>
      <!--    评论-->
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import course from "../../api/course";
import comment from "../../api/comment";
import order from "../../api/order";

/**
 * 动态路由界面，nust匹配
 */
export default {
  name: "_id.vue",
  data() {
    return {
      commentPage: [],
      comment: {},
      size: 8,
      current: 1,
      total: '',
      id: '',
      course: {},
      chapter: [],
      userInfo: {},
      orderNo: ''
    }
  },
  methods: {
    async createOrder() {
      //登陆判断
      if (!cookie.get('userToken')) {
        this.$message.warning("请登录")
        await this.$router.push({path: "/login"})
        return
      }
      let r = await order.creatOrder(this.id);
      if (r.data.code === 20000) {
        this.orderNo = r.data.data.orderNo
        await this.$router.push({path: "/order/" + this.orderNo})
      } else {
        this.$message.error("数据拉取失败")
      }
    },
    async addComment() {
      this.comment.courseId = this.id
      this.comment.teacherId = this.course.teacherId
      //登陆判断
      if (!cookie.get('userToken')) {
        this.$message.warning("请登录")
        await this.$router.push({path: "/login"})
        return
      }
      let r = await comment.addComment(this.comment);
      if (r.data.code === 20000) {
        this.$message.success(r.data.message)
        this.comment = {}
        await this.getPageComment()
      } else {
        this.$message.error("数据拉取失败")
      }
    },
    async getPageComment(current = 1) {
      let r = await comment.getPageList(current, this.size, this.id);
      if (r.data.code === 20000) {
        this.commentPage = r.data.data.page
        // console.log(this.commentPage)
        this.total = this.commentPage.total
        // console.log(this.total)
      } else {
        this.$message.error(" 数据拉取失败")
      }
    },
    getList(now) {
      this.getPageComment(now)
    },
    async getCourseInfo(id) {
      let r = await course.getFrontCourseId(id);
      if (r.data.code === 20000) {
        this.course = r.data.data.course
        // console.log(this.course)
      } else {
        this.$message.error(" 数据拉取失败")
      }

    },
    async getChapter(id) {
      let r = await course.getChapter(id);
      if (r.data.code === 20000) {
        this.chapter = r.data.data.chapter
        // console.log(this.chapter)
      } else {
        this.$message.error(" 数据拉取失败")
      }

    },
    async getLoginInfo() {
      if (!cookie.get("user")) {
        return
      }
      let jsonStr = cookie.get("user");
      // console.log(jsonStr)
      //alert(jsonStr)
      if (jsonStr) {
        this.userInfo = JSON.parse(jsonStr)
        // console.log(this.userInfo)
      }

    },
  },
  mounted() {
    if (this.$route.params.id) {
      // console.log(this.$route.params.id)
      this.id = this.$route.params.id

      this.getCourseInfo(this.id)
      this.getChapter(this.id)
      this.getPageComment()
      this.getLoginInfo()
    } else {
      this.$router.push({path: "/course"})
    }
  },

}
</script>

<style scoped>

</style>
