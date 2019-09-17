<template>
  <div class="app">
    <Top></Top>
    <div class="offer_manage_first">
      <div class="offer_manage_first_left">
        <div class="first_left_1">
          <img src="../../picture/folder.png" alt="" class="first_left_1Img" />
        </div>
        <div class="first_left_2">
          offer管理
        </div>
      </div>
      <div class="offer_manage_first_right">
        <el-button type="primary" size="mini">新建offer</el-button>
        <el-button type="primary" size="mini">转移状态</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <div class="offer_manage_second">
      <div>
        <el-button type="primary" size="mini" round
          >待发offer（{{ offerManageArr4.length }}）</el-button
        >
        <el-button type="primary" size="mini" round
          >已发offer（{{ offerManageArr5.length }}）</el-button
        >
        <el-button type="primary" size="mini" round
          >已接受offer（{{ offerManageArr6.length }}）</el-button
        >
        <el-button type="primary" size="mini" round
          >已拒绝offer（{{ offerManageArr7.length }}）</el-button
        >
        <el-button type="primary" size="mini" round
          >已入职offer（{{ offerManageArr8.length }}）</el-button
        >
      </div>
      <div>
        <el-table
          :data="
            offerManageArr.slice(
              pageSize * (currentPage - 1),
              pageSize * currentPage
            )
          "
          style="width: 100%"
          :row-style="{ height: height1 }"
          :cell-style="{ padding: padding1 }"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            v-for="(item, index) in offerManageArr2"
            :key="index"
            :prop="item.type"
            :label="item.label"
            width="200px"
            align="center"
          >
          </el-table-column>
          <el-table-column width="200px" align="center">
            <template slot="header" slot-scope="scope">
              <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                v-model="visible"
              >
                <i
                  class="el-icon-setting"
                  style="color: #00b7ff;font-size: 18px"
                  slot="reference"
                ></i>
                <div class="popover_1">
                  <el-popover placement="left" width="70" trigger="click">
                    <div class="popover_1_1" @click="addField" slot="reference">
                      添加显示字段
                    </div>
                    <el-table
                      :data="offerManageArr3"
                      style="width: 100%"
                      :row-style="{ height: '20px' }"
                      :cell-style="{ padding: '0px' }"
                      :show-header="false"
                      tooltip-effect="dark"
                      @selection-change="handleSelectionChange1"
                    >
                      <el-table-column type="selection" width="28">
                      </el-table-column>
                      <el-table-column prop="label" width="auto">
                      </el-table-column>
                    </el-table>
                    <el-button
                      type="primary"
                      size="mini"
                      style="margin-left: 100px;margin-top: 10px"
                      @click="addSureObj"
                      >确定</el-button
                    >
                  </el-popover>
                  <el-popover placement="right" width="70" trigger="click">
                    <div
                      class="popover_1_1"
                      @click="deleteField"
                      slot="reference"
                    >
                      删除显示字段
                    </div>
                    <el-table
                      :data="offerManageArr2"
                      style="width: 100%"
                      :row-style="{ height: '20px' }"
                      :cell-style="{ padding: '0px' }"
                      :show-header="false"
                      tooltip-effect="dark"
                      @selection-change="handleSelectionChange2"
                    >
                      <el-table-column type="selection" width="28">
                      </el-table-column>
                      <el-table-column prop="label" width="auto">
                      </el-table-column>
                    </el-table>
                    <el-button
                      type="primary"
                      size="mini"
                      style="margin-left: 100px;margin-top: 10px"
                      @click="deleteSureObj"
                      >确定</el-button
                    >
                  </el-popover>
                </div>
                <hr class="popover_hr" />
                <div class="popover_2">
                  选择间距类型
                </div>
                <div class="popover_3">
                  <div
                    class="popover_3_1"
                    :class="{ popover_3_2: tabNum === 0 }"
                    @click="compactObj"
                  >
                    紧凑
                  </div>
                  <div
                    class="popover_3_1"
                    :class="{ popover_3_2: tabNum === 1 }"
                    @click="moderateObj"
                  >
                    适中
                  </div>
                  <div
                    class="popover_3_1"
                    :class="{ popover_3_2: tabNum === 2 }"
                    @click="easyObj"
                  >
                    宽松
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <Paging
          :tableData="offerManageArr"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          style="margin-top: 10px"
        ></Paging>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from "../../components/paging/Paging";
