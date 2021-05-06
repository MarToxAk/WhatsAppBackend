const WhatsappController = require('../Controllers/WhatsappController');

module.exports = (app) => {
   app.post('/sendText', WhatsappController.post);
}