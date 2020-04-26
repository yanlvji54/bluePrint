<template>
  <div class="container">
    <div class="head">
      <i-tabs :current="current" color="#f759ab">
        <i-tab key="tab1" title="三类证" @click="handleChange('tab1')"></i-tab>
        <i-tab key="tab2" title="技工证" @click="handleChange('tab2')"></i-tab>
        <i-tab key="tab3" title="职称证" @click="handleChange('tab3')"></i-tab>
        <i-tab key="tab4" title="建造师证" @click="handleChange('tab4')"></i-tab>
      </i-tabs>
    </div>

    <div class="content">
      <div class="list_container" v-for="(item, index) in dataList" :key="index">
        <div class="list_item" @click="openResult(item)">
          <div class="list_header">
            <div class="list_header_name">{{item.staffName}}</div>
            <div class="list_header_book">{{item.SafetyBooks[0]}}</div>
            <div class="list_header_time" :class="[item.timeEnd < 7 ? 'colorRed' : '']">{{item.timeEnd}}天</div>
          </div>
          <div class="list_body">
            所在公司：{{item.company}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestGetListData } from '../../api/request';
export default {
  data () {
    return {
      dataList: [],
      current: 'tab1'
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
    },
    openResult (e) {
      wx.navigateTo({url: `../personnel/main?data=${e.IdCard}`});
    }
  },

  created () {
    requestGetListData(0).then(res => {
      console.log(res);
      this.dataList = res.data;
      this.dataList.map(e => { e.timeEnd = this.dataFilter(e.date); });
    });
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
        .list_header_book
          flex 1
</style>
