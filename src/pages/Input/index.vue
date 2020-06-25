<template>
  <div>
    <i-panel title="实名的可以用身份证来自动录入">
      <div class="cell">
        <div class="cell_80">
          <i-input :value="cardId" type="textarea" title="身份证号" id="id" @change="handleInputChange"/>
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
      <pick title="职称证" :books="TechBooks" tag="TechBooks" :multiArray="TitleArray" @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
      <pick title="技工证" :books="TitleBooks" tag="TitleBooks" :multiArray="TechArray" @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
      <pick title="建造师" :books="RegBooks" tag="RegBooks" :multiArray="ReGArray" mode='multiSelector' @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
      <pick title="三类证" :books="SafetyBooks" tag="SafetyBooks" :multiArray="SafetyArray" @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
      <pick title="八大员" :books="ProfBooks" tag="ProfBooks" :multiArray="ProfArray" @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
      <pick title="特殊工" :books="SpecialBooks" tag="SpecialBooks" :multiArray="SpecialArray" @handlePassBooks="handleUpdateBooks" @handlePassBooksDel="handleDeleteBooks"></pick>
    </i-panel>
    <i-button @click="handleConfirm">确认</i-button>
    <i-toast id="toast" />
  </div>
</template>

<script>
import { requsetGetPersonDetailById, requestAddPerson } from '../../api/request';
import pick from '../../components/picker/index';
export default {
  data () {
    return {
      cardId: '',
      date: '',
      staffName: '',
      compName: '',
      ReGArray: [['一级', '二级'], ['建筑', '公路', '水利', '市政', '机电', '矿业']],
      SafetyArray: ['赣建安A', '赣建安B', '赣建安C'],
      ProfArray: ['材料员', '预算员', '机械员', '劳务员', '资料员', '安全员', '土建质量员', '市政质量员', '土建施工员', '市政施工员', '装饰装修质量员', '设备安装质量员', '装饰装修施工员', '设备安装施工员'],
      SpecialArray: ['塔式起重机司机', '塔式起重机安装拆卸工', '施工升降机司机', '施工升降机安装拆卸工', '物料提升机司机', '物料提升机安装拆卸工', '起重信号司索工', '建筑电工', '建筑焊工', '普通脚手架工', '附着升降脚手架工', '高处作业吊篮安装拆卸工', '挖掘机司机', '压路机司机', '装载机司机', '推土机司机'],
      TechArray: ['砌筑工', '建筑瓦工', '窑炉修筑工', '瓦工', '钢筋工', '混凝土工', '混凝土搅拌工', '混凝土浇筑工', '混凝土模具工', '混凝土模板工', '模板工', '机械设备安装', '通风工', '起重工', '安装起重工', '安装钳工', '电气设备安装工', '电气安装调试工', '管工', '管道工', '变电安装工', '司泵工', '桩机操作工', '装饰装修工', '抹灰工', '油漆工', '镶贴工', '涂裱工', '装饰装修木工', '室内成套设备安装工', '幕墙安装工', '建筑门窗安装工', '幕墙制作工', '防水工', '木工', '手工木工', '精细木工', '木雕工', '石工', '石作业工', '石雕工', '泥塑工', '除尘工', '测量工', '测量放线工', '线路架设工', '砧细工', '砧刻工', '彩绘工', '匾额工', '推光漆工', '砌花街工', '金属工'],
      TitleArray: [ '工民建', '工程地质', '工业设计', '工企自动化', '工业设计专业', '工程地质及水文地质', '工程地质和水文地质', '土木工程', '土木建筑', '交通信号', '交通土建', '交通工程', '交通路桥工程', '交通通信', '供电', '供配电', '供热通风与空调', '信号工程', '信息工程', '光源', '光源电器', '光电技术', '光纤通信', '光辐射', '公用设备安装', '公路与城市道路', '公路与城市道路建设', '公路与桥梁工程', '公路工程', '农田水利工程', '制冷与空调', '动车组技术', '勘察地球地理', '勘察技术与工程', '化探', '卫星通信', '变配电', '园林景观学', '地下建筑', '地基与基础工程', '地质勘查', '地质测绘', '城市燃气输配', '太阳能及其它能源工程', '安全工程', '室内设计', '岩土与地基', '市政工程', '建筑学', '建筑施工', '建筑材料', '建筑水电', '建筑环境与设备工程', '建筑设计', '房建工程', '探矿工程', '放射地质', '数据及多媒体', '数据通信', '无线通信', '智能化', '暖通', '暖通空调', '有线通信', '机场工程', '机械', '机械焊接', '机械自动化', '机械设备', '机电', '机电一体化', '材料成型及控制工程', '材料成型及控制工程专业', '核电工程', '桥梁与隧道工程', '桥梁工程', '气体放电', '水利工程施工', '水利机械', '水利水电', '水利水电工程建筑', '水力学及河流动力学', '水工', '水工钢筋混凝土结构学', '水文与水资源', '水文地质', '水暖', '水电站动力设备', '水能动力工程', '水轮发电机调试', '水轮机调试', '水运工程', '汽车工程', '汽车拖拉机运用与修理', '汽车服务工程', '汽车船舶', '汽车运用工程', '河务工程与管理', '测量', '港口与航道', '港口水工建筑物', '港口海岸及治河', '港口航道与治河工程', '港口航道与海岸', '港口规划与布置', '灯具设计', '热能动力工程', '焊接', '焊接工艺与设备', '焊接技术', '焊接技术与工程', '焊接施工', '煤用地质勘查', '照明', '照明设计', '燃气', '燃气储配与应用', '爆炸技术及应用', '爆破', '物探', '物流装备', '环境工程', '环境艺术', '生产过程自动化', '电力', '电力传动', '电力系统及其自动化', '电力系统及自动化', '电力系统自动化', '电子信息', '电子工程', '电气', '电气工程与智能控制', '电气自动化', '电磁场与微波技术', '电话交换', '真空物理', '石油天然气储运', '矿产地质与勘探', '移动通信', '管道工程', '结构', '给排水', '网络工程', '耐火材料', '自动化', '自动化控制', '自动控制', '自控', '舞美设计', '航道整治', '船机制造与维修', '船舶工程', '船舶检验', '船舶电气工程', '装璜设计', '计算数学', '计算机', '计算机应用', '计算机通信', '路基工程', '车辆工程', '车辆工程专业', '轨道工程', '轮机工程', '软件工程', '输变电', '输配电及用电工程', '过程装备与控制工程', '过程装备与控制工程专业', '通信工程', '通风安全', '道路', '道路与铁道工程', '道路桥梁', '道路桥梁与渡河工程', '采暖通风', '采矿', '采矿煤工程', '金属', '金属冶炼', '金属材料', '铁路电气化', '铁路线路', '铁道工程', '隧道及地下建筑工程', '隧道工程', '雕塑', '风电', '高压电与绝缘技术', '高速动车组检修技术', '高速动车组驾驶', '高速动车组驾驶与维修' ],
      multiIndex: '',
      RegBooks: [],
      SafetyBooks: [],
      ProfBooks: [],
      SpecialBooks: [],
      TechBooks: [],
      TitleBooks: []
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
        this.staffName = res.rows[0].staffName;
        this.compName = res.rows[0].compName;
        if (!res.rows[0].compName) this.compName = '';
      });
    },
    handleTimeChange: function (e) {
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
    async handleConfirm () {
      if (!this.id || !this.staffName) return;
      const personal = {
        cardId: this.id,
        date: this.date,
        staffName: this.staffName,
        compName: this.compName,
        RegBooks: this.RegBooks,
        TitleBooks: this.TitleBooks,
        SafetyBooks: this.SafetyBooks,
        ProfBooks: this.ProfBooks,
        TechBooks: this.TechBooks,
        SpecialBooks: this.SpecialBooks,
        UserId: this.$store.state.user.userId
      };
      await requestAddPerson(personal);
      mpvue.switchTab({url: '/pages/index/main'});
    },
    handleUpdateBooks ({ options, tag }) {
      if (this[tag].indexOf(options) > -1) return;
      this[tag].push(options);
    },
    handleDeleteBooks ({ options, tag }) {
      const index = this[tag].indexOf(options);
      if (index > -1) this[tag].splice(index, 1);
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
