<template>
  <div class="findPassword_body">
    <el-card class="box-card">
      <div class="findPassword_welcome">
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
            <el-input
              v-model="ruleForm1.name"
              placeholder="请输入注册时用的用户名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm2"
          :rules="rules1"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入邮箱" prop="name">
            <el-input
              v-model="ruleForm2.name"
              placeholder="请输入注册时用的邮箱"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="findPassword__last">
        <el-button type="primary" style="margin-left: 90px" @click="Tologin"
          >前往登录</el-button
        >
        <el-button
          type="success"
          style="margin-left: 90px"
          @click="findPassword"
          >找回密码</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "FindPassword",
  components: {},
  props: {},
  data() {
    return {
      ruleForm1: {
        name: "",
        delivery: false,
        type: []
      },
      ruleForm2: {
        name: "",
        delivery: false,
        type: []
      },
      rules1: {
        name: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Tologin() {
      this.$router.push({ name: "login" });
    },
    findPassword() {
      this.$axios
        .req("api/users/findPassword", {
          username: this.ruleForm1.name,
          qqEmail: this.ruleForm2.name
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("邮件发送成功");
            console.log(res);
          } else if (res.code === 500) {
            this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请确认该账号是否已注册");
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
.findPassword_body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../login/tu123.jpg");
  background-size: 100%;
}
.box-card {
  width: 500px;
  height: 300px;
  margin: 160px auto;
}
.findPassword_welcome {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.findPassword__last {
  margin-top: 50px;
}
</style>
