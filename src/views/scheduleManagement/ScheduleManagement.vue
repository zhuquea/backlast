<template>
  <div class="app">
    <Top></Top>
    <div class="schedule_all">
      <LunarFullCalendar :events="events" :config="config" ref="FullCalendar" class="lunarFull"></LunarFullCalendar>
      <el-dialog title="添加日程" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="">
            <el-input
              v-model="form.content"
              autocomplete="off"
              placeholder="准备做什么"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间：" :label-width="formLabelWidth">
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '20:30'
              }"
            >
            </el-time-select>
            -
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '06:30',
                step: '00:15',
                end: '21:30',
                minTime: startTime
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="参与人：" :label-width="formLabelWidth">
            <div class="dialog_third">
              <span class="dialog_userName">{{ userName[0] }}</span>
              <span
                v-for="(item, index) in participants"
                :key="index"
                class="dialog_userName_participants"
                v-show="participants"
                >{{ item }}</span
              >
              <el-dropdown trigger="click" @visible-change="dropdownChange">
                <span class="el-dropdown-link">
                  <i
                    class="el-icon-circle-plus-outline"
                    style="font-size: 18px;color: #00B7FF"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="dropdown_menu">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                    placeholder="请输入参与人姓名"
                  ></el-input>
                  <el-dropdown-item>
                    <el-button
                      type="primary"
                      @click="addSure"
                      size="mini"
                      class="dropdown_menu_btn"
                      >确 定</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CaccleObj">取 消</el-button>
          <el-button type="primary" @click="SureObj">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="删除日程" :visible.sync="dialogVisible" width="30%">
        <span>确定要删除“{{ deleteTitle }}”该日程吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DeleteCancelObj">取 消</el-button>
          <el-button type="primary" @click="DeleteSureObj">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
