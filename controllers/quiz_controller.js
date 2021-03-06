var models = require ("../models/models.js");

//
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

//
exports.index = function(req, res) {
	function go2quizes(quizes) {
		res.render("quizes/index", { quizes: quizes, errors: []});
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

//
exports.show = function (req, res) {
	res.render("quizes/show", { quiz: req.quiz, errors: [] });
};

//
exports.answer = function(req, res) {
	models.Quiz.findById (req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === req.quiz.respuesta) {
			res.render("quizes/answer", { quiz: req.quiz, respuesta: "Correcto", errors: []  });
		} else {
			res.render("quizes/answer", { quiz: req.quiz, respuesta: "Incorrecto", errors: [] });
		}
	});
};

//
exports.new = function (req, res) {
	var quiz = models.Quiz.build(
		{
			tema: "otros",
			pregunta: "Pregunta",
			respuesta: "Respuesta"
		}
	);
	
	res.render('quizes/new', {quiz: quiz, errors: [] });
};

//
exports.create = function (req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(function(err) {
		if (err) {
			res.render("quizes/new", { quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then( function() {
				res.redirect('/quizes');
			});
		}
	});
};


//
exports.edit = function (req, res) {
	var quiz = req.quiz;

	res.render('quizes/edit', { quiz: quiz, errors: [] });
};

//
exports.update = function (req, res) {
	req.quiz.tema = req.body.quiz.tema;
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(function(err) {
		if (err) {
			res.render("quizes/edit", { quiz: req.quiz, errors: err.errors});
		} else {
			req.quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then( function() {
				res.redirect('/quizes');
			});
		}
	});
};

//
exports.destroy = function (req, res) {
	req.quiz.destroy().then(function(){
		res.redirect("/quizes");
	}).catch(function(error) {
		next(error);
	});
}
