<template>
  <div class="container">
    <img class="container_bg" src="../../../static/images/bg.jpg" alt="" mode="heightFix">
    <div class="container_content">
      <div class="content_avatar">
        <img src="../../../static/images/user.png" alt="" mode="heightFix">
      </div>
      <div class="content_input">
        <div class="content_input_phonenumber">
          <i-input :value="phoneNumber" type="textarea" title="手机号" id="phoneNumber" @change="handleInputChange"/>
        </div>
        <div class="content_input_password">
          <i-input :value="password" type="textarea" title="密码" id="password" @change="handleInputChange"/> 
        </div>
      </div>
      <div class="content_login_btn">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneNumber: '',
      password: ''
    };
  },

  mounted () {
    wx.login({
      success (res) {
        if (res.code) {
          // 这里可以把code传给后台，后台用此获取openid及session_key
          console.log(res.code);
        }
      }
    });
  },

  methods: {
    handleInputChange (e) {
      this[e.mp.currentTarget.id] = e.mp.detail.detail.value;
    }
  }
};
</script>

<style lang="stylus">
page 
  height 100%
.container
  width 100%
  height 100%
  padding 0
  position relative
  display flex
  justify-content flex-start
  align-items center
  .container_bg
    left 0
    top 0
    position absolute
    height 100%
    :after
      content: "";
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      background: inherit;
      filter: blur(10px);
      z-index: 2;
  .container_content
    z-index 999
    width 100%
    display flex
    justify-content flex-start
    align-items center
    flex-direction column
    .content_avatar
      width 100px
      height 100px
      overflow hidden
      border-radius 50%
      margin 100px 0 50px
      img 
        height 100%
    .content_input
      width 80%
      margin-bottom 30px
      border-radius 5px
      overflow hidden
    .content_login_btn
      width 80%
      color: #fff;
      height: 45px;
      line-height 45px
      text-align center
      background-color: #19be6b;
      border-radius 5px
</style>
