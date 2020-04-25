<template>
  <div class="container">
    <div class="list_col" v-for="(item, index) in testData" :key="index">
      <div class="list_col_item" v-for="(items, indexs) in item" :key="indexs">
        {{items}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // testData: [
      //   ['序号', '姓名', '身份证号', '注册类别', '注册编号(执业印章号)', '注册专业', '有效期截止', '注册单位'],
      //   ['序号', '姓名', '身份证号', '注册类别', '注册编号(执业印章号)', '注册专业', '有效期截止', '注册单位']
      // ]
      testData: ['序号', '姓名', '身份证号', '注册类别', '注册编号(执业印章号)', '注册专业', '有效期截止', '注册单位']
    };
  }
};
</script>

<style lang="stylus" scoped>
.container
  width 80%
  border: 1px solid #d6e4ff
  margin 0 auto
  .list_col
    width 100%
    display flex
    justify-content flex-start
    align-items center
    flex-direction column
    .list_col_item
      width auto
      height 36rpx
      line-height 36rpx
      border-right 1px solid #000
      border-bottom 1px solid #000
      color #000
      &::last-child
        border-bottom 0px
</style>
