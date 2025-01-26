var express = require('express');
var router = express.Router();
var app = express();
var routes = express();
var bodyParser = require('body-parser');

var axios = require('axios');
var ejs = require('ejs');
var path = require('path');
var nodemailer = require('nodemailer');
var moment = require('moment');
var date = moment().utcOffset(-300).format('LL');
var time = moment().utcOffset(-300).format('LTS');
var year = moment().utcOffset(-300).format('YYYY');
var month = moment().utcOffset(-300).format('MM');
var day = moment().utcOffset(-300).format('DD');
var GMAIL_USER = process.env.GMAIL_USER;
var GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
app.set('trust proxy', true);
app.use(express.static('partials'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(async function(req, res, next) {
/*var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
//var ippp = req.socket.remoteAddress
  var ippp = req.headers['x-forwarded-for'] || req.ip; //req.connection.remoteAddress;
  var ipp = ippp.split(',')[0].trim();
  var ipdata = await getIpData(ipp);
   var { name, domain } = ipdata.asn;
  var { is_threat, is_anonymous, is_known_attacker, is_known_abuser } = ipdata.threat;
  /* var blackList = ['8'];
   if(blackList.indexOf(ipp) > -1) {
       if (domain != 'about.google' || domain != 'yandex.com' || domain != 'microsoft.com' || domain != 'godaddy.com' || domain != 'amazon.com' || domain != 'amazon.ca') {
      var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'Blocked Threat! \n Secret Page.' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';

    var domain = ipdata.asn.domain;

    var ip = ipdata.ip;

    var city = ipdata.city;

    var country_name = ipdata.country_name;

    var postal = ipdata.postal;
      console.log(ipdataa);

    res.status(403).end('You found the secret page, tell me more so I can find this page too.');

    return;
   }
   }*/
   /*
  if (is_threat || is_known_abuser || is_known_attacker) {
    if (domain != 'about.google' || domain != 'yandex.com' || domain != 'microsoft.com' || domain != 'godaddy.com' || domain != 'amazon.com' || domain != 'amazon.ca') {
    var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'Blocked Threat!' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end();
    return;
  }
  }
*/

  /*/
  if (is_anonymous) {
    var ipdataa = date + ' ' + time + '\n' + ipp + '\n' + 'VPNs are not allowed' + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + req.protocol + '://' + req.hostname + req.url + '\n' + 'ip: ' + ipp + '\n' + 'City: ' + city + '\n' + 'Country: ' + country_name + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + '\n' + 'is_known_attacker: ' + is_known_attacker + '\n' + 'is_known_abuser: ' + is_known_abuser + '\n' + 'is_anonymous: ' + is_anonymous + '\n' + '}';
    var domain = ipdata.asn.domain;
    var ip = ipdata.ip;
    var city = ipdata.city;
    var country_name = ipdata.country_name;
    var postal = ipdata.postal;
    console.log(ipdataa);
    res.status(403).end('VPNs are not allowed.');
    return;
  }
/*/
//  if (process.env.NODE_ENV != 'development') {
//  if (!req.secure) { // || req.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com') {
//  return res.status(301).redirect('https://gtaexecutiverentals.com');
//  }
//}
 next();
  });



app.get('/', async function(req, res, next) {

var date = moment().utcOffset(-300).format('LL');

var time = moment().utcOffset(-300).format('LTS');

//var ippp = req.socket.remoteAddress

  var ippp = req.headers['x-forwarded-for'] || req.ip; //req.connection.remoteAddress;
var iip = req.headers['cf-connecting-ip']; // || req.ip; //req.connection.remoteAddress;

  var ipp = ippp.split(',')[0].trim();

  var reqUrl = req.path;

var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url;
//var logg = date + ' ' + time + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
console.log("Requesting IP: " + iip);
 // console.log(res);
  console.log(logg);
//res.render('home2-june2024.ejs');
  res.render('one.ejs');

});


app.post('/ossington', async function(req, res, next) {

  if(!req.body.email) {
   console.log("DumbAss found the page");
  res.status(201).send('You have found the magic page');
 } else {
  try {
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');

  var ippp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   var ipp = ippp.split(',')[0].trim();
  var reqUrl = req.path;
 
var Transport = nodemailer.createTransport({


service: 'gmail',
auth: {
user: process.env.GMAIL_USER,
pass: process.env.GMAIL_PASSWORD
}
});


var to = "gtaexecutiverentals@gmail.com";
var subject = "Rental Inquiry - Powered by AlexBot";
var name = req.body.name;
  var tel = req.body.tel;
var email = req.body.email;
var reason = req.body.reason;
var text = "You have received a Rental Inquiry on 1182 Ossington Rd, please see below." + "\n\n" + "Name:\n" + name + "\nTel:\n" + tel + "\nEmail:\n" + email + "\n\nMessage:\n" + reason; //" " + email + " " + reason;
var text2 = "Hi " + name + "\nThanks for reaching out, we've received your inquiry and we'll be in touch.\n\nThe GTA Executive Rentals Team.\n https://www.gtaexecutiverentals.com";
  var to2 = email;
 var subject2 = "GTA Executive Rentals - Inquiry" 
var to3 = "trigger@applet.ifttt.com";
 var subject3 = "#Rental";
var text3 = name + " ||| " + tel + " ||| " + email + " ||| " + reason;
  
var mailOptions = {


to: to,
sender: 'frontdesk@gtaexecutiverentals.com',
 replyTo: 'frontdesk@gtaexecutiverentals.com',
subject: subject,
generateTextFromHTML: true,
text: text
};

  var mailOptions2 = {


to: to2,
sender: 'frontdesk@gtaexecutiverentals.com',
 replyTo: 'frontdesk@gtaexecutiverentals.com',
subject: subject2,
generateTextFromHTML: true,
text: text2
};


  var mailOptions3 = {


to: to3,
from: 'gtaexecutiverentals@gmail.com',
subject: subject3,
generateTextFromHTML: true,
text: text3
};

Transport.sendMail(mailOptions, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log('Question Alert!!\n' + name + '\n' + tel + '\n' + email + '\n' + reason);

Transport.close();
});

  Transport.sendMail(mailOptions2, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log('2 Emails sent');

Transport.close();
});

  Transport.sendMail(mailOptions3, function(error, response) { 
if (error) { // throw error; //{
console.log(error);
//var msg = "There was an error sending email.";
//callback(true, msg, []);
//return msg;
}
console.log(response);
console.log('IFTTT Email sent');

Transport.close();
});

  } catch (error) {
        console.error('Error starting worker:', error);
  }
var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url;

//var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Country: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
 res.render('one.ejs');
  }
  /*

    
var logg = date + ' ' + time + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n'; // + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Contry: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';

//var logg = date + ' ' + time + '\n' + ipp + '\n' + req.protocol + '://' + req.hostname + '\n' + req.url + '\n' + 'Location: {' + '\n' + 'City: ' + city + ', \n' + 'Country: ' + country_name + ', \n' + 'Postal: ' + postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + name + ', \n' + 'Domain: ' + domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_threat: ' + is_threat + ', \n' + 'is_known_attacker: ' + is_known_attacker + ', \n' + 'is_known_abuser: ' + is_known_abuser + ', \n' + 'is_anonymous: ' + is_anonymous + '\n' + '};';
  console.log(logg);
 res.render('new22.ejs');
 */
});





module.exports = app;
