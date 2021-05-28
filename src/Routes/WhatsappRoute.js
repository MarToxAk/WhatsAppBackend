const WhatsappController = require('../Controllers/WhatsappController');


module.exports = (app) => {
   app.post('/sendText', WhatsappController.sendText);
   app.post('/sendImage', WhatsappController.sendImage);
   app.get('/qrcode', WhatsappController.sendQrcode);
   app.get('/client', WhatsappController.client);
}