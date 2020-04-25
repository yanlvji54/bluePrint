<template>
  <div class="container">
    <div class="card_item">
      <i-card :title="personal.name" full="true" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <div class="content" slot="content">
          <div class="person_list">
            <div class="person_list_Idcard">
              身份证号：{{personal.IdCard}}
            </div>
            <div class="person_list_Idcard">
              所在公司：
            </div>
            <div class="person_list_Idcard">
              到期时间：{{personal.timeEnd}}
            </div>
            <div class="person_list_Idcard">
              所在公司：{{personal.IDcard}}
            </div>           
          </div>
        </div>
        <!-- <div class="photo_list" slot="footer">
          <div class="photo_list_border">
            <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="">
          </div>
        </div> -->
      </i-card>
    </div>
    <div class="list_item">
      <i-cell-group>
        <i-cell title="修改信息" is-link url="/pages/dashboard/index"></i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
import { requestGetIdData } from '../../api/request';
export default {
  data () {
    return {
      personal: {}
    };
  },
  onLoad (options) {
    requestGetIdData(options.data).then(res => {
      this.personal = res;
      console.log(this.personal);
    });
  },
  methos: {

  }
};
</script>

<style lang="stylus">
.container
  width 100%
  height 100%
  padding 0
  display block
  background-color #f9f9f9
  .card_item
    margin-bottom 10px
    .person_list
      div
        margin-bottom 10px
  .photo_list
    width 100%
    .photo_list_border
      width 80px
      height 60px
      overflow hidden
      display flex
      justify-content center
      align-items center
      img 
        height 100%
</style>
