<template>
  <div>
    <div class="header_first">
      <div class="header_first_left">
        {{ headLeft[0].name }}
      </div>
      <div class="header_first_right">
        <el-dropdown @command="handleCommand2">
          <i class="el-icon-document-copy" style="font-size: 30px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="jian">简体中文</el-dropdown-item>
            <el-dropdown-item command="fan">繁体中文</el-dropdown-item>
            <el-dropdown-item command="Eng">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-upload
          class="avatar-uploader"
          action="api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl === null"
            src="../picture/tou1.jpg"
            alt=""
            class="first_right_img"/>
          <img v-else :src="imageUrl" alt="" class="first_right_img" />
        </el-upload>
        <span v-if="timeNow >= 6 && timeNow<12">{{sayTimeHello1[0].name}}</span>
        <span v-else-if="timeNow>=12 && timeNow<14">{{sayTimeHello2[0].name}}</span>
        <span v-else-if="timeNow>=14 && timeNow<18">{{sayTimeHello3[0].name}}</span>
        <span v-else-if="timeNow>=18 && timeNow<24">{{sayTimeHello4[0].name}}</span>
        <span v-else>{{sayTimeHello5[0].name}}</span>
        <el-dropdown @command="handleCommand">
          <div class="first_right_content">
            {{ headHello[0].name }}{{ username }}
            <i class="el-icon-caret-bottom" style="font-size: 20px"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-upload
              class="avatar-uploader"
              action="api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <el-dropdown-item command="a">上传头像</el-dropdown-item>
            </el-upload>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="c">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="原密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.originalPass"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.newPass"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.surePass"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCancle">取 消</el-button>
          <el-button type="primary" @click="dialogSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      userPassword: "",
      imageUrl: "",
      idData: "",
      headLeft: [{ name: this.$t("message.headLeft"), value: 0 }],
      headHello: [{ name: this.$t("message.hello"), value: 0 }],
      dialogFormVisible: false, //控制对话框隐藏和显示
      form: {
        name: "",
        originalPass: "",
        newPass: "",
        surePass: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      timeNow: '',
      sayTimeHello1: [{ name: this.$t("message.headerHello1"), value: 0 }],//早上好
      sayTimeHello2: [{ name: this.$t("message.headerHello2"), value: 0 }],
      sayTimeHello3: [{ name: this.$t("message.headerHello3"), value: 0 }],
      sayTimeHello4: [{ name: this.$t("message.headerHello4"), value: 0 }],
      sayTimeHello5: [{ name: this.$t("message.headerHello5"), value: 0 }],
    };
  },
  methods: {
    //上传头像
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(file.response.url);
      let UrlObj = file.response.url;
      this.imageUrl = file.response.url;
      this.$axios
        .req("api/users/updateImg", {
          id: this.idData,
          imgUrl: UrlObj
        })
        .then(res => {
          if (res.code === 200) {
            console.log(res.data.imageUrl);
            // this.imageUrl = res.data.imageUrl
            this.$message.success("修改头像成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //头部用户的修改密码和退出登录
    handleCommand(command) {
      console.log(command);
      if (command === "b") {
        this.dialogFormVisible = true;
      } else if (command === "c") {
        this.$axios
          .req("api/users/logout")
          .then(res => {
            if (res.code === 200) {
              this.$message.success("退出登录成功");
              localStorage.removeItem("user");
              localStorage.removeItem("index")
              localStorage.removeItem("breadcrumb")
              this.$router.push({ path: "/login" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //dialog对话框中的取消按钮
    dialogCancle() {
      this.dialogFormVisible = false;
      this.form.originalPass = "";
      this.form.newPass = "";
      this.form.surePass = "";
    },
    //dialog对话框中的确定按钮
    dialogSure() {
      this.dialogFormVisible = false;
      if (
        this.form.originalPass === this.userPassword &&
        this.form.newPass === this.form.surePass
      ) {
        this.userPassword = this.form.newPass
        console.log(this.userPassword);
        this.$axios
          .req("api/users/updateUser", {
            id: this.idData,
            newPassword: this.form.newPass
          })
          .then(res => {
            // console.log(res.data);
            if (res.code === 200) {
              this.$message.success("修改密码成功");
            } else if (res.code === 500) {
              this.$message.warning(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.form.originalPass !== this.userPassword) {
        this.$message.error("原密码不正确");
      } else if (
        this.form.originalPass === this.userPassword &&
        this.form.newPass !== this.form.surePass
      ) {
        this.$message.error("请确认2次密码是否一致");
      }
      this.form.originalPass = "";
      this.form.newPass = "";
      this.form.surePass = "";
    },
    //用户修改字体
    handleCommand2(command) {
      // console.log(command);
      if (command === "jian") {
        this.$i18n.locale = "zh";
        Vue.set(this.headHello, 0, {name: this.$t("message.hello"), value: 0});
        Vue.set(this.headLeft, 0, {name: this.$t("message.headLeft"), value: 0});
        Vue.set(this.sayTimeHello1, 0, {name: this.$t("message.headerHello1"), value: 0});
        Vue.set(this.sayTimeHello2, 0, {name: this.$t("message.headerHello2"), value: 0});
        Vue.set(this.sayTimeHello3, 0, {name: this.$t("message.headerHello3"), value: 0});
        Vue.set(this.sayTimeHello4, 0, {name: this.$t("message.headerHello4"), value: 0});
        Vue.set(this.sayTimeHello5, 0, {name: this.$t("message.headerHello5"), value: 0});
      } else if (command === "Eng") {
        this.$i18n.locale = "en";
        Vue.set(this.headHello, 0, {name: this.$t("message.hello"), value: 0});
        Vue.set(this.headLeft, 0, {name: this.$t("message.headLeft"), value: 0});
        Vue.set(this.sayTimeHello1, 0, {name: this.$t("message.headerHello1"), value: 0});
        Vue.set(this.sayTimeHello2, 0, {name: this.$t("message.headerHello2"), value: 0});
        Vue.set(this.sayTimeHello3, 0, {name: this.$t("message.headerHello3"), value: 0});
        Vue.set(this.sayTimeHello4, 0, {name: this.$t("message.headerHello4"), value: 0});
        Vue.set(this.sayTimeHello5, 0, {name: this.$t("message.headerHello5"), value: 0});
      } else if (command === "fan") {
        this.$i18n.locale = "fan";
        Vue.set(this.headHello, 0, {name: this.$t("message.hello"), value: 0});
        Vue.set(this.headLeft, 0, {name: this.$t("message.headLeft"), value: 0});
        Vue.set(this.sayTimeHello1, 0, {name: this.$t("message.headerHello1"), value: 0});
        Vue.set(this.sayTimeHello2, 0, {name: this.$t("message.headerHello2"), value: 0});
        Vue.set(this.sayTimeHello3, 0, {name: this.$t("message.headerHello3"), value: 0});
        Vue.set(this.sayTimeHello4, 0, {name: this.$t("message.headerHello4"), value: 0});
        Vue.set(this.sayTimeHello5, 0, {name: this.$t("message.headerHello5"), value: 0});
      }
    }
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user")).user) {
      this.username = JSON.parse(localStorage.getItem("user")).user[0].username;
      this.userPassword = JSON.parse(
              localStorage.getItem("user")
      ).user[0].password;
      this.imageUrl = JSON.parse(localStorage.getItem("user")).user[0].imageUrl
      console.log(this.imageUrl);
      console.log(this.userPassword);
      this.idData = JSON.parse(localStorage.getItem("user")).user[0]._id;
    }else if (!JSON.parse(localStorage.getItem("user")).user) {
      this.username = JSON.parse(localStorage.getItem("user")).login
      this.imageUrl = JSON.parse(localStorage.getItem("user")).avatar_url
    }
    this.timeNow = this.$moment(new Date()).hour()
    // if (localStorage.getItem("imgUrl")) {
    //   this.imageUrl = localStorage.getItem("imgUrl");
    // }
    // console.log(JSON.parse(localStorage.getItem("user")).user[0].username);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.header_first {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.header_first_left {
  font-size: 25px;
  color: deepskyblue;
}
.header_first_right {
  display: flex;
  align-items: center;
}
.first_right_img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 5px;
}
.first_right_content {
  font-size: 17px;
  margin-left: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
