const router = require("koa-router")();
const multer = require("koa-multer");
// const User = require("../model/Users");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2! koa2-last"
  });
});
//加载koa-multer模块
//文件上传
//配置
let storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  //修改文件名称
  filename: function(req, file, cb) {
    let fileFormat = file.originalname.split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
//加载配置
let upload = multer({ storage: storage });
//路由
router.post("/upload", upload.single("file"), async (ctx, next) => {
  // let id = ctx.session.user._id;
  let path = ctx.req.file.path;
  path = path.replace("public", "");
  // let url = `${ctx.origin}${path}`;
  // let res = await User.findByIdAndUpdate(id, {
  //   imageUrl: url
  // });
  // if (res) {
  ctx.body = {
    filename: ctx.req.file.filename,
    path: ctx.req.file.path, //返回文件名
    url: `${ctx.origin}${path}`
  };
  // }
});

module.exports = router;
