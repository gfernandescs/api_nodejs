const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400,
	});
}

//Rota para registrar um novo usuário
router.post('/register', async(req, res) =>{

	var {email} = req.body;
	try{
		if(await User.findOne({ email }))
			return res.status(400).send({ error: 'Email já existe'});

		var user = await User.create(req.body);

		user.password = undefined;

		return res.send({ 
			user,
			token: generateToken({ id: user.id, roles: user.roles }),
		});

	}catch (err){
		return res.status(400).send({error: 'Falha ao registrar'});
	}
});

//Rota para autenticar usuário
router.post('/authenticate', async (req, res) =>{
	var {email, password } = req.body;
	var user = await User.findOne({ email }).select('+password');

	if(!user)
		return res.status(400).send({error: 'Usuário não encontrado'});

	if(!await  bcrypt.compare(password, user.password))
		return res.status(400).send({error: 'Senha inválida'})

	user.password = undefined;

	res.send({ 
		user, 
		token: generateToken({ id: user.id, roles: user.roles }), 
	});
});

module.exports = app => app.use('/auth', router);
