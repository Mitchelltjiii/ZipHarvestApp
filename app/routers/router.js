
let express = require('express');
let router = express.Router();
 
const controller = require('../controllers/controller.js');

router.post('/api/plant', function(req, res){
    controller.createPlant
  });
router.get('/api/plant/:id', controller.getPlant);
router.get('/api/plants', controller.plants);
router.put('/api/plant', function(req, res){
    controller.updatePlant
  });
router.delete('/api/plant/:id', controller.deletePlant);

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

module.exports = router;