import Top from "../../components/top/Top";
export default {
  name: "OfferManagement",
  components: {
    Top,
    Paging
  },
  props: {},
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      visible: false, //控制弹出框显示隐藏
      height1: "60px",
      padding1: "0px",
      tabNum: 1, //控制‘紧凑’‘适中’‘宽松’的切换
      offerManageArr: [], //接收200条随机数据
      offerManageArr1: [
        {
          type: "name",
          label: "姓名"
        },
        {
          type: "email",
          label: "个人邮箱"
        },
        {
          type: "documentType",
          label: "证件类型"
        },
        {
          type: "documentNum",
          label: "证件号码"
        },
        {
          type: "approval",
          label: "offer状态"
        },
        {
          type: "birthDate",
          label: "出生日期"
        },
        {
          type: "nativePlace",
          label: "籍贯"
        },
        {
          type: "nation",
          label: "民族"
        },
        {
          type: "phone",
          label: "电话"
        },
        {
          type: "telPhone",
          label: "座机电话"
        },
        {
          type: "gender",
          label: "性别"
        },
        {
          type: "qqStr",
          label: "QQ"
        },
        {
          type: "department",
          label: "部门"
        },
        {
          type: "position",
          label: "职位"
        },
        {
          type: "marital",
          label: "婚姻状态"
        },
        {
          type: "age",
          label: "年龄"
        },
        {
          type: "education",
          label: "学历"
        },
        {
          type: "entry",
          label: "入职时间"
        },
        {
          type: "jobAddress",
          label: "工作地点"
        }
      ],
      offerManageArr2: [],
      offerManageArr3: [],
      offerManageArr4: [], //接收‘已发offer’的数据
      offerManageArr5: [], //接收‘待发offer’的数据
      offerManageArr6: [], //接收‘已接受offer’的数据
      offerManageArr7: [], //接收‘已拒绝offer’的数据
      offerManageArr8: [], //接收‘已入职offer’的数据
      addVal: [],
      deleteVal: []
      // offerManageArr9: []
    };
  },
  methods: {
    //获取随机生成的200条数据
    getOfferManage() {
      this.$axios
        .req("api/offerManage")
        .then(res => {
          this.offerManageArr = res.data;
          console.log(this.offerManageArr);
          // for (let key in res.data[0]) {
          //   this.offerManageArr9.push({type: key,label:res.data[0][key]})
          // }
          // console.log(this.offerManageArr9);
          this.offerManageArr4 = this.offerManageArr.filter(item => {
            return JSON.stringify(item).indexOf("已发") !== -1;
          });
          this.offerManageArr5 = this.offerManageArr.filter(item => {
            return JSON.stringify(item).indexOf("待发") !== -1;
          });
          this.offerManageArr6 = this.offerManageArr.filter(item => {
            return JSON.stringify(item).indexOf("已接受") !== -1;
          });
          this.offerManageArr7 = this.offerManageArr.filter(item => {
            return JSON.stringify(item).indexOf("已拒绝") !== -1;
          });
          this.offerManageArr8 = this.offerManageArr.filter(item => {
            return JSON.stringify(item).indexOf("已入职") !== -1;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页相关
    handleSizeChange(data) {
      this.pageSize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    //多选框selection-change事件
    handleSelectionChange(val) {
      console.log(val);
    },
    handleSelectionChange1(val) {
      this.addVal = val;
    },
    //添加显示字段中的确定按钮
    addSureObj() {
      this.addVal.forEach(item => {
        this.offerManageArr2.push(item);
        this.offerManageArr3 = this.offerManageArr3.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
      });
    },
    handleSelectionChange2(val) {
      this.deleteVal = val;
    },
    //删除显示字段中的确定按钮
    deleteSureObj() {
      this.deleteVal.forEach(item => {
        this.offerManageArr2 = this.offerManageArr2.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
        this.offerManageArr3.push(item);
      });
    },
    //添加字段和删除字段操作
    showSelect() {},
    //显示添加字段
    addField() {},
    //显示删除字段
    deleteField() {},
    //紧凑
    compactObj() {
      this.tabNum = 0;
      this.height1 = "20px";
    },
    //适中
    moderateObj() {
      this.tabNum = 1;
      this.height1 = "60px";
    },
    //宽松
    easyObj() {
      this.tabNum = 2;
      this.height1 = "100px";
    }
  },
  mounted() {
    this.getOfferManage();
    this.offerManageArr2 = this.offerManageArr1.slice(0, 9);
    this.offerManageArr3 = this.offerManageArr1.slice(
      9,
      this.offerManageArr1.length
    );
    console.log(this.offerManageArr3);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.app {
  width: 98%;
  background-color: #fbf7f9;
  padding: 10px;
}
.offer_manage_first {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.offer_manage_first_left {
  display: flex;
  align-items: center;
}
.first_left_1 {
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: yellowgreen;
}
.first_left_1Img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.first_left_2 {
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
}
.offer_manage_second {
  background-color: white;
  padding: 10px;
}
.popover_1 {
  display: flex;
  justify-content: space-around;
}
.popover_1_1 {
  font-size: 12px;
}
.popover_1_1:hover {
  cursor: pointer;
  color: #00b7ff;
}
.popover_hr {
  margin-top: 5px;
  height: 1px;
  border: none;
  background-color: #fbf7f9;
}
.popover_2 {
  font-size: 14px;
}
.popover_3 {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}
.popover_3_1 {
  font-size: 13px;
}
.popover_3_2 {
  color: #00b7ff;
}
.popover_3_1:hover {
  cursor: pointer;
  color: #00b7ff;
}
</style>
