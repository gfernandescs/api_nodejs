const jwt 	     = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

	let authHeader = req.headers.authorization;

	if(!authHeader)
		return res.status(401).send({ error: 'Token não informado'});

	let parts = authHeader.split(' ');
	let [ scheme, token ] = parts;

	jwt.verify(token, authConfig.secret, (err, decoded) =>{

		if(err)
			return res.status(401).send({ error: 'Acesso negado' });

		req.userId = decoded.id;
		return next();
	})


};