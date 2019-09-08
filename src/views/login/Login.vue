<template>
  <div class="login_body">
    <el-card class="box-card">
      <div class="login_welcome">
        欢迎来到小爱后台管理系统
      </div>
      <div>
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          label-width="130px"
          class="demo-ruleForm2"
        >
          <el-form-item label="请输入密码" prop="pass" style="width: 270px">
            <el-input
              v-model="ruleForm2.pass"
              type="password"
              autocomplete="off"
            ></el-input>
            <el-button
              type="success"
              class="find_password"
              @click="findPassword"
              >找回密码</el-button
            >
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm3"
          :rules="rules3"
          label-width="130px"
          class="demo-ruleForm3"
        >
          <el-form-item label="请输入验证码" prop="name" style="width: 270px">
            <el-input v-model="ruleForm3.name"></el-input>
            <span
              class="vercode__picture"
              v-html="src"
              @click="getvercode1"
            ></span>
          </el-form-item>
        </el-form>
      </div>
      <div class="login__last">
        <el-button type="primary" style="margin-left: 90px" @click="lognow"
          >立即登录</el-button
        >
        <el-button type="primary" style="margin-left: 90px" @click="regnow"
          >立即注册</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Login",
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
        name: "",
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
      ruleForm3: {
        name: "",
        delivery: false,
        type: []
      },
      rules1: {
        name: [
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
        name: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      src: ""
    };
  },
  methods: {
    //立即登录
    lognow() {
      this.$axios
        .req("api/users/login", {
          username: this.ruleForm1.name,
          password: this.ruleForm2.pass,
          code: this.ruleForm3.name
        })
        .then(res => {
          if (res.code === 1) {
            this.$message.warning("验证码不正确，请重新输入");
            this.$axios
              .req("api/users/captcha")
              .then(response => {
                if (response) {
                  this.src = response;
                  console.log(this.src);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (res.code === 500) {
            this.$message.error("用户不存在或密码不正确，请重新输入");
          } else if (res.code === 200) {
            this.$message.success("登录成功");
            this.$store.state.user = this.ruleForm1.name;
            localStorage.setItem("user", JSON.stringify(res.data));
            // let date = new Date();
            // let timer = this.$moment(date).format(
            //   "YYYY年MM月DD日 HH时mm分ss秒"
            // );
            // localStorage.setItem("timer", timer);
            this.$router.push({ path: "/" });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    regnow() {
      this.$router.push({ name: "register" });
    },
    getvercode() {
      this.$axios
        .req("api/users/captcha")
        .then(response => {
          if (response) {
            this.src = response;
            console.log(this.src);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //找回密码
    findPassword() {
      this.$router.push({ name: "findPassword" });
    }
  },
  mounted() {
    this.getvercode();
  },
  created() {
    this.getvercode1 = _.debounce(this.getvercode, 350);
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.login_body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("tu123.jpg");
  background-size: 100%;
}
.box-card {
  width: 500px;
  height: 350px;
  margin: 100px auto;
}
.login_welcome {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.login__last {
}
.login__last {
  margin-top: 50px;
}
.demo-ruleForm2 {
  position: relative;
}
.find_password {
  position: absolute;
  top: 1px;
  right: -150px;
}
.demo-ruleForm3 {
  position: relative;
}
.vercode__picture {
  position: absolute;
  top: -8px;
  right: -172px;
}
</style>
