<template>
  <div>
    <div class="home_third_1">
      网站问卷调查
    </div>
    <div class="home_third_2">
      <template>
        <el-table :data="tabDataArr" style="width: 100%">
          <el-table-column prop="name" label="问卷名称" width="180">
          </el-table-column>
          <el-table-column prop="describe" label="问卷描述" width="180">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="创建时间"
            sortable
            width="180"
          >
          </el-table-column>
          <el-table-column prop="endTime" label="截止时间" sortable width="180">
          </el-table-column>
          <el-table-column prop="topic" label="问卷主题" width="180">
            <template slot-scope="scope">
              <el-tag type="success" disable-transitions v-show="scope.row.topic === '已发布'">{{ scope.row.topic }}</el-tag>
              <el-tag type="primary" disable-transitions v-show="scope.row.topic === '已截止'">{{ scope.row.topic }}</el-tag>
              <el-tag type="warning" disable-transitions v-show="scope.row.topic === '未发布'">{{ scope.row.topic }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="websiteName" label="网站名称" width="180">
            <template slot-scope="scope">
              <el-tag type="success" disable-transitions v-show="scope.row.websiteName === '百度'">{{ scope.row.websiteName }}</el-tag>
              <el-tag type="primary" disable-transitions v-show="scope.row.websiteName === '豆瓣'">{{ scope.row.websiteName }}</el-tag>
              <el-tag type="warning" disable-transitions v-show="scope.row.websiteName === '掘金'">{{ scope.row.websiteName }}</el-tag>
              <el-tag type="danger" disable-transitions v-show="scope.row.websiteName === 'Github'">{{ scope.row.websiteName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="viewWebsite(scope)">查看网站详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog title="复制地址" :visible.sync="dialogFormVisible" @opened="ShowQRCode">
      <el-form :model="form">
        <el-form-item label="" class="dialog_form_item">
          <el-input id="copyVal" v-model="form.name" autocomplete="off"></el-input>
          <el-button type="danger" size="mini" @click.once="copyLink" class="cobyDomObj" data-clipboard-target="#copyVal">复制</el-button>
        </el-form-item>
        <el-form-item label="" class="dialog_form_item2">
          <div class="dialog_form_item2_dv">
            如无法使用上方复制按钮，请选中内容后，使用Ctrl +
            C复制。也可扫描下方二维码或右键保存二维码进行访问。
          </div>
        </el-form-item>
      </el-form>
      <div id="qrcode" class="dialog_form_item3_dv" ref="qrCodeDiv"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "HomeThird",
  components: {},
  props: {},
  data() {
    return {
      tabDataArr: [], //接收随机生成的30条问卷调查数据
      webData: [
        "https://www.baidu.com/",
        "https://www.douban.com/",
        "https://juejin.im/",
        "https://github.com/"
      ], //'百度','豆瓣','掘金','Github'等网站的网址
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    //获取表格数据
    getTabData() {
      this.$axios
        .req("api/questionInvestigation")
        .then(res => {
          this.tabDataArr = res.data;
          console.log(this.tabDataArr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看网站详情按钮
    viewWebsite(scope) {
      console.log(scope);
      this.dialogFormVisible = true;
      if (scope.row.websiteName === "百度") {
        this.form.name = this.webData[0];
      } else if (scope.row.websiteName === "豆瓣") {
        this.form.name = this.webData[1];
      } else if (scope.row.websiteName === "掘金") {
        this.form.name = this.webData[2];
      } else if (scope.row.websiteName === "Github") {
        this.form.name = this.webData[3];
      }
      console.log(this.form.name);
    },
    //查看网站详情中的复制按钮
    copyLink() {
      let _this = this;
      let clipboardObj = new this.$clipboard(".cobyDomObj");
      clipboardObj.on("success", function(e) {
        console.log(e);
        _this.$message.success("复制成功");
      });
      clipboardObj.on("error", function(e) {
        console.log(e);
        _this.$message.warning("复制失败");
      });
    },
    //生成二维码
    qrcodeObj() {
      let qrcode = new QRCode(this.$refs.qrCodeDiv, {
        width: 200,
        height: 200, // 高度
        text: this.form.name, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff" //二维码背景色
        // correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      });
      console.log(qrcode);
    },
    ShowQRCode(){
      document.getElementById("qrcode").innerHTML = "";
      this.qrcodeObj();
    }
  },
  mounted() {
    this.getTabData();
    // this.$nextTick(() => {
    //   this.qrcodeObj();
    // });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.home_third_1 {
  font-size: 16px;
  padding: 10px;
  border-bottom: 1px solid #dbdbdb;
}
.home_third_2 {
}
.dialog_form_item2_dv {
  font-size: 15px;
  line-height: 20px;
  width: 100%;
  padding: 5px;
  color: darkgray;
  background-color: aliceblue;
}
.dialog_form_item3_dv{
  width: 100%;
  padding-left: 40%;
}
</style>
