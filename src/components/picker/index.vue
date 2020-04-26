<template>
  <div class="pick">
    <div class="pick_books" v-if="mode === 'multiSelector'">
      <div class="pick_books_cell cell">
        <div class="pick_books_cell_title">{{title}}</div>
        <div class="pick_books_cell_tags" @click="bindDetailTags">
          <div class="pick_books_cell_tags_items" v-for="(item, index) in books" :key="index">
            {{item}}
          </div>
        </div>
        <div class="pick_books_cell_addBtn">
          <span>添加</span>
          <picker mode="multiSelector" @change="bindMultipickChange" :value="multiIndex" :range="multiArray">
            <view class="pick-btn"></view>
          </picker>
        </div>
      </div>
    </div>

    <div class="pick_books" v-else>
      <div class="pick_books_cell cell">
        <div class="pick_books_cell_title">{{title}}</div>
        <div class="pick_books_cell_tags" @click="bindDetailTags">
          <div class="pick_books_cell_tags_items" v-for="(item, index) in books" :key="index">
            {{item}}
          </div>
        </div>
        <div class="pick_books_cell_addBtn">
          <span>添加</span>
          <picker @change="bindpickChange" :value="multiIndex" :range="multiArray">
            <view class="pick-btn"></view>
          </picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    books: {
      type: Array,
      default: []
    },
    multiArray: {
      type: Array,
      default: []
    },
    tag: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    }
  },
  methods: {
    bindMultipickChange: function (e) {
      const options = this.multiArray[0][e.mp.detail.value[0]] + this.multiArray[1][e.mp.detail.value[1]];
      const tag = this.tag;
      const result = {
        options,
        tag
      };
      this.$emit('handlePassBooks', result);
    },
    bindpickChange: function (e) {
      const options = this.multiArray[e.mp.detail.value];
      const tag = this.tag;
      const result = {
        options,
        tag
      };
      this.$emit('handlePassBooks', result);
    },
    bindDetailTags: function (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.pick
  width 100%
  line-height 1.4
  padding 7px 15px
  position relative
  &::after
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e9eaec;
    border-bottom-width: 1px;
    left: 15px;
    right: 0;
  .pick_books
    width 100%
    color: #495060;
    overflow: hidden;
    font-size: 28rpx;
    line-height: 1.6;
    .pick_books_cell
      width 100%
      position: relative;
      display: flex;
      justify-content flex-start
      align-items center
      background: #fff;
      align-items: center;
      font-size: 14px;
      overflow: hidden;
      .pick_books_cell_title
        min-width 50px
        line-height: 1.4;
        margin-right 20px
      .pick_books_cell_tags
        flex 1
        display flex
        justify-content flex-start
        align-items center
        flex-direction row
        flex-wrap: wrap;
        .pick_books_cell_tags_items
          display: inline-block;
          height: 22px;
          line-height: 22px;
          margin: 2px 4px 2px 0;
          padding: 0 8px;
          border: 1px solid #e3e8ee;
          border-radius: 3px;
          font-size: 12px;
          vertical-align: middle;
          opacity: 1;
          overflow: hidden;
          cursor: pointer;
          background: #39f;
          color #fff;
      .pick_books_cell_addBtn
        margin-right 30px
        position relative
        span
          display: inline-block;
          height: 28px;
          line-height: 28px;
          margin: 2px 4px 2px 0;
          padding: 0 8px;
          border: 1px solid #e3e8ee;
          border-radius: 5px;
          font-size: 12px;
          vertical-align: middle;
          opacity: 1;
          overflow: hidden;
          cursor: pointer;
          background: #59bb73;
          color #fff;
        .pick-btn
          position absolute
          left 0
          right 0
          top 0
          bottom 0
          z-index 999
</style>