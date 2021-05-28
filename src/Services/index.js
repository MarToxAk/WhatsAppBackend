const venom = require('venom-bot');
require('dotenv').config()

console.log(process.env.WABROWSERID2)
var imgstr = ''

exports.imgstr = ()=>{ return imgstr };

exports.venom = () => {
  return venom.create(
"Auto Py Web - Bot",
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log('Number of attempts to read the qrcode: ', attempts);
      console.log('Terminal qrcode: ', asciiQR);
      imgstr = base64Qrimg
      console.log('base64 image string qrcode: ', base64Qrimg);
      console.log('urlCode (data-ref): ', urlCode);
    },
    (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    {
      useChrome: true, // If false will use Chromium instance
      browserWS: '', // If u want to use browserWSEndpoint
      browserArgs: [''], // Parameters to be added into the chrome browser instance
      puppeteerOptions: {
        executablePath: '/app/.apt/usr/bin/google-chrome'
      }, // Will be passed to puppeteer.launch
      disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      createPathFileToken: false, //creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
    },
    {
      WABrowserId: process.env.WABROWSERID,
      WASecretBundle: process.env.WASECRETBUNDLE,
      WAToken1: process.env.WATOKEN1,
      WAToken2: process.env.WATOKEN2,
    }
    
)
  }


