<template>
  <div class="app">
    <el-menu
      default-active="4-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="(item, index) in arr1"
        :key="index"
        :index="index.toString()"
        @click="jumpObj(item)"
        class="menu_item_RE"
      >
        <i :class="item.class"></i>
        <img
          src="../picture/圆点.png"
          class="yuan_dian"
          style="color: red"
          v-show="isCollapse === true && index === arr2[index]"
        />
        <!--        <i class="el-icon-more" style="color: red" v-show="isCollapse === true && index === arr2[index]"></i>-->
        <span slot="title" class="aside_item_span">{{
          arr1_1[index].name
        }}</span>
        <span
          class="span_new"
          v-show="index === arr2[index]"
          @click="showDialog(item)"
          >new</span
        >
        <el-dialog
          title="消息提示"
          :visible.sync="item.centerDialogVisible"
          width="30%"
          center
        >
          <div v-for="(item1, index1) in arr4[index]" :key="index1">
            <span v-show="item1.length > 0">{{ index1 + 1 }}：{{ item1 }}</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="item.centerDialogVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="item.centerDialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-menu-item>
      <el-submenu index="4" class="menu_item_RE">
        <template slot="title">
          <i class="el-icon-user"></i>
          <img
            src="../picture/圆点.png"
            class="yuan_dian"
            style="color: red"
            v-show="isCollapse === true && arr2[3] === 3"
          />
          <span slot="title" class="aside_item_span">{{
            staffStr[0].name
          }}</span>
          <span class="span_new" v-show="arr2[3] === 3">new</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="jumpOffer">{{
            staffStr1[0].name
          }}</el-menu-item>
          <el-menu-item index="4-2" @click="jumpPersonal">{{
            staffStr2[0].name
          }}</el-menu-item>
          <el-menu-item index="4-3" @click="jumpSalary">{{
            staffStr3[0].name
          }}</el-menu-item>
          <el-dialog
            title="消息提示"
            :visible.sync="centerDialogVisible3"
            width="30%"
            center>
            <div v-for="(item1, index1) in arr4[3]" :key="index1">
              <span v-show="item1.length > 0">{{ index1 + 1 }}：{{ item1 }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible3 = false"
                >确 定</el-button>
            </span>
          </el-dialog>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5" class="menu_item_RE">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <img
            src="../picture/圆点.png"
            class="yuan_dian"
            style="color: red"
            v-show="isCollapse === true && arr2[4] === 4"/>
          <span slot="title" class="aside_item_span">{{
            formStr[0].name
          }}</span>
          <span class="span_new" v-show="arr2[4] === 4">new</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="jumpForm">{{
            formStr1[0].name
          }}</el-menu-item>
          <el-dialog
            title="消息提示"
            :visible.sync="centerDialogVisible4"
            width="30%"
            center>
            <div v-for="(item1, index1) in arr4[4]" :key="index1">
              <span v-show="item1.length > 0">{{ index1 + 1 }}：{{ item1 }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible4 = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible4 = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {
      arr1: [
        {
          class: "el-icon-s-home",
          path: "/",
          centerDialogVisible: false
        },
        {
          class: "el-icon-date",
          path: "/scheduleManagement",
          centerDialogVisible: false
        },
        {
          class: "el-icon-document",
          path: "/mailList",
          centerDialogVisible: false
        }
      ],
      arr1_1: [
        {
          name: this.$t("message.asName1"),
          value: 0
        },
        {
          name: this.$t("message.asName2"),
          value: 1
        },
        {
          name: this.$t("message.asName3"),
          value: 2
        }
      ],
      arr2: [],
      arr3: [],
      arr4: [], //将arr3中的每一项转成数组后放入arr4中
      centerDialogVisible3: false,
      centerDialogVisible4: false,
      staffStr: [{ name: this.$t("message.asName4"), value: 0 }], //'组织员工'
      staffStr1: [{ name: this.$t("message.asName4_1"), value: 0 }], //'组织员工'下面的‘offer管理’
      staffStr2: [{ name: this.$t("message.asName4_2"), value: 0 }], //'组织员工'下面的‘人员信息’
      staffStr3: [{ name: this.$t("message.asName4_3"), value: 0 }], //'组织员工'下面的‘薪酬管理’
      formStr: [{ name: this.$t("message.asName5"), value: 0 }], //'表单页'
      formStr1: [{ name: this.$t("message.asName5_1"), value: 0 }] //'表单页'下面的‘分布表单’
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //跳转页面
    jumpObj(item) {
      this.$router.push({ path: item.path });
    },
    //跳转offer管理
    jumpOffer() {
      this.$router.push({ path: "/offerManagement" });
      if (this.arr2[3] === 3) {
        this.centerDialogVisible3 = true;
      }
    },
    //跳转人员信息
    jumpPersonal() {
      this.$router.push({ path: "/personalInformation" });
    },
    //跳转薪酬管理
    jumpSalary() {
      this.$router.push({ path: "/salaryManagement" });
    },
    //跳转分步表单
    jumpForm() {
      this.$router.push({ path: "/form" });
      if (this.arr2[4] === 4) {
        this.centerDialogVisible4 = true;
      }
    },
    //显示弹框
    showDialog(item) {
      item.centerDialogVisible = true;
    }
  },
  mounted() {
    this.$axios
      .req("api/getNew")
      .then(res => {
        this.arr2 = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/getNewText")
      .then(res => {
        this.arr3 = res.data;
        // console.log(this.arr3);
        this.arr3.forEach(item => {
          this.arr4.push(item.split("。"));
        });
        // console.log(this.arr4);
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {},
  filters: {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    localeObj() {
      return this.$i18n.locale;
    }
  },
  watch: {
    localeObj(val) {
      if (val === "zh") {
        Vue.set(this.arr1_1, 0, { name: this.$t("message.asName1"), value: 0 });
        Vue.set(this.arr1_1, 1, { name: this.$t("message.asName2"), value: 1 });
        Vue.set(this.arr1_1, 2, { name: this.$t("message.asName3"), value: 2 });
        Vue.set(this.staffStr, 0, {name: this.$t("message.asName4"), value: 0});
        Vue.set(this.staffStr1, 0, {name: this.$t("message.asName4_1"), value: 0});
        Vue.set(this.staffStr2, 0, {name: this.$t("message.asName4_2"), value: 0});
        Vue.set(this.staffStr3, 0, {name: this.$t("message.asName4_3"), value: 0});
        Vue.set(this.formStr, 0, {name: this.$t("message.asName5"), value: 0});
        Vue.set(this.formStr1, 0, {name: this.$t("message.asName5_1"), value: 0});
      } else if (val === "fan") {
        Vue.set(this.arr1_1, 0, { name: this.$t("message.asName1"), value: 0 });
        Vue.set(this.arr1_1, 1, { name: this.$t("message.asName2"), value: 1 });
        Vue.set(this.arr1_1, 2, { name: this.$t("message.asName3"), value: 2 });
        Vue.set(this.staffStr, 0, {name: this.$t("message.asName4"), value: 0});
        Vue.set(this.staffStr1, 0, {name: this.$t("message.asName4_1"), value: 0});
        Vue.set(this.staffStr2, 0, {name: this.$t("message.asName4_2"), value: 0});
        Vue.set(this.staffStr3, 0, {name: this.$t("message.asName4_3"), value: 0});
        Vue.set(this.formStr, 0, {name: this.$t("message.asName5"), value: 0});
        Vue.set(this.formStr1, 0, {name: this.$t("message.asName5_1"), value: 0});
      } else if (val === "en") {
        Vue.set(this.arr1_1, 0, { name: this.$t("message.asName1"), value: 0 });
        Vue.set(this.arr1_1, 1, { name: this.$t("message.asName2"), value: 1 });
        Vue.set(this.arr1_1, 2, { name: this.$t("message.asName3"), value: 2 });
        Vue.set(this.staffStr, 0, {name: this.$t("message.asName4"), value: 0});
        Vue.set(this.staffStr1, 0, {name: this.$t("message.asName4_1"), value: 0});
        Vue.set(this.staffStr2, 0, {name: this.$t("message.asName4_2"), value: 0});
        Vue.set(this.staffStr3, 0, {name: this.$t("message.asName4_3"), value: 0});
        Vue.set(this.formStr, 0, {name: this.$t("message.asName5"), value: 0});
        Vue.set(this.formStr1, 0, {name: this.$t("message.asName5_1"), value: 0});
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu_item_RE {
  position: relative;
}
.span_new {
  font-size: 18px;
  color: firebrick;
  position: absolute;
  right: 20px;
}
.el-menu {
  border-right: 0;
}
.yuan_dian {
  width: 12px;
  height: 12px;
}
.aside_item_span {
  display: inline-block;
  white-space: nowrap;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
