<template>
  <div class="app">
    <Top></Top>
    <div class="home_first">
      <div
        class="home_first_1"
        v-for="(item, index) in HomeArr1"
        :key="index"
        @click="jumpTab(index)"
      >
        <hr
          class="home_first_1_hr"
          :style="item.hrBc"
          v-show="tabNum === index"
        />
        <div class="home_first_1_1">
          <div class="first_1_name">{{ HomeArr2[index].name }}</div>
          <div class="first_1_price">
            ￥<countTo
              :startVal="item.startVal"
              :endVal="item.price"
              :duration="3000"
            ></countTo>
          </div>
        </div>
        <div class="home_first_1_2">
          <div class="home_first_1_P" v-show="item.isShow">
            <div>{{ item.percentage }}%</div>
            <div>完成率</div>
          </div>
          <Progress
            v-if="item.isShow"
            key="animation-model1"
            :isAnimation="true"
            :isRound="true"
            :width="width"
            :radius="radius"
            :progress="item.percentage"
            :barColor="item.barColor"
            :duration="duration"
            :delay="delay"
            :timeFunction="timeFunction"
            :backgroundColor="backgroundColor"
          ></Progress>
          <Progress
            v-show="item.isShow === false"
            key="aniMl2"
            :isAnimation="true"
            :isRound="true"
            :width="width"
            :radius="radius"
            :progress="progress"
            :barColor="backgroundColor"
            :duration="duration"
            :delay="delay"
            :timeFunction="timeFunction"
            :backgroundColor="backgroundColor"
          ></Progress>
        </div>
        <div>|</div>
      </div>
    </div>
    <div class="home_second">
      <div class="home_second_left">
        利润（万）
        <hr class="second_left_hr" />
        <ve-wordcloud
          :data="chartData"
          :settings="chartSettings"
        ></ve-wordcloud>
      </div>
      <div class="home_second_right">
        <div class="second_right_1">
          <div class="second_right_1_1">个人动态</div>
          <el-button
            type="primary"
            class="second_right_1_2"
            size="mini"
            @click="addDynamic"
            >添加动态</el-button
          >
          <el-dialog title="添加动态" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="动态类型" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择动态类型">
                  <el-option label="个人心情" value="个人心情"></el-option>
                  <el-option label="工作汇报" value="工作汇报"></el-option>
                  <el-option label="公司相关" value="公司相关"></el-option>
                  <el-option label="其他事物" value="其他事物"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="相关汇报人"
                :label-width="formLabelWidth"
                v-show="form.region === '工作汇报'"
              >
                <el-select
                  v-model="form.name2"
                  multiple
                  placeholder="请选择相关汇报人"
                >
                  <el-option
                    v-for="item in form.person"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详情内容" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelObj">取 消</el-button>
              <el-button type="primary" @click="sureObj">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <hr class="second_right_hr" />
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            @change="changeObj"
          >
          </el-date-picker>
        </div>
        <div class="second_right_2">
          <div
            v-for="(item, index) in dynamicArr"
            :key="item._id"
            class="second_right_2_item"
            :class="
              index % 2 === 0 ? 'right_2_item_hide1' : 'right_2_item_hide2'
            "
            v-show="item.TimeStr === value1"
          >
            <div class="right_2_item_1">
              <div class="item_classification">{{ item.classification }}</div>
              <div class="item_username">{{ item.username }}</div>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.reportUsers.join('，')"
              placement="top-start"
            >
              <div class="right_2_item_3" v-show="item.reportUsers.length > 0">
                汇报人：
                <span
                  v-for="(item1, index1) in item.reportUsers"
                  :key="index1"
                  class="item_reportUsers"
                >
                  {{ item1 }}
                </span>
              </div>
            </el-tooltip>
            <div class="right_2_item_2">
              <div class="item_dynamic">{{ item.dynamic }}</div>
              <div class="item_DateStr">发布于{{ item.DateStr }}</div>
            </div>
          </div>
          <div class="second_right_2_none" v-show="showNone">
            暂无动态
          </div>
        </div>
      </div>
    </div>
    <div class="home_third">
      <HomeThird></HomeThird>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import countTo from "vue-count-to";
