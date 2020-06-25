<template>
  <div class="container">
    <scroll-view class="head" :scroll-x="true" @scroll="scroll">
      <div class="tabbar">
        <i-tabs :current="current" color="#f759ab" class="tabbar">
          <i-tab key="TechBooks" title="技工证" @click="handleChange('TechBooks')"></i-tab>
          <i-tab key="SafetyBooks" title="三类证" @click="handleChange('SafetyBooks')"></i-tab>
          <i-tab key="TitleBooks" title="职称证" @click="handleChange('TitleBooks')"></i-tab>
          <i-tab key="RegBooks" title="建造师" @click="handleChange('RegBooks')"></i-tab>
          <i-tab key="SpecialBooks" title="特殊工" @click="handleChange('SpecialBooks')"></i-tab>
          <i-tab key="ProfBooks" title="八大员" @click="handleChange('ProfBooks')"></i-tab>
        </i-tabs>
      </div>
    </scroll-view>

    <div class="content">
      <div class="list_container" v-for="(item, index) in dataList" v-show="item[current].length !== 0" :key="index">
        <div class="list_item" @click="openResult(item)">
          <div class="list_header">
            <div class="list_header_name">{{item.staffName}}</div>
            <div class="list_header_time" :class="[item.timeEnd < 7 ? 'colorRed' : '']">{{item.timeEnd}}天</div>
          </div>
          <div class="list_body">
            <div class="list_header_books">
              <div class="list_header_book" v-for="(books, indexs) in item.TechBooks" :key="indexs">{{books}}</div>
              <div class="list_header_book" v-for="(books, indexs) in item.TitleBooks" :key="indexs">{{books}}</div>
              <div class="list_header_book" v-for="(books, indexs) in item.SafetyBooks" :key="indexs">{{books}}</div>
              <div class="list_header_book" v-for="(books, indexs) in item.RegBooks" :key="indexs">{{books}}</div>
              <div class="list_header_book" v-for="(books, indexs) in item.SpecialBooks" :key="indexs">{{books}}</div>
              <div class="list_header_book" v-for="(books, indexs) in item.ProfBooks" :key="indexs">{{books}}</div>
            </div>
          </div>
          <div class="list_footer">
            所在公司：{{item.compName}}
          </div>
        </div>
      </div>
      <i-load-more tip="暂无数据" :loading="false" v-if="dataShow"/>
    </div>
  </div>
</template>

<script>
import { requestGetListData } from '../../api/request';
export default {
  data () {
    return {
      dataList: [],
      current: 'TechBooks',
      dataShow: false
    };
  },

  methods: {
    dataFilter (time) {
      const date1 = Date.parse(time);
      const date2 = Date.parse(new Date());
      const distance = date1 - date2;
      if (distance < 0) return 0;
      const days = Math.floor(distance / (24 * 3600 * 1000));
      return days;
    },
    handleChange (e) {
      this.current = e;
      this.handleChangeDataShow();
    },
    openResult (e) {
      wx.navigateTo({url: `../personnel/main?userid=${e.UserId}&&bookid=${e._id}`});
    },
    handleGetBooksList () {
      const UserId = this.$store.state.user.userId;
      requestGetListData({ UserId }).then(res => {
        this.dataList = res.data;
        this.dataList.map(e => { e.timeEnd = this.dataFilter(e.date); });
        this.handleChangeDataShow();
      });
    },
    handleChangeDataShow () {
      this.dataShow = this.dataList.every(item => item[this.current].length === 0);
    }
  },

  onShow () {
    this.handleGetBooksList();
  }
};
</script>

<style scoped lang="stylus">
.colorRed
  color red
.container
  background-color #f9f9f9
  padding 0
  .head
    width 100%
    .tabbar
      width 150%
  .content
    width: 90%;
    padding 10px
  .list_container
    width 100%
    font-size 14px
    border 1px solid #ddd
    background-color #fff
    margin-bottom 10px
    .list_item
      padding 10px
      .list_header
        display flex
        justify-content flex-start
        align-items center
        margin-bottom 4px
        div
          padding 0 2px
          margin-bottom 4px
        .list_header_name
          width 50px
          flex 1
      .list_body
        margin-bottom 6px
        .list_header_books
          width 100%
          .list_header_book
            display: inline-block;
            height: 22px;
            line-height: 22px;
            margin-right 4px
            padding: 0 4px;
            border: 1px solid #e3e8ee;
            border-radius: 3px;
            background: #39f;
            font-size: 12px;
            vertical-align: middle;
            opacity: 1;
            overflow: hidden;
            cursor: pointer;
            color #fff
</style>
