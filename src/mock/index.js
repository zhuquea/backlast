import Mock from "mockjs";

Mock.mock("api/getList", "get", {
  code: 200,
  msg: "success",
  "data|20": [
    {
      id: "@increment(1)",
      name: "@cname()",
      count: "@natural(2, 10)"
    }
  ]
});
Mock.mock("api/getHome1", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      price: "@natural(10,100000)",
      percentage: "@float(30, 100, 3, 5)"
    }
  ]
});
Mock.mock("api/getNew", "get", {
  code: 200,
  msg: "success",
  "data|5": ["@natural(0, 5)"]
});
Mock.mock("api/getNewText", "get", {
  code: 200,
  msg: "success",
  "data|5": ["@cparagraph(1, 3)"]
});
Mock.mock("api/getCity", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      city: "@city()",
      count: "@integer(1,100)"
    }
  ]
});
Mock.mock("api/questionInvestigation", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      name: "@ctitle(3, 5)",
      describe: "@ctitle(3, 5)",
      startTime: "@date('yyyy-MM-dd')",
      endTime: "@date('yyyy-MM-dd')",
      "topic|1": ["未发布", "已发布", "已截止"],
      "websiteName|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});
//通讯录数据
Mock.mock("api/mailListData", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      "id|+1": 1,
      name: "@cname()",
      imgUrl: "@dataImage(80x80)",
      phone: /1[3-9]\d{9}$/,
      telPhone: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      "gender|1": ["男", "女"],
      qqStr: /^[1-9][0-9]{4,10}$/,
      "department|1": [
        "成都分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组",
        "济南公司",
        "石家庄公司",
        "重庆办事处"
      ],
      "position|1": ["经理", "主管", "员工", "实习生"],
      personTag: [
        { tag: "@cword(0,3)", colorTag: "@hex()" },
        { tag: "@cword(0,3)", colorTag: "@hex()" },
        { tag: "@cword(0,3)", colorTag: "@hex()" }
      ],
      color: "@hex()"
    }
  ]
});
//人员信息数据
Mock.mock("api/personalInformation", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cname()",
      jobNum: "@natural(1000, 9999)",
      mechanism: "区域中心",
      "department|1": [
        "成都分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组",
        "济南公司",
        "石家庄公司",
        "重庆办事处"
      ],
      trialStart: "@date('yyyy-MM-dd')",
      trialEnd: "@date('yyyy-MM-dd')",
      "position|1": ["经理", "主管", "员工", "实习生"],
      "approval|1": ["审批通过", "审批未通过", "审批中"]
    }
  ]
});
//薪酬管理数据
Mock.mock("api/moneySalary", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      structure: "@cword(3,5)",
      planned: "@natural(10,1000000)",
      actual: "@natural(10,1000000)",
      lastPlanned: "@natural(10,1000000)",
      lastActual: "@natural(10,1000000)",
      isInput: false,
      isInput2: false,
      isInput3: false
    }
  ]
});
