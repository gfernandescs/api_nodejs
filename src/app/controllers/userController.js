const express = require('express');

const authMiddleware  = require('../../app/middlewares/auth');
const rolesMiddleware = require('../../app/middlewares/roles');

const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

//List
router.get('/', async (req, res) => {
	try{

		let users = await User.find();

		return res.send({ users });

	}catch (err){
		return res.status(400).send({ error: 'Erro ao listar usuários' });
	}
});

//Show 
router.get('/:userId', async (req, res) => {
	try{

		let user = await User.findById(req.params.userId).populate('user');

		if(!user)
			return res.status(400).send({ error: 'usuário não existe' });

		return res.send({ user });

	}catch (err){
		return res.status(400).send({ error: 'Erro ao carregar usuário' });
	}
});


//Update 
router.put('/:userId', rolesMiddleware, async (req, res) => {
	try{
	
		let email = req.body.email;
		//Verifica se email já existe
		if(await User.findOne({ email }))
			return res.status(400).send({ error: 'Email já existe'});


		let user  = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});

		return res.send({ user });

	}catch (err){
		return res.status(400).send({error: 'Erro ao atualizar '});
	}
});

//Delete 
router.delete('/:userId', rolesMiddleware, async (req, res) => {
	try{

		await User.findByIdAndRemove(req.params.userId);

		return res.send();

	}catch (err){
		return res.status(400).send({ error: 'Erro ao deletar usuário' });
	}
});

module.exports = app => app.use('/users', router);
