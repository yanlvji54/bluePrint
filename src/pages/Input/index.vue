<template>
  <div>
    <i-panel title="实名的可以用身份证来自动录入">
      <div class="cell">
        <div class="cell_80">
          <i-input :value="id" type="textarea" title="身份证号" id="id" @change="handleInputChange"/>
        </div>
        <div class="cell_20">
          <button class="div_button" hover-class="div_button_hover" @click="handleGetMessageById">获取信息</button>
        </div>
      </div>
    </i-panel>
    <i-panel title="基础信息">
      <i-input :value="staffName" type="textarea" id="staffName" title="姓名" />
      <i-input :value="compName" type="textarea" id="compName" title="公司" />
      <div class="cell_date cell">
        <div class="cell_date_title">到期日期选择</div>
        <div class="cell_date_picker">
          <picker mode="date" :value="date" start="2015-09-01" @change="handleTimeChange">
            <div class="picker">
              {{date ? date : '选择日期'}}
            </div>
          </picker>
        </div>
      </div>
    </i-panel>
    <i-panel title="证件信息：只需输入相应的证件">
      <i-input :value="countTitle" type="textarea" title="职称证" id="countTitle" @change="handleInputChange"/>
      <pick title="技工证" :books="TechBooks" tag="TechBooks" :multiArray="TechArray" @handlePassBooks="handleUpdateBooks"></pick>
      <pick title="建造师" :books="RegBooks" tag="RegBooks" :multiArray="ReGArray" mode='multiSelector' @handlePassBooks="handleUpdateBooks"></pick>
      <pick title="三类证" :books="SafetyBooks" tag="SafetyBooks" :multiArray="SafetyArray" @handlePassBooks="handleUpdateBooks"></pick>
      <pick title="八大员" :books="ProfBooks" tag="ProfBooks" :multiArray="ProfArray" @handlePassBooks="handleUpdateBooks"></pick>
      <pick title="特殊工" :books="SpecialBooks" tag="SpecialBooks" :multiArray="SpecialArray" @handlePassBooks="handleUpdateBooks"></pick>
    </i-panel>
    <i-button @click="handleConfirm">确认</i-button>
    <i-toast id="toast" />
  </div>
</template>

