const router = require('express').Router();
const knex = require('knex');
const knexConfig = require('./knexConfig');

const db = knex(knexConfig);


router.get('/', async (req, res) => {
    
    try {
		const zoo = await db('zoos');
		res.status(200).json(zoo);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting the data from the server' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		db('zoos').where({ id }).then((zoo) => {
			res.status(200).json(zoo);
		});
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting data from server' });
	}
});

router.post('/', async (req, res) => {
    
    try {
		const { id } = await db('zoos').insert(req.body);
		const zoo = await db('zoos').where({ id }).first();
		res.status(201).json(zoo);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Server error while trying to add new data' });
	}
});