<template>
  <div class="app">
    <Top></Top>
    <div class="person_information_first">
      <div class="person_information_first_Left">
        <div class="person_information_first_left">
          <img src="../../picture/person.png" alt="" class="first_left_img" />
        </div>
        <div class="first_left_name">人员信息</div>
      </div>
      <div class="person_information_first_right">
        <el-button
          type="primary"
          size="mini"
          v-show="showApplication === false"
          @click="sureThing"
          >确定</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-show="showApplication === false"
          @click="cancelThing"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="application"
          v-show="showApplication"
          >批量转正申请</el-button
        >
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <div class="person_information_second">
      <div
        class="information_second_1"
        :class="{ information_second_2: tabNum === 0 }"
        @click="tabSwitch1"
      >
        全部员工
      </div>
      <div
        class="information_second_1"
        :class="{ information_second_2: tabNum === 1 }"
        @click="tabSwitch2"
      >
        考核中员工
      </div>
      <div
        class="information_second_1"
        :class="{ information_second_2: tabNum === 2 }"
        @click="tabSwitch3"
      >
        已转正员工
      </div>
    </div>
    <div class="person_information_third">
      <el-table
        :data="
          personDataArr.slice(
            pageSize * (currentPage - 1),
            pageSize * currentPage
          )
        "
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="jobNum" sortable label="工号" width="100">
        </el-table-column>
        <el-table-column prop="mechanism" label="机构" width="180">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="180">
        </el-table-column>
        <el-table-column
          prop="trialStart"
          sortable
          label="试用期开始日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="trialEnd"
          sortable
          label="试用期结束日期"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="approval" label="转正审批状态" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope)"
              >编辑试用期</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Paging
      :tableData="personDataArr"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      style="margin-top: 10px"
    ></Paging>
  </div>
</template>

<script>
import Paging from "../../components/paging/Paging";
import Top from "../../components/top/Top";
export default {
  name: "PersonalInformation",
  components: {
    Top,
    Paging
  },
  props: {},
  data() {
    return {
      personDataArr: [], //接收随机生成的200条人员信息数据
      personDataArr2: [], //存储personDataArr的原始数据
      tabNum: 0,
      pageSize: 10,
      currentPage: 1,
      tabStr: "",
      showApplication: true, //控制‘批量转正申请’按钮的显示隐藏
      selectionChange: [] //接收多选框选中的数据
    };
  },
  methods: {
    //获取随机生成的200条人员信息数据
    getPersonalData() {
      this.$axios
        .req("api/personalInformation")
        .then(res => {
          this.personDataArr = res.data;
          this.personDataArr2 = res.data;
          console.log(this.personDataArr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    tabSwitch1() {
      this.tabNum = 0;
      this.personDataArr = this.personDataArr2;
    },
    tabSwitch2() {
      this.tabNum = 1;
      this.personDataArr = this.personDataArr2;
      this.tabStr = "审批中";
      let arr = this.personDataArr.filter(item => {
        return JSON.stringify(item).indexOf(this.tabStr) !== -1;
      });
      this.personDataArr = arr;
    },
    tabSwitch3() {
      this.tabNum = 2;
      this.showApplication = true;
      this.personDataArr = this.personDataArr2;
      this.tabStr = "审批通过";
      let arr1 = this.personDataArr.filter(item => {
        return JSON.stringify(item).indexOf(this.tabStr) !== -1;
      });
      this.personDataArr = arr1;
    },
    handleEdit(scope) {
      console.log(scope);
    },
    //分页相关
    handleSizeChange(data) {
      this.pageSize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    //批量转正申请
    application() {
      this.showApplication = false;
      this.tabNum = 0;
      this.personDataArr = this.personDataArr2;
      this.tabStr = "审批通过";
      let arr2 = this.personDataArr.filter(item => {
        return JSON.stringify(item).indexOf(this.tabStr) === -1;
      });
      this.personDataArr = arr2;
    },
    //确定按钮
    sureThing() {
      if (this.selectionChange.length === 0) {
        this.$message.warning("请至少选择一条数据");
      } else {
        this.showApplication = true;
        this.selectionChange.forEach(item => {
          item.approval = "审批通过";
        });
        this.personDataArr = this.personDataArr2;
        this.tabStr = "审批通过";
        let arr3 = this.personDataArr.filter(item => {
          return JSON.stringify(item).indexOf(this.tabStr) === -1;
        });
        this.personDataArr = arr3;
        this.$message.success("操作成功");
      }
    },
    //取消按钮
    cancelThing() {
      this.tabNum = 0;
      this.personDataArr = this.personDataArr2;
      this.showApplication = true;
    },
    //多选框selection-change事件
    handleSelectionChange(val) {
      this.selectionChange = val;
      console.log(this.selectionChange);
    }
  },
  mounted() {
    this.getPersonalData();
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
.person_information_first {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.person_information_first_Left {
  display: flex;
  align-items: center;
}
.person_information_first_left {
  width: 30px;
  height: 30px;
  background-color: yellowgreen;
  text-align: center;
}
.first_left_img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.first_left_name {
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
}
.person_information_first_right {
}
.person_information_second {
  display: flex;
}
.information_second_1 {
  width: 100px;
  line-height: 30px;
  border-radius: 25px;
  font-size: 15px;
  color: #00b7ff;
  text-align: center;
  background-color: #dbdbdb;
  margin-left: 10px;
}
.information_second_1:hover {
  cursor: pointer;
}
.information_second_2 {
  font-size: 16px;
  color: #fbf7f9;
  background-color: #00b7ff;
}
.person_information_third {
  margin-top: 10px;
}
</style>
