<template>
  <div class="app">
    <Top></Top>
    <div class="salary_first">
      <div class="salary_first_1">
        <img src="../../picture/money.png" alt="" class="salary_first_img" />
      </div>
      <div class="salary_first_2">薪酬管理</div>
    </div>
    <div class="salary_body">
      <div class="salary_second">
        <div class="salary_second_left">
          {{ valueMonthDv }}&nbsp;&nbsp;薪酬预算
        </div>
        <div class="salary_second_right">
          <el-date-picker
            v-model="valueMonth"
            type="month"
            placeholder="请选择月份"
            :picker-options="pickerOptions"
            @change="changeObj"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="salary_third">
        如果有更多渠道请自行添加，所有添加渠道会显示在CRM系统当中
      </div>
      <div class="salary_fourth">
        薪资结构
      </div>
      <div class="salary_fifth">
        <el-table
          :data="salaryDataArr"
          border
          :summary-method="getSummaries"
          show-summary
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="structure" label="薪资构成" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.structure"
                v-show="scope.row.isInput3 === true"
                @blur="blurObj3(scope)"
                @keydown.enter.native="enterObj3(scope)"
              >
              </el-input>
              <div
                v-show="scope.row.isInput3 === false"
                @click="showInput3(scope)"
              >
                {{ scope.row.structure }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="planned" label="计划支出（元）" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.planned"
                v-show="scope.row.isInput === true"
                @blur="blurObj(scope)"
                @keydown.enter.native="enterObj(scope)">
              </el-input>
              <div
                v-show="scope.row.isInput === false"
                @click="showInput(scope)">
                {{ scope.row.planned }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="actual" label="实际支出（元）" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.actual"
                v-show="scope.row.isInput2 === true"
                @blur="blurObj2(scope)"
                @keydown.enter.native="enterObj2(scope)"
              >
              </el-input>
              <div
                v-show="scope.row.isInput2 === false"
                @click="showInput2(scope)"
              >
                {{ scope.row.actual }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastPlanned"
            label="上月计划（元）"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lastPlanned"
                :disabled="true"
                class="lastPlanned_input"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastActual"
            label="上月实际（元）"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lastActual"
                :disabled="true"
                class="lastPlanned_input"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <div class="add_More">
          <el-button type="primary" @click="addMoreObj">添加更多</el-button>
          <el-button type="primary" v-show="isCancelBlen" @click="cancelObj"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/Top";
export default {
  name: "SalaryManagement",
  components: {
    Top
  },
  props: {},
  data() {
    return {
      valueMonth: "",
      valueMonthDv: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const start = new Date();
              start.setMonth(start.getMonth() - 1);
              picker.$emit("pick", start);
            }
          }
        ]
      },
      salaryDataArr: [], //接收随机生成的3条数据
      isCancelBlen: false, //控制取消按钮的显示隐藏
      isBlur: true //控制失去焦点事件是否发生
    };
  },
  methods: {
    //获取随机生成的3条数据
    getSalaryData() {
      this.$axios
        .req("api/moneySalary")
        .then(res => {
          if (res.code === 200) {
            this.salaryDataArr = res.data;
          }
          console.log(this.salaryDataArr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    showInput(scope) {
      // console.log(scope);
      scope.row.isInput = true;
      this.isBlur = true;
    },
    showInput2(scope) {
      // console.log(scope);
      scope.row.isInput2 = true;
      this.isBlur = true;
    },
    showInput3(scope) {
      // console.log(scope);
      scope.row.isInput3 = true;
      this.isBlur = true;
    },
    blurObj(scope) {
      if (this.isBlur === true) {
        if (scope.row.planned) {
          scope.row.isInput = false;
          this.$message.success("操作成功");
        }
        if (
          scope.row.actual &&
          scope.row.planned &&
          scope.row.structure.length > 0
        ) {
          this.isCancelBlen = false;
        }
      }
    },
    enterObj(scope) {
      if (scope.row.planned) {
        scope.row.isInput = false;
        this.$message.success("操作成功");
        this.isBlur = false;
      }
      if (
        scope.row.actual &&
        scope.row.planned &&
        scope.row.structure.length > 0
      ) {
        this.isCancelBlen = false;
      }
    },
    blurObj2(scope) {
      if (this.isBlur === true) {
        // console.log(scope.row.actual);
        if (scope.row.actual) {
          scope.row.isInput2 = false;
          this.$message.success("操作成功");
        }
        if (
          scope.row.actual &&
          scope.row.planned &&
          scope.row.structure.length > 0
        ) {
          this.isCancelBlen = false;
        }
      }
    },
    enterObj2(scope) {
      // console.log(scope);
      // console.log(scope.row.actual);
      if (scope.row.actual) {
        scope.row.isInput2 = false;
        this.$message.success("操作成功");
        this.isBlur = false;
      }
      if (
        scope.row.actual &&
        scope.row.planned &&
        scope.row.structure.length > 0
      ) {
        this.isCancelBlen = false;
      }
    },
    blurObj3(scope) {
      if (this.isBlur === true) {
        if (scope.row.structure.length > 0) {
          scope.row.isInput3 = false;
          this.$message.success("操作成功");
        }
        if (
          scope.row.actual &&
          scope.row.planned &&
          scope.row.structure.length > 0
        ) {
          this.isCancelBlen = false;
        }
      }
    },
    enterObj3(scope) {
      // console.log(scope);
      if (scope.row.structure.length > 0) {
        scope.row.isInput3 = false;
        this.$message.success("操作成功");
        this.isBlur = false;
      }
      if (
        scope.row.actual &&
        scope.row.planned &&
        scope.row.structure.length > 0
      ) {
        this.isCancelBlen = false;
      }
    },
    //添加更多按钮
    addMoreObj() {
      let Modal = {
        structure: "",
        planned: "",
        actual: "",
        lastPlanned: 0,
        lastActual: 0,
        isInput: true,
        isInput2: true,
        isInput3: true
      };
      if (
        this.salaryDataArr[this.salaryDataArr.length - 1].structure &&
        this.salaryDataArr[this.salaryDataArr.length - 1].planned &&
        this.salaryDataArr[this.salaryDataArr.length - 1].actual
      ) {
        this.isCancelBlen = true;
        this.salaryDataArr.push(Modal);
      } else {
        this.$message.warning("请完成上一次添加");
      }
    },
    //取消按钮
    cancelObj() {
      this.isCancelBlen = false;
      if (
        this.salaryDataArr[this.salaryDataArr.length - 1].structure === "" ||
        this.salaryDataArr[this.salaryDataArr.length - 1].planned === "" ||
        this.salaryDataArr[this.salaryDataArr.length - 1].actual === ""
      ) {
        this.salaryDataArr.pop();
      }
    },
    //用户选择月份的事件
    changeObj() {
      console.log(this.valueMonth);
      this.valueMonthDv = this.$moment(this.valueMonth).format("YYYY年MM月");
    }
  },
  mounted() {
    let DateNow = new Date();
    this.valueMonth = this.$moment(DateNow).format("YYYY-MM");
    this.valueMonthDv = this.$moment(DateNow).format("YYYY年MM月");
    this.getSalaryData();
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
.salary_first {
  display: flex;
  align-items: center;
}
.salary_first_1 {
  width: 30px;
  height: 30px;
  background-color: yellowgreen;
  text-align: center;
}
.salary_first_img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.salary_first_2 {
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
}
.salary_body {
  background-color: white;
}
.salary_second {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.salary_second_left {
  font-size: 23px;
  font-weight: bold;
}
.salary_third {
  line-height: 40px;
  font-size: 16px;
  padding-left: 10px;
  background-color: burlywood;
}
.salary_fourth {
  line-height: 40px;
  font-size: 20px;
  padding-left: 10px;
  font-weight: bold;
}
.salary_fifth {
}
.add_More {
  padding: 10px;
}
</style>