import Progress from "../components/circle-progress";
import Top from "../components/top/Top";
import HomeThird from "../components/homeThird/HomeThird";
export default {
  name: "home",
  components: {
    Top,
    countTo,
    Progress,
    HomeThird
  },
  props: {},
  data() {
    this.chartSettings = {
      sizeMin: 12,
      sizeMax: 25
    };
    return {
      HomeArr1: [
        {
          // name: "本月应收（元）",
          price: 0,
          percentage: 0,
          barColor: "#F2AE57",
          backgroundColor: "#FFE8CC",
          isShow: true,
          startVal: 0,
          hrBc: "background-color: #F2AE57"
        },
        {
          // name: "待收款（元）",
          price: 0,
          percentage: 0,
          barColor: "#19fa28",
          backgroundColor: "#FFE8CC",
          isShow: false,
          startVal: 0,
          hrBc: "background-color: #19fa28"
        },
        {
          // name: "客单价/合同（元）",
          price: 0,
          percentage: 0,
          barColor: "#17abe3",
          backgroundColor: "#FFE8CC",
          isShow: false,
          startVal: 0,
          hrBc: "background-color: #17abe3"
        }
      ],
      HomeArr2: [
        {
          name: this.$t("message.name1"),
          value: 0,
        },
        {
          name: this.$t("message.name2"),
          value: 1,
        },
        {
          name: this.$t("message.name3"),
          value: 2,
        }
      ],
      isDurationModel: true, // 是否打开持续缓动模式
      // isShow: true,
      width: 60,
      radius: 10,
      progress: 70,
      duration: 1000,
      delay: 20,
      barColor: "#F2AE57",
      backgroundColor: "#FFE8CC",
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
      intervalTimer: null, // 持续模式，循环计时器
      durationTime: 60, // 持续模式总时长
      tabNum: 0,
      chartData: {
        columns: ["city", "count"],
        rows: []
      },
      value1: "", //发布动态日期
      dynamicArr: [], //接收动态数据
      dialogFormVisible: false,
      form: {
        name: "",
        name2: [],
        person: [],
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      userName: "", //发布人
      showNone: true, //控制‘暂无动态’的显示隐藏
      contentWord: []
    };
  },
  methods: {
    //tab切换
    jumpTab(index) {
      this.tabNum = index;
      this.HomeArr1.forEach(item => {
        item.isShow = false;
        item.startVal = item.price;
      });
      this.$nextTick(() => {
        this.HomeArr1[index].isShow = true;
        this.HomeArr1[index].startVal = 0;
      });
    },
    //获取随机生成的30座城市
    getCity() {
      this.$axios
        .req("api/getCity")
        .then(res => {
          console.log(res.data);
          this.chartData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取动态
    getDynamic() {
      this.$axios
        .req("api/dynamic/getDynamic")
        .then(res => {
          let count1 = 0;
          this.value1 = this.$moment(this.value1).format("YYYY-MM-DD");
          this.dynamicArr = res.data;
          this.dynamicArr.forEach(item => {
            item.DateStr = this.$moment(item.date).format("YYYY年MM月DD日");
            item.TimeStr = this.$moment(item.date).format("YYYY-MM-DD");
            if (this.value1 === item.TimeStr) {
              count1++;
            }
          });
          if (count1 === 0) {
            this.showNone = true;
          } else {
            this.showNone = false;
          }
          console.log(this.dynamicArr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加动态按钮
    addDynamic() {
      this.dialogFormVisible = true;
    },
    //添加动态中的确定按钮
    sureObj() {
      this.dialogFormVisible = false;
      console.log(this.form.region);
      this.$axios
        .req("api/dynamic/addDynamic", {
          dynamic: this.form.name,
          username: this.userName,
          date: this.value1,
          classification: this.form.region,
          reportUsers: this.form.name2
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.getDynamic();
            this.form.name2 = [];
            this.form.region = "";
            this.form.name = "";
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.$message.warning("请按要求完成添加动态");
        });
      // console.log(this.form.name2);
    },
    //添加动态中的取消按钮
    cancelObj() {
      this.dialogFormVisible = false;
      this.form.name2 = [];
      this.form.region = "";
      this.form.name = "";
    },
    //获取20个汇报人
    getPerson() {
      this.$axios
        .req("api/getList")
        .then(res => {
          this.form.person = res.data;
          console.log(this.form.person);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //处理用户选择的时间
    changeObj() {
      let count = 0;
      this.value1 = this.$moment(this.value1).format("YYYY-MM-DD");
      if (this.dynamicArr !== null) {
        this.dynamicArr.forEach(item => {
          if (this.value1 === item.TimeStr) {
            count++;
          }
        });
        if (count === 0) {
          this.showNone = true;
        } else {
          this.showNone = false;
        }
      }
    }
  },
  mounted() {
    let date = new Date();
    this.value1 = this.$moment(date).format("YYYY-MM-DD");
      console.log(JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user")).user) {
        this.userName = JSON.parse(localStorage.getItem("user")).user[0].username
    }else if (!JSON.parse(localStorage.getItem("user")).user) {
        this.userName = JSON.parse(localStorage.getItem("user")).login
    }
    console.log(this.userName);
    this.$axios
      .req("api/getHome1")
      .then(res => {
        res.data.forEach((item, index) => {
          this.HomeArr1[index].price = item.price;
          this.HomeArr1[index].percentage = parseInt(item.percentage);
        });
        // console.log(this.HomeArr1);
        this.HomeArr1.forEach(item => {
          item.isShow = false;
          item.startVal = item.price;
        });
        this.$nextTick(() => {
          this.HomeArr1[0].isShow = true;
          this.HomeArr1[0].startVal = 0;
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.getCity();
    this.getDynamic();
    this.getPerson();
    // let date = new Date();
    // let countNum = 0;
    // this.value1 = this.$moment(date).format("YYYY-MM-DD");
    // this.dynamicArr.forEach(item => {
    //   if (this.value1 === item.TimeStr) {
    //     countNum++;
    //   }
    // });
    // console.log(countNum);
    // if (countNum === 0) {
    //   this.showNone = true;
    // } else {
    //   this.showNone = false;
    // }
    console.log(this.value1);
  },
  created() {},
  filters: {},
  computed: {
    localeObj() {
      return this.$i18n.locale;
    }
  },
  watch: {
    localeObj(val) {
      console.log(val);
      if (val === "zh") {
        Vue.set(this.HomeArr2, 0, { name: this.$t("message.name1"), value: 0 });
        Vue.set(this.HomeArr2, 1, { name: this.$t("message.name2"), value: 1 });
        Vue.set(this.HomeArr2, 2, { name: this.$t("message.name3"), value: 2 });
      } else if (val === "fan") {
        Vue.set(this.HomeArr2, 0, { name: this.$t("message.name1"), value: 0 });
        Vue.set(this.HomeArr2, 1, { name: this.$t("message.name2"), value: 1 });
        Vue.set(this.HomeArr2, 2, { name: this.$t("message.name3"), value: 2 });
      } else if (val === "en") {
        Vue.set(this.HomeArr2, 0, { name: this.$t("message.name1"), value: 0 });
        Vue.set(this.HomeArr2, 1, { name: this.$t("message.name2"), value: 1 });
        Vue.set(this.HomeArr2, 2, { name: this.$t("message.name3"), value: 2 });
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.app {
  width: 96%;
  background-color: #fbf7f9;
  padding: 20px;
}
.home_first {
  height: 90px;
  margin: 10px auto;
  display: flex;
  background-color: white;
}
.home_first_1 {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.home_first_1_hr {
  width: 100%;
  position: absolute;
  top: 0;
  height: 4px;
  border: none;
}
.home_first_1_1 {
  margin-left: 20px;
}
.first_1_name {
  font-size: 16px;
  color: darkgray;
}
.first_1_price {
  font-size: 18px;
  font-weight: bold;
}
.home_first_1_2 {
  position: relative;
}
.home_first_1_P {
  text-align: center;
  position: absolute;
  top: 10px;
  left: 5px;
  font-size: 12px;
  width: 50px;
}
.home_second {
  display: flex;
}
.home_second_left {
  flex: 1;
  background-color: white;
  padding: 10px;
  box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.1);
}
.home_second_right {
  flex: 1;
  background-color: white;
  padding: 10px;
  margin-left: 5px;
  height: 436px;
  overflow: auto;
  box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.1);
}
.second_right_1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.second_right_1_1 {
  font-size: 15px;
}
.second_right_1_2 {
}
.second_left_hr {
  margin-top: 13px;
  background-color: #e6e6e6;
  height: 1px;
  border: none;
}
.second_right_hr {
  margin-top: 5px;
  background-color: #e6e6e6;
  height: 1px;
  border: none;
}
.block {
  margin-top: 10px;
}
.second_right_2_none {
  font-size: 16px;
  margin-top: 5px;
}
.second_right_2 {
  margin-top: 5px;
}
.el-select {
  width: 100%;
}
.right_2_item_1 {
  display: flex;
  justify-content: space-between;
}
.second_right_2_item {
  padding: 5px;
  line-height: 35px;
  margin-top: 5px;
}
.second_right_2_item:hover {
  background-color: bisque;
}
.right_2_item_hide1 {
  background-color: #fbf7f9;
}
.right_2_item_hide2 {
  background-color: #cac6c6;
}
.item_classification,
.item_username {
  font-size: 16px;
}
.right_2_item_2 {
  display: flex;
  justify-content: space-between;
}
.right_2_item_3 {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.item_dynamic {
  font-size: 16px;
}
.item_DateStr {
  font-size: 16px;
  color: darkgray;
}
.item_reportUsers {
  margin-left: 5px;
}
.home_third {
  margin-top: 20px;
  background-color: white;
}
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
