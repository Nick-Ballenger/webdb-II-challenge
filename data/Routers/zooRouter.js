const router = require('express').Router();
const knex = require('knex');


const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.sqlite3',
    },
  }
  

const db = knex(knexConfig);

//Get Zoos
router.get('/', async (req, res) => {
    
    try {
		const zoo = await db('zoos');
		res.status(200).json(zoo);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting the data from the server' });
	}
});
//Get Zoos by ID
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

//Add Zoos
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


//delete Zoo by ID
router.delete('/:id', async (req, res) => {
	
	try {
		const { id } = req.params;
		const del = await db('zoos').where({ id }).delete();
		res.status(404).json({ message: 'Zoo deleted ' });
	} 
	
	catch (error) {
		res.status(500).json({ error: 'Sever error, could not delete.' });
	}
});

//Update Zoo by ID
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const edit = await db('zoos').where({ id }).update(req.body);

		if (edit > 0) {
			const zoo = await db('zoos').where({ id }).first();
			res.status(200).json(edit);
		} else {
			res.status(404).json({ message: 'ID for zoo not found. Name required' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error could not update.' });
	}
});



module.exports = router;