module.exports = (app) => {

	//////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////INICIO////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////////////////////

    // Enable requests
    var cors = require('cors');
    app.use(cors());

	// Ruta inicial
	app.get('/', (req, res) => {
		res.render('index');
	});


	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};


//verificacion de que se esta en sesion
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next(); //avanzo si es correcto
	}
	res.redirect('/login');//en caso contrario
}
