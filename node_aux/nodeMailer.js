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



var enviarMail = function (mailoptionsObj){
transporter.sendMail(mailoptionsObj, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}


exports.enviar = enviarMail;