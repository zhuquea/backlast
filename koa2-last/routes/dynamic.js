const router = require("koa-router")();
const Dynamic = require("../model/Dynamic");

router.prefix("/dynamic");

// 发布动态
router.post("/addDynamic", async ctx => {
  let newDynamic = new Dynamic(ctx.request.body);
  let res = await newDynamic.save();
  if (res) {
    ctx.body = {
      code: 200,
      msg: "添加动态成功",
      data: newDynamic
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "添加动态失败",
      data: null
    };
  }
});

// 获取动态
router.get("/getDynamic", async ctx => {
  let res = await Dynamic.find();
  if (res.length > 0) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: res
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "暂无数据",
      data: null
    };
  }
});

module.exports = router;
