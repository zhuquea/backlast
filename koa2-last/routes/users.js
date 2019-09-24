const router = require("koa-router")();
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const {
  tokenSecret,
  telId,
  apiKey,
  authorizationCode,
  scope,
  clientId,
  clientSecret
} = require("../config");
const rp = require("request-promise");
const svgCaptcha = require("svg-captcha");
const nodeEmail = require("nodemailer");
const fetch = require("node-fetch");

router.prefix("/users");
//注册
router.post("/register", async ctx => {
  let { username, password, qqEmail, phone, messageCode } = ctx.request.body;
  //查询短信验证码是否正确
  let shortCode = ctx.session.sms;
  if (messageCode !== shortCode) {
    ctx.body = {
      code: 500,
      msg: "短信验证码不正确",
      data: null
    };
  } else {
    //去数据库根据传过来的用户名查询当前用户名是否存在
    let user = await User.findOne({
      username
    });
    if (user) {
      ctx.body = {
        code: 500,
        msg: "用户名已存在",
        data: null
      };
    } else {
      let newUser = new User({
        username,
        password,
        qqEmail,
        phone
      });
      let res = await newUser.save();
      if (res) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
          data: newUser
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "注册失败",
          data: null
        };
      }
    }
  }
});
//删除用户
router.post("/deleteUser", async ctx => {
  let { id } = ctx.request.body;
  let res = await User.findByIdAndRemove(id);
  if (res) {
    ctx.body = {
      code: 200,
      msg: "删除成功",
      data: null
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "删除失败",
      data: null
    };
  }
});
//获取全部用户
router.get("/allUser", async ctx => {
  let users = await User.find();
  if (users.length > 0) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: users
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "暂无用户",
      data: null
    };
  }
});
//图形验证码
router.get("/captcha", async ctx => {
  let captcha = svgCaptcha.create();
  ctx.session.captcha = captcha.text;
  ctx.response.type = "image/svg+xml";
  ctx.body = captcha.data;
});
//登录
router.post("/login", async ctx => {
  let { username, password, code } = ctx.request.body;
  let user = await User.find({
    username,
    password
  });
  console.log(code.replace(/^\s+|\s+$/g, "").toLowerCase());
  console.log(ctx.session.captcha.toLowerCase());
  if (
    code.replace(/^\s+|\s+$/g, "").toLowerCase() ===
    ctx.session.captcha.toLowerCase()
  ) {
    if (user.length > 0) {
      ctx.session.user = user;
      let token = jwt.sign({ username: username }, tokenSecret, {
        expiresIn: "1h"
      });
      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          user,
          token
        }
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "用户名或密码不正确",
        data: null
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "验证码错误",
      data: null
    };
  }
});
//退出登录
router.get("/logout", async ctx => {
  ctx.session.user = null;
  ctx.body = {
    code: 200,
    msg: "退出登录成功",
    data: null
  };
});
//修改用户密码
router.post("/updateUser", async ctx => {
  let { id, newPassword } = ctx.request.body;
  let res = await User.findByIdAndUpdate(id, {
    password: newPassword
  });
  if (res) {
    ctx.body = {
      code: 200,
      msg: "修改成功",
      data: null
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "修改失败",
      data: null
    };
  }
});
//修改用户头像
router.post("/updateImg", async ctx => {
  let { id, imgUrl } = ctx.request.body;
  let res = await User.findByIdAndUpdate(id, {
    imageUrl: imgUrl
  });
  if (res) {
    ctx.body = {
      code: 200,
      msg: "修改成功",
      data: res
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "修改失败",
      data: null
    };
  }
});
//发送短信验证码
router.post("/sendMsg", async ctx => {
  let { phone } = ctx.request.body;
  let code = ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
  let options = {
    method: "GET",
    url: "http://apis.haoservice.com/sms/sendv2",
    qs: {
      mobile: phone,
      tpl_id: telId,
      key: apiKey,
      content: `【小爱在线】您的验证码为${code}，如非本人操作，请忽略此条短信。该验证码5分钟内有效，感谢您对我们的支持`
    }
  };
  try {
    let res = rp(options);
    console.log(res);
    if (res) {
      ctx.session.sms = code;
      ctx.body = {
        code: 200,
        msg: "短信发送成功",
        data: code
      };
    }
  } catch (e) {
    console.log(e);
  }
});
//找回密码
router.post("/findPassword", async ctx => {
  let { username, qqEmail } = ctx.request.body;
  let res = await User.findOne({ username });
  console.log(res);
  let user0 = "1651673659@qq.com";
  let user = res.qqEmail;
  if (username !== res.username || qqEmail !== user) {
    ctx.body = {
      code: 500,
      msg: "用户名或者邮箱不正确",
      data: null
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "邮件发送成功",
      data: null
    };
    let smtpTransport = nodeEmail.createTransport({
      service: "QQ",
      auth: {
        user: user0,
        pass: authorizationCode
      }
    });
    smtpTransport.sendMail(
      {
        from: user0,
        to: user,
        subject: "找回密码",
        html: `亲爱的${res.username},您的密码是${res.password}`
      },
      (err1, res1) => {
        // console.log(err1,res1);
      }
    );
  }
});
//获取单个用户
router.post("/singleUser", async ctx => {
  let { username } = ctx.request.body;
  let res = await User.findOne({ username });
  if (res) {
    ctx.body = {
      code: 200,
      msg: "获取用户信息成功",
      data: res
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "获取用户信息失败",
      data: null
    };
  }
});

// github登录
router
  .get("/githubLogin", async ctx => {
    let dataStr = new Date().valueOf();
    //重定向到认证接口,并配置参数
    let path = "https://github.com/login/oauth/authorize";
    path += "?client_id=" + clientId;
    path += "&scope=" + scope;
    path += "&state=" + dataStr;
    //转发到授权服务器
    ctx.redirect(path);
    console.log(path);
  })
  .get("/auth", async ctx => {
    const code = ctx.query.code;
    let path = "https://github.com/login/oauth/access_token";
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    };
    await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => {
        return res.text();
      })
      .then(body => {
        const args = body.split("&");
        let arg = args[0].split("=");
        const access_token = arg[1];
        return access_token;
      })
      .then(async token => {
        const url = " https://api.github.com/user?access_token=" + token;
        await fetch(url)
          .then(res => {
            return res.json();
          })
          .then(res => {
            ctx.session.githubUser = res;
            ctx.redirect(`http://localhost:8080`);
          });
      })
      .catch(e => {
        console.log(e);
      });
  });

// 获取github登录的用户
router.get("/githubUser", async ctx => {
  if (ctx.session.githubUser) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: ctx.session.githubUser
    };
  } else {
    ctx.body = {
      code: 500,
      msg: "error",
      data: null
    };
  }
});
module.exports = router;
