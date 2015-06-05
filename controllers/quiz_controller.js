exports.question = function (req, res) {
	res.render("quizes/question", {title: "Turno de preguntas:", pregunta: "Capital de Italia"});
};

exports.answer = function(req, res) {
	if (req.query.respuesta === "Roma") {
		res.render("quizes/answer", { respuesta: "Correcto"});
	} else {
		res.render("quizes/answer", { respuesta: "Incorrecto"});
	}
};
