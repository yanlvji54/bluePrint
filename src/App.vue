<script>
export default {
  created () {
    const res = wx.getStorageSync('user');
    if (!res) return mpvue.navigateTo({url: '/pages/login/main'});
    if (res.openid && res.phoneNumber && res.userId) return this.$store.commit('userInsert', res);
    mpvue.navigateTo({url: '/pages/login/main'});
  }
};
</script>

<style>
page {
  background-color: #f9f9f9;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
