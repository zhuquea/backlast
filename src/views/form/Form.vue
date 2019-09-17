<template>
  <div class="app">
    <Top></Top>
    <div class="form_first">
      <div class="form_first_1">
        请填写您的转账信息
      </div>
      <div class="form_first_2">
        请务必是您本人操作，确认转账金额及收款人信息
      </div>
    </div>
    <div class="form_second">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="form_second_step1" v-if="active === 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="付款账户" prop="name1">
            <el-input v-model="ruleForm.name1"></el-input>
          </el-form-item>
          <el-form-item label="收款账户" required>
            <el-col :span="6">
              <el-form-item prop="select">
                <el-select
                  v-model="ruleForm.select"
                  placeholder="请选择付款方式"
                >
                  <el-option label="支付宝" value="zhifubao"></el-option>
                  <el-option label="银行卡" value="yinhangka"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="17">
              <el-form-item prop="name2">
                <el-input v-model="ruleForm.name2"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="付款人姓名" prop="name3">
            <el-input v-model="ruleForm.name3"></el-input>
          </el-form-item>
          <el-form-item label="付款金额" prop="name4">
            <el-input
              placeholder="请输入金额"
              v-model.number="ruleForm.name4"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <img
          src="../../picture/money-black.png"
          alt=""
          class="second_step1_money"
        />
      </div>
      <div class="form_second_step2" v-else-if="active === 1">
        <div class="second_step2_1">
          <el-alert
            title="确认转账后，资金将打入对方账户，无法退回"
            type="warning"
            show-icon
          >
          </el-alert>
        </div>
        <div class="second_step2_2">付款账户：{{ ruleForm.name1 }}</div>
        <div class="second_step2_2">收款账户：{{ ruleForm.name2 }}</div>
        <div class="second_step2_2">付款人姓名：{{ ruleForm.name3 }}</div>
        <div class="second_step2_2">付款金额：{{ ruleForm.name4 }}元</div>
        <hr class="second_step2_hr" />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleFormPass"
        >
          <el-form-item label="支付密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form_second_step3" v-else-if="active === 2">
        <div class="second_step3_1">
          <i
            class="el-icon-success"
            style="font-size: 60px;color: yellowgreen"
          ></i>
          <div class="second_step3_1_2">
            操作成功
          </div>
          <div class="second_step3_1_3">
            预计2小时内到账
          </div>
        </div>
        <div class="second_step2_2">付款账户：{{ ruleForm.name1 }}</div>
        <div class="second_step2_2">收款账户：{{ ruleForm.name2 }}</div>
        <div class="second_step2_2">付款人姓名：{{ ruleForm.name3 }}</div>
        <div class="second_step2_2">付款金额：{{ ruleForm.name4 }}元</div>
      </div>
    </div>
    <div class="form_third">
      <el-button
        @click="next"
        class="form_third_btn"
        type="primary"
        v-show="active === 0"
        >下一步</el-button
      >
      <div v-show="active === 1" class="form_third_step2_btn">
        <el-button @click="submitObj" type="success">提交</el-button>
        <el-button @click="returnObj" type="primary">上一步</el-button>
      </div>
      <div v-show="active === 2" class="form_third_step3_btn">
        <el-button @click="anotherRound" type="primary">再转一笔</el-button>
        <el-button @click="checkBill" type="success">查看账单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/Top";
export default {
  name: "Form",
  components: {
    Top
  },
  props: {},
  data() {
    return {
      active: 0,
      ruleForm: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        select: "",
        pass: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name1: [
          { required: true, message: "请输入付款账户", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        name2: [
          { required: true, message: "请输入收款账户", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        name3: [
          { required: true, message: "请输入付款人姓名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        name4: [
          { required: true, message: "请输入付款金额", trigger: "blur" },
          { type: "number", message: "金额必须为数字值" }
        ],
        select: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        pass: [
          { required: true, message: "请输入支付密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //下一步按钮
    next() {
      if (
        this.ruleForm.name1.length === 0 ||
        this.ruleForm.name2.length === 0 ||
        this.ruleForm.name3.length === 0 ||
        this.ruleForm.name4.length === 0
      ) {
        this.$message.warning("请按要求填写表单");
      } else {
        this.active = 1;
      }
      // console.log(this.active);
    },
    //提交按钮
    submitObj() {
      if (this.ruleForm.pass.length === 0) {
        this.$message.warning("请填写密码");
      } else {
        this.active = 2;
      }
    },
    //上一步按钮
    returnObj() {
      this.active = 0;
    },
    //再转一笔按钮
    anotherRound() {
      this.active = 0;
      this.ruleForm.name1 = "";
      this.ruleForm.name2 = "";
      this.ruleForm.name3 = "";
      this.ruleForm.name4 = "";
    },
    //查看账单按钮
    checkBill() {
      const { href } = this.$router.resolve({
        path: "/checkForm",
        query: {
          name1: this.ruleForm.name1,
          name2: this.ruleForm.name2,
          name3: this.ruleForm.name3,
          name4: this.ruleForm.name4
        }
      });
      window.open(href, "_blank");
    }
  },
  mounted() {},
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
.form_first {
  padding: 10px;
  line-height: 30px;
  background-color: white;
}
.form_first_1 {
  font-size: 18px;
  font-weight: bold;
}
.form_first_2 {
  font-size: 15px;
  color: #cac6c6;
}
.form_second {
  margin-top: 20px;
  background-color: white;
  padding: 10px;
}
.form_second_step1 {
  width: 50%;
  margin: 20px auto;
  position: relative;
}
.second_step1_money {
  width: 17px;
  height: 17px;
  position: absolute;
  bottom: 10px;
  left: 100px;
}
.form_second_step2 {
  width: 50%;
  line-height: 30px;
  margin: 20px auto;
}
.second_step2_2 {
  font-size: 15px;
}
.second_step2_hr {
  width: 100%;
  margin-top: 20px;
}
.demo-ruleFormPass {
  margin-top: 10px;
}
.form_second_step3 {
  width: 50%;
  line-height: 30px;
  margin: 20px auto;
  text-align: center;
}
.second_step3_1 {
  text-align: center;
}
.second_step3_1_2 {
  font-size: 16px;
}
.second_step3_1_3 {
  font-size: 12px;
  color: #cac6c6;
}
.form_third {
  background-color: white;
  padding: 10px;
}
.form_third_btn {
  margin-left: 45%;
  margin-top: 20px;
}
.form_third_step2_btn,
.form_third_step3_btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
