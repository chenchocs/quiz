var models = require ("../models/models.js");

exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render("quizes/index", { quizes: quizes });
		}, 
		function(err) {
			res.render("quizes/error", { error: err });
		}
	);
};

exports.show = function (req, res) {
	models.Quiz.findById (req.params.quizId).then(function(quiz) {
		res.render("quizes/show", { quiz: quiz });
	});
};

exports.answer = function(req, res) {
	models.Quiz.findById (req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === quiz.respuesta) {
			res.render("quizes/answer", { respuesta: "Correcto"});
		} else {
			res.render("quizes/answer", { respuesta: "Incorrecto"});
		}
	});
};
