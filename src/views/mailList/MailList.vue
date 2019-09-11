<template>
  <div class="app">
    <Top></Top>
    <div class="mail_list_all">
      <div class="mail_list_all_left">
        <el-tree
          :data="treeDataArr"
          :props="defaultProps"
          @node-click="handleNodeClick"
          class="mail_list_left_tree"
        ></el-tree>
      </div>
      <div class="mail_list_all_right">
        <div
          v-for="item in mailListArr.slice(
            pageSize * (currentPage - 1),
            pageSize * currentPage
          )"
          :key="item.id"
          class="list_all_right_item"
        >
          <div class="right_item_first">
            <div
              class="item_first_left"
              :style="'background-color:' + item.color"
            >
              {{ item.name }}
            </div>
            <div class="item_first_right">
              <div class="item_first_right_1">{{ item.name }}</div>
              <div class="item_first_right_2">
                <span>{{ item.department }}</span> /
                <span>{{ item.position }}</span>
              </div>
              <div class="item_first_right_3" v-if="item.personTag.length > 0">
                <div
                  v-for="(item1, index1) in item.personTag"
                  :key="index1"
                  class="item_personTag"
                  :style="'background-color:' + item1.colorTag"
                  v-show="item1.tag"
                >
                  {{ item1.tag }}
                </div>
              </div>
              <div class="item_first_right_3Hide" v-show="item.personTag[0].tag === '' && item.personTag[1].tag === '' && item.personTag[2].tag === ''">
                快来给ta添加一个标签吧
              </div>
            </div>
          </div>
          <div class="right_item_second">
            <div>邮箱：{{ item.email }}</div>
            <div>办公电话：{{ item.telPhone }}</div>
            <div>手机号码：{{ item.phone }}</div>
            <div>性别：{{ item.gender }}</div>
            <div>QQ：{{ item.qqStr }}</div>
          </div>
        </div>
      </div>
    </div>
    <Paging
      :tableData="mailListArr"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      style="margin-top: 10px"
    ></Paging>
  </div>
</template>

<script>
import Paging from "../../components/paging/Paging";
import TreeData from "../../mock/tree";
import Top from "../../components/top/Top";
export default {
  name: "MailList",
  components: {
    Top,
    Paging
  },
  props: {},
  data() {
    return {
      treeDataArr: [], //接收树形控件左边的数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      mailListArr: [], //接收200条随机数据
      mailListArr2: [], //存储mailListArr的原始数据
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    //过滤
    handleNodeClick(data) {
      // console.log(data.label);
      // console.log(data);
      this.mailListArr = this.mailListArr2;
      if (!data.children) {
        let arr1 = this.mailListArr.filter(item => {
          return JSON.stringify(item).indexOf(data.label) !== -1;
        });
        this.mailListArr = arr1;
      }
    },
    handleSizeChange(data) {
      this.pageSize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    this.treeDataArr = TreeData.data;
    console.log(this.treeDataArr);
    this.$axios
      .req("api/mailListData")
      .then(res => {
        this.mailListArr = res.data;
        this.mailListArr2 = res.data;
        console.log(this.mailListArr);
      })
      .catch(err => {
        console.log(err);
      });
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
  background-color: #fbf7f9;
}
.mail_list_all {
  display: flex;
  padding: 10px;
  position: relative;
}
.mail_list_all_left {
  width: 15%;
}
.mail_list_all_right {
  width: 80%;
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
}
.list_all_right_item {
  width: 300px;
  height: 200px;
  background-color: white;
  padding: 10px;
  margin-left: 10px;
  margin-top: 10px;
}
.right_item_first {
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #dbdbdb;
}
.item_first_left {
  width: 70px;
  line-height: 70px;
  border-radius: 50%;
  text-align: center;
}
.item_first_right {
  margin-left: 5px;
}
.item_first_right_1 {
  font-size: 17px;
}
.item_first_right_2 {
  font-size: 15px;
  margin-top: 4px;
}
.item_first_right_3 {
  margin-top: 4px;
  display: flex;
}
.item_personTag {
  width: 40px;
  line-height: 20px;
  border-radius: 25px;
  text-align: center;
  margin-left: 3px;
  font-size: 12px;
  color: white;
}
.item_first_right_3Hide {
  font-size: 12px;
  color: darkgrey;
}
.right_item_second {
  margin-top: 15px;
  font-size: 15px;
}
</style>
