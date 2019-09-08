<template>
  <div class="register_body">
    <el-card class="box-card">
      <div class="register_welcome">
        欢迎来到小爱后台管理系统
      </div>
      <div>
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="name1">
            <el-input v-model="ruleForm1.name1"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入密码" prop="pass">
            <el-input
              v-model="ruleForm2.pass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm1"
          :rules="rules3"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入电话" prop="name3">
            <el-input v-model="ruleForm1.name3"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm1"
          :rules="rules4"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入邮箱" prop="name4">
            <el-input v-model="ruleForm1.name4"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm1"
          :rules="rules5"
          label-width="130px"
          class="demo-ruleForm5"
        >
          <el-form-item label="请输入验证码" prop="name5">
            <el-input v-model="ruleForm1.name5" style="width: 170px"></el-input>
            <el-button type="success" class="send_message" @click="sendMsg" :loading="loadStr"
              >{{BtnContent}}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="register__last">
        <el-button type="primary" style="margin-left: 90px" @click="toLogin"
          >前往登录</el-button
        >
        <el-button type="primary" style="margin-left: 90px" @click="registerNow"
          >立即注册</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm1: {
        name1: "",
        name3: "",
        name4: "",
        name5: "",
        delivery: false,
        type: []
      },
      ruleForm2: {
        name: "",
        delivery: false,
        type: [],
        pass: "",
        checkPass: ""
      },
      rules1: {
        name1: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      },
      rules3: {
        name3: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      },
      rules4: {
        name4: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      rules5: {
        name5: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" }
        ]
      },
      loadStr: false,
      BtnContent: '发送验证码'
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    //发送验证码
    sendMsg() {
      this.loadStr = true
      this.BtnContent = '已发送'
      this.$axios
        .req("api/users/sendMsg", {
          phone: this.ruleForm1.name3
        })
        .then(res => {
          if (res) {
            console.log(res);
            this.loadStr = false
            this.BtnContent = '发送验证码'
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即注册
    registerNow() {
      this.$axios
        .req("api/users/register", {
          username: this.ruleForm1.name1,
          password: this.ruleForm2.pass,
          qqEmail: this.ruleForm1.name4,
          phone: this.ruleForm1.name3,
          messageCode: this.ruleForm1.name5
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("恭喜你，注册成功");
            this.ruleForm1.name1 = "";
            this.ruleForm2.pass = "";
            this.ruleForm1.name4 = "";
            this.ruleForm1.name3 = "";
            this.ruleForm1.name5 = "";
            console.log(res);
          } else if (res.code === 500) {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
.register_body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("registerBJ.jpg");
  background-size: 100%;
}
.box-card {
  width: 500px;
  height: 460px;
  margin: 100px auto;
}
.register_welcome {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.demo-ruleForm {
}
.demo-ruleForm5 {
  position: relative;
}
.send_message {
  position: absolute;
  top: 1px;
  right: 0px;
}
.register__last {
  margin-top: 10px;
}
</style>
