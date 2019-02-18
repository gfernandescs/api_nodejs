const jwt 	     = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

	var authHeader = req.headers.authorization;
	var userId 	   = req.params.userId;	 

	if(!authHeader)
		return res.status(401).send({ error: 'Token não informado'});


	var parts = authHeader.split(' ');
	var [ scheme, token ] = parts;

	jwt.verify(token, authConfig.secret, (err, decoded) =>{

		if(err)
			return res.status(401).send({ error: 'Error' });

		if(decoded.roles !== "admin" && userId !== decoded.id)
			return res.status(403).send({ error: 'Acesso restrito a administradores' });

		req.userId = decoded.id;
		return next();
	})
};