<script>
import { requsetGetPersonDetailById, requestAddPerson } from '../../api/request';
import { $Toast } from '../../../static/iview/dist/base/index';
import pick from '../../components/picker/index';
export default {
  data () {
    return {
      id: '',
      date: '',
      staffName: '',
      compName: '',
      countTitle: '',
      ReGArray: [['一级', '二级'], ['建筑', '公路', '水利', '市政', '机电', '矿业']],
      SafetyArray: ['赣建安A', '赣建安B', '赣建安C'],
      ProfArray: ['材料员', '预算员', '机械员', '劳务员', '资料员', '安全员', '土建质量员', '市政质量员', '土建施工员', '市政施工员', '装饰装修质量员', '设备安装质量员', '装饰装修施工员', '设备安装施工员'],
      SpecialArray: ['塔式起重机司机', '塔式起重机安装拆卸工', '施工升降机司机', '施工升降机安装拆卸工', '物料提升机司机', '物料提升机安装拆卸工', '起重信号司索工', '建筑电工', '建筑焊工', '普通脚手架工', '附着升降脚手架工', '高处作业吊篮安装拆卸工', '挖掘机司机', '压路机司机', '装载机司机', '推土机司机'],
      TechArray: ['砌筑工', '建筑瓦工', '窑炉修筑工', '瓦工', '钢筋工', '混凝土工', '混凝土搅拌工', '混凝土浇筑工', '混凝土模具工', '混凝土模板工', '模板工', '机械设备安装', '通风工', '起重工', '安装起重工', '安装钳工', '电气设备安装工', '电气安装调试工', '管工', '管道工', '变电安装工', '司泵工', '桩机操作工', '装饰装修工', '抹灰工', '油漆工', '镶贴工', '涂裱工', '装饰装修木工', '室内成套设备安装工', '幕墙安装工', '建筑门窗安装工', '幕墙制作工', '防水工', '木工', '手工木工', '精细木工', '木雕工', '石工', '石作业工', '石雕工', '泥塑工', '除尘工', '测量工', '测量放线工', '线路架设工', '砧细工', '砧刻工', '彩绘工', '匾额工', '推光漆工', '砌花街工', '金属工'],
      multiIndex: '',
      RegBooks: [],
      SafetyBooks: [],
      ProfBooks: [],
      SpecialBooks: [],
      TechBooks: []
    };
  },

  created () {},

  components: {
    pick
  },

  methods: {
    handleGetMessageById () {
      if (!this.id) return;
      requsetGetPersonDetailById(this.id).then(res => {
        if (!res.rows[0]) return;
        if (res.rows[0].staffName) this.staffName = res.rows[0].staffName;
        if (res.rows[0].compName) this.compName = res.rows[0].compName;
      });
    },
    handleTimeChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value);
      this.date = e.mp.detail.value;
    },
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.multiIndex = e.mp.detail.value;
    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      const data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
              data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
              break;
            case 1:
              data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
              data.multiArray[2] = ['鲫鱼', '带鱼'];
              break;
          }
          data.multiIndex[1] = 0;
          data.multiIndex[2] = 0;
          break;
        case 1:
          switch (data.multiIndex[0]) {
            case 0:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                  break;
                case 1:
                  data.multiArray[2] = ['蛔虫'];
                  break;
                case 2:
                  data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                  break;
                case 3:
                  data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                  break;
                case 4:
                  data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                  break;
              }
              break;
            case 1:
              switch (data.multiIndex[1]) {
                case 0:
                  data.multiArray[2] = ['鲫鱼', '带鱼'];
                  break;
                case 1:
                  data.multiArray[2] = ['青蛙', '娃娃鱼'];
                  break;
                case 2:
                  data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                  break;
              }
              break;
          }
          data.multiIndex[2] = 0;
          break;
      }
      console.log(data.multiIndex);
      this.setData(data);
    },
    handleInputChange (e) {
      this[e.mp.currentTarget.id] = e.mp.detail.detail.value;
    },
    handleConfirm () {
      if (!this.id || !this.staffName) return;
      const personal = {
        id: this.id,
        date: this.date,
        staffName: this.staffName,
        compName: this.compName,
        RegBooks: this.RegBooks,
        countTitle: this.countTitle,
        SafetyBooks: this.SafetyBooks,
        ProfBooks: this.ProfBooks,
        TechBooks: this.TechBooks,
        SpecialBooks: this.SpecialBooks
      };
      requestAddPerson(personal).then(res => {
        $Toast({
          content: '录入成功',
          type: 'success'
        });
      });
    },
    handleUpdateBooks ({ options, tag }) {
      if (this[tag].indexOf(options) > -1) return;
      this[tag].push(options);
    }
  }
};
</script>

<style lang="stylus" scoped>
.checkgroup
  display flex
.i-cell
  display flex
  justify-content center
  align-items center
.cell
  width 100%
  display flex
  justify-content center
  align-items center
  line-height: 1.4;
  overflow hidden
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
    right: 0;
  .cell_80
    width 80%
  .cell_20
    width 20%
    display flex
    .div_button
      padding 5px
      font-size 12px
      border-radius 5px
      background-color #59bb73
      color #ffffff
      text-align center
      display block
      line-height 1.5
    .div_button_hover
      opacity .9
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
.switch_box
  width 100%
  display flex
  justify-content flex-start
  align-items center;
  padding 7px 15px
  flex-direction row
  .switch_box_item
    flex 1
    display flex
    justify-content flex-start
    align-items center;
    flex-direction row
</style>
