'use strict';
const db = require('../index');
const Sequelize = db.Sequelize;
const Student = require('./student');
const Campus = require('./campus');

Student.belongsTo(Campus);
Campus.hasMany(Student, {onDelete: 'CASCADE'});

const models = {
	Student,
	Campus
};

const seed = () => {
	return Promise.all([
    Student.create({
			name: 'Lapras',
			email: 'lapras@pokemon.edu'
		}),
		Student.create({
			name: 'Pickachu',
			email: 'pickachu@pokemon.edu'
		}),
		Student.create({
			name: 'Staryu',
			email: 'Staryu@pokemon.edu'
		}),
		Student.create({
			name: 'Onyx',
			email: 'onyx@pokemon.edu'
		}),
		Campus.create({
			name: 'Vermilion Campus',
			image: 'https://static.comicvine.com/uploads/square_medium/11/114183/5213031-vermilion_gym_anime.jpg'
		}),
		Campus.create({
			name: 'Pewter Campus',
			image: 'https://sixprizes.com/wp-content/uploads/2015/05/pewter-city-gym.jpg'
		}),
		Campus.create({
			name: 'Cerulean Campus',
			image: 'http://www.puclpodcast.com/wp-content/uploads/2016/12/pokemon-7-4.png'
		})
	])
	.then(([lapras, pickachu, staryu, onyx, vermilion, pewter, cerulean]) => {
		lapras.setCampus(cerulean);
		staryu.setCampus(cerulean);
		pickachu.setCampus(vermilion);
		onyx.setCampus(pewter);
	});
};

module.exports = {
	models,
	seed
};

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is required everywhere

// This is also probably a good place for you to set up your associations

