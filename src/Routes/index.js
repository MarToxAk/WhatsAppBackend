const UsuarioRoute = require('./UsuarioRoute');
const WhatsappRoute = require('./WhatsappRoute');

module.exports = (app) => {
   console.log(app)
   UsuarioRoute(app)
   WhatsappRoute(app)
}