// node 使用 nodemailer 发送邮件
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true, // 使用 SSL
  auth: {
    user: 'xxx@qq.com',
    pass: '', // smtp 授权码，需要在发送邮件中开启 smtp 服务
  }
});

const mailOptions = {
  from: '"DangoSky" <xxx@qq.com>', // 需要和 auth.user 一致
  to: ['xxx@gmail.com'],
  subject: 'nodemailer test',
  html: '<b>Hello world</b>'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log(`Message sent: ${info.messageId}`);
});
