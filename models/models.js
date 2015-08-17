var path = require("path");

var util = require("util");

// Extraemos los elementos de las urls relativas a las bases de datos
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name		= (url[6] || null);
var user			= (url[2] || null);
var pwd			= (url[3] || null);
var protocol	= (url[1] || null);
var dialect		= (url[1] || null);
var port			= (url[5] || null);
var host			= (url[4] || null);
var storage		= process.env.DATABASE_STORAGE;

var Sequelize = require("sequelize");

var sequelize = new Sequelize (DB_name, user, pwd, {
		dialect:		protocol,
		protocol:	protocol,
		port:			port,
		host:			host,
		storage:		storage,
		omitNull:	true
	}
);


var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;


sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count === 0)  {
			Quiz.create({
				tema:			"humanidades",
				pregunta:	"Capital de Italia",
				respuesta:	"Roma"
			}).then(function() {
				console.log("Base de datos inicializada");
			});

			Quiz.create({
				tema:			"humanidades",
				pregunta:	"Capital de Portugal",
				respuesta:	"Lisboa"
			}).then(function() {
				console.log("Base de datos bi-inicializada");
			});

			Quiz.create({
				tema:			"humanidades",
				pregunta:	"Capital de Francia",
				respuesta:	"París"
			}).then(function() {
				console.log("Base de datos trinicializada");
			});

			Quiz.create({
				tema:			"ciencia",
				pregunta:	"¿Quién Formuló la teoría de la gravedad?",
				respuesta:	"Isaac Newton"
			}).then(function() {
				console.log("Base de datos trinicializada 2");
			});

			Quiz.create({
				tema:			"tecnologia",
				pregunta:	"¿Quién diseñó el ZX Spectrum?",
				respuesta:	"Clive Sinclair"
			}).then(function() {
				console.log("Base de datos trinicializada 3");
			});

			Quiz.create({
				tema:			"ciencia",
				pregunta:	"¿Quién Formuló la teoría de la relatividad?",
				respuesta:	"Albert Einstein"
			}).then(function() {
				console.log("Base de datos trinicializada 3");
			});
		}
	});
});