// import "fullcalendar/dist/fullcalendar.css";
import Top from "../../components/top/Top";
export default {
  name: "ScheduleManagement",
  components: {
    Top,
    LunarFullCalendar
  },
  props: {},
  data() {
    return {
      aa: "sadasd",
      events: [],
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: true, //是否允许修改事件
        selectable: false, //是否允许用户通过单击或拖动选择日历中的对象，包括天和时间。
        eventLimit: 4, //事件个数
        allDaySlot: true, //是否显示allDay
        allDayText: "all-day",
        defaultView: "month", //显示默认视图
        businessHours: true, //区分工作时间
        aspectRatio: 1.0, //月视图下日历格子宽度和高度的比例
        slotMinutes: 30, //agenda视图下两个相邻时间之间的间隔
        timeFormat: "HH:mm", //日程的时间显示格式
        eventRender: this.eventRender, //日程渲染事件
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick //点击日程表上面某一天
      },
      dateNow: "",
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        content: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      startTime: "",
      endTime: "",
      userName: [],
      participants: [], //添加的参与人
      dateDate: "",
      deleteId: "", //删除日程时接收的id
      deleteTitle: "" //删除日程时接收的title
    };
  },
  methods: {
    // 点击事件
    eventClick(event) {
      // console.log(event);
      // console.log(event.startTime);
      let timeDate1 = this.$moment(event.startTime).format("YYYY-MM-DD");
      let timeDate2 = this.$moment(timeDate1).unix();
      let timeDate3 = this.$moment(this.dateNow).unix();
      // console.log(timeDate2);
      // console.log(timeDate3);
      // console.log(event._id);
      if (timeDate2 >= timeDate3) {
        this.deleteId = event._id;
        this.deleteTitle = event.title;
        this.dialogVisible = true;
      }
    },
    //删除日程中的确定按钮
    DeleteSureObj() {
      this.dialogVisible = false;
      this.$axios
        .req("api/calendar/delCalendar", {
          id: this.deleteId
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getCalendarData();
            // console.log(this.events.length);
            if (this.events.length === 1) {
              this.events = [];
            }
          } else {
            this.$message.error("删除失败");
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除日程中的取消按钮
    DeleteCancelObj() {
      this.dialogVisible = false;
    },
    //日程渲染事件
    eventRender(calEvent, element, view) {
      // console.log(element[0]);
      // console.log(calEvent);
      let start = this.$moment(calEvent.startTime).format("HH:mm");
      let end = this.$moment(calEvent.endTime).format("HH:mm");
      let content = calEvent.schedule;
      let people = calEvent.users.toString();
      let peopleNum = calEvent.users.length;
      element[0].innerHTML =
        "<div> " +
        start +
        " ~ " +
        end +
        "： " +
        content +
        "</div>" +
        "<div>参与人：" +
        people +
        "</div>" +
        "<div>参与人数：" +
        "<i class=\"el-icon-user-solid\" style='color: black'></i>×" +
        peopleNum +
        "</div>";
    },
    // 点击当天
    dayClick(day, jsEvent) {
      // console.log("dayClick", day, jsEvent);
      this.participants = [];
      // console.log(day._d);
      // console.log(jsEvent);
      this.dateDate = this.$moment(day._d).format("YYYY-MM-DD");
      let dateStr1 = this.$moment(day._d).unix();
      let dateStr2 = this.$moment(this.dateNow).unix();
      if (dateStr1 < dateStr2) {
        this.$message.warning("不能给今天之前的日期添加日程");
      } else {
        this.dialogFormVisible = true;
      }
      // console.log(dateStr1);
      // console.log(this.dateDate);
    },
    //对话框中确定按钮
    SureObj() {
      this.dialogFormVisible = false;
      this.participants.forEach(item => {
        this.userName.push(item);
      });
      let startTimeStr1 = this.dateDate + " " + this.startTime + ":00";
      let startTimeStr2 = this.dateDate + " " + this.endTime + ":00";
      console.log(startTimeStr1);
      console.log(startTimeStr2);
      this.$axios
        .req("api/calendar/addCalendar", {
          users: this.userName,
          startTime: startTimeStr1,
          endTime: startTimeStr2,
          schedule: this.form.content
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("添加日程成功");
            this.getCalendarData();
            this.form.content = "";
            this.startTime = "";
            this.endTime = "";
          } else if (res.code === 500) {
            this.$message.error("添加日程失败");
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.$message.warning("请按要求完成添加日程");
        });
      console.log(this.form.content);
      console.log(this.userName);
    },
    //对话框中取消按钮
    CaccleObj() {
      this.dialogFormVisible = false;
    },
    //添加参与人的确定按钮
    addSure() {
      if (
        this.participants.indexOf(this.form.name) !== -1 ||
        this.form.name === this.userName[0]
      ) {
        this.$message.warning("该参与人已经添加过了");
      } else {
        this.participants.push(this.form.name);
      }
    },
    //下拉菜单显示/隐藏事件
    dropdownChange() {
      this.form.name = "";
    },
    //获取日程
    getCalendarData() {
      this.$axios
        .req("api/calendar/calendar")
        .then(res => {
          if (res.code === 200) {
            console.log(res.data);
            res.data.forEach(item => {
              item.end = this.$moment(item.endTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              item.start = this.$moment(item.startTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              item.title = item.schedule;
              item.color = "#8cf893";
            });
            this.events = res.data;
          }
          console.log(this.events);
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let date = new Date();
    // console.log(window.lunar(date)); // Date is the date.
    this.dateNow = this.$moment(date).format("YYYY-MM-DD");
    // console.log(this.dateNow);
    this.userName.push(
      JSON.parse(localStorage.getItem("user")).user[0].username
    );
    // console.log(this.userName);
    this.getCalendarData();
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
  width: 98%;
  background-color: #fbf7f9;
  padding: 10px;
}
.schedule_all {
  background-color: white;
}
.dialog_third {
  display: flex;
  align-items: center;
}
.dialog_userName {
  font-size: 13px;
}
.dropdown_menu {
  height: 76px;
  padding: 5px;
  position: relative;
}
.dropdown_menu_btn {
  position: absolute;
  top: 50px;
  right: 10px;
}
.dialog_userName_participants {
  font-size: 13px;
  margin-left: 5px;
}
</style>
