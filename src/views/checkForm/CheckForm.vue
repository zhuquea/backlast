<template>
  <div class="app">
    <section ref="print">
      <el-card class="box-card">
        <div class="checkForm_1">
          账单详情
        </div>
        <hr class="checkForm_2" />
        <div class="checkForm_3">
          <div class="checkForm_3_item">付款账户：{{ name1 }}</div>
          <div class="checkForm_3_item">收款账户：{{ name2 }}</div>
          <div class="checkForm_3_item">付款人姓名：{{ name3 }}</div>
          <div class="checkForm_3_item">付款金额：{{ name4 }}元</div>
        </div>
        <div class="no-print">
          <el-button @click="returnHome" type="primary">返回首页</el-button>
          <el-button @click="printObj" type="success" class="print_class">打印</el-button>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "CheckForm",
  components: {},
  props: {},
  data() {
    return {
      name1: "",
      name2: "",
      name3: "",
      name4: ""
    };
  },
  methods: {
    //打印
    printObj() {
      this.$print(this.$refs.print)
    },
    //返回首页
    returnHome() {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.name1 = this.$route.query.name1;
    this.name2 = this.$route.query.name2;
    this.name3 = this.$route.query.name3;
    this.name4 = this.$route.query.name4;
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
  width: 100%;
  height: 75vh;
  background-color: #fbf7f9;
  padding-top: 200px;
}
.box-card {
  width: 400px;
  height: 300px;
  background-color: white;
  margin-left: 50%;
  transform: translateX(-200px);
}
.checkForm_1 {
  font-size: 16px;
}
.checkForm_2 {
  margin-top: 20px;
  height: 1px;
  border: none;
  background-color: #cac6c6;
}
.checkForm_3 {
  line-height: 30px;
  margin-top: 20px;
}
.checkForm_3_item {
  font-size: 15px;
}
.no-print {
}
.print_class{
  margin-left: 190px;
  margin-top: 20px;
}
</style>
