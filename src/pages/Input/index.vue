<template>
  <div>
    <i-panel title="实名的可以用身份证来自动录入">
      <div class="cell">
        <div class="cell_80">
          <i-input :value="value1" type="number" title="身份证号" placeholder="身份证号"/>
        </div>
        <div class="cell_20">
          <div class="div_button">获取信息</div>
        </div>
      </div>
      <i-input :value="value2" type="textarea" title="到期时间" placeholder="到期时间"/>
    </i-panel>
    <i-panel title="基础信息">
      <i-input :value="value3" type="textarea" title="姓名" autofocus placeholder="名字" />
      <i-input :value="value4" type="textarea" title="证件种类" placeholder="证件种类"/>
    </i-panel>
  <i-button bind:click="handleClick">确认</i-button>
  </div>
</template>

<script>
import { requsetGetPersonDetailById } from '../../api/request';
export default {
  components: {
  },

  data () {
    return {
      data: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      }
    };
  },

  created () {},

  methods: {
    getMessageById () {
      requsetGetPersonDetailById();
    }
  }
};
</script>

<style lang="stylus" scoped>
.cell
  width 100%
  display flex
  justify-content center
  align-items center
  line-height: 1.4;
  overflow hidden
  position relative
  border-bottom: 1px solid #e9eaec;
  &::after
    content: '';
    position: absolute;
    bottom: 0;
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
    background-color #000
  .cell_80
    width 80%
  .cell_20
    width 20%
    .div_button
      padding 5px 10px
      font-size 12px
</style>
