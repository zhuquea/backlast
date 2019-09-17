<template>
  <div class="app">
    <div class="home_first" @click="stretchingAside">
      <i
        class="el-icon-folder-opened"
        style="color: #00B7FF;font-size: 30px"
      ></i>
<!--      <span class="home_first_span">{{ topData }}</span>-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 5px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === '日程管理'">{{topData}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else-if="topData === '通讯录'">{{topData}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === 'offer管理'||topData === '人员信息'||topData === '薪酬管理'">组织员工</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === 'offer管理'">{{topData}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === '人员信息'">{{topData}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === '薪酬管理'">{{topData}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === '分布表单'">表单页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="topData === '分布表单'">{{topData}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    stretchingAside() {
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    topData() {
      return this.$store.state.topData;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.app {
  width: 100%;
}
.home_first {
  display: flex;
  align-items: center;
  padding: 10px;
}
.home_first_span {
  font-size: 16px;
}
</style>
