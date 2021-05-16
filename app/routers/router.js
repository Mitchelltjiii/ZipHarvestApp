
let express = require('express');
let router = express.Router();
 
const controller = require('../controllers/controller.js');

const db = require('../config/db.config.js');

const Plant = db.Plant;
const mysql = require('mysql');  


const connection = mysql.createConnection({
  host     : 'db-mysql-sfo3-15933-do-user-9039451-0.b.db.ondigitalocean.com',
  user     : 'doadmin',
  password : 'xo6wgtevue3qzrmw',
  database : 'defaultdb',
  port: '25060'
});

//router.post('/api/plant', controller.createPlant);
router.get('/api/plant/:id', controller.getPlant);
router.get('/api/plants', controller.plants);
//router.put('/api/plant', controller.updatePlant);
router.delete('/api/plant/:id', controller.deletePlant);

router.post('/posttest', async function (req, res){
  let strain = 'strain1';
    let tag = 'tag1';
    const result = await connection.query(
      `INSERT INTO plants 
      (strain, tag) 
      VALUES 
      (?, ?)`, 
      [
        strain, tag
      ]
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    res.json({message});
});

router.post('/api/plant', async function(req, res, next) {
    try {
      res.json(await controller.create());
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  });

router.put('/api/plant', async function(req, res, next) {
    res.json("{LMAO FUCK ME PUT}")
    /*
    try {
      res.json(await controller.create(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }*/
  });

/*

router.post('/api/harvestedplant', controller.createHarvestedPlant);
router.get('/api/harvestedplant/:id', controller.getHarvestedPlant);
router.get('/api/harvestedplants', controller.harvestedPlants);
router.put('/api/harvestedplant', controller.updateHarvestedPlant);
router.delete('/api/harvestedplant/:id', controller.deleteHarvestedPlant);

router.post('/api/harvestbatch', controller.createHarvestBatch);
router.get('/api/harvestbatch/:id', controller.getHarvestBatch);
router.get('/api/harvestbatches', controller.harvestBatches);
router.put('/api/harvestbatch', controller.updateHarvestBatch);
router.delete('/api/harvestbatch/:id', controller.deleteHarvestBatch);
*/
module.exports = router;