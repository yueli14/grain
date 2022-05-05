<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="user" :model="user">
        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{
required: true, message: '请输入手机号码', trigger: 'blur' },{validator:checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required:true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录"
                 @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank"
                 href="http://localhost:9001/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont
icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import login from "../../api/login";

export default {
  name: "login",
  layout: 'sign',
  data() {
    return {
      user: {
        mobile: '',
        password: ''
      },
      loginInfo: {}
    }
  },

  methods: {
    submitLogin() {
      this.$refs['user'].validate((valid) => {
        if (valid) {
          this.loginUser()
        } else {
          return false;
        }
      })
    },

    checkPhone(rule, value, callback) {
//debugger
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    },
    async loginUser() {
      let r = await login.login(this.user)
      if (r.data.code === 20000) {
        this.$message.success('登陆成功')
        //将json对象处理后放到cookie当中，设置cookie生效的作用域
        cookie.set("userToken", r.data.data.token, {domain: "localhost"})
        // this.$router.push({path: '/'})
        window.location.href = '/'
        //根据cookie取信息发送请求查询user信息
        let ru = await login.getLoginInfo()
        if (ru.data.code === 20000) {
          //因为返回的时对象，所以这里要字符串化
          cookie.set("user", JSON.stringify(ru.data.data.info), {domain: 'localhost'})
        }

      } else {
        this.$message.warning('登陆失败')
      }
    }
  }
}
</script>

<style scoped>
.el-form-item__error {
  z-index: 9999999;
}
</style>
