<template>
  <div class="container">
    <div class="card_item">
      <i-card :title="personal.staffName" full="true" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <div class="content" slot="content">
          <div class="person_list">
            <div class="person_list_Idcard">
              姓名：{{personal.staffName}}
            </div>
            <div class="person_list_Idcard">
              身份证号：{{personal.cardId}}
            </div>
            <div class="person_list_Idcard">
              所在公司：{{personal.compName}}
            </div>
            <div class="person_list_Idcard">
              到期时间：{{personal.date}}
            </div>
            <div class="person_list_Idcard">
              拥有证件：<span v-for="(item, index) in personal.books" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </i-card>
    </div>
    <i-panel>
      <div class="cell_date cell">
        <div class="cell_date_title">续约日期选择</div>
        <div class="cell_date_picker">
          <picker mode="date" :value="date" start="2015-09-01" @change="handleTimeChange">
            <div class="picker">
              {{date ? date : '选择日期'}}
            </div>
          </picker>
        </div>
      </div>
    </i-panel>
    <div class="list_item">
      <i-button @click="handleUpdate" type="success">确定</i-button>
      <i-button @click="handleDelete" type="error">删除</i-button>
    </div>
  </div>
</template>

<script>
import { requestGetIdData, requestDeletePeople, requestRewanel } from '../../api/request';
export default {
  data () {
    return {
      personal: {},
      date: ''
    };
  },
  onLoad (options) {
    const { userid, bookid } = options;
    const book = { userid, bookid };
    requestGetIdData(book).then(res => {
      this.personal = res.data;
      const { ProfBooks, RegBooks, SafetyBooks, SpecialBooks, TechBooks } = res.data;
      this.personal.books = [...ProfBooks, ...RegBooks, ...SafetyBooks, ...SpecialBooks, ...TechBooks];
    });
  },
  methods: {
    handleGetPageData () {
      const { UserId, _id } = this.personal;
      const book = { userid: UserId, bookid: _id };
      requestGetIdData(book).then(res => {
        this.personal = res.data;
        const { ProfBooks, RegBooks, SafetyBooks, SpecialBooks, TechBooks } = res.data;
        this.personal.books = [...ProfBooks, ...RegBooks, ...SafetyBooks, ...SpecialBooks, ...TechBooks];
      });
    },
    async handleDelete () {
      const { UserId, _id } = this.personal;
      const book = { userid: UserId, bookid: _id };
      const res = await requestDeletePeople(book);
      if (res.code === 1) mpvue.switchTab({url: '/pages/index/main'});
    },
    handleTimeChange: function (e) {
      this.date = e.mp.detail.value;
    },
    async handleUpdate () {
      const { UserId, _id } = this.personal;
      const book = { userid: UserId, bookid: _id, date: this.date };
      await requestRewanel(book);
      this.handleGetPageData();
    }
  }
};
</script>

<style lang="stylus">
.cell
  width 100%
  display flex
  justify-content center
  align-items center
  line-height: 1.4;
  overflow hidden
  position relative
.cell_date
  width 100%
  padding: 7px 15px;
  color: #495060;
  overflow: hidden;
  font-size 14px
  line-height 1.6
  .cell_date_title
    line-height 1.4
    padding 4px 0
  .cell_date_picker
    min-width 200px
    width 20%
    text-align right
    margin-right 30px
    flex 1
    .picker
      min-width 200px
      min-height 20px
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
      .cell_date
        width 100%
        padding: 7px 15px;
        color: #495060;
        overflow: hidden;
        font-size 14px
        line-height 1.6
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
