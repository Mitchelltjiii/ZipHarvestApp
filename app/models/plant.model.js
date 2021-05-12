module.exports = (sequelize, Sequelize) => {
	const Plant = sequelize.define('plant', {	
	  id: {
            type: Sequelize.INTEGER,
			autoIncrement: true,
            primaryKey: true
    },
	  strain: {
			type: Sequelize.STRING
	  },
	  tag: {
		type: Sequelize.STRING
  	}
	});
	
	return Plant;
}