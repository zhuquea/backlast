<template>
  <div>
    <el-container>
      <el-header style="padding: 0"><Header></Header></el-header>
      <el-container>
        <el-aside :width="widthStr"><Aside></Aside></el-aside>
        <el-main style="padding: 0">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Aside from "../../components/Aside";
export default {
  name: "Content",
  components: {
    Aside,
    Header
  },
  props: {},
  data() {
    return {
      widthStr: ''
    };
  },
  methods: {},
  mounted() {
    if (localStorage.getItem('breadcrumb')) {
      this.$store.state.topData = localStorage.getItem('breadcrumb')
    }
  },
  created() {},
  filters: {},
  computed: {
    // widthStr() {
    //   return this.$store.state.widthStr;
    // }
  },
  watch: {
    $route(to) {
      console.log(to);
      if (to.path === "/") {
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/scheduleManagement") {
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/mailList"){
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/offerManagement") {
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        // this.$store.state.topData = `组织员工 > ${to.matched[0].meta.title}`
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/personalInformation"){
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        // this.$store.state.topData = `组织员工 > ${to.matched[0].meta.title}`
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/salaryManagement"){
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        // this.$store.state.topData = `组织员工 > ${to.matched[0].meta.title}`
        this.$store.state.topData = to.matched[0].meta.title
      } else if (to.path === "/form") {
        localStorage.setItem('breadcrumb',to.matched[0].meta.title)
        // this.$store.state.topData = `表单页 > ${to.matched[0].meta.title}`
        this.$store.state.topData = to.matched[0].meta.title
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">

</style>
