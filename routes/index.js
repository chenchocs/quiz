var express = require('express');
var router = express.Router();

var indexController = require ("../controllers/index_controller");
var quizController = require ("../controllers/quiz_controller");

router.get("/", indexController.index);
router.get("/quizes/question", quizController.question);
router.get("/quizes/answer", quizController.answer);

module.exports = router;
