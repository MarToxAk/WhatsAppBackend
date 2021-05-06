const UsuarioRoute = require('./UsuarioRoute');
const WhatsappRoute = require('./WhatsappRoute');

module.exports = (app) => {
   UsuarioRoute(app)
   WhatsappRoute(app)
}