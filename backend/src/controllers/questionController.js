const questionService = require('../services/questionService');
const HttpError = require('../utils/HttpError');

exports.getAllQuestions = async (req, res, next) => {
    try {
        const questions = await questionService.getAllQuestions();

        res.json({
            success: true,
            questions
        });
    } catch (err) {
        next(err);
    }
};

exports.getQuestionById = async (req, res, next) => {
    try {
        const question = await questionService.getQuestionById(req.params.id);

        if (!question) {
            return next(new HttpError(404, "Question non trouvée"));
        }

        res.json({
            success: true,
            question
        });
    } catch (err) {
        next(err);
    }
};

exports.createQuestion = async (req, res, next) => {
    try {
        const { content } = req.body;

        if (!content) {
            return next(new HttpError(400, "Le contenu de la question est requis"));
        }

        const newQuestion = await questionService.createQuestion({ content });

        res.status(201).json({
            success: true,
            message: "Question ajoutée avec succès",
            question: newQuestion
        });
    } catch (err) {
        next(err);
    }
};

exports.getRandomQuestions = async (req, res, next) => {
    try {
        const count = parseInt(req.query.count) || 3;

        const questions = await questionService.getRandomQuestions(count);

        res.json({
            success: true,
            questions
        });
    } catch (err) {
        next(err);
    }
};

exports.updateQuestion = async (req, res, next) => {
    try {
        const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);

        if (!updatedQuestion) {
            return next(new HttpError(404, "Question non trouvée"));
        }

        res.json({
            success: true,
            message: "Question mise à jour avec succès",
            question: updatedQuestion
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        const deleted = await questionService.deleteQuestion(req.params.id);

        if (!deleted) {
            return next(new HttpError(404, "Question non trouvée"));
        }

        res.json({
            success: true,
            message: "Question supprimée avec succès"
        });
    } catch (err) {
        next(err);
    }
};

