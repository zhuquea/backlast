<template>
  <div class="app">
    <div class="home_first" @click="stretchingAside">
      <i
        class="el-icon-folder-opened"
        style="color: #00B7FF;font-size: 30px"
      ></i>
      <span class="home_first_span">{{ topData }}</span>
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
      // if (this.$store.state.isCollapse === true) {
      //   this.$store.state.widthStr = "50px";
      // } else {
      //   this.$store.state.widthStr = "220px";
      // }
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
