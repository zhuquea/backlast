<template>
  <div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paging",
  components: {},
  props: {
    tableData: {
      type: Array
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("handleSizeChange", this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("handleCurrentChange", this.currentPage);
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

<style scoped lang="scss"></style>
