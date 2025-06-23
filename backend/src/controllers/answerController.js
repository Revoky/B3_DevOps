const answerService = require('../services/answerService');
const HttpError = require('../utils/HttpError');

exports.createUserAnswer = async (req, res, next) => {
    try {
        const { idquestion, content } = req.body;

        if (!idquestion) {
            return next(new HttpError(400, "L'ID de la question est requis"));
        }

        if (!content || content.trim() === '') {
            return next(new HttpError(400, "Le contenu de la réponse est requis"));
        }

        const answer = await answerService.createUserAnswer(req.params.iduser, { idquestion, content });

        res.status(201).json({
            success: true,
            message: "Réponse enregistrée",
            answer
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserAnswerByQuestion = async (req, res, next) => {
    try {
        const answers = await answerService.getUserAnswerByQuestion(req.params.question_id);

        res.json({
            success: true,
            answers
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUserAnswer = async (req, res, next) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return next(new HttpError(400, "Le contenu de la réponse est requis pour la mise à jour"));
        }

        const updatedAnswer = await answerService.updateUserAnswer(req.params.answer_id, content);

        if (!updatedAnswer) {
            return next(new HttpError(404, "Impossible de mettre à jour : réponse introuvable"));
        }

        res.json({
            success: true,
            message: "Réponse mise à jour avec succès",
            answer: updatedAnswer
        });
    } catch (err) {
        next(err);
    }
};
