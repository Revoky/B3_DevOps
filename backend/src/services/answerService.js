const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HttpError = require('../utils/HttpError');

exports.createUserAnswer = async (iduser, { questionId: idquestion, content }) => {
    try {
        return await prisma.answer.create({
            data: {
                iduser: Number(iduser),
                idquestion: Number(idquestion),
                content,
            },
        });
    } catch (err) {
        if (err.code === 'P2002') {
            throw new HttpError(400, "Vous avez déjà répondu à cette question.");
        }
        throw err;
    }
};

exports.getUserAnswerByQuestion = async (questionId) => {
    return await prisma.answer.findMany({
        where: { idquestion: Number(questionId) },
        include: {
            user: true,
            question: true,
        },
    });
};

exports.updateUserAnswer = async (answerId, content) => {
    try {
        return await prisma.answer.update({
            where: { id: Number(answerId) },
            data: { content },
        });
    } catch (err) {
        if (err.code === 'P2025') {
            // Not found
            throw new HttpError(404, "Réponse non trouvée");
        }
        throw err;
    }
};