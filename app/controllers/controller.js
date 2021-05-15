const db = require('../config/db.config.js');

const Plant = db.Plant;
//const HarvestedPlant = db.HarvestedPlant;
//const HarvestBatch = db.HarvestBatch;

exports.create = (req, res) => {
    return "Got to create";
    /*
    let strain = 'strain1';
    let tag = 'tag1';
    const result = await db.query(
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
  
    return {message};*/
  }

exports.createPlant = (req, res) => {
    let plant = {};

    try{
        console.log("CREATE PLANT");
        // Building plant object from upoading request's body
        plant.strain = req.body.strain;
        plant.tag = req.body.tag;
    
        // Save to MySQL database
        Plant.create(plant, 
                          {attributes: ['id', 'strain', 'tag']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getPlant = (req, res) => {
    plant.findByPk(req.params.id, 
                        {attributes: ['id', 'strain', 'tag']})
        .then(plant => {
          res.status(200).json(plant);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.plants = (req, res) => {
    // find all Plant information from
    res.json("{GET PLANTS FROM CONTROLLER}");
    /*try{
        Plant.findAll({attributes: ['id', 'strain', 'tag']})
        .then(plants => {
            res.json(plants);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }*/
}

exports.deletePlant = async (req, res) => {
    try{
        let plantId = req.params.id;
        let plant = await Plant.findByPk(plantId);

        if(!plant){
            res.status(404).json({
                message: "Does Not exist a Plant with id = " + plantId,
                error: "404",
            });
        } else {
            await plant.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a plant with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updatePlant = async (req, res) => {
    try{
        console.log("UPDATE PLANT");

        let plant = await Plant.findByPk(req.body.id);
    
        if(!plant){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a plant with id = " + plantId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                id: req.body.id,
                strain: req.body.strain,
                tag: req.body.tag
            }
            let result = await Plant.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'strain', 'tag']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a plant with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a plant with id = " + req.params.id,
            error: error.message
        });
    }
}
/*
//HarvestedPlant
exports.createHarvestedPlant = (req, res) => {
    let plant = {};

    try{
        console.log("CREATE PLANT");
        // Building plant object from upoading request's body
        plant.uid = req.body.uid;
        plant.strain = req.body.strain;
        plant.tag = req.body.tag;
        plant.weight = req.body.weight,
        plant.unit = req.body.unit,
    
        // Save to MySQL database
        HarvestedPlant.create(plant, 
                          {attributes: ['id', 'uid', 'strain', 'tag', 'weight', 'unit']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getHarvestedPlant = (req, res) => {
    plant.findByPk(req.params.id, 
                        {attributes: ['id', 'uid','strain', 'tag', 'weight', 'unit']})
        .then(plant => {
          res.status(200).json(plant);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.harvestedPlants = (req, res) => {
    // find all Plant information from 
    try{
        HarvestedPlant.findAll({attributes: ['id', 'uid', 'strain', 'tag', 'weight', 'unit']})
        .then(plants => {
            res.status(200).json(plants);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteHarvestedPlant = async (req, res) => {
    try{
        let plantId = req.params.id;
        let plant = await HarvestedPlant.findByPk(plantId);

        if(!plant){
            res.status(404).json({
                message: "Does Not exist a Plant with id = " + plantId,
                error: "404",
            });
        } else {
            await plant.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a plant with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateHarvestedPlant = async (req, res) => {
    try{
        console.log("UPDATE PLANT");

        let plant = await HarvestedPlant.findByPk(req.body.id);
    
        if(!plant){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a plant with id = " + plantId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                id: req.body.id,
                uid: req.body.uid,
                strain: req.body.strain,
                tag: req.body.tag,
                weight: req.body.weight,
                unit: req.body.unit
            }
            let result = await HarvestedPlant.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'uid', 'strain', 'tag', 'weight', 'unit']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a plant with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a plant with id = " + req.params.id,
            error: error.message
        });
    }
}
//HarvestBatch
exports.createHarvestBatch = (req, res) => {
    let harvestbatch = {};

    try{
        console.log("CREATE HarvestBatch");
        // Building plant object from upoading request's body
        harvestbatch.name = req.body.name;
        harvestbatch.finalized = req.body.finalized;
        harvestbatch.plantList = req.body.plantList;
        harvestbatch.type = req.body.type;
        harvestbatch.date = req.body.date;
    
        // Save to MySQL database
        HarvestBatch.create(harvestbatch, 
                          {attributes: ['id', 'name', 'finalized', 'plantList', 'type', 'date']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getHarvestBatch = (req, res) => {
    plant.findByPk(req.params.id, 
                        {attributes: ['id', 'name', 'finalized', 'plantList', 'type', 'date']})
        .then(plant => {
          res.status(200).json(plant);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.harvestBatches = (req, res) => {
    // find all Plant information from 
    try{
        HarvestBatch.findAll({attributes: ['id', 'name', 'finalized', 'plantList', 'type', 'date']})
        .then(harvestBatches => {
            res.status(200).json(harvestBatches);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteHarvestBatch = async (req, res) => {
    try{
        let HBID = req.params.id;
        let harvestBatch = await HarvestBatch.findByPk(HBID);

        if(!plant){
            res.status(404).json({
                message: "Does Not exist a HB with id = " + HBID,
                error: "404",
            });
        } else {
            await harvestBatch.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a HB with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateHarvestBatch = async (req, res) => {
    try{
        console.log("UPDATE HB");

        let harvestBatch = await HarvestBatch.findByPk(req.body.id);
    
        if(!harvestBatch){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a HB with id = " + req.body.id,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                id: req.body.id,
                name: req.body.name,
                finalized: req.body.finalized,
                plantList: req.body.plantList,
                type : req.body.type,
                date: req.body.date
            }
            let result = await HarvestBatch.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'name', 'finalized', 'plantList', 'type', 'date']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a HB with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a HB with id = " + req.params.id,
            error: error.message
        });
    }
}
*/