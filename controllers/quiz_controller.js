var models = require ("../models/models.js");

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById (quizId).then(
		function (quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error("No existe quizId="+ quizId));
			}
		}
	).catch(function(error) {
		next(error);
	});
}

exports.index = function(req, res) {
	function go2quizes(quizes) {
		res.render("quizes/index", { quizes: quizes });
	}

	if (req.query.search && req.query.search != "" && req.query.search != " ") {
		var search = req.query.search.split(" ");
		search = "'%"+ search.join("%") + "%'";
		models.Quiz.findAll({
			where:["pregunta like "+ search],
			order: 'pregunta ASC'
		}).then(go2quizes).catch(function(error) { next(error); });
	} else {
		models.Quiz.findAll().then(go2quizes).catch(function(error) { next(error); });
	};
};

exports.show = function (req, res) {
	res.render("quizes/show", { quiz: req.quiz });
};

exports.answer = function(req, res) {
	models.Quiz.findById (req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === req.quiz.respuesta) {
			res.render("quizes/answer", { quiz: req.quiz, respuesta: "Correcto"});
		} else {
			res.render("quizes/answer", { quiz: req.quiz, respuesta: "Incorrecto"});
		}
	});
};

