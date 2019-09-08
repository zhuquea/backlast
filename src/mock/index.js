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
      "topic|1": ['未发布', '已发布','已截止'],
      "websiteName|1": ['百度','豆瓣','掘金','Github']
    }
  ]
});
