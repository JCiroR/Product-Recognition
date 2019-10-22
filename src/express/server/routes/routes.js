module.exports = (app) => {

    //////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////INICIO////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    // Enable requests
    var cors = require('cors');
    var allowedOrigins = ['http://whlab.dis.eafit.edu.co'];
    const corsOptions = {
    	origin: function(origin, callback){    // allow requests with no origin
    	    // (like mobile apps or curl requests)
    	    if (!origin) return callback(null, true);
    	    if (allowedOrigins.indexOf(origin) === -1) {
    		var msg = 'The CORS policy for this site does not ' +
    		    'allow access from the specified Origin.';
    		return callback(new Error(msg), false);
    	    }
    	    return callback(null, true);
    	},
	methods: ['GET', 'POST'],
	allowedHeaders: ['X-Requested-With', 'accept', 'content-type']
    }

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
