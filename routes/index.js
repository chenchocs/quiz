var express = require('express');
var router = express.Router();

var indexController = require ("../controllers/index_controller");
var quizController = require ("../controllers/quiz_controller");
var quizAuthor = require ("../controllers/quiz_author");

router.get		("/",										indexController.index);
router.param	("quizId",								quizController.load);
router.get		("/quizes",								quizController.index);
router.get		("/quizes/new",							quizController.new);
router.post		("/quizes/create",						quizController.create);
router.get		("/quizes/:quizId(\\d+)",				quizController.show);
router.get		("/quizes/:quizId(\\d+)/answer",	quizController.answer);
router.get		("/author",								quizAuthor.index);

module.exports = router;
