const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllQuestions = async () => {
    return await prisma.question.findMany();
};

exports.getQuestionById = async (id) => {
    return await prisma.question.findUnique({ where: { id: Number(id) } });
};

exports.createQuestion = async (data) => {
    return await prisma.question.create({ data });
};

exports.getRandomQuestions = async (count) => {
    const allQuestions = await prisma.question.findMany();
    const realCount = Math.min(count, allQuestions.length);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, realCount);
};

exports.updateQuestion = async (id, data) => {
    return await prisma.question.update({
        where: { id: Number(id) },
        data,
    });
};

exports.deleteQuestion = async (id) => {
    try {
        await prisma.question.delete({
            where: { id: Number(id) },
        });
        return true;
    } catch (err) {
        return false;
    }
};