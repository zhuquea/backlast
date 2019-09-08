const router = require("koa-router")();
const CateGory = require("../model/CateGory");

router.prefix("/cateGory");

//添加日程
router.post("/addCalendar", async ctx => {
  let { content, startTime, endTime, participants } = ctx.request.body;
  if (
    startTime > endTime ||
    participants.length === 0 ||
    content.length === 0
  ) {
    ctx.body = {
      code: 500,
      msg: "请按要求完成日程添加",
      data: null
    };
  } else {
    let obj = new CateGory({
      content,
      startTime,
      endTime,
      participants
    });
    let res = await obj.save();
    if (res) {
      ctx.body = {
        code: 200,
        msg: "添加日程成功",
        data: obj
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "添加日程失败",
        data: null
      };
    }
  }
});

module.exports = router;
