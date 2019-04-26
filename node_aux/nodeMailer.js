var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'web.ingeniotecnico@gmail.com ',
    pass: 'ingenioweb'
  },
  tls: {
    rejectUnauthorized: false
}
});



var enviarMail = function (mailoptionsObj , cb){
transporter.sendMail(mailoptionsObj, function(error, info){
  if (error) {
    cb(error);
  } else {
    cb(info.response)
  }
});
}


exports.enviar = enviarMail;